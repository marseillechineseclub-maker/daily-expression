import { AppProvider, useApp } from './context/AppContext';
import {
  WelcomeScreen,
  HomeScreen,
  QuizScreen,
  ReviewScreen,
  ProgressScreen,
  SettingsScreen,
  DailyChallengeScreen,
} from './components/screens';

function AppContent() {
  const { currentScreen, setUser, setScreen, learnedIds } = useApp();

  switch (currentScreen) {
    case 'welcome':
      return <WelcomeScreen onComplete={setUser} />;
    case 'home':
      return <HomeScreen />;
    case 'quiz':
      return <QuizScreen onBack={() => setScreen('home')} />;
    case 'review':
      return <ReviewScreen learnedIds={learnedIds} onBack={() => setScreen('home')} />;
    case 'progress':
      return <ProgressScreen onBack={() => setScreen('home')} />;
    case 'settings':
      return <SettingsScreen onBack={() => setScreen('home')} />;
    case 'daily-challenge':
      return <DailyChallengeScreen onBack={() => setScreen('home')} />;
    default:
      return <HomeScreen />;
  }
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
