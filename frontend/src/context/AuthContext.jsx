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
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const raw = await response.text();
            let data = {};
            try {
                data = raw ? JSON.parse(raw) : {};
            } catch {
                const snippet = raw.trim().slice(0, 80);
                const isHtml = raw.trim().startsWith('<') || snippet.toLowerCase().includes('the page');
                const error = isHtml
                    ? 'Login service is unavailable. Please try again in a moment or contact us on WhatsApp.'
                    : `Invalid server response: ${snippet}`;
                console.error('Login failed: non-JSON response', snippet);
                return { ok: false, error };
            }

            if (response.ok && data.user) {
                setUser(data.user);
                localStorage.setItem('vv_user', JSON.stringify(data.user));
                setIsLoginModalOpen(false);
                return { ok: true };
            }

            const error = data.error || `Unable to sign in (${response.status})`;
            console.error('Login failed:', error);
            return { ok: false, error };
        } catch (error) {
            console.error('Login error:', error);
            return { ok: false, error: 'Network error. Check your connection and try again.' };
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
