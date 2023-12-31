import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuth')||false);
  const loginSuccess = (user) => {
    setUsername(user.username);
    setIsAuthenticated(true);
    localStorage.setItem('isAuth',true);
    localStorage.setItem('username',user.username);
  };

  const logoutSuccess = () => {
    localStorage.clear();
    setUsername('');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      username, 
      isAuthenticated,
      setIsAuthenticated,
      loginSuccess,
      logoutSuccess, }}>
      
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
