const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const passport = require('./config/passport');
const http = require('http');
const { Server } = require('socket.io');

// Config
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://0.0.0.0:3000', process.env.FRONTEND_URL],
    credentials: true,
  },
});

// Make io accessible to routes
app.set('io', io);

// Initialize Passport
app.use(passport.initialize());

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://0.0.0.0:3000', process.env.FRONTEND_URL],
  credentials: true,
}));
app.use(express.json());
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth',          require('./routes/authRoutes'));
app.use('/api/users',         require('./routes/userRoutes'));
app.use('/api/offres',        require('./routes/offreRoutes'));
app.use('/api/candidatures',  require('./routes/candidatureRoutes'));
app.use('/api/entretiens',    require('./routes/entretienRoutes'));
app.use('/api/alertes',       require('./routes/alerteRoutes'));
app.use('/api/favoris',       require('./routes/favoriRoutes'));
app.use('/api/reviews',       require('./routes/reviewRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/documents',     require('./routes/documentRoutes'));
app.use('/api/activity-logs', require('./routes/activityLogRoutes'));
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));
app.use('/api/settings',     require('./routes/settingRoutes'));
app.use('/api/reports',       require('./routes/reportRoutes'));
app.use('/api/skill-tests',  require('./routes/skillTestRoutes'));
app.use('/api/articles',      require('./routes/articleRoutes'));

// Route test
app.get('/', (req, res) => {
  res.json({ message: '✅ SmartRecruit API fonctionne !' });
});

// Gestion erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Erreur serveur interne',
  });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('🔌 Client connecté:', socket.id);

  // Join user's personal room for targeted notifications
  socket.on('join-user-room', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`👤 Utilisateur ${userId} a rejoint sa room`);
  });

  // Join role-based rooms
  socket.on('join-role-room', (role) => {
    socket.join(`role-${role}`);
    console.log(`👥 Utilisateur avec rôle ${role} a rejoint la room rôle`);
  });

  socket.on('disconnect', () => {
    console.log('🔌 Client déconnecté:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Écouter sur toutes les interfaces réseau

server.listen(PORT, HOST, () => {
  console.log(`🚀 Serveur démarré sur http://${HOST}:${PORT}`);
  console.log(`🌐 Accès local: http://localhost:${PORT}`);
  console.log(`📡 Accès réseau: http://votre_ip_locale:${PORT}`);
  console.log(`🔔 Socket.io actif pour les notifications en temps réel`);
});

// Export app and io for use in other modules
module.exports = { app, server, io };