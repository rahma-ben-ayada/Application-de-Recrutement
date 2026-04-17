// Admin Security Middleware
// Enhanced security for admin routes

const adminSecurity = (req, res, next) => {
  // Check if user is admin
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Accès refusé. Autorisation administrative requise.',
      code: 'ADMIN_ONLY'
    });
  }

  // Check if admin account is active
  if (req.user.status !== 'active') {
    return res.status(403).json({
      success: false,
      message: 'Compte administrateur non actif.',
      code: 'ACCOUNT_INACTIVE'
    });
  }

  // Log admin action (for audit trail)
  console.log(`[ADMIN SECURITY] ${req.user.email} accessed ${req.method} ${req.path} at ${new Date().toISOString()}`);

  next();
};

// Rate limiting for admin login attempts
const adminLoginRateLimit = (req, res, next) => {
  const MAX_ATTEMPTS = 3;
  const LOCKOUT_TIME = 5 * 60 * 1000; // 5 minutes

  // Get client IP
  const clientIp = req.ip || req.connection.remoteAddress;

  // Check for existing rate limit data (in production, use Redis)
  if (!req.adminRateLimit) {
    req.adminRateLimit = {};
  }

  const now = Date.now();
  const ipData = req.adminRateLimit[clientIp] || { attempts: 0, lockUntil: 0 };

  // Check if IP is locked
  if (ipData.lockUntil > now) {
    const remainingTime = Math.ceil((ipData.lockUntil - now) / 1000 / 60);
    return res.status(429).json({
      success: false,
      message: `Trop de tentatives. Réessayez dans ${remainingTime} minutes.`,
      code: 'ACCOUNT_LOCKED',
      lockUntil: ipData.lockUntil
    });
  }

  // Reset attempts if lockout period has passed
  if (ipData.lockUntil > 0 && ipData.lockUntil <= now) {
    ipData.attempts = 0;
    ipData.lockUntil = 0;
  }

  // Store for next middleware
  req.adminRateLimit[clientIp] = ipData;

  next();
};

// Record failed login attempt
const recordFailedAttempt = (req, res, next) => {
  const MAX_ATTEMPTS = 3;
  const LOCKOUT_TIME = 5 * 60 * 1000; // 5 minutes

  // Override json to capture failed logins
  const originalJson = res.json;
  res.json = function(data) {
    if (!data.success && res.statusCode === 401) {
      const clientIp = req.ip || req.connection.remoteAddress;

      if (!req.adminRateLimit) {
        req.adminRateLimit = {};
      }

      const ipData = req.adminRateLimit[clientIp] || { attempts: 0, lockUntil: 0 };
      ipData.attempts += 1;

      // Lock after max attempts
      if (ipData.attempts >= MAX_ATTEMPTS) {
        ipData.lockUntil = Date.now() + LOCKOUT_TIME;
        console.log(`[SECURITY] Admin login locked for IP: ${clientIp}`);
      }

      req.adminRateLimit[clientIp] = ipData;
    }

    return originalJson.call(this, data);
  };

  next();
};

module.exports = {
  adminSecurity,
  adminLoginRateLimit,
  recordFailedAttempt,
};
