"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = void 0;
const latexService_1 = require("../services/latexService");
const generatePdf = async (req, res) => {
    try {
        const payload = req.body;
        // In the future: Validate payload against our JSON Schema here
        const pdfBuffer = await (0, latexService_1.compileTemplate)('paper1', payload);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=assessment-paper.pdf');
        res.status(200).send(pdfBuffer);
    }
    catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
};
exports.generatePdf = generatePdf;
