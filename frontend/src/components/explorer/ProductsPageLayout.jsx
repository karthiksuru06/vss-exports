/**
 * ProductsPageLayout - Marine Control System
 *
 * LAYOUT:
 * - DESKTOP: Arc LEFT (45%), Video RIGHT (55%) - horizontal
 * - MOBILE: Video TOP, Arc BOTTOM - vertical stack
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import ProductArcWheel from './ProductArcWheel';
import ProductVideoPanel from './ProductVideoPanel';
import ProductFlipCard from './ProductFlipCard';
import { PRODUCTS } from '../../utils/constants';

function ProductsPageLayout() {
  const products = useMemo(() => PRODUCTS, []);

  const [focusedIndex, setFocusedIndex] = useState(0);
  const [activeProduct, setActiveProduct] = useState(null);
  const [isArcLocked, setIsArcLocked] = useState(false);
  const [theme, setTheme] = useState('deep-ocean');
  const [isMobile, setIsMobile] = useState(false);

  const isLight = theme === 'surface-light';
  const focusedProduct = focusedIndex !== null ? products[focusedIndex] : null;

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFocusChange = useCallback((index) => {
    setFocusedIndex(index);
  }, []);

  const handleProductClick = useCallback((product) => {
    if (!product) return;
    setActiveProduct(product);
    setIsArcLocked(true);
  }, []);

  const handleCloseFlipCard = useCallback(() => {
    setActiveProduct(null);
    setIsArcLocked(false);
  }, []);

  const toggleTheme = () => {
    setTheme(t => t === 'deep-ocean' ? 'surface-light' : 'deep-ocean');
  };

  // Arc dimensions - responsive
  const outerRadius = isMobile
    ? Math.min(280, window.innerWidth * 0.38)
    : Math.min(360, window.innerWidth * 0.22);
  const innerRadius = isMobile
    ? Math.min(170, window.innerWidth * 0.23)
    : Math.min(220, window.innerWidth * 0.14);
  const itemSize = isMobile ? 60 : 75;

  return (
    <div
      className="min-h-screen transition-colors duration-700"
      style={{
        background: isLight
          ? 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)'
          : 'linear-gradient(135deg, #051b30 0%, #0a2540 50%, #051b30 100%)',
      }}
    >
      {/* Header - Compact on mobile */}
      <motion.header
        className="relative z-20 pt-20 lg:pt-24 pb-2 lg:pb-4 px-4 lg:px-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-start justify-between">
          <div>
            <h1
              className="font-serif text-2xl md:text-4xl lg:text-5xl mb-1 lg:mb-2"
              style={{ color: isLight ? '#0a2540' : '#ffffff' }}
            >
              Our <span className="text-gold-500">Collection</span>
            </h1>
            <p
              className="text-xs md:text-sm lg:text-base max-w-lg hidden sm:block"
              style={{ color: isLight ? '#475569' : '#94a3b8' }}
            >
              Premium seafood from the pristine waters of the Indian Ocean.
            </p>
          </div>

          {/* Theme Toggle - Smaller on mobile */}
          <motion.button
            onClick={toggleTheme}
            className="flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-1.5 lg:py-2 rounded-full transition-all"
            style={{
              background: isLight ? 'rgba(10, 37, 64, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              border: isLight ? '1px solid rgba(10, 37, 64, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {isLight ? (
                <motion.div
                  key="light"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  className="flex items-center gap-1 lg:gap-2"
                >
                  <Moon className="w-3 h-3 lg:w-4 lg:h-4 text-midnight-800" />
                  <span className="text-xs lg:text-sm font-medium text-midnight-800 hidden sm:inline">Deep Ocean</span>
                </motion.div>
              ) : (
                <motion.div
                  key="dark"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  className="flex items-center gap-1 lg:gap-2"
                >
                  <Sun className="w-3 h-3 lg:w-4 lg:h-4 text-gold-500" />
                  <span className="text-xs lg:text-sm font-medium text-ocean-300 hidden sm:inline">Surface Light</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content - Responsive Layout */}
      <main className="relative h-[calc(100vh-100px)] lg:h-[calc(100vh-140px)]">
        {/* DESKTOP: Horizontal grid */}
        {/* MOBILE: Vertical flex with video top, arc bottom */}
        <div className={`absolute inset-0 ${
          isMobile
            ? 'flex flex-col'
            : 'grid grid-cols-[45%_55%]'
        }`}>

          {/* MOBILE: Video Panel TOP */}
          {isMobile && (
            <div
              className="relative h-[45%] border-b transition-colors duration-500"
              style={{
                borderColor: isLight ? 'rgba(14, 165, 233, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <ProductVideoPanel
                activeProduct={activeProduct}
                focusedProduct={focusedProduct}
                isActive={!!activeProduct}
                theme={theme}
                isMobile={isMobile}
              />
            </div>
          )}

          {/* Arc Control - LEFT on desktop, BOTTOM on mobile */}
          <div
            className={`relative overflow-hidden ${isMobile ? 'h-[55%]' : ''}`}
            style={{
              background: isLight
                ? 'radial-gradient(ellipse at 50% 50%, rgba(14, 165, 233, 0.06) 0%, transparent 60%)'
                : 'radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.04) 0%, transparent 60%)',
            }}
          >
            {/* Grid pattern */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: isLight ? 0.2 : 0.04,
                backgroundImage: `
                  linear-gradient(${isLight ? 'rgba(14, 165, 233, 0.12)' : 'rgba(212, 175, 55, 0.2)'} 1px, transparent 1px),
                  linear-gradient(90deg, ${isLight ? 'rgba(14, 165, 233, 0.12)' : 'rgba(212, 175, 55, 0.2)'} 1px, transparent 1px)
                `,
                backgroundSize: isMobile ? '30px 30px' : '50px 50px',
              }}
            />

            {/* Label - Hidden on mobile */}
            {!isMobile && (
              <div className="absolute top-4 left-6 z-10">
                <span className="text-xs uppercase tracking-widest" style={{ color: '#64748b' }}>
                  Product Explorer
                </span>
              </div>
            )}

            {/* Arc Wheel */}
            <ProductArcWheel
              products={products}
              focusedIndex={focusedIndex}
              isLocked={isArcLocked}
              onFocusChange={handleFocusChange}
              onProductClick={handleProductClick}
              onOrderClick={(p) => console.log('Order:', p.name)}
              onQuoteClick={(p) => console.log('Quote:', p.name)}
              outerRadius={outerRadius}
              innerRadius={innerRadius}
              itemSize={itemSize}
              theme={theme}
              isMobile={isMobile}
            />
          </div>

          {/* DESKTOP: Video Panel RIGHT */}
          {!isMobile && (
            <div
              className="relative border-l transition-colors duration-500"
              style={{
                borderColor: isLight ? 'rgba(14, 165, 233, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <ProductVideoPanel
                activeProduct={activeProduct}
                focusedProduct={focusedProduct}
                isActive={!!activeProduct}
                theme={theme}
                isMobile={isMobile}
              />
            </div>
          )}
        </div>
      </main>

      {/* Flip Card Overlay */}
      <ProductFlipCard
        product={activeProduct}
        isVisible={!!activeProduct}
        onClose={handleCloseFlipCard}
      />

      {/* Bottom Status Bar - Hidden on mobile for more space */}
      {!isMobile && (
        <motion.footer
          className="fixed bottom-0 left-0 right-0 z-10 py-3 px-8 border-t transition-colors duration-500"
          style={{
            borderColor: isLight ? 'rgba(14, 165, 233, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            background: isLight ? 'rgba(224, 242, 254, 0.9)' : 'rgba(5, 27, 48, 0.9)',
            backdropFilter: 'blur(12px)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-sm" style={{ color: '#64748b' }}>
                <span className="font-medium" style={{ color: '#d4af37' }}>
                  {products.length}
                </span> Products
              </span>

              {focusedProduct && !activeProduct && (
                <motion.span
                  className="text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ color: isLight ? '#475569' : '#94a3b8' }}
                >
                  Viewing:{' '}
                  <span style={{ color: isLight ? '#0a2540' : '#ffffff' }}>
                    {focusedProduct.name}
                  </span>
                </motion.span>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs" style={{ color: '#64748b' }}>
              <span className="flex items-center gap-2">
                <kbd
                  className="px-2 py-0.5 rounded"
                  style={{
                    background: isLight ? 'rgba(14, 165, 233, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    color: isLight ? '#0369a1' : '#94a3b8',
                  }}
                >
                  Scroll
                </kbd>
                <span>↓ next • ↑ prev</span>
              </span>
            </div>
          </div>
        </motion.footer>
      )}

      {/* Mobile Product Info Overlay */}
      {isMobile && focusedProduct && !activeProduct && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-10 py-2 px-4 border-t"
          style={{
            borderColor: isLight ? 'rgba(14, 165, 233, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            background: isLight ? 'rgba(224, 242, 254, 0.95)' : 'rgba(5, 27, 48, 0.95)',
            backdropFilter: 'blur(12px)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider" style={{ color: '#d4af37' }}>
                {focusedProduct.category}
              </p>
              <p className="text-sm font-semibold" style={{ color: isLight ? '#0a2540' : '#ffffff' }}>
                {focusedProduct.name}
              </p>
            </div>
            <div className="text-xs" style={{ color: '#64748b' }}>
              Swipe to browse
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ProductsPageLayout;
