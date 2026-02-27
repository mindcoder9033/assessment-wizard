# Assessment Wizard Implementation Plan

## Goal
Build the Assessment Wizard using a template-driven approach (React/Vite frontend, Node.js/Express backend for LaTeX, Supabase for persistence), starting with a fully functional vertical slice of Paper 1.

## Tasks
- [ ] Task 1: Initialize Vite React app, setup Supabase for session persistence, setup Tailwind CSS. → Verify: `npm run dev` shows a styled welcome screen.
- [ ] Task 2: Setup lightweight Express backend server to handle LaTeX (`pdflatex`) PDF compilation. → Verify: Server responds to health check.
- [ ] Task 3: Analyze the provided Paper 1 `.tex` file and define strict JSON payload schema. → Verify: Schema captures all dynamic Paper 1 fields (school name, marks, questions, logo).
- [ ] Task 4: Build Paper 1 React UI (Wizard steps 1-7) to collect the required JSON data. → Verify: Form successfully validates and generates correct JSON structure.
- [ ] Task 5: Integrate Backend LaTeX generation. Frontend sends JSON → Backend parses into `.tex` → Compiles PDF → Returns to user. → Verify: PDF downloads successfully from the UI.
- [ ] Task 6: Hook up Supabase to save/load form state ("Save in progress"). → Verify: Refreshing the app restores the exact exam configuration.

## Done When
- [ ] A teacher can fully configure an IB Psychology Paper 1 and export a perfectly formatted PDF matching the official IB layout.
