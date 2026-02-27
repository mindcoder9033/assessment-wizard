"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileTemplate = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const puppeteer_1 = __importDefault(require("puppeteer"));
// Register Handlebars helpers
handlebars_1.default.registerHelper('eq', (arg1, arg2) => arg1 === arg2);
const compileTemplate = async (templateName, payload) => {
    const templatePath = path_1.default.join(__dirname, '..', '..', 'templates', `${templateName}-template.html`);
    if (!fs_1.default.existsSync(templatePath)) {
        throw new Error(`Template ${templateName} not found at ${templatePath}`);
    }
    // 1. Read the HTML template (with Handlebars syntax)
    const templateContent = fs_1.default.readFileSync(templatePath, 'utf8');
    // 2. Compile with Handlebars
    const compiledTemplate = handlebars_1.default.compile(templateContent);
    const htmlContent = compiledTemplate(payload);
    try {
        // 3. Launch Puppeteer browser
        const browser = await puppeteer_1.default.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Required for some environments
        });
        const page = await browser.newPage();
        // 4. Set the compiled HTML content
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        // 5. Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            }
        });
        await browser.close();
        // return type from puppeteer page.pdf is Uint8Array, cast it to Buffer
        return Buffer.from(pdfBuffer);
    }
    catch (error) {
        console.error('HTML to PDF compilation failed full error:', error);
        throw new Error(`Failed to compile HTML to PDF. Reason: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.compileTemplate = compileTemplate;
