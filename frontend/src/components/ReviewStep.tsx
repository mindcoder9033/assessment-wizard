import { useAppStore } from '../store/useAppStore';

export const ReviewStep = () => {
    const { prevStep, generatePdf, isLoading, pdfUrl } = useAppStore();

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Review & Export</h2>
            <p className="text-gray-600 mb-8">
                Your Paper 1 Exam is fully configured. Click the button below to generate your IB-formatted PDF.
            </p>

            <div className="flex flex-col items-center justify-center space-y-6">
                <button
                    onClick={generatePdf}
                    disabled={isLoading}
                    className={`px-8 py-3 rounded text-white font-semibold text-lg shadow transition ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isLoading ? 'Generating PDF...' : 'Generate Exam Paper (PDF)'}
                </button>

                {pdfUrl && (
                    <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg w-full">
                        <h3 className="text-green-800 font-bold text-lg mb-2">Success!</h3>
                        <p className="text-green-700 mb-4">Your exam paper has been generated.</p>
                        <a
                            href={pdfUrl}
                            download="IB_Psychology_Paper1.pdf"
                            className="inline-block bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700 transition"
                        >
                            Download PDF
                        </a>

                        <div className="mt-6">
                            <iframe src={pdfUrl} className="w-full h-96 border rounded" title="PDF Preview" />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-start pt-4 border-t mt-8">
                <button
                    type="button"
                    onClick={prevStep}
                    className="text-gray-600 px-6 py-2 rounded border hover:bg-gray-100 transition"
                >
                    Back to Editing
                </button>
            </div>
        </div>
    );
};
