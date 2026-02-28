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
const pdf_lib_1 = require("pdf-lib");
// Register Handlebars helpers
handlebars_1.default.registerHelper('eq', (arg1, arg2) => arg1 === arg2);
handlebars_1.default.registerHelper('formatDuration', (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const hrStr = hrs > 0 ? `${hrs} hour${hrs > 1 ? 's' : ''}` : '';
    const minStr = mins > 0 ? `${mins} minute${mins > 1 ? 's' : ''}` : '';
    return [hrStr, minStr].filter(Boolean).join(' ');
});
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
            displayHeaderFooter: true,
            headerTemplate: '<span></span>',
            footerTemplate: `
                <div style="font-size: 10px; width: 100%; text-align: center; font-family: Arial, Helvetica, sans-serif; padding-top: 10px;">
                    Page <span class="pageNumber"></span>
                </div>
            `,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '60px',
                left: '20px'
            }
        });
        await browser.close();
        // 6. Remove footer from the cover page (page 1) using pdf-lib
        const pdfDoc = await pdf_lib_1.PDFDocument.load(pdfBuffer);
        const pages = pdfDoc.getPages();
        if (pages.length > 0) {
            const firstPage = pages[0];
            const { width } = firstPage.getSize();
            // Draw a white rectangle over the bottom margin where the footer is
            firstPage.drawRectangle({
                x: 0,
                y: 0,
                width: width,
                height: 60,
                color: (0, pdf_lib_1.rgb)(1, 1, 1),
            });
        }
        const finalPdfBytes = await pdfDoc.save();
        return Buffer.from(finalPdfBytes);
    }
    catch (error) {
        console.error('HTML to PDF compilation failed full error:', error);
        throw new Error(`Failed to compile HTML to PDF. Reason: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.compileTemplate = compileTemplate;
