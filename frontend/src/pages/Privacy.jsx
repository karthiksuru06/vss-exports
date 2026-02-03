import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Shield, Lock, FileText, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Privacy = () => {
    const { t } = useTranslation();

    return (
        <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-ocean-50 rounded-full">
                        <Lock className="w-8 h-8 text-ocean-600" />
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-midnight-900">Privacy Policy</h1>
                </div>

                <div className="prose prose-lg prose-blue max-w-none text-gray-600 space-y-8">
                    <p className="lead">
                        At Mahadev Marine Exports, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information in our global operations.
                    </p>

                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-midnight-800 flex items-center gap-2 mb-4">
                            <Globe size={20} className="text-gold-500" />
                            Data Collection
                        </h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Personal Information:</strong> Name, contact details, and company information provided through inquiry forms.</li>
                            <li><strong>Technical Data:</strong> IP addresses, browser type, and usage patterns for site optimization.</li>
                            <li><strong>Transaction Data:</strong> Details about payments and orders for processing (securely encrypted).</li>
                        </ul>
                    </section>

                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-midnight-800 flex items-center gap-2 mb-4">
                            <Shield size={20} className="text-gold-500" />
                            Security Measures
                        </h2>
                        <p>
                            We employ industry-standard SSL encryption and secure database protocols to protect your data. Access to sensitive information is restricted to authorized personnel only.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-midnight-800 mb-2">Cookies</h3>
                        <p>We use essential cookies to ensure the proper functioning of our website and to analyze traffic patterns. You can manage your cookie preferences through your browser settings.</p>
                    </section>

                    <div className="text-sm text-gray-500 mt-12 pt-8 border-t">
                        Last Updated: January 2026<br />
                        For questions, contact: <a href="mailto:privacy@mahadevmarine.com" className="text-ocean-600 hover:underline">privacy@mahadevmarine.com</a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Privacy;
