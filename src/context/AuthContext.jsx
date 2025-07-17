import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/AuthService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) setUser(currentUser);
    setLoading(false);
    }, []);

    const login = async (username, password) => {
    try {
        const response = await authService.login(username, password);
        setUser(response.user);
        return response;
    } catch (error) { throw error; }
    };

    const register = async (username, password) => {
    try {
        const response = await authService.register(username, password);
        return response;
    } catch (error) { throw error; }
};

    const logout = () => {
    authService.logout();
    setUser(null);
    };

    return (
    <AuthContext.Provider value={{ user, login, logout, loading, register }}> {/* Añadimos 'register' aquí */}
        {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};