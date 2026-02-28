# Plan: Paper 1 Framework Updates (Contexts & Concepts)

## Overview
Based on `Exam Papers/Paper-1.md`, the IBDP Psychology Paper 1 assessment requires explicit engagement with **Contexts** and **Key Concepts**. 
- **Section B** (Application) questions are tied to one of four contexts (Health and well-being, Human development, Human relationships, Learning and cognition).
- **Section C** (Extended Response) questions require a Context AND a Key Concept (Bias, Causality, Change, Measurement, Perspective, Responsibility).

The frontend data structures and UI wizard must be updated to allow teachers to assign these tags to questions when authoring a Paper 1 exam. The backend PDF generator must also be updated to display these tags neatly on the final exam paper.

## Project Type
WEB

## Success Criteria
- The `Question` type includes `context` and `keyConcept` attributes.
- The `SectionStep` UI allows selecting a context and key concept for Section B and C questions.
- The generated PDF visually renders the selected context and key concept.
- Full compliance with the `project-planner.md` verification steps (no compilation errors, no generic standard tags, no purple hex colors).

## Tech Stack
- Typescript / React (Frontend form handling)
- Zustand (State management)
- Backend Handlebars / HTML Template for PDF generation

## File Structure
Modified Files:
- `frontend/src/types/exam.ts` (Update `Question` type)
- `frontend/src/components/SectionStep.tsx` (Add dropdown UI for Context and KeyConcept)
- `backend/templates/paper1-template.html` (Render tags logically in the PDF)

## Task Breakdown

### Task 1: Update Exam Types
- **task_id**: task_1
- **name**: Update Exam Types
- **agent**: `frontend-specialist`
- **skills**: `react-best-practices`
- **priority**: P0
- **dependencies**: None
- **INPUT**: `frontend/src/types/exam.ts`
- **OUTPUT**: Add `context?: string` and `keyConcept?: string` to `Question` interface. Consider defining union types for valid IB Contexts and Key Concepts to ensure strict type checking.
- **VERIFY**: TypeScript compiles (`npx tsc --noEmit` passes).

### Task 2: Update UI SectionStep
- **task_id**: task_2
- **name**: Update SectionStep Component UI
- **agent**: `frontend-specialist`
- **skills**: `react-best-practices`, `frontend-design`
- **priority**: P1
- **dependencies**: task_1
- **INPUT**: `frontend/src/components/SectionStep.tsx`
- **OUTPUT**: Add dropdown selects or inline button groups for `context` and `keyConcept`. Ensure Section B displays context UI. Ensure Section C displays context and key concept UI.
- **VERIFY**: Run `npm run dev` and visually check that the dropdowns save the correct state and navigate between steps correctly.

### Task 3: Update Backend PDF Template
- **task_id**: task_3
- **name**: Update Paper 1 Template HTML
- **agent**: `backend-specialist`
- **skills**: `nodejs-best-practices`
- **priority**: P2
- **dependencies**: task_1
- **INPUT**: `backend/templates/paper1-template.html`
- **OUTPUT**: Modify the Handlebars structure to cleanly display the context/concept. E.g., placing `[Context: {{context}}]` below or next to the question text.
- **VERIFY**: Test generating a PDF from the frontend UI and ensure the tags appear accurately in the generated layout.

## Phase X: Verification
- [ ] Lint & Type Check (`npm run lint && npx tsc --noEmit`) passes cleanly on both frontend and backend. 
- [ ] Section B and Section C in the UI Wizard correctly show and save tags.
- [ ] Generated PDF visually displays the tags without breaking layout.
- [ ] Socratic Gate was respected (Confirmed before planning).
- [ ] No purple/violet hex codes were used in the UI updates.
