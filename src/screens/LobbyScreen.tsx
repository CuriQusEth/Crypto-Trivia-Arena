import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { useAccount, useSendTransaction } from 'wagmi';
import { Brain, Trophy, Zap, MessageSquare } from 'lucide-react';
import { parseEther, toHex } from 'viem';
import { getAttributionData } from '../lib/erc8021/attribution';

export function LobbyScreen() {
  const { startGame } = useGameStore();
  const { isConnected, address } = useAccount();
  const { sendTransaction, isPending, isSuccess } = useSendTransaction();

  const handleSayGM = () => {
    if (!isConnected || !address) {
      alert("Please connect wallet first!");
      return;
    }
    
    // Simulate a "Say GM" transaction on Base
    // Sending 0 value to oneself with "GM" hex data + ERC8021 attribution
    const attributionHex = getAttributionData();
    const gmHex = toHex('GM');
    const combinedData = gmHex + attributionHex.replace('0x', '');

    sendTransaction({
      to: address,
      value: parseEther('0'),
      data: combinedData as `0x${string}`,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full h-full flex flex-col bg-[#0a0a1a] p-6 text-white relative"
    >
      <div className="flex justify-between items-center mb-8 pt-4">
        <div>
          <h2 className="text-xl font-display font-bold text-gray-400">Welcome,</h2>
          <p className="text-2xl font-bold font-display text-[var(--color-crypto-green)]">
            {isConnected && address ? `${address.slice(0,6)}...${address.slice(-4)}` : 'Degen Guest'}
          </p>
        </div>
        <div className="bg-[#1a1a2e] p-3 rounded-full border border-blue-500/30">
          <Brain className="text-blue-400 w-6 h-6" />
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startGame}
          className="w-full relative overflow-hidden group bg-gradient-to-br from-indigo-600 to-purple-800 p-8 rounded-2xl border border-white/10 shadow-[0_4px_30px_rgba(99,102,241,0.3)] text-left flex flex-col justify-between h-48"
        >
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
            <Zap className="w-24 h-24" />
          </div>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase w-max tracking-wider">Ranked</span>
          <div>
            <h3 className="text-3xl font-display font-black tracking-tight mb-1">ENTER ARENA</h3>
            <p className="text-indigo-200 font-medium">Global Matchmaking</p>
          </div>
        </motion.button>

        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#13132B] p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-3"
          >
            <Trophy className="text-[#f7931a] w-8 h-8" />
            <span className="font-bold relative z-10">Leaderboard</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSayGM}
            disabled={isPending}
            className="bg-[#13132B] p-5 rounded-2xl border border-[var(--color-crypto-base)]/30 flex flex-col items-center justify-center gap-3 relative overflow-hidden"
          >
            {/* On-chain indicator */}
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--color-crypto-base)] animate-pulse" />
            <MessageSquare className="text-[var(--color-crypto-base)] w-8 h-8" />
            <span className="font-bold text-sm text-center">
              {isPending ? 'Signing...' : isSuccess ? 'GM Said!' : 'Say GM (On-chain)'}
            </span>
          </motion.button>
        </div>
      </div>

      <div className="pb-8 pt-4">
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-sm text-gray-400">
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Base Mainnet Connected
          </p>
        </div>
      </div>
    </motion.div>
  );
}
