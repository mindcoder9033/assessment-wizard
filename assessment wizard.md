# Project Summary: Assessment Wizard

## 1. Executive Overview
**Assessment Wizard** is a specialized SaaS platform designed to streamline the creation of International Baccalaureate (IB) Diploma Programme Psychology exam papers. Targeted at IB teachers, the tool automates the formatting and structural compliance of external assessment papers (Paper 1, 2, and 3), significantly reducing administrative workload while ensuring adherence to IB standards.

*   **Project Title:** Assessment Wizard
*   **Target Audience:** IB DP Psychology Teachers
*   **Primary Goal:** Save teacher time by automating the creation and export of professionally formatted A4 exam papers.
*   **MVP Scope:** IB Psychology (Paper 1, 2, 3) with A4 PDF export.
*   **Future Scope:** Expansion to other mainstream IB subjects.

## 2. Problem Statement
IB teachers spend considerable time manually formatting exam papers to match strict IB guidelines. Errors in mark allocation, timing, or section structure (e.g., confusing Paper 1 vs. Paper 2 requirements) can invalidate practice exams. There is a need for a tool that enforces these rules automatically while allowing teachers to focus on content creation.

## 3. Exam Logic & Compliance (Based on IB Standards)
The application enforces specific rules derived from the IB External Assessment guidelines to ensure every generated paper is valid.

### Paper 1 (Standard & Higher Level)
*   **Aim:** Integration of concepts, content, and contexts.
*   **Duration:** 1 hour 30 minutes (Auto-filled).
*   **Total Marks:** 35 Marks (Auto-filled).
*   **Structure:**
    *   **Section A:** 2 Compulsory Short-Answer Questions (4 marks each) covering Biological, Cognitive, or Sociocultural approaches.
    *   **Section B:** 2 Compulsory Short-Answer Questions (6 marks each) applying knowledge to unseen contexts.
    *   **Section C:** 1 Extended Response Question (15 marks) chosen from two options.

### Paper 2 (Standard & Higher Level)
*   **Aim:** Applying concepts to research contexts (Class Practicals).
*   **Duration:** 1 hour 30 minutes (Auto-filled).
*   **Total Marks:** 35 Marks (Auto-filled).
*   **Structure:**
    *   **Section A:** 4 Compulsory Questions based on class practicals (Q1a: 4 marks, Q1b: 4 marks, Q1c: 6 marks, Q1d: 6 marks).
    *   **Section B:** 1 Extended Response Question (15 marks) evaluating an unseen research study.
    *   **Section C:** None (Hidden in UI).

### Paper 3 (Higher Level Only)
*   **Aim:** Data analysis and interpretation of research data.
*   **Level Restriction:** **HL Only** (SL option disabled in UI).
*   **Duration:** 1 hour 45 minutes (Auto-filled).
*   **Total Marks:** 30 Marks (Auto-filled).
*   **Structure:**
    *   **Question 1:** Interpretation of Graphs (3 marks).
    *   **Question 2:** Data Analysis (6 marks).
    *   **Question 3:** Research Considerations (6 marks).
    *   **Question 4:** Synthesis (15 marks).

## 4. User Flow & Screen Architecture
The application follows a 7-step wizard flow to guide teachers through paper creation.

*   **Screen 1: Welcome & Paper Selection**
    *   User selects Paper 1, 2, or 3.
    *   *Logic:* Selecting Paper 3 disables "SL" level options in subsequent screens.
*   **Screen 2: Cover Page Configuration**
    *   **Inputs:** School Logo Upload, School Name, Exam Title, Date Picker, Session (Morning/Afternoon).
    *   **Auto-Fields:** Level (HL/SL), Duration, Max Marks, and Standard Instructions (dynamic based on Paper type).
*   **Screen 3: Section A / Questions 1-2**
    *   Dynamic input fields based on Paper selection (e.g., P1 SAQs vs. P2 Practical Questions vs. P3 Graph Interpretation).
*   **Screen 4: Section B / Questions 3-4**
    *   Dynamic input fields (e.g., P1 Context SAQs vs. P2 Unseen Study vs. P3 Data Analysis).
*   **Screen 5: Section C**
    *   **Logic:** Visible only for Paper 1. Hidden for Paper 2 and 3.
    *   **Input:** Extended Response Question (15 marks).
*   **Screen 6: Preview & Edits**
    *   Real-time preview of the A4 layout.
    *   Ability to go back and edit specific sections.
*   **Screen 7: Export to PDF**
    *   Generates a print-ready PDF using LaTeX rendering for professional typesetting.

## 5. Technical Architecture
*   **Frontend Framework:** **Vite + React** for fast development and responsive UI.
*   **Styling:** **Tailwind CSS** for rapid, consistent styling matching IB aesthetics.
*   **Language:** **TypeScript** to ensure type safety, particularly for exam structures and mark schemes.
*   **PDF Generation:** **LaTeX** integration.
    *   *Reasoning:* LaTeX is the industry standard for academic typesetting, ensuring precise control over margins, fonts (Times New Roman), and table structures (mark allocation tables) required by IB.
*   **State Management:** React Context or Zustand to manage the exam configuration state across the 7 screens.

## 6. Key Features for MVP
1.  **Smart Auto-Fill:** Duration and Total Marks update automatically based on Paper selection to prevent human error.
2.  **Dynamic Section Rendering:** Sections that do not exist for specific papers (e.g., Paper 2 Section C) are hidden to prevent confusion.
3.  **Level Enforcement:** Paper 3 restricts users to Higher Level only, complying with IB regulations.
4.  **Professional Export:** LaTeX-driven PDF export ensures the output looks identical to official IB documents.
5.  **Instruction Templates:** Pre-loaded standard instructions for candidates based on the selected paper type.

## 7. Success Metrics
*   **Time Savings:** Reduce exam paper creation time from hours to minutes.
*   **Compliance:** 100% adherence to IB mark schemes and timing regulations.
*   **Usability:** Intuitive wizard flow requiring no LaTeX knowledge from the teacher.

## 8. Roadmap
*   **Phase 1 (MVP):** IB Psychology Paper 1, 2, 3 creation and PDF export.
*   **Phase 2:** Add Mark Scheme generation (auto-generated based on question type).
*   **Phase 3:** Expand to other IB Subjects (e.g., Biology, History).
*   **Phase 4:** Collaborative features (Share papers with department heads).