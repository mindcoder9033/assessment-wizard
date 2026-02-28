import { useAppStore } from './store/useAppStore';
import { CoverPageStep } from './components/CoverPageStep';
import { SectionStep } from './components/SectionStep';
import { ReviewStep } from './components/ReviewStep';

function App() {
  const currentStep = useAppStore((state) => state.currentStep);
  const paperData = useAppStore((state) => state.paperData);
  const saveExam = useAppStore((state) => state.saveExam);
  const loadExam = useAppStore((state) => state.loadExam);
  const setStep = useAppStore((state) => state.setStep);

  const isPaper2 = paperData.coverPage.paperType === 'Paper 2';

  const handleSaveDraft = async () => {
    await saveExam('preview-draft-1');
  };

  const handleLoadDraft = async () => {
    await loadExam('preview-draft-1');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CoverPageStep />;
      case 2:
        return <SectionStep sectionKey="sectionA" />;
      case 3:
        return <SectionStep sectionKey="sectionB" isLastStep={isPaper2} />;
      case 4:
        if (isPaper2) return <ReviewStep />;
        return <SectionStep sectionKey="sectionC" isLastStep />;
      case 5:
        if (isPaper2) return <CoverPageStep />; // Fallback
        return <ReviewStep />;
      default:
        return <CoverPageStep />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12 selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
              Assessment<span className="text-emerald-400">Wizard</span>
            </h1>
            <p className="text-lg text-slate-400 font-medium">IB Psychology Exam Generator</p>
          </div>

          {/* Persistence Controls */}
          <div className="flex gap-4">
            <button
              onClick={handleLoadDraft}
              className="px-5 py-2.5 bg-slate-800/80 border border-slate-700 text-slate-300 rounded-xl hover:bg-slate-700 hover:text-white hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-emerald-500 font-medium text-sm transition-all duration-200"
            >
              Load Draft
            </button>
            <button
              onClick={handleSaveDraft}
              className="px-5 py-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 hover:border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-emerald-500 font-medium text-sm transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]"
            >
              Save Draft
            </button>
          </div>
        </div>

        {/* Top Progress Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex justify-between text-sm text-slate-500 font-semibold px-2 cursor-pointer mb-4">
            <span onClick={() => setStep(1)} className={currentStep >= 1 ? 'text-emerald-400 transition-colors' : 'hover:text-slate-300 transition-colors'}>Start</span>
            <span onClick={() => setStep(2)} className={currentStep >= 2 ? 'text-emerald-400 transition-colors' : 'hover:text-slate-300 transition-colors'}>Section A</span>
            <span onClick={() => setStep(3)} className={currentStep >= 3 ? 'text-emerald-400 transition-colors' : 'hover:text-slate-300 transition-colors'}>Section B</span>
            {!isPaper2 && (
              <span onClick={() => setStep(4)} className={currentStep >= 4 ? 'text-emerald-400 transition-colors' : 'hover:text-slate-300 transition-colors'}>Section C</span>
            )}
            <span onClick={() => setStep(isPaper2 ? 4 : 5)} className={currentStep >= (isPaper2 ? 4 : 5) ? 'text-emerald-400 transition-colors' : 'hover:text-slate-300 transition-colors'}>Review</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(currentStep / (isPaper2 ? 4 : 5)) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Content */}
        {renderStep()}

      </div>
    </div>
  );
}

export default App;
