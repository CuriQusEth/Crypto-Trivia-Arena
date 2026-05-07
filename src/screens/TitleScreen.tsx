import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { useAccount, useConnect } from 'wagmi';

export function TitleScreen() {
  const setScreen = useGameStore((state) => state.setScreen);
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-900 to-black"
    >
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(0,82,255,0.2)_0%,rgba(0,0,0,0)_50%)]"
        />
      </div>

      <div className="z-10 flex flex-col items-center p-6 space-y-12">
        <motion.div
          initial={{ y: -50, scale: 0.8 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-crypto-gold)] to-yellow-300 drop-shadow-[0_0_15px_rgba(247,147,26,0.5)]">
            CRYPTO
          </h1>
          <h1 className="text-6xl font-display font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] mt-[-10px]">
            TRIVIA
          </h1>
          <h2 className="text-3xl font-display font-bold tracking-widest text-[var(--color-crypto-base)] drop-shadow-[0_0_10px_rgba(0,82,255,0.8)] mt-2">
            ARENA
          </h2>
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col w-full gap-4"
        >
          {isConnected ? (
            <button
              onClick={() => setScreen('LOBBY')}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-xl uppercase tracking-wider shadow-[0_0_20px_rgba(0,82,255,0.5)] hover:from-blue-500 hover:to-indigo-500 active:scale-95 transition-all text-white border border-blue-400/30"
            >
              Enter Arena
            </button>
          ) : (
            <>
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-lg uppercase tracking-wider shadow-[0_0_20px_rgba(0,82,255,0.5)] hover:from-blue-500 hover:to-indigo-500 active:scale-95 transition-all text-white border border-blue-400/30"
                >
                  Connect {connector.name}
                </button>
              ))}
              
              <button
                onClick={() => setScreen('LOBBY')}
                className="w-full py-4 rounded-xl bg-white/5 font-bold text-lg uppercase tracking-wider hover:bg-white/10 active:scale-95 transition-all text-slate-300 border border-white/10 mt-2"
              >
                Play as Guest
              </button>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
