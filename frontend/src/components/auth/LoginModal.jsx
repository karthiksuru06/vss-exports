import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Building } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginModal = () => {
    const { isLoginModalOpen, closeLoginModal, login } = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '' });
    const [isLoading, setIsLoading] = useState(false);

    if (!isLoginModalOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await login(formData);
        setIsLoading(false);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={closeLoginModal}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl backdrop-blur-md relative overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Decorative background elements */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

                    <button
                        onClick={closeLoginModal}
                        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="text-center mb-6 relative z-10">
                        <h2 className="text-3xl font-serif text-white mb-2">Welcome</h2>
                        <p className="text-gold-400 text-sm font-medium">For the best experience & exclusive access</p>
                        <p className="text-white/60 text-xs mt-2">Log in to unlock personalized support and quick ordering.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-gold-400 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 focus:bg-white/10 transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-gold-400 transition-colors" size={18} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 focus:bg-white/10 transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="relative group">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-gold-400 transition-colors" size={18} />
                            <input
                                type="tel"
                                placeholder="Phone Number (Optional)"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 focus:bg-white/10 transition-all"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <div className="relative group">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-gold-400 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Company (Optional)"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 focus:bg-white/10 transition-all"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-gold-600 to-gold-400 text-midnight-950 font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {isLoading ? 'Connecting...' : 'Continue'}
                        </button>
                    </form>

                    <p className="text-center text-white/30 text-xs mt-6">
                        We value your privacy. Your data is secure.
                    </p>

                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={closeLoginModal}
                            className="text-white/40 hover:text-white text-sm transition-colors border-b border-white/20 hover:border-white pb-0.5"
                        >
                            Continue as Guest
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoginModal;
