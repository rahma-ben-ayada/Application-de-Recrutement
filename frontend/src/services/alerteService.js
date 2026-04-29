import api from '../utils/api';

class AlerteService {
  constructor() {
    this.checkInterval = null;
    this.listeners = [];
    this.lastCheck = null;
  }

  // Start automatic alert checking
  startChecking(callback, intervalMinutes = 30) {
    if (this.checkInterval) {
      this.stopChecking();
    }

    // Check immediately on start
    this.checkAlertes(callback);

    // Then check at the specified interval
    this.checkInterval = setInterval(() => {
      this.checkAlertes(callback);
    }, intervalMinutes * 60 * 1000);
  }

  // Stop automatic checking
  stopChecking() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  // Check for new alerts
  async checkAlertes(callback) {
    try {
      const data = await api('/alertes/check');

      if (data.success && data.resultats && data.resultats.length > 0) {
        const totalNewOffres = data.resultats.reduce(
          (sum, r) => sum + r.nombreOffres,
          0
        );

        if (totalNewOffres > 0) {
          const message = data.resultats.length === 1
            ? `${data.resultats[0].titreAlerte}: ${data.resultats[0].nombreOffres} nouvelle(s) offre(s)`
            : `${totalNewOffres} nouvelles offres correspondantes à vos alertes`;

          callback({
            type: 'alerte',
            message,
            resultats: data.resultats,
            timestamp: new Date(),
          });
        }
      }

      this.lastCheck = new Date();
      return data;
    } catch (error) {
      console.error('Error checking alerts:', error);
      return null;
    }
  }

  // Get alert statistics
  async getStats() {
    try {
      const data = await api('/alertes/stats');
      return data.stats;
    } catch (error) {
      console.error('Error fetching alert stats:', error);
      return null;
    }
  }

  // Subscribe to alert notifications
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all subscribers
  notify(notification) {
    this.listeners.forEach(listener => listener(notification));
  }

  // Get time since last check
  getTimeSinceLastCheck() {
    if (!this.lastCheck) return null;
    return Date.now() - this.lastCheck.getTime();
  }
}

// Create singleton instance
const alerteService = new AlerteService();

export default alerteService;
