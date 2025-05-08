import cron from 'node-cron';
import { refreshProductData } from '../services/task.service';
import logger from '../utils/logger';

// Refresh data daily at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    await refreshProductData();
    logger.info('Scheduled data refresh successful');
  } catch (err) {
    logger.error('Scheduled data refresh failed', err);
  }
});
