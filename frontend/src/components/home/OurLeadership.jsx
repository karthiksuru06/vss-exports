import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Zap, Globe } from 'lucide-react';
import { CONTACT_INFO } from '../../utils/constants';

const OurLeadership = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 skew-x-12 translate-x-20 pointer-events-none"></div>
            
            <div className="max-w-[1800px] mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <span className="h-px w-12 bg-gold-600"></span>
                            <span className="text-gold-600 font-bold uppercase tracking-[0.3em] text-xs">Visionaries</span>
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-serif font-bold text-midnight-900 leading-tight"
                        >
                            Our <span className="text-gold-600 italic">Leadership</span>
                        </motion.h2>
                    </div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 max-w-md text-right md:text-left"
                    >
                        Driven by excellence and a commitment to global seafood standards, our directors bring decades of combined expertise to VV Marine.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {CONTACT_INFO.contacts.map((leader, index) => (
                        <motion.div
                            key={leader.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-slate-50 rounded-2xl p-8 lg:p-12 border border-slate-100 hover:border-gold-500/30 transition-all duration-500"
                        >
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-bl-full group-hover:bg-gold-500/10 transition-colors"></div>
                            
                            <div className="flex flex-col h-full">
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-20 h-20 rounded-2xl bg-midnight-900 flex items-center justify-center text-gold-500 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                        <User size={40} strokeWidth={1.5} />
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xs font-bold text-gold-600 uppercase tracking-widest mb-1">Director</span>
                                        <span className="block text-slate-400 text-sm font-medium italic">VV Marine Exports</span>
                                    </div>
                                </div>

                                <h3 className="text-3xl font-serif font-bold text-midnight-900 mb-2 group-hover:text-gold-700 transition-colors">
                                    {leader.name}
                                </h3>
                                <p className="text-gold-600 font-bold text-sm uppercase tracking-wider mb-6">
                                    {leader.title}
                                </p>
                                
                                <div className="h-px w-full bg-slate-200 mb-8 relative overflow-hidden">
                                    <motion.div 
                                        className="absolute inset-0 bg-gold-500 w-full"
                                        initial={{ x: '-100%' }}
                                        whileInView={{ x: '100%' }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                    />
                                </div>

                                <div className="space-y-6 mb-10 flex-grow">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 p-2 bg-white rounded-lg text-ocean-600 shadow-sm">
                                            {index === 0 ? <Globe size={18} /> : <Zap size={18} />}
                                        </div>
                                        <div>
                                            <p className="text-midnight-800 font-medium text-lg leading-relaxed">
                                                {leader.responsibility}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100">
                                    <a 
                                        href={`tel:${leader.phone}`}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-midnight-900 text-white rounded-full text-sm font-bold hover:bg-gold-600 transition-colors duration-300"
                                    >
                                        {leader.phone}
                                    </a>
                                    <a 
                                        href={`mailto:${leader.email}`}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-midnight-900 rounded-full text-sm font-bold hover:border-gold-500 transition-colors duration-300"
                                    >
                                        Contact Email
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            
            {/* Fine print or certification badge */}
            <div className="mt-20 flex justify-center px-6">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex items-center gap-6 py-4 px-8 bg-slate-50 rounded-full border border-slate-100"
                >
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full bg-midnight-900 border-2 border-slate-50 flex items-center justify-center text-[10px] text-gold-500 font-bold">VV</div>
                        ))}
                    </div>
                    <span className="text-sm font-medium text-slate-500 italic">Trusted by global partners for excellence in marine exports.</span>
                </motion.div>
            </div>
        </section>
    );
};

export default OurLeadership;
