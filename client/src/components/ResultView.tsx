import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Question } from '../api';

interface ResultViewProps {
    questions: Question[];
    userAnswers: (string | null)[];
    onRestart: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ questions, userAnswers, onRestart }) => {
    const score = questions.reduce((acc, q, idx) => {
        return acc + (q.answer === userAnswers[idx] ? 1 : 0);
    }, 0);

    const percentage = Math.round((score / questions.length) * 100);

    return (
        <div className="glass-panel p-8 rounded-2xl w-full max-w-2xl animate-fade-in text-center">
            <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 text-glow">
                Quiz Results
            </h2>

            <div className="mb-12 relative inline-block">
                <svg className="w-48 h-48 transform -rotate-90">
                    <circle
                        className="text-gray-700"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="88"
                        cx="96"
                        cy="96"
                    />
                    <circle
                        className="text-blue-500 transition-all duration-1000 ease-out"
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 88}
                        strokeDashoffset={2 * Math.PI * 88 * ((100 - percentage) / 100)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="88"
                        cx="96"
                        cy="96"
                    />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-5xl font-bold text-white block">{percentage}%</span>
                    <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Score</span>
                </div>
            </div>

            <p className="text-xl text-gray-300 mb-8 font-light">
                You scored <span className="font-bold text-white">{score}</span> out of <span className="font-bold text-white">{questions.length}</span>
            </p>

            <div className="space-y-4 mb-8 text-left max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {questions.map((q, idx) => {
                    const userAnswer = userAnswers[idx];
                    const isCorrect = q.answer === userAnswer;

                    return (
                        <div key={idx} className={`p-5 rounded-xl border transition-all ${isCorrect
                            ? 'border-green-500/30 bg-green-500/10'
                            : 'border-red-500/30 bg-red-500/10'
                            }`}>
                            <div className="flex items-start mb-2">
                                <span className="mr-3 mt-1 flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                                    {idx + 1}
                                </span>
                                <div className="font-medium text-lg leading-snug markdown-content flex-grow">
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
                                                        className="rounded-lg text-sm my-2 shadow-inner border border-white/5"
                                                    />
                                                ) : (
                                                    <code {...rest} className="bg-white/10 px-1 py-0.5 rounded text-blue-200 font-mono text-sm">
                                                        {children}
                                                    </code>
                                                )
                                            }
                                        }}
                                    >
                                        {q.question}
                                    </ReactMarkdown>
                                </div>
                            </div>

                            <div className="ml-9 text-sm space-y-1">
                                <p className="flex items-center">
                                    <span className="w-24 text-gray-400 uppercase text-xs font-bold tracking-wider">Your Answer:</span>
                                    <span className={isCorrect ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                                        {userAnswer || "Skipped"}
                                    </span>
                                </p>
                                {!isCorrect && (
                                    <p className="flex items-center">
                                        <span className="w-24 text-gray-400 uppercase text-xs font-bold tracking-wider">Correct:</span>
                                        <span className="text-green-400 font-bold">{q.answer}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={onRestart}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-1"
            >
                Start New Quiz
            </button>
        </div>
    );
};
