import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Globe, Zap, Target, Award, CheckCircle, Package, BarChart } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const BenefitSections = () => {
    const { t } = useTranslation();

    const whyFeatures = [
        { key: 'home.why.feature1', icon: ShieldCheck },
        { key: 'home.why.feature2', icon: Target },
        { key: 'home.why.feature3', icon: Award },
        { key: 'home.why.feature4', icon: BarChart },
        { key: 'home.why.feature5', icon: Truck },
        { key: 'home.why.feature6', icon: Zap },
    ];

    const processSteps = [
        { key: 'home.process.step1', icon: Globe },
        { key: 'home.process.step2', icon: ShieldCheck },
        { key: 'home.process.step3', icon: Target },
        { key: 'home.process.step4', icon: Package },
        { key: 'home.process.step5', icon: Truck },
        { key: 'home.process.step6', icon: CheckCircle },
    ];

    const companyStrength = [
        { key: 'home.strength.item1', value: '500+ Tons' },
        { key: 'home.strength.item2', value: 'Global' },
        { key: 'home.strength.item3', value: 'Timely' },
        { key: 'home.strength.item4', value: 'Premium' },
    ];

    return (
        <div className="space-y-32 py-24 bg-white">
            {/* Why Choose Us */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-midnight-900 mb-6">{t('home.why.title')}</h2>
                    <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {whyFeatures.map((feature, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors">
                                <feature.icon className="text-gold-600 group-hover:text-white" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-midnight-800 mb-2">{t(feature.key)}</h3>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Export Process */}
            <section className="bg-midnight-950 py-24">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-16">{t('home.process.title')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
                        {processSteps.map((step, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group"
                            >
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-500 transition-colors">
                                    <step.icon className="text-gold-500 group-hover:text-midnight-900" size={28} />
                                </div>
                                <span className="absolute top-0 right-1/4 w-8 h-8 rounded-full bg-gold-600 text-midnight-900 text-sm font-bold flex items-center justify-center border-4 border-midnight-950">
                                    {i + 1}
                                </span>
                                <h3 className="text-sm font-medium text-white/80 leading-snug">{t(step.key)}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Strength */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-serif text-midnight-900 mb-8">{t('home.strength.title')}</h2>
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center">
                                        <CheckCircle className="text-gold-600" size={16} />
                                    </div>
                                    <span className="text-lg text-slate-700 font-medium">{t(`home.strength.item${i}`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-8 bg-slate-50 rounded-2xl text-center border border-slate-100">
                            <div className="text-4xl font-bold text-midnight-800 mb-2">500+</div>
                            <div className="text-sm text-gold-600 font-bold uppercase tracking-wider">Tons Supply</div>
                        </div>
                        <div className="p-8 bg-midnight-900 rounded-2xl text-center shadow-xl">
                            <div className="text-4xl font-bold text-white mb-2">25+</div>
                            <div className="text-sm text-gold-500 font-bold uppercase tracking-wider">Years Exp</div>
                        </div>
                        <div className="p-8 bg-midnight-900 rounded-2xl text-center shadow-xl">
                            <div className="text-4xl font-bold text-white mb-2">40+</div>
                            <div className="text-sm text-gold-500 font-bold uppercase tracking-wider">Countries</div>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-2xl text-center border border-slate-100">
                            <div className="text-4xl font-bold text-midnight-800 mb-2">100%</div>
                            <div className="text-sm text-gold-600 font-bold uppercase tracking-wider">Quality</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BenefitSections;
