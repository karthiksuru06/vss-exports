import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TransformationCard from '../components/products/TransformationCard';
import { PRODUCTS, DIVISIONS } from '../utils/constants';
import { Search, Filter, SlidersHorizontal, ArrowDown, Package, Ruler, ThermometerSnowflake } from 'lucide-react';

const ProductCatalog = () => {
  const [activeDivision, setActiveDivision] = useState('all');
  const [search, setSearch] = useState('');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesDivision = activeDivision === 'all' || product.division === activeDivision;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesDivision && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-[1800px] mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold text-midnight-900 mb-6"
          >
            Product <span className="text-gold-600">Gallery</span>
          </motion.h1>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center sticky top-24 z-30 bg-slate-50/90 backdrop-blur-sm py-4 border-b border-gray-200">
            {/* Division Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide">
                <button
                    onClick={() => setActiveDivision('all')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all ${
                        activeDivision === 'all'
                        ? 'bg-midnight-900 text-white shadow-lg'
                        : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                    All Collections
                </button>
              {DIVISIONS.map(div => (
                <button
                  key={div.id}
                  onClick={() => setActiveDivision(div.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all whitespace-nowrap ${
                    activeDivision === div.id
                      ? 'bg-midnight-900 text-white shadow-lg'
                      : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {div.title}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gold-600 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search species, specs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all shadow-sm hover:shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12"
        >
          <AnimatePresence>
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
            <div className="text-center py-32 opacity-50">
                <p className="text-2xl font-serif">No products found matching your criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100"
        >
            {/* Visual Header - Transformation or Image */}
            <div className="relative bg-gray-100">
                {product.transformation ? (
                    <TransformationCard steps={product.transformation} />
                ) : (
                    <div className="aspect-[4/3] overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/60 to-transparent opacity-60" />
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                    <span className="bg-white/90 backdrop-blur text-midnight-900 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm">
                        {product.division}
                    </span>
                    {product.processingType.slice(0, 1).map(pt => (
                        <span key={pt} className="bg-gold-500 text-midnight-900 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm">
                            {pt}
                        </span>
                    ))}
                </div>
            </div>

            {/* Info Body */}
            <div className="p-6">
                <div className="mb-4">
                    <h3 className="text-2xl font-serif font-bold text-midnight-900 mb-1 group-hover:text-gold-600 transition-colors">{product.name}</h3>
                    <p className="text-sm text-gray-400 italic font-serif">{product.scientificName}</p>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600 border-b border-gray-100 pb-2">
                        <Ruler size={16} className="mr-3 text-gold-600" />
                        <span className="truncate">{product.specs.sizes.join(', ')}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 border-b border-gray-100 pb-2">
                        <Package size={16} className="mr-3 text-gold-600" />
                        <span className="truncate">{product.specs.packing.join(', ')}</span>
                    </div>
                    {product.specs.glaze && (
                        <div className="flex items-center text-sm text-gray-600 border-b border-gray-100 pb-2">
                            <ThermometerSnowflake size={16} className="mr-3 text-gold-600" />
                            <span className="truncate">Glaze: {product.specs.glaze.join(', ')}</span>
                        </div>
                    )}
                </div>

                <button className="w-full py-3 border border-midnight-900 text-midnight-900 font-bold uppercase tracking-widest text-xs hover:bg-midnight-900 hover:text-white transition-all rounded-sm flex items-center justify-center gap-2 group-hover:bg-midnight-900 group-hover:text-white">
                    Request Spec Sheet
                </button>
            </div>
        </motion.div>
    )
}

export default ProductCatalog;
