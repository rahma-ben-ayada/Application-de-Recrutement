const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const cacheMiddleware = (duration = 600) => {
  return async (req, res, next) => {
    const key = req.originalUrl || req.url;
    const cached = cache.get(key);

    if (cached) {
      console.log('Cache hit pour:', key);
      return res.json(cached);
    }

    // Store the original json method
    const originalJson = res.json.bind(res);

    // Override res.json to cache the response
    res.json = (data) => {
      cache.set(key, data, duration);
      console.log('Cache set pour:', key, 'duration:', duration);
      return originalJson(data);
    };

    next();
  };
};

const clearCache = (pattern) => {
  const keys = cache.keys();
  keys.forEach(key => {
    if (key.includes(pattern)) {
      cache.del(key);
    }
  });
};

module.exports = { cacheMiddleware, clearCache };
