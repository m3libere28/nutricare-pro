import React from 'react';
import { useAuth } from './contexts/AuthContext';
import NutriCarePro from './components/NutriCarePro';
import LoginPage from './components/auth/LoginPage';
import Loader from './components/common/Loader';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return user ? <NutriCarePro /> : <LoginPage />;
}

export default App;
