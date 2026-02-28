import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResourceBookletStep } from '../components/ResourceBookletStep';
import { useAppStore } from '../store/useAppStore';

// Switch to Paper 3 before each test so resourceBooklet is defined
beforeEach(() => {
    useAppStore.getState().reset();
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
    useAppStore.setState({ currentStep: 2 });
});

describe('ResourceBookletStep – Rendering', () => {
    it('renders the heading', () => {
        render(<ResourceBookletStep />);
        expect(screen.getByText('Resource Booklet')).toBeInTheDocument();
    });

    it('renders the inquiry topic input', () => {
        render(<ResourceBookletStep />);
        expect(screen.getByPlaceholderText('Enter the inquiry topic...')).toBeInTheDocument();
    });

    it('renders 3 sources by default with their labels', () => {
        render(<ResourceBookletStep />);
        expect(screen.getByDisplayValue('Source 1')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Source 2')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Source 3')).toBeInTheDocument();
    });

    it('shows source count as "3/5 max"', () => {
        render(<ResourceBookletStep />);
        expect(screen.getByText(/3\/5 max/)).toBeInTheDocument();
    });

    it('shows the Add Source button when under the limit', () => {
        render(<ResourceBookletStep />);
        expect(screen.getByRole('button', { name: /add source/i })).toBeInTheDocument();
    });

    it('shows an upload image input per source', () => {
        render(<ResourceBookletStep />);
        const fileInputs = document.querySelectorAll('input[type="file"]');
        expect(fileInputs.length).toBe(3);
    });

    it('shows delete buttons when there are multiple sources', () => {
        render(<ResourceBookletStep />);
        const deleteBtns = screen.getAllByTitle('Remove Source');
        expect(deleteBtns.length).toBe(3);
    });

    it('hides delete button when there is only 1 source', () => {
        // Manually reduce to 1 source
        const { paperData } = useAppStore.getState();
        useAppStore.getState().setResourceBooklet({
            ...paperData.resourceBooklet!,
            sources: [paperData.resourceBooklet!.sources[0]],
        });

        render(<ResourceBookletStep />);
        const deleteBtns = screen.queryAllByTitle('Remove Source');
        expect(deleteBtns.length).toBe(0);
    });
});

describe('ResourceBookletStep – Add Source', () => {
    it('adds a source when Add Source is clicked', () => {
        render(<ResourceBookletStep />);
        const addBtn = screen.getByRole('button', { name: /add source/i });
        fireEvent.click(addBtn);
        expect(screen.getByDisplayValue('Source 4')).toBeInTheDocument();
    });

    it('hides Add Source button when 5 sources exist', () => {
        render(<ResourceBookletStep />);
        const addBtn = () => screen.queryByRole('button', { name: /add source/i });

        // Click 2 more times (start with 3, go to 5)
        fireEvent.click(addBtn()!);
        fireEvent.click(addBtn()!);
        expect(addBtn()).not.toBeInTheDocument();
    });

    it('shows "5/5 max" when at limit', () => {
        render(<ResourceBookletStep />);
        const addBtn = () => screen.queryByRole('button', { name: /add source/i });
        fireEvent.click(addBtn()!);
        fireEvent.click(addBtn()!);
        expect(screen.getByText(/5\/5 max/)).toBeInTheDocument();
    });
});

describe('ResourceBookletStep – Remove Source', () => {
    it('removes a source when delete is clicked', () => {
        render(<ResourceBookletStep />);
        const before = screen.getAllByTitle('Remove Source').length;
        fireEvent.click(screen.getAllByTitle('Remove Source')[0]);
        const after = screen.queryAllByTitle('Remove Source').length;
        expect(after).toBe(before - 1);
    });

    it('re-numbers sources after removal', () => {
        render(<ResourceBookletStep />);
        // Remove the first source
        fireEvent.click(screen.getAllByTitle('Remove Source')[0]);
        // After removal, the remaining two should be titled Source 1 and Source 2
        expect(screen.getByDisplayValue('Source 1')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Source 2')).toBeInTheDocument();
        expect(screen.queryByDisplayValue('Source 3')).not.toBeInTheDocument();
    });
});

describe('ResourceBookletStep – Topic input', () => {
    it('updates the store topic when user types', () => {
        render(<ResourceBookletStep />);
        const input = screen.getByPlaceholderText('Enter the inquiry topic...');
        fireEvent.change(input, { target: { value: 'The role of culture in shaping behavior' } });
        expect(useAppStore.getState().paperData.resourceBooklet?.topic).toBe(
            'The role of culture in shaping behavior'
        );
    });
});

describe('ResourceBookletStep – Navigation', () => {
    it('advances to the next step when nextStep is called', () => {
        const initialStep = useAppStore.getState().currentStep;
        useAppStore.getState().nextStep();
        expect(useAppStore.getState().currentStep).toBe(initialStep + 1);
    });

    it('has a Back button', () => {
        render(<ResourceBookletStep />);
        expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    });
});
