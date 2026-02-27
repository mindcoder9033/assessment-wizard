# Plan: Paper 1 Framework Updates

## Overview
Based on the `Psychology_2025_Paper1_Framework.tex` document, the IBDP Psychology Paper 1 has a structured format consisting of Section A (2 questions, 4 marks each), Section B (2 questions, 6 marks each), and Section C (2 questions provided, but the student answers only 1, 15 marks). The current implementation in the frontend state uses a single question option for Section C, which needs to be updated to provide two question options to align with the framework's requirement. Additionally, any context/approach tagging constraints need to be surfaced to the user.

## Project Type
WEB

## Success Criteria
- The `useAppStore` properly initializes Section C with two question options (each worth 15 marks) for the teacher to specify.
- The instructions for Section C clearly indicate "Answer one question."
- PDF generation properly renders the two provided options in Section C.

## Tech Stack
- Typescript / React (Frontend form handling)
- Zustand (State management)
- Backend Handlebars / PDF generation

## File Structure
Modified Files:
- `frontend/src/store/useAppStore.ts` (Update default state for Section C)
- (Potentially) `backend/src/templates/pdf/paper1.hbs` to ensure it formats "Choice 1" and "Choice 2" nicely if not already handled dynamically by the question loop.

## Task Breakdown

### Task 1: Update Default State for Section C 
- **Agent**: `frontend-specialist`
- **Skills**: `react-best-practices`
- **Description**: Update the `defaultPaperData` in `useAppStore.ts` to include two 15-mark questions in `sectionC` by default, instead of one.
- **INPUT**: Current `useAppStore.ts`
- **OUTPUT**: `useAppStore.ts` with updated Section C initialization.
- **VERIFY**: Check the UI Wizard to ensure Section C displays two question input fields.

### Task 2: Review and Update PDF Template for Section C 
- **Agent**: `backend-specialist`
- **Skills**: `nodejs-best-practices`
- **Description**: Inspect how `sectionC.questions` are rendered in the generated PDF. If they are rendered sequentially without "OR" or clear choice formatting, update the Handlebars template to present them as distinct choices for the student.
- **INPUT**: PDF Handlebars template
- **OUTPUT**: Updated PDF template (if formatting adjustments are needed).
- **VERIFY**: Generate a PDF and visually confirm Section C looks correct.

## Phase X: Verification
- [ ] Lint & Type Check passes cleanly. 
- [ ] Section C in the Wizard correctly shows two question options.
- [ ] Generated PDF displays the questions and instructions according to the 2025 IBDP Psychology Framework (2 questions for Section C).
- [ ] No purple/violet hex codes or generic template layouts were used.
- [ ] Playwright / E2E test runs successfully for the exam generation flow.
