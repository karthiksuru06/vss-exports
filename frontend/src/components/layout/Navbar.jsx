import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Anchor, Globe } from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';
import { useTranslation } from '../../hooks/useTranslation';
import { NAV_ITEMS } from '../../utils/constants';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const { isDesktop } = useResponsive();
  const { t, lang, setLang, languages } = useTranslation();
  const location = useLocation();

  // Determine if we are on the home page
  const isHome = location.pathname === '/';

  // Close menu when route changes
  useEffect(() => { setIsOpen(false); }, [location]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent glitches
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Also lock height to prevent iOS address bar shifts from messing up layout
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    };
  }, [isOpen]);


  // Logic for navbar appearance:
  // If menu is open, keep background transparent so it blends with the full-screen overlay.
  // Otherwise, use dark style if not home OR if scrolled.
  const useDarkNav = !isHome || scrolled;

  const navClasses = isOpen
    ? `bg-transparent border-transparent ${scrolled ? 'py-2' : 'py-6'}` // Keep padding consistent to avoid jump, but remove bg
    : (useDarkNav
      ? 'bg-midnight-800/95 backdrop-blur-xl border-white/10 py-2 shadow-2xl'
      : 'bg-transparent border-transparent py-6');

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b pointer-events-none ${navClasses}`}
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 h-full">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo */}
          <div className="pointer-events-auto relative z-50">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 group w-auto shrink-0 relative"
            >
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Mahadev Marine" 
                  className="relative h-14 w-auto object-contain drop-shadow-md"
                  style={{
                    animation: 'logoSpin 2s ease-in-out infinite',
                  }}
                />
                <style>{`
                  @keyframes logoSpin {
                    0% { transform: rotate(0deg); }
                    50% { transform: rotate(360deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold tracking-tight text-white leading-none">
                  {t('brand.mahadev')}<span className="text-gold-500">{t('brand.marine')}</span>
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-ocean-300 font-medium opacity-80 mt-1">
                  {t('brand.exports')}
                </span>
              </div>
            </NavLink>
          </div>


          {/* Desktop Menu - Shows only on Large screens (>= 1024px) */}
          {isDesktop && (
            <div className="hidden lg:flex items-center space-x-12 pointer-events-auto">
              <div className="flex space-x-8">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `
                        relative text-sm font-medium tracking-wide uppercase transition-all duration-300
                        ${isActive ? 'text-gold-400' : 'text-white/80 hover:text-white'}
                        group
                    `}
                  >
                    {t(item.label)}
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full opacity-80"></span>
                  </NavLink>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded-full border border-white/10 hover:border-white/30"
                >
                  <Globe size={16} />
                  <span className="text-sm font-medium uppercase">{lang}</span>
                </button>
                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-40 bg-midnight-900 border border-white/10 rounded-xl overflow-hidden shadow-xl"
                    >
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setLangMenuOpen(false); }}
                          className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white flex items-center justify-between transition-colors"
                        >
                          <span>{l.name}</span>
                          <span>{l.flag}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gold-600 hover:bg-gold-500 text-midnight-900 px-6 py-2.5 rounded-sm font-bold text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
                >
                  {t('cta.enquire')}
                </motion.div>
              </NavLink>
            </div>
          )}

          {/* Mobile/Tablet Hamburger - Shows on screens < 1024px */}
          {!isDesktop && (
            <div className="pointer-events-auto relative z-50">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-white focus:outline-none transition-colors hover:text-gold-500"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ type: "spring", damping: 25, stiffness: 100 }}
            className="fixed inset-0 bg-midnight-900 z-40 flex flex-col items-center justify-center overflow-hidden pointer-events-auto h-[100dvh]"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

            <div className="flex flex-col space-y-8 text-center relative z-50 w-full px-8">
              {NAV_ITEMS.map((item, idx) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block w-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    className="text-4xl sm:text-5xl font-serif text-white hover:text-gold-500 transition-colors py-2"
                  >
                    {t(item.label)}
                  </motion.div>
                </NavLink>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-6 mt-8 justify-center"
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`text-3xl ${lang === l.code ? 'grayscale-0 scale-125' : 'grayscale opacity-50'} transition-all hover:scale-110 hover:opacity-100`}
                  >
                    {l.flag}
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
