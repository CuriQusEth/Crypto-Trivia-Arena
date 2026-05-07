import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, UploadCloud } from 'lucide-react';
import { useAccount, useSignMessage } from 'wagmi';

export function GameOverScreen() {
  const { score, maxStreak, resetGame } = useGameStore();
  const { isConnected, address } = useAccount();
  const { signMessage, isPending, isSuccess } = useSignMessage();
  const [signedRecord, setSignedRecord] = useState(false);

  useEffect(() => {
    // Trigger confetti on load if score is decent
    if (score > 500) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#0052ff', '#f7931a', '#00ff7f']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#0052ff', '#f7931a', '#00ff7f']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [score]);

  const handleSignScore = () => {
    if (!isConnected || !address) {
      alert("Please connect your wallet first in the Title screen.");
      return;
    }
    signMessage(
      { 
        account: address as `0x${string}`,
        message: `Crypto Trivia Arena\nScore: ${score}\nMax Streak: ${maxStreak}\n\nSign to record on leaderboards.` 
      },
      {
        onSuccess: () => setSignedRecord(true)
      }
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-full flex flex-col items-center justify-center bg-[#050511] p-6 relative overflow-hidden"
    >
      <div className="absolute top-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />
      
      <motion.div 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="z-10 bg-[#13132B] p-8 rounded-3xl border border-white/10 w-full max-w-sm text-center shadow-2xl relative"
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-500 w-20 h-20 rounded-full flex items-center justify-center border-4 border-[#050511] shadow-[0_0_20px_rgba(234,179,8,0.5)]">
          <Trophy className="text-white w-10 h-10" />
        </div>

        <h2 className="text-2xl font-display font-bold mt-8 text-white">ARENA FINISHED</h2>
        
        <div className="mt-8 mb-8 space-y-2">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Final Score</p>
          <p className="text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
            {score.toLocaleString()}
          </p>
        </div>

        <div className="flex justify-around border-t border-white/5 pt-6 mb-8">
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase">Max Streak</p>
            <p className="text-xl font-bold font-mono text-orange-400 mt-1">{maxStreak}x</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase">Rank</p>
            <p className="text-xl font-bold font-display text-blue-400 mt-1">
              {score > 3000 ? 'Diamond' : score > 1500 ? 'Gold' : score > 500 ? 'Silver' : 'Bronze'}
            </p>
          </div>
        </div>

        {(isPending || isSuccess || signedRecord) ? (
          <div className="w-full py-4 rounded-xl font-bold text-sm bg-green-500/10 text-green-400 border border-green-500/30 flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4" /> {signedRecord ? 'Score Logged On-Chain!' : 'Signing...'}
          </div>
        ) : (
          <button
            onClick={handleSignScore}
            className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-[#0052ff] hover:bg-[#0040db] text-white transition-colors flex items-center justify-center gap-2 mb-3"
          >
            <UploadCloud className="w-4 h-4" /> Record Run On-Chain
          </button>
        )}

      </motion.div>

      <button
        onClick={resetGame}
        className="mt-8 text-gray-400 hover:text-white flex items-center gap-2 font-bold tracking-wider uppercase text-sm transition-colors"
      >
        <RefreshCw className="w-4 h-4" /> Return to Lobby
      </button>

    </motion.div>
  );
}
