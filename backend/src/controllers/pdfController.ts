import { Request, Response } from 'express';
import { compileTemplate } from '../services/latexService';

export const generatePdf = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        // In the future: Validate payload against our JSON Schema here

        const pdfBuffer = await compileTemplate('paper1', payload);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=assessment-paper.pdf');
        res.status(200).send(pdfBuffer);

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
};
