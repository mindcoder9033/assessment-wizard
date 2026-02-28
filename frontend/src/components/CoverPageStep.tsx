import { useAppStore } from '../store/useAppStore';
import type { Level, Session } from '../types/exam';

export const CoverPageStep = () => {
    const coverPage = useAppStore((state) => state.paperData.coverPage);
    const setCoverPage = useAppStore((state) => state.setCoverPage);
    const nextStep = useAppStore((state) => state.nextStep);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        nextStep();
    };

    const formatDuration = (minutes: number) => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const hrStr = hrs > 0 ? `${hrs} hour${hrs > 1 ? 's' : ''}` : '';
        const minStr = mins > 0 ? `${mins} minute${mins > 1 ? 's' : ''}` : '';
        return [hrStr, minStr].filter(Boolean).join(' ');
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3 text-white">Exam Details</h2>
                <p className="text-slate-400 text-lg">Set up the foundations for your upcoming assessment.</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
                {/* Decorative background glow that gently pulses on hover */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-emerald-500/20 group-hover:scale-110"></div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">School Name</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 shadow-inner"
                                value={coverPage.schoolName}
                                onChange={(e) => setCoverPage({ ...coverPage, schoolName: e.target.value })}
                                placeholder="e.g. International School of Geneva"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Exam Title</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 shadow-inner"
                                value={coverPage.examTitle}
                                onChange={(e) => setCoverPage({ ...coverPage, examTitle: e.target.value })}
                                placeholder="e.g. End of Year Assessment"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Date</label>
                            <input
                                type="date"
                                required
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 [color-scheme:dark] shadow-inner"
                                value={coverPage.examDate}
                                onChange={(e) => setCoverPage({ ...coverPage, examDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Session</label>
                            <select
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[position:calc(100%-1rem)_center] bg-no-repeat pr-10 shadow-inner cursor-pointer"
                                value={coverPage.session}
                                onChange={(e) => setCoverPage({ ...coverPage, session: e.target.value as Session })}
                            >
                                <option value="Morning">Morning Session</option>
                                <option value="Afternoon">Afternoon Session</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Paper Type</label>
                            <select
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[position:calc(100%-1rem)_center] bg-no-repeat pr-10 shadow-inner cursor-pointer"
                                value={coverPage.paperType || 'Paper 1'}
                                onChange={(e) => setCoverPage({ ...coverPage, paperType: e.target.value as 'Paper 1' | 'Paper 2' })}
                            >
                                <option value="Paper 1">Paper 1</option>
                                <option value="Paper 2">Paper 2</option>
                                <option value="Paper 3">Paper 3</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Level</label>
                            <select
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[position:calc(100%-1rem)_center] bg-no-repeat pr-10 shadow-inner cursor-pointer"
                                value={coverPage.level}
                                onChange={(e) => setCoverPage({ ...coverPage, level: e.target.value as Level })}
                            >
                                <option value="SL">Standard Level (SL)</option>
                                <option value="HL">Higher Level (HL)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-400 mb-2">Calculated Duration</label>
                            <div className="w-full bg-slate-900/30 border border-slate-700/50 rounded-xl p-4 text-slate-400 font-medium flex items-center h-[54px]">
                                {formatDuration(coverPage.durationMinutes)}
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 mt-6 border-t border-slate-700/50 flex justify-end">
                        <button
                            type="submit"
                            className="bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:bg-emerald-400 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                        >
                            Continue to Sections
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
