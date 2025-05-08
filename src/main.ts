import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import './jobs/cron';
import taskRoutes from './routes/task.routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/tasks', taskRoutes);

const conectToDB = async () => {
  try {
      sequelize.authenticate();
      console.log('database connected');
  } catch (error) {
      console.error('Database not connected: ', error);
  }
}

const startServer = async () => {
  await conectToDB();
  app.listen(PORT, () => {
      console.log('Server running at http://localhost:', PORT);
  })
}

startServer();
