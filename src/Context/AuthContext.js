import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuth')||false);
  /* const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');
 */
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
      logoutSuccess,
     /*  accessToken,
      setAccessToken,
      refreshToken,
      setRefreshToken */ }}>
      
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
