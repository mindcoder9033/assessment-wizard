import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../store/useAppStore';

// Reset the store before each test
beforeEach(() => {
    useAppStore.getState().reset();
});

describe('useAppStore – Paper Type Switching', () => {
    it('defaults to Paper 1 on reset', () => {
        const state = useAppStore.getState();
        expect(state.paperData.coverPage.paperType).toBe('Paper 1');
    });

    it('switches to Paper 3 defaults when Paper 3 is selected', () => {
        const { setCoverPage } = useAppStore.getState();
        setCoverPage({
            schoolName: 'Test School',
            examTitle: 'Psychology',
            paperType: 'Paper 3',
            examDate: '2026-05-01',
            session: 'Morning',
            level: 'HL',
            durationMinutes: 105,
            totalMarks: 30,
            standardInstructions: [],
        });
        const state = useAppStore.getState();
        expect(state.paperData.coverPage.paperType).toBe('Paper 3');
        expect(state.paperData.coverPage.totalMarks).toBe(30);
        expect(state.paperData.coverPage.durationMinutes).toBe(105);
        expect(state.paperData.resourceBooklet).toBeDefined();
    });

    it('loads Paper 3 with 3 default sources', () => {
        const { setCoverPage } = useAppStore.getState();
        setCoverPage({
            schoolName: '',
            examTitle: '',
            paperType: 'Paper 3',
            examDate: '',
            session: 'Morning',
            level: 'HL',
            durationMinutes: 105,
            totalMarks: 30,
            standardInstructions: [],
        });
        const { resourceBooklet } = useAppStore.getState().paperData;
        expect(resourceBooklet?.sources).toHaveLength(3);
        expect(resourceBooklet?.sources[0].title).toBe('Source 1');
    });
});

describe('useAppStore – Resource Booklet Actions', () => {
    beforeEach(() => {
        // Switch to Paper 3 first
        useAppStore.getState().setCoverPage({
            schoolName: '',
            examTitle: '',
            paperType: 'Paper 3',
            examDate: '',
            session: 'Morning',
            level: 'HL',
            durationMinutes: 105,
            totalMarks: 30,
            standardInstructions: [],
        });
    });

    it('setResourceBooklet updates topic', () => {
        const { setResourceBooklet, paperData } = useAppStore.getState();
        const current = paperData.resourceBooklet!;
        setResourceBooklet({ ...current, topic: 'The role of technology in shaping behavior' });
        expect(useAppStore.getState().paperData.resourceBooklet?.topic).toBe(
            'The role of technology in shaping behavior'
        );
    });

    it('setResourceBooklet updates a specific source content', () => {
        const { setResourceBooklet, paperData } = useAppStore.getState();
        const current = paperData.resourceBooklet!;
        const updated = {
            ...current,
            sources: current.sources.map((s, i) =>
                i === 1 ? { ...s, content: 'Graph A shows correlation.' } : s
            ),
        };
        setResourceBooklet(updated);
        expect(useAppStore.getState().paperData.resourceBooklet?.sources[1].content).toBe(
            'Graph A shows correlation.'
        );
    });
});

describe('useAppStore – Step Navigation for Paper 3', () => {
    beforeEach(() => {
        useAppStore.getState().setCoverPage({
            schoolName: '',
            examTitle: '',
            paperType: 'Paper 3',
            examDate: '',
            session: 'Morning',
            level: 'HL',
            durationMinutes: 105,
            totalMarks: 30,
            standardInstructions: [],
        });
        // Reset step to 1
        useAppStore.setState({ currentStep: 1 });
    });

    it('max step for Paper 3 is 6', () => {
        const { setStep } = useAppStore.getState();
        setStep(100); // try to exceed max
        expect(useAppStore.getState().currentStep).toBe(6);
    });

    it('nextStep advances from 1 to 2', () => {
        const { nextStep } = useAppStore.getState();
        nextStep();
        expect(useAppStore.getState().currentStep).toBe(2);
    });

    it('nextStep does not exceed step 6', () => {
        useAppStore.setState({ currentStep: 6 });
        useAppStore.getState().nextStep();
        expect(useAppStore.getState().currentStep).toBe(6);
    });

    it('prevStep does not go below step 1', () => {
        useAppStore.setState({ currentStep: 1 });
        useAppStore.getState().prevStep();
        expect(useAppStore.getState().currentStep).toBe(1);
    });
});

describe('useAppStore – Step Navigation for Paper 2', () => {
    beforeEach(() => {
        useAppStore.getState().setCoverPage({
            schoolName: '',
            examTitle: '',
            paperType: 'Paper 2',
            examDate: '',
            session: 'Morning',
            level: 'HL',
            durationMinutes: 90,
            totalMarks: 35,
            standardInstructions: [],
        });
        useAppStore.setState({ currentStep: 1 });
    });

    it('max step for Paper 2 is 4', () => {
        useAppStore.getState().setStep(100);
        expect(useAppStore.getState().currentStep).toBe(4);
    });
});

describe('useAppStore – Step Navigation for Paper 1', () => {
    beforeEach(() => {
        useAppStore.getState().reset();
        useAppStore.setState({ currentStep: 1 });
    });

    it('max step for Paper 1 is 5', () => {
        useAppStore.getState().setStep(100);
        expect(useAppStore.getState().currentStep).toBe(5);
    });
});
