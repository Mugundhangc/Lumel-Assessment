import { Router } from 'express';
import { uploadTasksController, refreshDataController } from '../controllers/task.controller';
import { upload } from '../middleware/upload.middleware';

const router = Router();

router.post('/upload', upload.single('file'), uploadTasksController);
router.post('/refresh', refreshDataController);

export default router;
