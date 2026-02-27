import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import puppeteer from 'puppeteer';

// Register Handlebars helpers
Handlebars.registerHelper('eq', (arg1, arg2) => arg1 === arg2);

export const compileTemplate = async (templateName: string, payload: any): Promise<Buffer> => {
    const templatePath = path.join(__dirname, '..', '..', 'templates', `${templateName}-template.html`);

    if (!fs.existsSync(templatePath)) {
        throw new Error(`Template ${templateName} not found at ${templatePath}`);
    }

    // 1. Read the HTML template (with Handlebars syntax)
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    // 2. Compile with Handlebars
    const compiledTemplate = Handlebars.compile(templateContent);
    const htmlContent = compiledTemplate(payload);

    try {
        // 3. Launch Puppeteer browser
        const browser = await puppeteer.launch({
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

    } catch (error) {
        console.error('HTML to PDF compilation failed full error:', error);
        throw new Error(`Failed to compile HTML to PDF. Reason: ${error instanceof Error ? error.message : String(error)}`);
    }
};
