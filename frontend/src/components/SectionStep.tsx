import { useAppStore } from '../store/useAppStore';
import type { Question } from '../types/exam';

interface SectionStepProps {
    sectionKey: 'sectionA' | 'sectionB' | 'sectionC';
    isLastStep?: boolean;
}

export const SectionStep = ({ sectionKey, isLastStep }: SectionStepProps) => {
    const section = useAppStore((state) => state.paperData[sectionKey]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateSection = useAppStore((state) => (state as any)[`set${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}`]);
    const nextStep = useAppStore((state) => state.nextStep);
    const prevStep = useAppStore((state) => state.prevStep);

    const handleQuestionChange = (index: number, val: string) => {
        const updatedQuestions = [...section.questions];
        updatedQuestions[index].text = val;
        updateSection({ ...section, questions: updatedQuestions });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{section.title}</h2>
            <p className="text-sm text-gray-500 mb-6">{section.instructions}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {sectionKey === 'sectionB' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Scenario Text</label>
                        <textarea
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={section.scenario || ''}
                            onChange={(e) => updateSection({ ...section, scenario: e.target.value })}
                            placeholder="Enter the scenario details here..."
                        />
                    </div>
                )}
                {section.questions.map((q: Question, i: number) => (
                    <div key={q.id}>
                        {sectionKey === 'sectionC' && i > 0 && (
                            <div className="text-center font-bold text-gray-500 my-4">— OR —</div>
                        )}
                        <div className="p-4 border rounded-md bg-gray-50">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-semibold text-gray-700">Question {q.id}</label>
                                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">[{q.marks} marks]</span>
                            </div>
                            <textarea
                                required
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={q.text}
                                onChange={(e) => handleQuestionChange(i, e.target.value)}
                                placeholder={`Enter the text for question ${q.id}...`}
                            />
                        </div>
                    </div>
                ))}

                <div className="flex justify-between pt-4 border-t mt-8">
                    <button
                        type="button"
                        onClick={prevStep}
                        className="text-gray-600 px-6 py-2 rounded border hover:bg-gray-100 transition"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
                    >
                        {isLastStep ? 'Review & Export' : 'Next Section'}
                    </button>
                </div>
            </form>
        </div>
    );
};
