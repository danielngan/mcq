import React, { useState } from 'react';

interface QuizFormProps {
    onSubmit: (subject: string, count: number, provider: any) => void;
    isLoading: boolean;
}

export const QuizForm: React.FC<QuizFormProps> = ({ onSubmit, isLoading }) => {
    const [subject, setSubject] = useState('');
    const [count, setCount] = useState(5);
    const [provider, setProvider] = useState('openai');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(subject, count, provider);
    };

    return (
        <div className="glass-panel p-8 rounded-2xl w-full max-w-md animate-fade-in">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 text-glow">
                AI Quiz Generator
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl glass-input"
                        placeholder="e.g. Advanced Calculus, History of Rome..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Questions</label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl glass-input"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">AI Provider</label>
                    <div className="relative">
                        <select
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl glass-input appearance-none cursor-pointer"
                        >
                            <option value="openai" className="bg-slate-800">OpenAI</option>
                            <option value="claude" className="bg-slate-800">Claude</option>
                            <option value="gemini" className="bg-slate-800">Gemini</option>
                            <option value="xai" className="bg-slate-800">xAI</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide shadow-lg transition-all transform hover:-translate-y-1 ${isLoading
                        ? 'bg-gray-600/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/25'
                        }`}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Generating...</span>
                        </div>
                    ) : (
                        'Start Quiz'
                    )}
                </button>
            </form>
        </div>
    );
};
