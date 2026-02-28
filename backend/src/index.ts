import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

// Middleware
app.use(cors({
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST'],
}));
app.use(express.json({ limit: '20mb' })); // Allow large image payloads

// Basic health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Assessment Wizard Backend Running' });
});

// Import and use routes (to be created)
import generatePdfRoute from './routes/generate-pdf';
app.use('/api/generate-pdf', generatePdfRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
