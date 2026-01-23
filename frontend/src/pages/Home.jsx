import React from 'react';
import { motion } from 'framer-motion';
import HeroParallax from '../components/home/HeroParallax';
import DivisionShowcase from '../components/home/DivisionShowcase';
import StatsCounter from '../components/home/StatsCounter';
import CertificationsTicker from '../components/shared/CertificationsTicker';
import { ShieldCheck, Truck, Globe, Clock, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-slate-50 overflow-x-hidden">
      <HeroParallax />

      {/* Intro Statement */}
      <section className="py-24 px-6 relative bg-white">
          <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-midnight-800 leading-tight mb-8">
                  "We don't just export seafood; we deliver the <span className="text-gold-600 italic">integrity</span> of the Indian Ocean to your doorstep."
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
                  With over 25 years of mastery, Mahadev Marine Exports bridges the gap between artisanal sourcing and industrial-scale logistics.
              </p>
          </div>
      </section>

      <DivisionShowcase />

      <CertificationsTicker />

      {/* Processing Video Wall Placeholder */}
      <section className="py-20 bg-midnight-950">
          <div className="max-w-[1800px] mx-auto px-6">
              <div className="flex justify-between items-end mb-12">
                  <h2 className="text-4xl font-serif text-white">Processing <span className="text-gold-500">Excellence</span></h2>
                  <button className="text-white/60 hover:text-white border-b border-gold-500 pb-1 text-sm uppercase tracking-widest">View Full Gallery</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[60vh]">
                  <div className="col-span-2 row-span-2 rounded-xl overflow-hidden relative group">
                      <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Clock className="text-white w-12 h-12 opacity-80" />
                      </div>
                  </div>
                  <div className="col-span-1 row-span-1 rounded-xl overflow-hidden bg-gray-800">
                      <img src="https://images.unsplash.com/photo-1615141982880-131f4794101f?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="col-span-1 row-span-2 rounded-xl overflow-hidden bg-gray-800">
                      <img src="https://images.unsplash.com/photo-1626804475297-411dbe631267?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="col-span-1 row-span-1 rounded-xl overflow-hidden bg-gray-800">
                       <img src="https://images.unsplash.com/photo-1534942205242-a42d3c2a117b?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" />
                  </div>
              </div>
          </div>
      </section>

      <StatsCounter />

      {/* Sticky Quick Enquiry Bubble */}
      <motion.div
        className="fixed bottom-8 right-8 z-40 hidden md:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
          <div className="relative group">
              <div className="absolute inset-0 bg-gold-500 rounded-full blur animate-pulse"></div>
              {/* FIXED: Changed from <a> to <Link> to prevent page reload/redirect errors */}
              <Link to="/contact" className="relative w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border-2 border-gold-500">
                  <MessageSquare className="text-midnight-900 w-8 h-8" />
              </Link>
              <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-midnight-900 text-white text-xs py-2 px-4 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Get a Quote in 24h
                  <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-midnight-900"></div>
              </div>
          </div>
      </motion.div>
    </div>
  );
};

export default Home;
