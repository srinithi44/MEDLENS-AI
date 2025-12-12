// backend/server.ts
/*
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { reportRoutes } from './routes/reports';
import { authRoutes } from './routes/auth';
import { errorHandler } from './middleware/error';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/medlens')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

// Health Check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
