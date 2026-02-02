import { AppProvider, useApp } from './context/AppContext';
import { WelcomeScreen, HomeScreen, QuizScreen, ReviewScreen } from './components/screens';

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
    case 'settings':
      return (
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <p className="text-gray-600">Settings - Coming soon!</p>
        </div>
      );
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
