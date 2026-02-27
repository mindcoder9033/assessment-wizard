"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileTemplate = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const util_1 = __importDefault(require("util"));
const handlebars_1 = __importDefault(require("handlebars"));
const uuid_1 = require("uuid");
const execPromise = util_1.default.promisify(child_process_1.exec);
// Register Handlebars helpers
handlebars_1.default.registerHelper('eq', (arg1, arg2) => arg1 === arg2);
const compileTemplate = async (templateName, payload) => {
    const templatePath = path_1.default.join(__dirname, '..', '..', 'templates', `${templateName}-template.tex`);
    if (!fs_1.default.existsSync(templatePath)) {
        throw new Error(`Template ${templateName} not found at ${templatePath}`);
    }
    // 1. Read the LaTeX template (with Handlebars syntax)
    const templateContent = fs_1.default.readFileSync(templatePath, 'utf8');
    // 2. Compile with Handlebars
    const compiledTemplate = handlebars_1.default.compile(templateContent);
    const texContent = compiledTemplate(payload);
    // 3. Setup temporary working directory for pdflatex
    const workId = (0, uuid_1.v4)();
    const workDir = path_1.default.join(__dirname, '..', '..', 'tmp', workId);
    fs_1.default.mkdirSync(workDir, { recursive: true });
    const texFilePath = path_1.default.join(workDir, 'exam.tex');
    fs_1.default.writeFileSync(texFilePath, texContent);
    try {
        // 4. Run pdflatex twice to resolve any references/layouts
        const command = `pdflatex -interaction=nonstopmode -output-directory="${workDir}" "${texFilePath}"`;
        await execPromise(command);
        // await execPromise(command); // Second run if needed for Table of Contents, etc.
        // 5. Read the generated PDF
        const pdfPath = path_1.default.join(workDir, 'exam.pdf');
        if (!fs_1.default.existsSync(pdfPath)) {
            throw new Error('PDF file was not generated');
        }
        const pdfBuffer = fs_1.default.readFileSync(pdfPath);
        // 6. Cleanup working directory
        fs_1.default.rmSync(workDir, { recursive: true, force: true });
        return pdfBuffer;
    }
    catch (error) {
        // Cleanup on failure
        if (fs_1.default.existsSync(workDir)) {
            fs_1.default.rmSync(workDir, { recursive: true, force: true });
        }
        console.error('LaTeX compilation failed:', error);
        throw new Error('Failed to compile LaTeX to PDF');
    }
};
exports.compileTemplate = compileTemplate;
