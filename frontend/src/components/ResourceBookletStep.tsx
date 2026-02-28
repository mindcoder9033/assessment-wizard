import { useAppStore } from '../store/useAppStore';
import type { SourceData } from '../types/exam';

const SOURCE_TYPES = ['Quantitative', 'Qualitative', 'Mixed'] as const;

export const ResourceBookletStep = () => {
    const resourceBooklet = useAppStore((state) => state.paperData.resourceBooklet);
    const setResourceBooklet = useAppStore((state) => state.setResourceBooklet);
    const nextStep = useAppStore((state) => state.nextStep);
    const prevStep = useAppStore((state) => state.prevStep);

    if (!resourceBooklet) return null;

    const handleTopicChange = (val: string) => {
        setResourceBooklet({ ...resourceBooklet, topic: val });
    };

    const handleSourceChange = (index: number, field: keyof SourceData, val: string) => {
        const updatedSources = [...resourceBooklet.sources];
        updatedSources[index] = { ...updatedSources[index], [field]: val };
        setResourceBooklet({ ...resourceBooklet, sources: updatedSources });
    };

    const addSource = () => {
        if (resourceBooklet.sources.length >= 5) return;
        const newId = (resourceBooklet.sources.length + 1).toString();
        setResourceBooklet({
            ...resourceBooklet,
            sources: [
                ...resourceBooklet.sources,
                { id: newId, title: `Source ${newId}`, type: 'Quantitative', content: '' }
            ]
        });
    };

    const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleSourceChange(index, 'imageUrl', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeSource = (index: number) => {
        const updatedSources = resourceBooklet.sources.filter((_, i) => i !== index);
        // Re-number sources
        updatedSources.forEach((source, i) => {
            source.id = (i + 1).toString();
            source.title = `Source ${i + 1}`;
        });
        setResourceBooklet({ ...resourceBooklet, sources: updatedSources });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3 text-white">Resource Booklet</h2>
                <p className="text-slate-400 text-lg">Define the inquiry topic and provide the research sources for Paper 3.</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none transition-all duration-1000 group-hover:bg-emerald-500/10"></div>

                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                    <div className="mb-8 p-6 sm:p-8 border border-emerald-500/30 rounded-2xl bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full blur-2xl pointer-events-none"></div>
                        <label className="block text-xl font-bold text-emerald-400 mb-2 tracking-tight">HL EXTENSION INQUIRY TOPIC</label>
                        <p className="text-sm font-medium text-emerald-200/70 mb-5 border-l-2 border-emerald-500/50 pl-4">e.g., The role of culture in shaping behavior / The role of motivation in shaping behavior / The role of technology in shaping behavior</p>
                        <input
                            required
                            type="text"
                            className="w-full bg-slate-900/80 border border-slate-700 rounded-xl p-4 text-slate-300 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 shadow-inner placeholder-slate-600"
                            value={resourceBooklet.topic}
                            onChange={(e) => handleTopicChange(e.target.value)}
                            placeholder="Enter the inquiry topic..."
                        />
                    </div>

                    <div className="flex justify-between items-center border-b border-slate-700/50 pb-4">
                        <h3 className="text-2xl font-bold text-white">Research Sources <span className="text-sm font-normal text-slate-400 ml-2">({resourceBooklet.sources.length}/5 max)</span></h3>
                        {resourceBooklet.sources.length < 5 && (
                            <button
                                type="button"
                                onClick={addSource}
                                className="text-sm bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Source
                            </button>
                        )}
                    </div>

                    <div className="space-y-8">
                        {resourceBooklet.sources.map((source, index) => (
                            <div key={index} className="p-6 sm:p-8 border border-slate-700/50 rounded-2xl bg-slate-900/40 shadow-inner transition-all duration-300 hover:bg-slate-900/60 hover:border-emerald-500/30 relative mt-4">
                                {resourceBooklet.sources.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeSource(index)}
                                        className="absolute top-4 right-4 text-rose-500 hover:text-white bg-rose-500/10 hover:bg-rose-500 p-2 rounded-lg transition-all duration-200 border border-rose-500/20 shadow-sm outline-none"
                                        title="Remove Source"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}

                                <div className="flex flex-col md:flex-row gap-6 mb-6">
                                    <div className="flex-1">
                                        <label className="block text-sm font-semibold text-slate-300 mb-2">Title</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 shadow-inner placeholder-slate-600"
                                            value={source.title}
                                            onChange={(e) => handleSourceChange(index, 'title', e.target.value)}
                                            placeholder="e.g., Source 1"
                                        />
                                    </div>
                                    <div className="md:w-1/3">
                                        <label className="block text-sm font-semibold text-slate-300 mb-2">Type</label>
                                        <select
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[position:calc(100%-1rem)_center] bg-no-repeat pr-10 shadow-inner cursor-pointer"
                                            value={source.type}
                                            onChange={(e) => handleSourceChange(index, 'type', e.target.value)}
                                            required
                                        >
                                            <option value="" disabled className="bg-slate-800">Select Type...</option>
                                            {SOURCE_TYPES.map(t => <option key={t} value={t} className="bg-slate-800">{t}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-emerald-400 mb-2">Source Content</label>
                                    <textarea
                                        required
                                        rows={6}
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 shadow-inner placeholder-slate-600 resize-y mb-4"
                                        value={source.content}
                                        onChange={(e) => handleSourceChange(index, 'content', e.target.value)}
                                        placeholder={`Enter the research data/text for ${source.title}...`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-emerald-400 mb-2">Upload Image (Optional)</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(index, e)}
                                            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 transition-all duration-200"
                                        />
                                        {source.imageUrl && (
                                            <button
                                                type="button"
                                                onClick={() => handleSourceChange(index, 'imageUrl', '')}
                                                className="text-xs text-rose-400 hover:text-rose-300 underline"
                                            >
                                                Remove Image
                                            </button>
                                        )}
                                    </div>
                                    {source.imageUrl && (
                                        <div className="mt-4 border border-slate-700/50 rounded-xl p-2 bg-slate-900/60 inline-block">
                                            <img src={source.imageUrl} alt={`${source.title} uploaded`} className="max-h-48 object-contain rounded-lg" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

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
                            Next Section
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
