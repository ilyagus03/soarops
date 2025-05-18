import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const user = localStorage.getItem('soarops_user');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      setIsAdmin(userData.isAdmin || false);
    }
    setLoading(false);
  }, []);

  // Cast member login (simplified for demo)
  const loginCastMember = (castId, memberData) => {
    const user = {
      id: castId,
      name: memberData.name || 'Cast Member',
      position: memberData.position || 'Unassigned',
      isAdmin: false,
      isCastMember: true
    };
    
    localStorage.setItem('soarops_user', JSON.stringify(user));
    setCurrentUser(user);
    setIsAdmin(false);
    return user;
  };
  
  // Admin login (simplified for demo)
  const loginAdmin = (passcode) => {
    if (passcode === '123456789') {
      const adminUser = {
        id: 'admin',
        name: 'Administrator',
        position: 'Leadership',
        isAdmin: true,
        isCastMember: false
      };
      
      localStorage.setItem('soarops_user', JSON.stringify(adminUser));
      setCurrentUser(adminUser);
      setIsAdmin(true);
      return true;
    }
    return false;
  };
  
  // Logout
  const logout = () => {
    localStorage.removeItem('soarops_user');
    setCurrentUser(null);
    setIsAdmin(false);
  };
  
  const value = {
    currentUser,
    isAdmin,
    loginCastMember,
    loginAdmin,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
