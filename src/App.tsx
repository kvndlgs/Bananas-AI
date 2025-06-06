<<<<<<< HEAD
// import React from 'react';
=======
import React from 'react';
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import InterviewPage from './pages/InterviewPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
<<<<<<< HEAD
import ProfilePage from './pages/ProfilePage';
import PremiumPage from './pages/PremiumPage';
import CustomCharactersPage from './pages/CustomCharactersPage';
import DiscoverPage from './pages/DiscoverPage';

=======
import PremiumPage from './pages/PremiumPage';
import CustomCharactersPage from './pages/CustomCharactersPage';
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/interview" element={<InterviewPage />} />
<<<<<<< HEAD
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path='/profile' element={<ProfilePage />} />
=======
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
                <Route path="/premium" element={<PremiumPage />} />
                <Route path="/custom-characters" element={<CustomCharactersPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;