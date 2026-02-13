import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Question } from '../api';

interface QuizCardProps {
    question: Question;
    currentQuestionIndex: number;
    totalQuestions: number;
    selectedOption: string | null;
    onSelectOption: (option: string) => void;
    onNext: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
    question,
    currentQuestionIndex,
    totalQuestions,
    selectedOption,
    onSelectOption,
    onNext
}) => {
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    return (
        <div className="glass-panel p-8 rounded-2xl w-full max-w-2xl animate-fade-in">
            {/* Header with Progress */}
            <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-400 text-sm font-medium">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                    <span className="text-blue-400 text-sm font-bold">{Math.round(progress)}% completed</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="text-2xl font-bold mb-8 text-white leading-relaxed markdown-content">
                <ReactMarkdown
                    components={{
                        code(props) {
                            const { children, className, node, ...rest } = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                                <SyntaxHighlighter
                                    {...rest}
                                    PreTag="div"
                                    children={String(children).replace(/\n$/, '')}
                                    language={match[1]}
                                    style={atomDark}
                                    className="rounded-lg text-sm my-4 shadow-lg border border-gray-700"
                                />
                            ) : (
                                <code {...rest} className="bg-gray-800 px-1 py-0.5 rounded text-blue-300 font-mono text-base">
                                    {children}
                                </code>
                            )
                        }
                    }}
                >
                    {question.question}
                </ReactMarkdown>
            </div>

            <div className="space-y-4 mb-8">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectOption(option)}
                        className={`w-full p-5 text-left rounded-xl border transition-all duration-200 group flex items-center ${selectedOption === option
                            ? 'border-blue-500/50 bg-blue-500/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                            : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20'
                            }`}
                    >
                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${selectedOption === option
                            ? 'border-blue-400 bg-blue-400'
                            : 'border-gray-500 group-hover:border-gray-400'
                            }`}>
                            {selectedOption === option && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="text-lg">{option}</span>
                    </button>
                ))}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={onNext}
                    disabled={!selectedOption}
                    className={`px-8 py-3 rounded-xl font-bold text-lg transition-all transform ${selectedOption
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1'
                        : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
            </div>
        </div>
    );
};
