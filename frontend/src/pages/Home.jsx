import React from 'react';
import { motion } from 'framer-motion';
import HeroParallax from '../components/home/HeroParallax';
import DivisionShowcase from '../components/home/DivisionShowcase';
import GlobalTransportMap from '../components/home/GlobalTransportMap';
import CertificationsTicker from '../components/shared/CertificationsTicker';
import BenefitSections from '../components/home/BenefitSections';
import OurLeadership from '../components/home/OurLeadership';
import NewsletterTrap from '../components/shared/NewsletterTrap';
import { ShieldCheck, Truck, Globe, Clock, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { CONTACT_INFO } from '../utils/constants';
import processing1 from '../assets/images/processing-1.png';
import blackTigerImg from '../assets/products/black-tiger.png';
import vannameiImg from '../assets/products/vannamei.png';

import sustainableFishingImg from '../assets/images/sustainable-fishing.png';

const Home = () => {
    const { t } = useTranslation();

    // Helper to render intro quote with highlighted text
    const renderIntroQuote = () => {
        const quote = t('home.intro.quote');
        const parts = quote.split(/<highlight>|<\/highlight>/);
        return (
            <>
                {parts[0]}
                <span className="text-gold-600 italic">{parts[1]}</span>
                {parts[2]}
            </>
        );
    };

    return (
        <div className="bg-slate-50 overflow-x-hidden">
            <HeroParallax />

            {/* Intro Statement */}
            <section className="py-24 px-6 relative bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-midnight-800 leading-tight mb-8">
                        {renderIntroQuote()}
                    </h2>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
                        {t('home.intro.description')}
                    </p>
                </div>
            </section>

            <DivisionShowcase />

            <BenefitSections />

            <OurLeadership />

            <CertificationsTicker />

            {/* Processing Video Wall Placeholder */}
            <section className="py-20 bg-midnight-950">
                <div className="max-w-[1800px] mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-4xl font-serif text-white">{t('home.processing.title')} <span className="text-gold-500">{t('home.processing.excellence')}</span></h2>
                        <button aria-label={t('home.processing.viewGallery')} className="text-white/60 hover:text-white border-b border-gold-500 pb-1 text-sm uppercase tracking-widest">{t('home.processing.viewGallery')}</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[60vh]">
                        <div className="col-span-2 row-span-2 rounded-xl overflow-hidden relative group">
                            <img
                                src={processing1}
                                alt="Shrimp processing facility"
                                width="800"
                                height="600"
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <Clock className="text-white w-12 h-12 opacity-80" />
                            </div>
                        </div>
                        <div className="col-span-1 row-span-1 rounded-xl overflow-hidden bg-gray-800">
                            <img
                                src={vannameiImg}
                                alt="Fresh catch inspection"
                                width="400"
                                height="300"
                                loading="lazy"
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                        <div className="col-span-1 row-span-2 rounded-xl overflow-hidden bg-gray-800">
                            <img
                                src={blackTigerImg}
                                alt="Premium black tiger shrimp"
                                width="400"
                                height="600"
                                loading="lazy"
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                        <div className="col-span-1 row-span-1 rounded-xl overflow-hidden bg-gray-800">
                            <img
                                src={sustainableFishingImg}
                                alt="Sustainable fishing"
                                width="400"
                                height="300"
                                loading="lazy"
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <GlobalTransportMap />

            {/* Lead Capture Section */}
            <NewsletterTrap />

            {/* Sticky WhatsApp Enquiry Bubble */}
            <motion.div
                className="fixed bottom-8 right-8 z-40"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
            >
                <div className="flex flex-col gap-4">
                    {/* WhatsApp Button */}
                    <a 
                        href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-emerald-500 rounded-full blur animate-pulse"></div>
                        <div className="relative w-16 h-16 bg-emerald-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border-2 border-emerald-400">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8 brightness-0 invert" />
                            </motion.div>
                        </div>
                        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-midnight-900 text-white text-xs py-2 px-4 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            {t('hero.whatsapp')}
                            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-midnight-900"></div>
                        </div>
                    </a>

                    {/* Email/Quote Button */}
                    <Link to="/contact" className="relative group">
                        <div className="absolute inset-0 bg-gold-500 rounded-full blur-sm opacity-50"></div>
                        <div className="relative w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border-2 border-gold-500">
                            <MessageSquare className="text-midnight-900 w-8 h-8" />
                        </div>
                        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-midnight-900 text-white text-xs py-2 px-4 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            {t('home.quote.tooltip')}
                            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-midnight-900"></div>
                        </div>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
