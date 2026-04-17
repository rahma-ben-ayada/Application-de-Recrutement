#!/bin/bash

# Script de démarrage SmartRecruit
# Ce script lance le backend et le frontend simultanément

echo "🚀 Démarrage de SmartRecruit..."

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js d'abord."
    exit 1
fi

# Vérifier si MongoDB est en cours d'exécution
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️ MongoDB ne semble pas être en cours d'exécution."
    echo "Veuillez démarrer MongoDB avec: sudo systemctl start mongod"
    echo "Ou pour MongoDB Atlas, configurez MONGO_URI dans backend/.env"
fi

# Créer les dossiers nécessaires
mkdir -p backend/uploads/cvs
mkdir -p backend/uploads/videos
mkdir -p backend/uploads/profiles
mkdir -p backend/logs

# Vérifier si .env existe dans le backend
if [ ! -f backend/.env ]; then
    echo "⚠️ Fichier backend/.env non trouvé. Création à partir de .env.example..."
    cp backend/.env.example backend/.env
    echo "✅ Fichier backend/.env créé. Veuillez le configurer avec vos paramètres."
fi

# Installer les dépendances si nécessaire
if [ ! -d backend/node_modules ]; then
    echo "📦 Installation des dépendances backend..."
    cd backend && npm install && cd ..
fi

if [ ! -d frontend/node_modules ]; then
    echo "📦 Installation des dépendances frontend..."
    cd frontend && npm install && cd ..
fi

# Tuer les processus sur les ports 5000 et 3000 s'ils existent
echo "🧹 Nettoyage des ports..."
lsof -ti:5000 | xargs kill -9 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Démarrer le backend en arrière-plan
echo "🔧 Démarrage du backend sur le port 5000..."
cd backend && npm start &
BACKEND_PID=$!
cd ..

# Attendre que le backend démarre
sleep 3

# Démarrer le frontend en arrière-plan
echo "🎨 Démarrage du frontend sur le port 3000..."
cd frontend && npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ SmartRecruit est maintenant en cours d'exécution !"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo "📚 API Documentation: backend/README.md"
echo "🧪 API Test Guide: backend/API_TEST_GUIDE.md"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter les deux serveurs."
echo ""

# Fonction pour arrêter les processus proprement
cleanup() {
    echo ""
    echo "🛑 Arrêt de SmartRecruit..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    echo "✅ Arrêté avec succès."
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT SIGTERM

# Attendre indéfiniment
wait
