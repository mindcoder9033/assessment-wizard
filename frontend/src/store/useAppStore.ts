import { create } from 'zustand';
import type { Paper1Payload, CoverPageData, SectionData } from '../types/exam';

interface AppState {
    currentStep: number;
    isLoading: boolean;
    pdfUrl: string | null;
    paperData: Paper1Payload;

    // Actions
    nextStep: () => void;
    prevStep: () => void;
    setCoverPage: (data: CoverPageData) => void;
    setSectionA: (data: SectionData) => void;
    setSectionB: (data: SectionData) => void;
    setSectionC: (data: SectionData) => void;
    generatePdf: () => Promise<void>;
    reset: () => void;
}

const defaultPaperData: Paper1Payload = {
    coverPage: {
        schoolName: '',
        examTitle: 'Psychology Midterm',
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
            { id: '3', text: '', marks: 6 },
            { id: '4', text: '', marks: 6 },
        ],
    },
    sectionC: {
        title: 'Section C',
        instructions: 'Answer one question. The question is worth 15 marks.',
        questions: [
            { id: '5', text: '', marks: 15 },
        ],
    },
};

export const useAppStore = create<AppState>((set, get) => ({
    currentStep: 1,
    isLoading: false,
    pdfUrl: null,
    paperData: defaultPaperData,

    nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 6) })),
    prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

    setCoverPage: (data) => set((state) => ({ paperData: { ...state.paperData, coverPage: data } })),
    setSectionA: (data) => set((state) => ({ paperData: { ...state.paperData, sectionA: data } })),
    setSectionB: (data) => set((state) => ({ paperData: { ...state.paperData, sectionB: data } })),
    setSectionC: (data) => set((state) => ({ paperData: { ...state.paperData, sectionC: data } })),

    reset: () => set({ currentStep: 1, pdfUrl: null, paperData: defaultPaperData }),

    generatePdf: async () => {
        set({ isLoading: true, pdfUrl: null });

        try {
            const response = await fetch('http://localhost:3001/api/generate-pdf', {
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
