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
    try {
        // 3. Instead of local pdflatex, use LaTeXOnline open-source compilation API
        const response = await fetch('https://latexonline.cc/compile?command=pdflatex', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: texContent
        });
        if (!response.ok) {
            const text = await response.text();
            console.error("LaTeXOnline API Error:", text);
            throw new Error(`LaTeX Online API Failed with status ${response.status}`);
        }
        // 4. Return the resulting PDF Buffer
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
    }
    catch (error) {
        console.error('LaTeX compilation failed:', error);
        throw new Error('Failed to compile LaTeX to PDF via Cloud API');
    }
};
exports.compileTemplate = compileTemplate;
