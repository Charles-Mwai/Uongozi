import React, { Suspense, lazy } from 'react';
import { useApp } from './context/AppContext';

// Eagerly loaded — first screens the user sees
import LanguageSelect from './components/screens/LanguageSelect';
import Splash from './components/screens/Splash';

// Lazy loaded — only downloaded when the user actually navigates there
const Onboarding   = lazy(() => import('./components/screens/Onboarding'));
const Home         = lazy(() => import('./components/screens/Home'));
const Quiz         = lazy(() => import('./components/screens/Quiz'));
const Results      = lazy(() => import('./components/screens/Results'));
const AskKatiba    = lazy(() => import('./components/screens/AskKatiba'));
const Leaderboard  = lazy(() => import('./components/screens/Leaderboard'));
const Profile      = lazy(() => import('./components/screens/Profile'));

import TopNav from './components/ui/TopNav';
import Toast from './components/ui/Toast';
import LevelUpOverlay from './components/ui/LevelUpOverlay';

// Minimal inline fallback — keeps the dark background while the chunk loads
const ScreenLoader = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#061e16',
  }}>
    <div style={{
      width: 36, height: 36,
      border: '3px solid rgba(201,168,76,0.2)',
      borderTopColor: '#c9a84c',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
    }} />
  </div>
);

const App: React.FC = () => {
  const { currentScreen } = useApp();
  const showNav = ['home', 'leaderboard', 'ask', 'profile'].includes(currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'langSelect':   return <LanguageSelect />;
      case 'splash':       return <Splash />;
      case 'onboarding':   return <Onboarding />;
      case 'home':         return <Home />;
      case 'quiz':         return <Quiz />;
      case 'results':      return <Results />;
      case 'ask':          return <AskKatiba />;
      case 'leaderboard':  return <Leaderboard />;
      case 'profile':      return <Profile />;
      default:             return <LanguageSelect />;
    }
  };

  return (
    <div className="app-container">
      {showNav && <TopNav />}
      <Suspense fallback={<ScreenLoader />}>
        {renderScreen()}
      </Suspense>
      <Toast />
      <LevelUpOverlay />
    </div>
  );
};

export default App;
