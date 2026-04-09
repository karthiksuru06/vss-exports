import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        // Check local storage for persistent login
        const storedUser = localStorage.getItem('vv_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Show login prompt immediately for new sessions (User request: "login comes first")
            const hasSeenPrompt = sessionStorage.getItem('vv_login_prompt_seen');
            if (!hasSeenPrompt) {
                setIsLoginModalOpen(true);
                sessionStorage.setItem('vv_login_prompt_seen', 'true');
            }
        }
    }, []);

    const login = async (userData) => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                localStorage.setItem('vv_user', JSON.stringify(data.user));
                setIsLoginModalOpen(false);
                return true;
            } else {
                console.error('Login failed:', data.error);
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('vv_user');
    };

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoginModalOpen, openLoginModal, closeLoginModal }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
