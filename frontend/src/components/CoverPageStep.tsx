import { useAppStore } from '../store/useAppStore';

export const CoverPageStep = () => {
    const coverPage = useAppStore((state) => state.paperData.coverPage);
    const setCoverPage = useAppStore((state) => state.setCoverPage);
    const nextStep = useAppStore((state) => state.nextStep);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Cover Page Configuration</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">School Name</label>
                    <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={coverPage.schoolName}
                        onChange={(e) => setCoverPage({ ...coverPage, schoolName: e.target.value })}
                        placeholder="e.g. International School of Geneva"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Exam Title</label>
                    <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={coverPage.examTitle}
                        onChange={(e) => setCoverPage({ ...coverPage, examTitle: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={coverPage.examDate}
                            onChange={(e) => setCoverPage({ ...coverPage, examDate: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Session</label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={coverPage.session}
                            onChange={(e) => setCoverPage({ ...coverPage, session: e.target.value as any })}
                        >
                            <option value="Morning">Morning</option>
                            <option value="Afternoon">Afternoon</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Level</label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={coverPage.level}
                            onChange={(e) => setCoverPage({ ...coverPage, level: e.target.value as any })}
                        >
                            <option value="SL">Standard Level (SL)</option>
                            <option value="HL">Higher Level (HL)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-gray-500">Duration (Fixed P1)</label>
                        <input
                            type="number"
                            disabled
                            className="mt-1 block w-full bg-gray-50 rounded-md border-gray-300 border p-2 shadow-sm"
                            value={coverPage.durationMinutes}
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
                    >
                        Next Step
                    </button>
                </div>
            </form>
        </div>
    );
};
