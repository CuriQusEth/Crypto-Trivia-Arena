import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Timer, Zap, Flame } from 'lucide-react';
import { cn } from '../lib/utils';

export function ArenaScreen() {
  const { 
    questions, currentQuestionIndex, timeRemaining, 
    score, multiplier, streak,
    answerQuestion, tickTimer 
  } = useGameStore();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = questions[currentQuestionIndex];

  // Timer loop
  useEffect(() => {
    if (showResult) return;
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [tickTimer, showResult]);

  const handleSelect = (index: number) => {
    if (showResult) return; // Prevent double clicking
    setSelectedAnswer(index);
    setShowResult(true);
    
    // Provide haptic feedback if available (mobile vibe)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      if (index === question.correctAnswerIndex) {
        navigator.vibrate([50, 50, 50]); // Happy vibration
      } else {
        navigator.vibrate(200); // Thud
      }
    }

    answerQuestion(index === question.correctAnswerIndex);
  };

  // Reset local state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
  }, [currentQuestionIndex]);

  if (!question) return null;

  return (
    <div className="w-full h-full flex flex-col bg-[#050511] font-sans relative">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/50 backdrop-blur pb-4">
        <div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Score</p>
          <p className="text-2xl font-display font-bold font-mono">{score.toLocaleString()}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Flame className="w-3 h-3 text-orange-500" /> Streak</p>
            <p className={cn("text-xl font-bold font-mono", streak > 2 ? 'text-orange-500 drop-shadow-[0_0_8px_orange]' : 'text-white')}>{streak}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-400" /> Multi</p>
            <p className="text-xl font-bold font-mono text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">{multiplier}x</p>
          </div>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="w-full h-1 bg-white/10">
        <motion.div 
          className={cn("h-full", timeRemaining <= 5 ? "bg-red-500" : "bg-[var(--color-crypto-green)]")}
          initial={{ width: "100%" }}
          animate={{ width: `${(timeRemaining / 15) * 100}%` }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col p-6"
        >
          <div className="flex items-center justify-between mb-8 mt-4">
            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/30">
              {question.category}
            </span>
            <span className="flex items-center gap-1 text-gray-400 font-mono font-bold">
              <Timer className="w-4 h-4" /> 00:{timeRemaining.toString().padStart(2, '0')}
            </span>
          </div>

          <h2 className="text-3xl font-display font-medium leading-tight mb-10 text-white">
            {question.text}
          </h2>

          <div className="flex flex-col gap-3 mt-auto">
            {question.options.map((opt, index) => {
              let btnClass = "bg-[#13132B] border-white/10 hover:border-blue-500/50 hover:bg-[#1a1a3a]";
              
              if (showResult) {
                if (index === question.correctAnswerIndex) {
                  btnClass = "bg-green-600 border-green-400 shadow-[0_0_15px_rgba(22,163,74,0.5)]";
                } else if (index === selectedAnswer) {
                  btnClass = "bg-red-600 border-red-400 opacity-80";
                } else {
                  btnClass = "bg-[#13132B] border-white/5 opacity-40";
                }
              }

              return (
                <motion.button
                  whileHover={!showResult ? { scale: 1.02 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showResult}
                  className={cn(
                    "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group text-lg font-medium",
                    btnClass
                  )}
                >
                  <span>{opt}</span>
                  {!showResult && (
                    <div className="w-6 h-6 rounded-full border border-white/20 group-hover:border-blue-500 transition-colors flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
