import { useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { TitleScreen } from './screens/TitleScreen';
import { LobbyScreen } from './screens/LobbyScreen';
import { ArenaScreen } from './screens/ArenaScreen';
import { GameOverScreen } from './screens/GameOverScreen';

export default function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);

  return (
    <div className="w-full h-[100dvh] bg-[#050511] flex flex-col font-sans overflow-hidden">
      {/* Dynamic Screen Rendering */}
      <div className="flex-1 w-full max-w-md mx-auto relative shadow-2xl bg-black">
        {currentScreen === 'TITLE' && <TitleScreen />}
        {currentScreen === 'LOBBY' && <LobbyScreen />}
        {currentScreen === 'ARENA' && <ArenaScreen />}
        {currentScreen === 'GAMEOVER' && <GameOverScreen />}
      </div>
    </div>
  );
}
