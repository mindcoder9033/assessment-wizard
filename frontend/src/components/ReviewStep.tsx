import { useAppStore } from '../store/useAppStore';

export const ReviewStep = () => {
    const { prevStep, generatePdf, isLoading, pdfUrl, paperData } = useAppStore();
    const paperType = paperData.coverPage.paperType || 'Paper 1';

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3 text-white">Review & Export</h2>
                <p className="text-slate-400 text-lg">Your {paperType} Exam is fully configured. Ready to generate the final PDF.</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-8 sm:p-12 rounded-3xl shadow-2xl text-center relative overflow-hidden group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>

                <div className="flex flex-col items-center justify-center space-y-8 relative z-10">
                    <button
                        onClick={generatePdf}
                        disabled={isLoading}
                        className={`px-10 py-5 rounded-2xl text-white font-bold text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 flex items-center justify-center gap-3 ${isLoading ? 'bg-slate-700 cursor-not-allowed text-slate-400 shadow-none border border-slate-600' : 'bg-emerald-500 hover:bg-emerald-400 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]'}`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating Formatting...
                            </>
                        ) : 'Generate Exam Paper (PDF)'}
                    </button>

                    {pdfUrl && (
                        <div className="mt-8 p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl w-full backdrop-blur-md animate-in fade-in duration-500">
                            <h3 className="text-emerald-400 font-bold text-xl mb-2 flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Success!
                            </h3>
                            <p className="text-emerald-100/70 mb-6">Your exam paper has been beautifully formatted.</p>
                            <a
                                href={pdfUrl}
                                download={`IB_Psychology_${paperType.replace(' ', '')}.pdf`}
                                className="inline-flex items-center gap-2 bg-slate-800 text-white border border-emerald-500/30 px-8 py-3.5 rounded-xl font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:bg-slate-700 hover:border-emerald-500/50 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Download PDF
                            </a>

                            <div className="mt-8 rounded-xl overflow-hidden border border-slate-700 shadow-2xl bg-white/5 p-1">
                                <iframe src={pdfUrl} className="w-full h-[600px] border-0 rounded-lg bg-white" title="PDF Preview" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-start pt-8 border-t border-slate-700/50 mt-10 relative z-10">
                    <button
                        type="button"
                        onClick={prevStep}
                        className="text-slate-400 hover:text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all duration-200 flex items-center gap-2 font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Editing
                    </button>
                </div>
            </div>
        </div>
    );
};
