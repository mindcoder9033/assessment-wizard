"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Basic health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Assessment Wizard Backend Running' });
});
// Import and use routes (to be created)
const generate_pdf_1 = __importDefault(require("./routes/generate-pdf"));
app.use('/api/generate-pdf', generate_pdf_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
