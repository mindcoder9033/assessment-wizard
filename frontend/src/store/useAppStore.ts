import { create } from 'zustand';
import type { Paper1Payload, CoverPageData, SectionData, ResourceBookletData } from '../types/exam';
import { supabase } from '../lib/supabase';

interface AppState {
    currentStep: number;
    isLoading: boolean;
    pdfUrl: string | null;
    paperData: Paper1Payload;

    // Actions
    nextStep: () => void;
    prevStep: () => void;
    setCoverPage: (data: CoverPageData) => void;
    setResourceBooklet: (data: ResourceBookletData) => void;
    setSectionA: (data: SectionData) => void;
    setSectionB: (data: SectionData) => void;
    setSectionC: (data: SectionData) => void;
    generatePdf: () => Promise<void>;
    saveExam: (examId: string) => Promise<void>;
    loadExam: (examId: string) => Promise<void>;
    reset: () => void;
    setStep: (step: number) => void;
}

const defaultPaperData: Paper1Payload = {
    coverPage: {
        schoolName: '',
        examTitle: 'Psychology Midterm',
        paperType: 'Paper 1',
        examDate: new Date().toISOString().split('T')[0],
        session: 'Morning',
        level: 'HL',
        durationMinutes: 90,
        totalMarks: 35,
        standardInstructions: [
            'Write your answers in the boxes provided.',
            'A calculator is not required for this paper.',
        ],
    },
    sectionA: {
        title: 'Section A',
        instructions: 'Answer all questions. Each question is worth 4 marks.',
        questions: [
            { id: '1', text: '', marks: 4 },
            { id: '2', text: '', marks: 4 },
        ],
    },
    sectionB: {
        title: 'Section B',
        instructions: 'Answer all questions. Each question is worth 6 marks.',
        questions: [
            { id: '3', text: '', marks: 6, scenario: '' },
            { id: '4', text: '', marks: 6, scenario: '' },
        ],
    },
    sectionC: {
        title: 'Section C',
        instructions: 'Answer one question. The question is worth 15 marks.',
        questions: [
            { id: '5', text: '', marks: 15 },
            { id: '6', text: '', marks: 15 },
        ],
    },
};

const defaultPaper2Data: Paper1Payload = {
    coverPage: {
        schoolName: '',
        examTitle: 'Psychology Midterm',
        paperType: 'Paper 2',
        examDate: new Date().toISOString().split('T')[0],
        session: 'Morning',
        level: 'HL',
        durationMinutes: 90,
        totalMarks: 35,
        standardInstructions: [
            'Answer all questions in Section A.',
            'Answer the one question in Section B.',
        ],
    },
    sectionA: {
        title: 'Section A',
        instructions: 'Answer all questions. The total for this section is 20 marks.',
        questions: [
            { id: '1a', text: 'Describe the research method used in a class practical, including the aim, procedure, and how the method was implemented. (Knowledge and Understanding)', marks: 4 },
            { id: '1b', text: 'Apply one psychological concept to your class practical, showing how it influenced design, methodology, analysis, or findings.', marks: 4 },
            { id: '1c', text: 'Compare the method used in your class practical with another research method, identifying similarities and differences.', marks: 6 },
            { id: '1d', text: 'Design a new study investigating the same topic using a different research method.', marks: 6 },
        ],
    },
    sectionB: {
        title: 'Section B',
        instructions: 'Answer the question based on the unseen study. The total for this section is 15 marks.',
        scenario: '',
        questions: [
            { id: '2', text: 'Evaluate the unseen research study above. Demonstrate understanding of at least two specified concepts and apply those concepts to the study.', marks: 15 },
        ],
    },
    sectionC: {
        title: 'Section C',
        instructions: '',
        questions: [],
    },
};

const defaultPaper3Data: Paper1Payload = {
    coverPage: {
        schoolName: '',
        examTitle: 'Psychology Midterm',
        paperType: 'Paper 3',
        examDate: new Date().toISOString().split('T')[0],
        session: 'Morning',
        level: 'HL',
        durationMinutes: 105, // 1 hour 45 minutes
        totalMarks: 30, // 30 marks
        standardInstructions: [
            'Answer all four questions.',
            'All questions are based on the provided resource booklet.',
            'Use relevant psychological terminology throughout.',
            'Support responses with direct reference to the sources and your knowledge of the HL extension.',
            'Show clear reasoning when interpreting data.',
            'Structure extended responses logically and coherently.'
        ],
    },
    resourceBooklet: {
        topic: '',
        sources: [
            { id: '1', title: 'Source 1', type: 'Quantitative', content: '' },
            { id: '2', title: 'Source 2', type: 'Qualitative', content: '' },
            { id: '3', title: 'Source 3', type: 'Mixed', content: '' },
        ]
    },
    sectionA: {
        title: 'Section A – Interpretation and Analysis',
        instructions: 'Answer all questions based on the provided resources. Total for this section is 9 marks.',
        questions: [
            { id: '1', text: 'Identify one issue that limits interpretation of the data in the given source. Clearly explain why this issue restricts interpretation.', marks: 3 },
            { id: '2', text: 'Analyze findings from the provided source. State a clear conclusion and explicitly link the conclusion to the data.', marks: 6 },
        ],
    },
    sectionB: {
        title: 'Section B – Research Considerations',
        instructions: 'Answer the question based on the unseen study. Total for this section is 6 marks.',
        scenario: '',
        questions: [
            { id: '3', text: 'Evaluate qualitative research considerations for the study. Focus on improving credibility, avoiding bias, or assessing transferability.', marks: 6 },
        ],
    },
    sectionC: {
        title: 'Section C – Synthesis and Evaluation',
        instructions: 'Write an extended analytical essay based on the claim. Total for this section is 15 marks.',
        questions: [
            { id: '4', text: 'Discuss the validity of the stated claim. Consider different perspectives, use at least three sources, and reach a reasoned conclusion.', marks: 15 },
        ],
    },
};

export const useAppStore = create<AppState>((set, get) => ({
    currentStep: 1,
    isLoading: false,
    pdfUrl: null,
    paperData: defaultPaperData,

    nextStep: () => set((state) => {
        const paperType = state.paperData.coverPage.paperType;
        const maxStep = paperType === 'Paper 2' ? 4 : paperType === 'Paper 3' ? 6 : 5;
        return { currentStep: Math.min(state.currentStep + 1, maxStep) };
    }),
    prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
    setStep: (step) => set((state) => {
        const paperType = state.paperData.coverPage.paperType;
        const maxStep = paperType === 'Paper 2' ? 4 : paperType === 'Paper 3' ? 6 : 5;
        return { currentStep: Math.max(1, Math.min(step, maxStep)) };
    }),

    setCoverPage: (data) => set((state) => {
        const totalMarks = data.paperType === 'Paper 3' ? 30 : 35; // Paper 1 & 2: 35 marks, Paper 3: 30 marks
        const prevPaperType = state.paperData.coverPage.paperType;

        let newPaperData = { ...state.paperData };
        if (prevPaperType !== data.paperType) {
            if (data.paperType === 'Paper 2') {
                newPaperData = { ...defaultPaper2Data, coverPage: { ...defaultPaper2Data.coverPage, ...data, totalMarks } };
            } else if (data.paperType === 'Paper 3') {
                newPaperData = { ...defaultPaper3Data, coverPage: { ...defaultPaper3Data.coverPage, ...data, totalMarks } };
            } else {
                newPaperData = { ...defaultPaperData, coverPage: { ...defaultPaperData.coverPage, ...data, totalMarks } };
            }
        } else {
            newPaperData.coverPage = { ...data, totalMarks };
        }

        return { paperData: newPaperData };
    }),
    setResourceBooklet: (data) => set((state) => ({ paperData: { ...state.paperData, resourceBooklet: data } })),
    setSectionA: (data) => set((state) => ({ paperData: { ...state.paperData, sectionA: data } })),
    setSectionB: (data) => set((state) => ({ paperData: { ...state.paperData, sectionB: data } })),
    setSectionC: (data) => set((state) => ({ paperData: { ...state.paperData, sectionC: data } })),

    saveExam: async (examId: string) => {
        try {
            const { error } = await supabase
                .from('exams')
                .upsert({ id: examId, payload: get().paperData, updated_at: new Date() });

            if (error) throw error;
            console.log("Exam saved successfully to Supabase!");
        } catch (error) {
            console.error("Failed to save exam to Supabase:", error);
            alert("Failed to save draft.");
        }
    },

    loadExam: async (examId: string) => {
        set({ isLoading: true });
        try {
            const { data, error } = await supabase
                .from('exams')
                .select('payload')
                .eq('id', examId)
                .single();

            if (error) throw error;
            if (data && data.payload) {
                set({ paperData: data.payload as Paper1Payload, isLoading: false });
            }
        } catch (error) {
            console.error("Failed to load exam from Supabase:", error);
            set({ isLoading: false });
        }
    },

    reset: () => set({ currentStep: 1, pdfUrl: null, paperData: defaultPaperData }),

    generatePdf: async () => {
        set({ isLoading: true, pdfUrl: null });

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

        try {
            const response = await fetch(`${apiUrl}/api/generate-pdf`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(get().paperData),
            });

            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            set({ pdfUrl: url, isLoading: false });
        } catch (error) {
            console.error(error);
            set({ isLoading: false });
            alert('Failed to generate PDF. Please try again.');
        }
    },
}));
