import { Request, Response } from 'express';
import { uploadCSVAndSaveOrders, refreshProductData } from '../services/task.service';
import logger from '../utils/logger';

export const uploadTasksController = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).send('CSV file required');
      return;
    }

    console.log('req.file --------', req.file);

    const result = await uploadCSVAndSaveOrders(req.file.path);
    res.status(200).json({ message: result });
  } catch (err) {
    console.log('err ----------', err);
    logger.error('Upload failed', err);
    res.status(500).json({ error: 'Upload failed', details: err });
  }
};

export const refreshDataController = async (req: Request, res: Response) => {
  try {
    const result = await refreshProductData();
    logger.info('Data refresh successful');
    res.status(200).json({ message: result });
  } catch (err: any) {
    logger.error('Data refresh failed', err);
    res.status(500).json({ error: 'Data refresh failed', details: err.message });
  }
};
