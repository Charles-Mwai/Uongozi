import React from 'react';
import { useApp } from './context/AppContext';
import LanguageSelect from './components/screens/LanguageSelect';
import Splash from './components/screens/Splash';
import Home from './components/screens/Home';
import Quiz from './components/screens/Quiz';
import Results from './components/screens/Results';
import AskKatiba from './components/screens/AskKatiba';
import Leaderboard from './components/screens/Leaderboard';
import Profile from './components/screens/Profile';
import TopNav from './components/ui/TopNav';

const App: React.FC = () => {
  const { currentScreen } = useApp();
  const showNav = ['home', 'leaderboard', 'ask', 'profile'].includes(currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'langSelect': return <LanguageSelect />;
      case 'splash': return <Splash />;
      case 'home': return <Home />;
      case 'quiz': return <Quiz />;
      case 'results': return <Results />;
      case 'ask': return <AskKatiba />;
      case 'leaderboard': return <Leaderboard />;
      case 'profile': return <Profile />;
      default: return <LanguageSelect />;
    }
  };

  return (
    <div className="app-container">
      {showNav && <TopNav />}
      {renderScreen()}
    </div>
  );
};

export default App;
