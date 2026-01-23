import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Anchor, Fish, FlaskConical, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('shrimp');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const tabs = [
    { id: 'shrimp', label: 'Shrimp Division', icon: Anchor },
    { id: 'seafood', label: 'Seafood Division', icon: Fish },
    { id: 'bio', label: 'Bio-Products', icon: FlaskConical },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-[1800px] mx-auto px-6">

        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold text-midnight-900 mb-6"
          >
            Start Your <span className="text-gold-600">Shipment</span>
          </motion.h1>
          <p className="text-gray-500 text-lg">
            Direct access to our export managers. Responses guaranteed within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">

          {/* Contact Info - Left Col */}
          <div className="xl:col-span-4 space-y-8">
             <div className="bg-midnight-900 text-white p-10 rounded-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-32 bg-gold-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>

                 <h3 className="text-2xl font-serif font-bold mb-8">Global Headquarters</h3>

                 <div className="space-y-8 relative z-10">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <MapPin className="text-gold-500" />
                        </div>
                        <div>
                            <p className="font-bold text-lg">Veraval Facility</p>
                            <p className="text-white/60 leading-relaxed">
                                GIDC Estate, Harbour Road<br/>
                                Gujarat, India 362265
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <Phone className="text-gold-500" />
                        </div>
                        <div>
                            <p className="font-bold text-lg">24/7 Export Desk</p>
                            <p className="text-white/60 font-mono">+91 98765 43210</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <Mail className="text-gold-500" />
                        </div>
                        <div>
                            <p className="font-bold text-lg">Email</p>
                            <p className="text-white/60">export@mahadevmarine.com</p>
                        </div>
                    </div>
                 </div>
             </div>

             {/* Simple Map */}
             <div className="h-80 bg-gray-200 rounded-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.5312411030046!2d70.3667!3d20.9042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bfd3234567890ab%3A0x1234567890abcdef!2sVeraval%20Port!5e0!3m2!1sen!2sin!4v1625637281920!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Veraval Location"
                ></iframe>
             </div>
          </div>

          {/* Tabbed Form - Right Col */}
          <div className="xl:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-6 flex items-center justify-center gap-3 transition-all relative ${
                                activeTab === tab.id ? 'bg-white text-midnight-900' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            <tab.icon size={20} className={activeTab === tab.id ? 'text-gold-600' : ''} />
                            <span className="font-bold uppercase tracking-wider text-sm hidden sm:inline">{tab.label}</span>
                            {activeTab === tab.id && (
                                <div className="absolute top-0 left-0 w-full h-1 bg-gold-500"></div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="p-8 lg:p-12 min-h-[500px]">
                    <AnimatePresence mode='wait'>
                        {!submitted ? (
                            <motion.form
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                onSubmit={handleSubmit}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Name</label>
                                        <input required type="text" className="w-full border-b-2 border-gray-200 py-3 focus:border-gold-500 outline-none transition-colors bg-transparent placeholder-gray-300" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Company</label>
                                        <input required type="text" className="w-full border-b-2 border-gray-200 py-3 focus:border-gold-500 outline-none transition-colors bg-transparent placeholder-gray-300" placeholder="Ocean Foods Ltd." />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Work Email</label>
                                        <input required type="email" className="w-full border-b-2 border-gray-200 py-3 focus:border-gold-500 outline-none transition-colors bg-transparent placeholder-gray-300" placeholder="john@company.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Destination Port</label>
                                        <input required type="text" className="w-full border-b-2 border-gray-200 py-3 focus:border-gold-500 outline-none transition-colors bg-transparent placeholder-gray-300" placeholder="New York, USA" />
                                    </div>
                                </div>

                                {/* Dynamic Fields based on Tab */}
                                {activeTab === 'shrimp' && (
                                    <div className="p-6 bg-slate-50 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Product</label>
                                            <select className="w-full bg-white border border-gray-200 rounded-md py-2 px-3 text-sm">
                                                <option>Vannamei</option>
                                                <option>Black Tiger</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Size</label>
                                            <select className="w-full bg-white border border-gray-200 rounded-md py-2 px-3 text-sm">
                                                <option>16/20</option>
                                                <option>21/25</option>
                                                <option>26/30</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Type</label>
                                            <select className="w-full bg-white border border-gray-200 rounded-md py-2 px-3 text-sm">
                                                <option>IQF</option>
                                                <option>Block</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Glaze %</label>
                                            <input type="number" className="w-full bg-white border border-gray-200 rounded-md py-2 px-3 text-sm" placeholder="20" />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'bio' && (
                                    <div className="p-6 bg-slate-50 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <input type="checkbox" id="sample" className="w-5 h-5 text-gold-600 rounded focus:ring-gold-500" />
                                            <label htmlFor="sample" className="font-medium text-gray-700">Request 100g Lab Sample</label>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Additional Requirements</label>
                                    <textarea rows={4} className="w-full border-b-2 border-gray-200 py-3 focus:border-gold-500 outline-none transition-colors bg-transparent resize-none placeholder-gray-300" placeholder="Specific packaging, documents required..."></textarea>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button className="bg-midnight-900 text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-midnight-800 transition-all flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                        Submit Request <Send size={18} />
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-20"
                            >
                                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-8">
                                    <CheckCircle size={48} />
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-midnight-900 mb-4">Request Received</h3>
                                <p className="text-gray-500 max-w-md">
                                    Thank you. Our {activeTab} division manager will review your specs and send a proforma invoice within 24 hours.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 text-gold-600 font-bold uppercase tracking-wider text-sm hover:underline"
                                >
                                    Send Another Request
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
