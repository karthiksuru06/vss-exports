/**
 * ProductsPageLayout - Marine Control System
 *
 * LAYOUT:
 * - DESKTOP (>768px): Arc LEFT (45%), Video RIGHT (55%) - horizontal
 * - MOBILE (<=768px): 3 vertical zones:
 *   - ZONE 1: Video TOP (16:9 aspect ratio)
 *   - ZONE 2: Info Panel MIDDLE (glass-style with Order/Quote)
 *   - ZONE 3: Arc BOTTOM (semicircle curving upward from bottom edge)
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ShoppingCart, FileText, Ruler, MapPin, Package, Award, Settings, Grid3X3, Fish, Shell, CircleDot } from 'lucide-react';
import ProductArcWheel from './ProductArcWheel';
import ProductVideoPanel from './ProductVideoPanel';
import ProductFlipCard from './ProductFlipCard';
import { PRODUCTS, FILTER_CATEGORIES } from '../../utils/constants';
import { useTranslation } from '../../hooks/useTranslation';

/**
 * Get localized product info with fallback to English
 */
const getLocalizedInfo = (product, lang = 'en') => {
  if (product?.info?.[lang]) {
    return product.info[lang];
  }
  if (product?.info?.en) {
    return product.info.en;
  }
  return {
    name: product?.name || '',
    category: product?.category || '',
    description: product?.description || '',
    sizes: product?.specs?.sizes?.[0] || '',
    origin: product?.specs?.origin || '',
    processing: product?.processingType?.join(', ') || '',
    packaging: product?.specs?.packing?.join(', ') || '',
    certification: product?.specs?.certifications?.join(', ') || ''
  };
};

function ProductsPageLayout() {
  const { t, lang } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter products based on selected category
  const products = useMemo(() => {
    if (activeFilter === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.filterCategory === activeFilter);
  }, [activeFilter]);

  const [focusedIndex, setFocusedIndex] = useState(0);
  const [activeProduct, setActiveProduct] = useState(null);
  const [isArcLocked, setIsArcLocked] = useState(false);
  const [theme, setTheme] = useState('deep-ocean');
  const [isMobile, setIsMobile] = useState(false);
  
  // Use language from translation hook
  const currentLanguage = lang;

  const isLight = theme === 'surface-light';
  const focusedProduct = focusedIndex !== null ? products[focusedIndex] : null;

  // Reset focused index when filter changes
  useEffect(() => {
    setFocusedIndex(0);
  }, [activeFilter]);

  // Detect mobile viewport - breakpoint at 768px
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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
  // Mobile: arc at bottom, needs to fit in fixed height zone
  const outerRadius = isMobile
    ? Math.min(180, window.innerWidth * 0.48)
    : Math.min(360, window.innerWidth * 0.22);
  const innerRadius = isMobile
    ? Math.min(100, window.innerWidth * 0.26)
    : Math.min(220, window.innerWidth * 0.14);
  const itemSize = isMobile ? 48 : 75;

  return (
    <div
      className="min-h-screen transition-colors duration-700 overflow-hidden"
      style={{
        background: isLight
          ? 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)'
          : 'linear-gradient(135deg, #051b30 0%, #0a2540 50%, #051b30 100%)',
      }}
    >
      {/* Header - Compact on mobile */}
      <motion.header
        className={`relative z-20 ${isMobile ? 'pt-16 pb-1 px-4' : 'pt-24 pb-4 px-8'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-start justify-between">
          <div>
            <h1
              className={`font-serif ${isMobile ? 'text-xl' : 'text-4xl lg:text-5xl'} mb-1`}
              style={{ color: isLight ? '#0a2540' : '#ffffff' }}
            >
              {t('products.title')} <span className="text-gold-500">{t('products.titleHighlight')}</span>
            </h1>
            {!isMobile && (
              <p
                className="text-sm lg:text-base max-w-lg"
                style={{ color: isLight ? '#475569' : '#94a3b8' }}
              >
                {t('products.subtitle')}
              </p>
            )}
          </div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className={`flex items-center gap-1 ${isMobile ? 'px-2 py-1' : 'px-4 py-2'} rounded-full transition-all`}
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
                  className="flex items-center gap-1"
                >
                  <Moon className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-midnight-800`} />
                  {!isMobile && <span className="text-sm font-medium text-midnight-800">{t('products.themeDeepOcean')}</span>}
                </motion.div>
              ) : (
                <motion.div
                  key="dark"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  className="flex items-center gap-1"
                >
                  <Sun className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-gold-500`} />
                  {!isMobile && <span className="text-sm font-medium text-ocean-300">{t('products.themeSurfaceLight')}</span>}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Category Filter Tabs */}
        <div className={`max-w-7xl mx-auto ${isMobile ? 'mt-3' : 'mt-6'}`}>
          <div
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {FILTER_CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat.id;
              const IconComponent = cat.id === 'all' ? Grid3X3 : 
                                   cat.id === 'shrimp' ? Fish :
                                   cat.id === 'fish' ? Fish :
                                   cat.id === 'squid' ? CircleDot :
                                   cat.id === 'shellfish' ? Shell : Package;
              // Use translation key from cat.labelKey (e.g., 'filter.all')
              const translatedLabel = t(cat.labelKey);
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    isMobile ? 'px-3 py-1.5 text-xs' : ''
                  }`}
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, #d4af37, #b8962e)'
                      : isLight
                      ? 'rgba(14, 165, 233, 0.1)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: isActive ? '#0a2540' : isLight ? '#0369a1' : '#94a3b8',
                    border: isActive
                      ? 'none'
                      : isLight
                      ? '1px solid rgba(14, 165, 233, 0.2)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: isActive ? '0 4px 12px rgba(212, 175, 55, 0.3)' : 'none',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                  <span>{translatedLabel}</span>
                  {isActive && (
                    <span
                      className={`${isMobile ? 'text-[10px] px-1.5' : 'text-xs px-2'} py-0.5 rounded-full bg-black/20`}
                    >
                      {products.length}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className={`relative ${isMobile ? 'h-[calc(100vh-120px)]' : 'h-[calc(100vh-200px)]'}`}>
        {isMobile ? (
          /* ========================================== */
          /* MOBILE: 3-Zone Vertical Layout            */
          /* ========================================== */
          <div className="flex flex-col h-full">
            {/* ZONE 1: VIDEO TOP */}
            <div
              className="relative flex-shrink-0 border-b transition-colors duration-500"
              style={{
                height: '25%',
                minHeight: '120px',
                maxHeight: '180px',
                borderColor: isLight ? 'rgba(14, 165, 233, 0.15)' : 'rgba(255, 255, 255, 0.08)',
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

            {/* ZONE 2: INFO PANEL MIDDLE */}
            <AnimatePresence mode="wait">
              {focusedProduct && !activeProduct && (
                <MobileInfoPanel
                  key={focusedProduct.id}
                  product={focusedProduct}
                  isLight={isLight}
                  currentLanguage={currentLanguage}
                  onOrderClick={(p) => console.log('Order:', p.name)}
                  onQuoteClick={(p) => console.log('Quote:', p.name)}
                  t={t}
                />
              )}
            </AnimatePresence>

            {/* ZONE 3: ARC BOTTOM - Semicircle curving upward */}
            <div
              className="relative flex-1 overflow-hidden"
              style={{
                background: isLight
                  ? 'radial-gradient(ellipse at 50% 100%, rgba(14, 165, 233, 0.08) 0%, transparent 70%)'
                  : 'radial-gradient(ellipse at 50% 100%, rgba(212, 175, 55, 0.06) 0%, transparent 70%)',
              }}
            >
              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: isLight ? 0.12 : 0.03,
                  backgroundImage: `
                    linear-gradient(${isLight ? 'rgba(14, 165, 233, 0.15)' : 'rgba(212, 175, 55, 0.2)'} 1px, transparent 1px),
                    linear-gradient(90deg, ${isLight ? 'rgba(14, 165, 233, 0.15)' : 'rgba(212, 175, 55, 0.2)'} 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Arc Wheel - positioned at bottom */}
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
                currentLanguage={currentLanguage}
              />
            </div>
          </div>
        ) : (
          /* ========================================== */
          /* DESKTOP: Horizontal Grid Layout           */
          /* ========================================== */
          <div className="absolute inset-0 grid grid-cols-[45%_55%]">
            {/* Arc Control - LEFT */}
            <div
              className="relative overflow-hidden"
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
                  opacity: isLight ? 0.15 : 0.04,
                  backgroundImage: `
                    linear-gradient(${isLight ? 'rgba(14, 165, 233, 0.12)' : 'rgba(212, 175, 55, 0.2)'} 1px, transparent 1px),
                    linear-gradient(90deg, ${isLight ? 'rgba(14, 165, 233, 0.12)' : 'rgba(212, 175, 55, 0.2)'} 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px',
                }}
              />

              <div className="absolute top-4 left-6 z-10">
                <span className="text-xs uppercase tracking-widest" style={{ color: '#64748b' }}>
                  Product Explorer
                </span>
              </div>

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
                currentLanguage={currentLanguage}
              />
            </div>

            {/* Video Panel - RIGHT */}
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
          </div>
        )}
      </main>

      {/* Flip Card Overlay */}
      <ProductFlipCard
        product={activeProduct}
        isVisible={!!activeProduct}
        onClose={handleCloseFlipCard}
        currentLanguage={currentLanguage}
        t={t}
      />

      {/* Desktop Status Bar */}
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
                <span>to browse</span>
              </span>
            </div>
          </div>
        </motion.footer>
      )}
    </div>
  );
}

/**
 * MobileInfoPanel - Glass-style info panel for mobile ZONE 2 (MIDDLE)
 * Compact design with product info and CTA buttons
 */
function MobileInfoPanel({ product, isLight, currentLanguage, onOrderClick, onQuoteClick, t }) {
  const info = getLocalizedInfo(product, currentLanguage);

  return (
    <motion.div
      className="relative flex-shrink-0 border-b"
      style={{
        borderColor: isLight ? 'rgba(14, 165, 233, 0.15)' : 'rgba(212, 175, 55, 0.12)',
        background: isLight
          ? 'rgba(255, 255, 255, 0.7)'
          : 'rgba(10, 37, 64, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      {/* Subtle top gradient */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: isLight
            ? 'linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.3), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
        }}
      />

      <div className="px-4 py-2.5">
        {/* Row 1: Category + Name + Buttons */}
        <div className="flex items-center gap-3">
          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded"
                style={{
                  background: 'rgba(212, 175, 55, 0.15)',
                  color: '#d4af37',
                }}
              >
                {info.category}
              </span>
            </div>
            <h3
              className="font-serif text-sm font-bold truncate leading-tight"
              style={{ color: isLight ? '#0a2540' : '#ffffff' }}
            >
              {info.name}
            </h3>
          </div>

          {/* CTA Buttons - Compact */}
          <div className="flex gap-1.5 flex-shrink-0">
            <motion.button
              onClick={() => onOrderClick?.(product)}
              className="py-1.5 px-3 rounded-lg text-[11px] font-semibold flex items-center gap-1"
              style={{
                background: 'linear-gradient(135deg, #d4af37, #b8962e)',
                color: '#0a2540',
                boxShadow: '0 2px 6px rgba(212, 175, 55, 0.25)',
              }}
              whileTap={{ scale: 0.96 }}
            >
              <ShoppingCart className="w-3 h-3" />
              {t ? t('products.orderNow') : 'Order'}
            </motion.button>

            <motion.button
              onClick={() => onQuoteClick?.(product)}
              className="py-1.5 px-3 rounded-lg text-[11px] font-semibold flex items-center gap-1"
              style={{
                background: isLight ? 'rgba(14, 165, 233, 0.1)' : 'rgba(255, 255, 255, 0.08)',
                color: isLight ? '#0369a1' : '#e2e8f0',
                border: isLight ? '1px solid rgba(14, 165, 233, 0.2)' : '1px solid rgba(255, 255, 255, 0.12)',
              }}
              whileTap={{ scale: 0.96 }}
            >
              <FileText className="w-3 h-3" />
              {t ? t('products.requestQuote') : 'Quote'}
            </motion.button>
          </div>
        </div>

        {/* Row 2: Specs chips - horizontal scroll */}
        <div
          className="flex gap-1.5 mt-2 overflow-x-auto pb-0.5"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {info.sizes && (
            <SpecChip icon={Ruler} text={info.sizes} color="#d4af37" isLight={isLight} />
          )}
          {info.origin && (
            <SpecChip icon={MapPin} text={info.origin} color="#d4af37" isLight={isLight} />
          )}
          {info.processing && (
            <SpecChip icon={Settings} text={info.processing} color="#3b82f6" isLight={isLight} />
          )}
          {info.packaging && (
            <SpecChip icon={Package} text={info.packaging} color="#22c55e" isLight={isLight} />
          )}
          {info.certification && (
            <SpecChip icon={Award} text={info.certification} color="#a855f7" isLight={isLight} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * SpecChip - Small specification badge
 */
function SpecChip({ icon: Icon, text, color, isLight }) {
  return (
    <div
      className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] whitespace-nowrap flex-shrink-0"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}25`,
        color: isLight ? '#1e293b' : '#e2e8f0',
      }}
    >
      <Icon className="w-2.5 h-2.5" style={{ color }} />
      <span className="truncate max-w-[80px]">{text}</span>
    </div>
  );
}

export default ProductsPageLayout;
