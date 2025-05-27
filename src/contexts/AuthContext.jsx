import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add artificial delay to show loader
    const initAuth = async () => {
      try {
        // Check if user is logged in from localStorage
        const storedUser = localStorage.getItem('user');
        
        // Artificial delay to show loader (1.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // This is a mock login - replace with your actual authentication logic
      const mockUser = {
        id: '1',
        name: 'Emily Torres-Medaglia',
        email: email,
        role: 'R.D.N.',
        avatar: 'https://i.pravatar.cc/150?img=4'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
