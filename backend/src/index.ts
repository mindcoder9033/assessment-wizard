import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

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
