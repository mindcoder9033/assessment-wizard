import { useAppStore } from './store/useAppStore';
import { CoverPageStep } from './components/CoverPageStep';
import { SectionStep } from './components/SectionStep';
import { ReviewStep } from './components/ReviewStep';

function App() {
  const currentStep = useAppStore((state) => state.currentStep);
  const saveExam = useAppStore((state) => state.saveExam);
  const loadExam = useAppStore((state) => state.loadExam);
  const setStep = useAppStore((state) => state.setStep);

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
        return <SectionStep sectionKey="sectionB" />;
      case 4:
        return <SectionStep sectionKey="sectionC" isLastStep />;
      case 5:
        return <ReviewStep />;
      default:
        return <CoverPageStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Assessment Wizard</h1>
            <p className="text-xl text-gray-600">IB Psychology Paper 1 Generator</p>
          </div>

          {/* Persistence Controls */}
          <div className="flex gap-4">
            <button
              onClick={handleLoadDraft}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium text-sm transition-colors"
            >
              Load Draft
            </button>
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-md shadow-sm hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium text-sm transition-colors"
            >
              Save Draft
            </button>
          </div>
        </div>

        {/* Top Progress Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex justify-between text-sm text-gray-500 font-medium px-2 cursor-pointer">
            <span onClick={() => setStep(1)} className={currentStep >= 1 ? 'text-blue-600 hover:underline' : 'hover:underline'}>Cover</span>
            <span onClick={() => setStep(2)} className={currentStep >= 2 ? 'text-blue-600 hover:underline' : 'hover:underline'}>Section A</span>
            <span onClick={() => setStep(3)} className={currentStep >= 3 ? 'text-blue-600 hover:underline' : 'hover:underline'}>Section B</span>
            <span onClick={() => setStep(4)} className={currentStep >= 4 ? 'text-blue-600 hover:underline' : 'hover:underline'}>Section C</span>
            <span onClick={() => setStep(5)} className={currentStep >= 5 ? 'text-blue-600 hover:underline' : 'hover:underline'}>Export</span>
          </div>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / 5) * 100}%` }}
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
