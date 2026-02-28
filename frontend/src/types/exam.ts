export type Level = 'SL' | 'HL';
export type Session = 'Morning' | 'Afternoon';

export type IBContext =
    | 'Health and well-being'
    | 'Human development'
    | 'Human relationships'
    | 'Learning and cognition';

export type KeyConcept =
    | 'Bias'
    | 'Causality'
    | 'Change'
    | 'Measurement'
    | 'Perspective'
    | 'Responsibility';

export interface Question {
    id: string;
    text: string;
    marks: number;
    context?: IBContext;
    keyConcept?: KeyConcept;
    scenario?: string;
}

export interface SourceData {
    id: string;
    title: string;
    type: 'Quantitative' | 'Qualitative' | 'Mixed';
    content: string;
    imageUrl?: string;
}

export interface ResourceBookletData {
    topic: string;
    sources: SourceData[];
}

export interface CoverPageData {
    schoolName: string;
    schoolLogoUrl?: string;
    examTitle: string;
    paperType: 'Paper 1' | 'Paper 2' | 'Paper 3';
    examDate: string;
    session: Session;
    level: Level;
    durationMinutes: number;
    totalMarks: number;
    standardInstructions: string[];
}
export interface SectionData {
    title: string;
    instructions: string;
    scenario?: string;
    questions: Question[];
}

export interface Paper1Payload {
    coverPage: CoverPageData;
    resourceBooklet?: ResourceBookletData;
    sectionA: SectionData;
    sectionB: SectionData;
    sectionC: SectionData;
}
