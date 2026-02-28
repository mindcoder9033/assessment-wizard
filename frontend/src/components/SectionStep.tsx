import { useAppStore } from '../store/useAppStore';
import type { Question, IBContext, KeyConcept } from '../types/exam';

const IB_CONTEXTS: IBContext[] = [
    'Health and well-being',
    'Human development',
    'Human relationships',
    'Learning and cognition'
];

const KEY_CONCEPTS: KeyConcept[] = [
    'Bias',
    'Causality',
    'Change',
    'Measurement',
    'Perspective',
    'Responsibility'
];

interface SectionStepProps {
    sectionKey: 'sectionA' | 'sectionB' | 'sectionC';
    isLastStep?: boolean;
}

export const SectionStep = ({ sectionKey, isLastStep }: SectionStepProps) => {
    const section = useAppStore((state) => state.paperData[sectionKey]);
    const paperType = useAppStore((state) => state.paperData.coverPage.paperType);
    const isPaper2 = paperType === 'Paper 2';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateSection = useAppStore((state) => (state as any)[`set${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}`]);
    const nextStep = useAppStore((state) => state.nextStep);
    const prevStep = useAppStore((state) => state.prevStep);

    const handleQuestionChange = (index: number, val: string) => {
        const updatedQuestions = [...section.questions];
        updatedQuestions[index].text = val;
        updateSection({ ...section, questions: updatedQuestions });
    };

    const handleContextChange = (index: number, val: string) => {
        const updatedQuestions = [...section.questions];
        updatedQuestions[index].context = val as IBContext;
        updateSection({ ...section, questions: updatedQuestions });
    };

    const handleConceptChange = (index: number, val: string) => {
        const updatedQuestions = [...section.questions];
        updatedQuestions[index].keyConcept = val as KeyConcept;
        updateSection({ ...section, questions: updatedQuestions });
    };

    const handleScenarioChange = (index: number, val: string) => {
        const updatedQuestions = [...section.questions];
        updatedQuestions[index].scenario = val;
        updateSection({ ...section, questions: updatedQuestions });
    };

    const handleSectionScenarioChange = (val: string) => {
        updateSection({ ...section, scenario: val });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3 text-white">{section.title}</h2>
                <p className="text-slate-400 text-lg">{section.instructions}</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
                {/* Decorative background glow */}
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none transition-all duration-1000 group-hover:bg-emerald-500/10"></div>

                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                    {sectionKey === 'sectionB' && isPaper2 && (
                        <div className="mb-8 p-6 sm:p-8 border border-emerald-500/30 rounded-2xl bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full blur-2xl pointer-events-none"></div>
                            <label className="block text-xl font-bold text-emerald-400 mb-2 tracking-tight">UNSEEN STUDY (SCENARIO)</label>
                            <p className="text-sm font-medium text-emerald-200/70 mb-5 border-l-2 border-emerald-500/50 pl-4">Provide the full text of the unseen research study here. This will be printed at the start of Section B.</p>
                            <textarea
                                rows={8}
                                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl p-4 text-slate-300 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 shadow-inner placeholder-slate-600 resize-y"
                                value={section.scenario || ''}
                                onChange={(e) => handleSectionScenarioChange(e.target.value)}
                                placeholder="Enter the full unseen study here..."
                            />
                        </div>
                    )}

                    {section.questions.map((q: Question, i: number) => (
                        <div key={q.id} className="relative">
                            {sectionKey === 'sectionC' && i > 0 && (
                                <div className="text-center font-bold text-slate-600 my-8 flex items-center justify-center gap-4">
                                    <div className="h-px bg-slate-700/50 flex-1"></div>
                                    <span className="text-sm tracking-widest uppercase">OR</span>
                                    <div className="h-px bg-slate-700/50 flex-1"></div>
                                </div>
                            )}
                            <div className="p-6 sm:p-8 border border-slate-700/50 rounded-2xl bg-slate-900/40 shadow-inner transition-all duration-300 hover:bg-slate-900/60 hover:border-emerald-500/30">
                                <div className="flex justify-between items-center mb-6">
                                    <label className="block text-lg font-bold text-white">Question {q.id}</label>
                                    <span className="text-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-semibold">[{q.marks} marks]</span>
                                </div>

                                {sectionKey === 'sectionB' && !isPaper2 && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-slate-300 mb-2">Scenario Text</label>
                                        <textarea
                                            rows={4}
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-300 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 shadow-inner placeholder-slate-600 resize-y"
                                            value={q.scenario || ''}
                                            onChange={(e) => handleScenarioChange(i, e.target.value)}
                                            placeholder={`Enter the scenario for question ${q.id}...`}
                                        />
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(sectionKey === 'sectionB' || sectionKey === 'sectionC') && (
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-300 mb-2">Context</label>
                                            <select
                                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[position:calc(100%-1rem)_center] bg-no-repeat pr-10 shadow-inner cursor-pointer"
                                                value={q.context || ''}
                                                onChange={(e) => handleContextChange(i, e.target.value)}
                                                required
                                            >
                                                <option value="" disabled className="bg-slate-800">Select Context...</option>
                                                {IB_CONTEXTS.map(c => <option key={c} value={c} className="bg-slate-800">{c}</option>)}
                                            </select>
                                        </div>
                                    )}

                                    {sectionKey === 'sectionC' && (
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-300 mb-2">Key Concept</label>
                                            <select
                                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[position:calc(100%-1rem)_center] bg-no-repeat pr-10 shadow-inner cursor-pointer"
                                                value={q.keyConcept || ''}
                                                onChange={(e) => handleConceptChange(i, e.target.value)}
                                                required
                                            >
                                                <option value="" disabled className="bg-slate-800">Select Key Concept...</option>
                                                {KEY_CONCEPTS.map(c => <option key={c} value={c} className="bg-slate-800">{c}</option>)}
                                            </select>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-semibold text-emerald-400 mb-2">Question Text</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 shadow-inner placeholder-slate-600 resize-y"
                                        value={q.text}
                                        onChange={(e) => handleQuestionChange(i, e.target.value)}
                                        placeholder={`Enter the text for question ${q.id}...`}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center pt-8 border-t border-slate-700/50 mt-8">
                        <button
                            type="button"
                            onClick={prevStep}
                            className="text-slate-400 hover:text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all duration-200 flex items-center gap-2 font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Back
                        </button>
                        <button
                            type="submit"
                            className="bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:bg-emerald-400 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                        >
                            {isLastStep ? 'Review & Export' : 'Next Section'}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
