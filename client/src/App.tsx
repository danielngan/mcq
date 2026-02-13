import { useState } from 'react';
import { QuizForm } from './components/QuizForm';
import { QuizCard } from './components/QuizCard';
import { ResultView } from './components/ResultView';
import { generateQuestions } from './api';
import type { Question } from './api';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'input' | 'quiz' | 'result'>('input');

  const handleFormSubmit = async (subject: string, count: number, provider: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedQuestions = await generateQuestions({ subject, count, provider });
      setQuestions(generatedQuestions);
      setUserAnswers(new Array(generatedQuestions.length).fill(null));
      setCurrentQuestionIndex(0);
      setGameState('quiz');
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState('result');
    }
  };

  const handleRestart = () => {
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setError(null);
    setGameState('input');
  };

  return (
    <div className="min-h-screen text-gray-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px] animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg backdrop-blur-sm animate-fade-in z-10">
          {error}
        </div>
      )}

      <div className="z-10 w-full max-w-4xl flex flex-col items-center">
        {gameState === 'input' && (
          <QuizForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        )}

        {gameState === 'quiz' && questions.length > 0 && (
          <QuizCard
            question={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            selectedOption={userAnswers[currentQuestionIndex]}
            onSelectOption={handleOptionSelect}
            onNext={handleNextQuestion}
          />
        )}

        {gameState === 'result' && (
          <ResultView
            questions={questions}
            userAnswers={userAnswers}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

export default App;
