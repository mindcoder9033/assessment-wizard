export type Level = 'SL' | 'HL';
export type Session = 'Morning' | 'Afternoon';

export interface Question {
    id: string;
    text: string;
    marks: number;
}

export interface CoverPageData {
    schoolName: string;
    schoolLogoUrl?: string;
    examTitle: string;
    examDate: string;
    session: Session;
    level: Level;
    durationMinutes: number;
    totalMarks: number;
    standardInstructions: string[];
    customInstructions?: string;
}

export interface SectionData {
    title: string;
    instructions: string;
    scenario?: string;
    questions: Question[];
}

export interface Paper1Payload {
    coverPage: CoverPageData;
    sectionA: SectionData;
    sectionB: SectionData;
    sectionC: SectionData;
}
