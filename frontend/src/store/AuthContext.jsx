import { createContext, useContext, useState} from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // State to manage your application data
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          {children} 
        </AuthContext.Provider>
      );
    };
    
    export {AuthContext, AuthProvider };