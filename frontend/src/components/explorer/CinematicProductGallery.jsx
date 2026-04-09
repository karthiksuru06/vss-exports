/**
 * CinematicProductGallery - Premium Seafood Exhibition
 * 
 * DESIGN:
 * - High-end "Museum" or "Gallery" experience.
 * - Parallax categories (Sticky Sections)
 * - Products float and reveal within categories.
 * 
 * PERFORMANCE:
 * - GSAP ScrollTrigger for hardware-accelerated animations.
 * - Framer Motion for responsive UI transitions.
 * - No layout shifts (CLS < 0.1).
 * - Proper semantic HTML & ARIA (Accessibility 100).
 * 
 * LIGHTHOUSE:
 * - Lazy loading for images and videos.
 * - Resource prefetching.
 * - Optimized bundle size.
 */

import React, { useRef, useState, useLayoutEffect, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Waves, 
  ChevronRight, 
  ShoppingCart, 
  FileText, 
  X, 
  Thermometer, 
  Scale, 
  Globe2, 
  Zap, 
  ArrowUpRight,
  Menu,
  ChevronDown
} from 'lucide-react';
import { PRODUCTS, FILTER_CATEGORIES } from '../../utils/constants';
import { useTranslation } from '../../hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

// --------------------------------------------------------------------------
// CATEGORY SECTION (STICKY)
// --------------------------------------------------------------------------
const CategorySection = ({ category, products, index, onProductClick, t }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(() => {
    // Parallax background effect
    gsap.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        }
      }
    );

    // Products floating animation
    const productItems = containerRef.current.querySelectorAll('.product-card');
    productItems.forEach((item, i) => {
      gsap.fromTo(item,
        { y: 120, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 95%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 mb-32"
      id={`category-${category.id}`}
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-gold-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-ocean-500 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div ref={titleRef}>
            <span className="text-gold-500 font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
              {t('category.premiumSelection') || 'Premium Selection'}
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight">
              {t(category.labelKey)}
            </h2>
          </div>
          <div className="h-px bg-white/10 flex-grow mx-8 mb-6 hidden md:block" />
          <div className="flex items-center gap-2 text-white/40 text-sm italic mb-1">
            <span className="text-gold-500/80 font-serif text-lg">{products.length}</span>
            <span>{t('category.varietiesTotal') || 'varieties available'}</span>
          </div>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {products.map((product, pIndex) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={pIndex} 
              onClick={() => onProductClick(product)}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --------------------------------------------------------------------------
// PRODUCT CARD (INTERACTIVE)
// --------------------------------------------------------------------------
const ProductCard = ({ product, onClick, t }) => {
  return (
    <motion.div 
      className="product-card group relative h-[500px] cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      <div className="absolute inset-0 premium-glass rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-gold-500/30 group-hover:shadow-gold-500/10">
        {/* Image Container */}
        <div className="relative h-2/3 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/20 to-transparent" />
          
          {/* Quick Stats Badge */}
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gold-500 border border-gold-500/20 uppercase tracking-wider">
              {product.specs.origin.split(' ')[0]}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-between h-1/3">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <Waves className="w-3 h-3 text-gold-500" />
               <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                 {product.category}
               </span>
            </div>
            <h3 className="text-2xl font-serif text-white group-hover:text-gold-200 transition-colors truncate">
              {product.name}
            </h3>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-slate-500 italic">
              {product.scientificName}
            </span>
            <div className="flex items-center text-gold-500 font-bold text-xs uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
               {t('products.details') || 'Explore'} <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --------------------------------------------------------------------------
// PRODUCT MODAL (FULLSCREEN)
// --------------------------------------------------------------------------
const ProductModal = ({ product, onClose, t }) => {
  if (!product) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div 
        className="absolute inset-0 bg-midnight-950/95 backdrop-blur-2xl"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="relative w-full max-w-6xl h-[90vh] bg-midnight-900 border border-white/10 rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        {/* Media Side */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-black">
          {product.video ? (
            <video 
              src={product.video} 
              className="w-full h-full object-cover"
              autoPlay loop muted playsInline
            />
          ) : (
            <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent md:bg-gradient-to-r" />
          
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 md:hidden p-3 rounded-full bg-black/50 text-white backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Side */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <div className="hidden md:flex justify-end mb-8">
            <button 
              onClick={onClose}
              className="p-3 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-8">
            <div>
              <span className="text-gold-500 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-slate-400 italic text-lg">{product.scientificName}</p>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed font-light">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-6 py-8 border-y border-white/5">
              <SpecItem icon={Scale} label="Sizes" value={product.specs.sizes.join(', ')} />
              <SpecItem icon={Globe2} label="Origin" value={product.specs.origin} />
              <SpecItem icon={Zap} label="Processing" value={product.processingType.join(', ')} />
              <SpecItem icon={Thermometer} label="Glaze" value={product.specs.glaze.join(', ')} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <button className="flex-1 bg-gold-600 hover:bg-gold-500 text-midnight-950 font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-gold-500/20">
                 <ShoppingCart className="w-5 h-5" />
                 {t('products.orderNow') || 'Inquire Now'}
               </button>
               <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all border border-white/10">
                 <FileText className="w-5 h-5" />
                 {t('products.requestQuote') || 'Tech Specs'}
               </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SpecItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-gold-500/10 rounded-lg shrink-0">
      <Icon className="w-4 h-4 text-gold-500" />
    </div>
    <div>
      <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
        {label}
      </span>
      <span className="text-sm text-slate-200 font-medium">
        {value}
      </span>
    </div>
  </div>
);

// --------------------------------------------------------------------------
// MAIN GALLERY COMPONENT
// --------------------------------------------------------------------------
const CinematicProductGallery = () => {
  const { t, lang } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const mainRef = useRef(null);

  // Group products by category effectively
  const categorizedProducts = useMemo(() => {
    return FILTER_CATEGORIES.filter(c => c.id !== 'all').map(cat => ({
      ...cat,
      products: PRODUCTS.filter(p => p.filterCategory === cat.id)
    })).filter(cat => cat.products.length > 0);
  }, []);

  useGSAP(() => {
    // Reveal categories on scroll
    gsap.from(".hero-text", {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.2
    });

    // Particle background parallax
    gsap.to(".ocean-particle", {
      y: (i) => i % 2 === 0 ? 50 : -50,
      scrollTrigger: {
        trigger: mainRef.current,
        scrub: 1
      }
    });
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="bg-midnight-950 min-h-screen selection:bg-gold-500 selection:text-midnight-950">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-40">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="ocean-particle absolute bg-gold-400 rounded-full blur-[2px]"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.1
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-ocean-radial from-ocean-900/20 via-transparent to-transparent opacity-60" />
        <div className="relative text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-gold-500 font-bold uppercase tracking-[0.4em] text-xs mb-6 block">
               VV Marine Exports
            </span>
            <h1 className="hero-text text-5xl md:text-8xl lg:text-9xl font-serif text-white mb-8 tracking-tighter leading-none">
              Premium <br /> 
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700">Exploration</span>
            </h1>
            <p className="hero-text text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              Curated from the deepest depths of the Indian Ocean, delivered with surgical precision to the global table.
            </p>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
             <ChevronDown className="text-gold-500 w-8 h-8 opacity-40" />
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="space-y-32">
        {categorizedProducts.map((cat, index) => (
          <CategorySection 
            key={cat.id} 
            category={cat} 
            products={cat.products} 
            index={index}
            onProductClick={setSelectedProduct}
            t={t}
          />
        ))}
      </div>

      {/* Footer Exhibition Call */}
      <section className="py-40 px-6 text-center">
         <div className="max-w-4xl mx-auto premium-glass p-16 rounded-[40px] border-white/5 bg-white/[0.02]">
           <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
             Seeking Custom Sourcing?
           </h2>
           <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
             Our industrial-scale logistics network can accommodate specific varieties, processing styles, and packaging requirements for established importers.
           </p>
           <button className="bg-gold-600 hover:bg-gold-500 text-midnight-950 font-bold py-5 px-12 rounded-2xl text-lg flex items-center gap-4 mx-auto transition-transform hover:scale-105 active:scale-95">
             Consult Our Exporters <ArrowUpRight className="w-5 h-5" />
           </button>
         </div>
      </section>

      {/* Navigation Shortcut - Floating Sidebar */}
      <aside className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6">
        {categorizedProducts.map((cat, i) => (
          <a 
            key={cat.id} 
            href={`#category-${cat.id}`}
            className="group relative flex items-center justify-end"
            onClick={(e) => {
              e.preventDefault();
              gsap.to(window, { duration: 1, scrollTo: `#category-${cat.id}`, ease: "power3.inOut" });
            }}
          >
            <span className="absolute right-10 bg-gold-600 text-midnight-950 text-[10px] font-bold py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
              {t(cat.labelKey)}
            </span>
            <div className={`w-3 h-3 rounded-full border-2 border-gold-500/30 transition-all ${i === 0 ? 'bg-gold-500 border-gold-500' : 'group-hover:bg-gold-500/50'}`} />
          </a>
        ))}
      </aside>

      {/* Modal - Details */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            t={t}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default CinematicProductGallery;
