import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';

const execPromise = util.promisify(exec);

// Register Handlebars helpers
Handlebars.registerHelper('eq', (arg1, arg2) => arg1 === arg2);

export const compileTemplate = async (templateName: string, payload: any): Promise<Buffer> => {
    const templatePath = path.join(__dirname, '..', '..', 'templates', `${templateName}-template.tex`);

    if (!fs.existsSync(templatePath)) {
        throw new Error(`Template ${templateName} not found at ${templatePath}`);
    }

    // 1. Read the LaTeX template (with Handlebars syntax)
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    // 2. Compile with Handlebars
    const compiledTemplate = Handlebars.compile(templateContent);
    const texContent = compiledTemplate(payload);

    // 3. Setup temporary working directory for pdflatex
    const workId = uuidv4();
    const workDir = path.join(__dirname, '..', '..', 'tmp', workId);
    fs.mkdirSync(workDir, { recursive: true });

    const texFilePath = path.join(workDir, 'exam.tex');
    fs.writeFileSync(texFilePath, texContent);

    try {
        // 4. Run pdflatex twice to resolve any references/layouts
        const command = `pdflatex -interaction=nonstopmode -output-directory="${workDir}" "${texFilePath}"`;

        await execPromise(command);
        // await execPromise(command); // Second run if needed for Table of Contents, etc.

        // 5. Read the generated PDF
        const pdfPath = path.join(workDir, 'exam.pdf');
        if (!fs.existsSync(pdfPath)) {
            throw new Error('PDF file was not generated');
        }

        const pdfBuffer = fs.readFileSync(pdfPath);

        // 6. Cleanup working directory
        fs.rmSync(workDir, { recursive: true, force: true });

        return pdfBuffer;
    } catch (error) {
        // Cleanup on failure
        if (fs.existsSync(workDir)) {
            fs.rmSync(workDir, { recursive: true, force: true });
        }
        console.error('LaTeX compilation failed:', error);
        throw new Error('Failed to compile LaTeX to PDF');
    }
};
