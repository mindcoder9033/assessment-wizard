import { useAppStore } from './store/useAppStore';
import { CoverPageStep } from './components/CoverPageStep';
import { SectionStep } from './components/SectionStep';
import { ReviewStep } from './components/ReviewStep';

function App() {
  const currentStep = useAppStore((state) => state.currentStep);

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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Assessment Wizard</h1>
          <p className="text-xl text-gray-600">IB Psychology Paper 1 Generator</p>
        </div>

        {/* Top Progress Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex justify-between text-sm text-gray-500 font-medium px-2">
            <span className={currentStep >= 1 ? 'text-blue-600' : ''}>Cover</span>
            <span className={currentStep >= 2 ? 'text-blue-600' : ''}>Section A</span>
            <span className={currentStep >= 3 ? 'text-blue-600' : ''}>Section B</span>
            <span className={currentStep >= 4 ? 'text-blue-600' : ''}>Section C</span>
            <span className={currentStep >= 5 ? 'text-blue-600' : ''}>Export</span>
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
