import { create } from 'zustand';
import { Question, getRandomQuestions } from '../lib/questions';

export type ScreenState = 'TITLE' | 'LOBBY' | 'ARENA' | 'GAMEOVER';

interface GameState {
  currentScreen: ScreenState;
  score: number;
  multiplier: number;
  streak: number;
  maxStreak: number;
  questions: Question[];
  currentQuestionIndex: number;
  timeRemaining: number;
  
  // Actions
  setScreen: (screen: ScreenState) => void;
  startGame: () => void;
  answerQuestion: (isCorrect: boolean) => void;
  tickTimer: () => void;
  resetGame: () => void;
}

const INITIAL_TIME = 15;
const MAX_QUESTIONS = 5;

export const useGameStore = create<GameState>((set, get) => ({
  currentScreen: 'TITLE',
  score: 0,
  multiplier: 1,
  streak: 0,
  maxStreak: 0,
  questions: [],
  currentQuestionIndex: 0,
  timeRemaining: INITIAL_TIME,

  setScreen: (screen) => set({ currentScreen: screen }),
  
  startGame: () => {
    set({
      currentScreen: 'ARENA',
      score: 0,
      multiplier: 1,
      streak: 0,
      maxStreak: 0,
      questions: getRandomQuestions(MAX_QUESTIONS),
      currentQuestionIndex: 0,
      timeRemaining: INITIAL_TIME,
    });
  },

  answerQuestion: (isCorrect) => {
    const state = get();
    
    if (isCorrect) {
      // Calculate sequence
      const newStreak = state.streak + 1;
      const newMaxStreak = Math.max(state.maxStreak, newStreak);
      const newMultiplier = Math.min(newStreak, 10); // Cap multiplier at 10x
      const pointsEarned = 100 * newMultiplier + (state.timeRemaining * 10);
      
      set({
        score: state.score + pointsEarned,
        streak: newStreak,
        maxStreak: newMaxStreak,
        multiplier: newMultiplier,
      });
    } else {
      // Break streak
      set({
        streak: 0,
        multiplier: 1,
      });
    }

    // Move to next question or end game
    setTimeout(() => {
      const nextIndex = get().currentQuestionIndex + 1;
      if (nextIndex >= state.questions.length) {
        set({ currentScreen: 'GAMEOVER' });
      } else {
        set({ currentQuestionIndex: nextIndex, timeRemaining: INITIAL_TIME });
      }
    }, 1200); // 1.2s delay to show correct/incorrect feedback
  },

  tickTimer: () => {
    const state = get();
    if (state.currentScreen !== 'ARENA') return;
    
    if (state.timeRemaining > 0) {
      set({ timeRemaining: state.timeRemaining - 1 });
    } else {
      // Time up counts as wrong answer
      state.answerQuestion(false);
    }
  },

  resetGame: () => {
    set({
      currentScreen: 'LOBBY',
      score: 0,
      multiplier: 1,
      streak: 0,
      maxStreak: 0,
    });
  }
}));
