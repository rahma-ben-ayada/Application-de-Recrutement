#!/bin/bash

# Script pour trouver et afficher les adresses IP locales

echo "🔍 Recherche de votre adresse IP locale..."
echo ""

# Trouver l'adresse IP locale
IP=$(hostname -I | awk '{print $1}')

if [ -z "$IP" ]; then
    # Alternative pour macOS
    IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)
fi

if [ -z "$IP" ]; then
    # Alternative pour Linux
    IP=$(hostname -I | cut -d' ' -f1)
fi

echo "📡 Votre adresse IP locale: $IP"
echo ""
echo "🌐 URLs d'accès:"
echo "  • Local:     http://localhost:3000"
echo "  • Réseau:   http://$IP:3000"
echo ""
echo "🔧 Backend API:"
echo "  • Local:     http://localhost:5000"
echo "  • Réseau:   http://$IP:5000"
echo ""
echo "📝 Pour accéder depuis un autre appareil:"
echo "  1. Assurez-vous que les deux appareils sont sur le même réseau WiFi"
echo "  2. Sur l'autre appareil, ouvrez: http://$IP:3000"
echo "  3. Utilisez les identifiants admin pour vous connecter"
echo ""
echo "🔐 Identifiants Admin:"
echo "  • Email: admin@smartrecruit.tn"
echo "  • Mot de passe: Admin123!"
echo ""

# Mettre à jour le fichier .env du frontend avec l'IP locale
if [ -f frontend/.env ]; then
    echo "📝 Mise à jour de frontend/.env avec l'IP locale..."
    sed -i "s|REACT_APP_API_URL=http://localhost:5000|REACT_APP_API_URL=http://$IP:5000|g" frontend/.env
    echo "✅ Fichier frontend/.env mis à jour"
    echo ""
fi

echo "🚀 Pour démarrer le projet avec accès réseau:"
echo "  npm start"
echo ""
