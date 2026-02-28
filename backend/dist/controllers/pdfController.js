"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = void 0;
const pdfService_1 = require("../services/pdfService");
const generatePdf = async (req, res) => {
    try {
        const payload = req.body;
        // Extract and compute derived values for the template
        const levelDisplay = payload.coverPage?.level === 'HL' ? 'Higher level' : 'Standard level';
        const paperType = payload.coverPage?.paperType || 'Paper 1';
        const templateName = paperType === 'Paper 2' ? 'paper2' : paperType === 'Paper 3' ? 'paper3' : 'paper1';
        const enrichedPayload = { ...payload, levelDisplay };
        const pdfBuffer = await (0, pdfService_1.compileTemplate)(templateName, enrichedPayload);
        const filename = `IB_Psychology_${paperType.replace(' ', '')}.pdf`;
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.status(200).send(pdfBuffer);
    }
    catch (error) {
        console.error('Error generating PDF detailed:', error);
        res.status(500).json({ error: 'Failed to generate PDF', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.generatePdf = generatePdf;
