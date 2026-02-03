import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Scale, Truck, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Terms = () => {
    const { t } = useTranslation();

    return (
        <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gold-50 rounded-full">
                        <Scale className="w-8 h-8 text-gold-600" />
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-midnight-900">Terms of Trade</h1>
                </div>

                <div className="prose prose-lg prose-blue max-w-none text-gray-600 space-y-8">
                    <p className="lead">
                        These Terms & Conditions govern the sale of products by Mahadev Marine Exports to our global partners. By placing an order, you agree to be bound by these terms.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-midnight-800 flex items-center gap-2 mb-3">
                                <Truck size={18} className="text-gold-500" /> Shipping & Incoterms
                            </h3>
                            <p className="text-sm">Unless otherwise agreed, all shipments are CIF (Cost, Insurance, and Freight). Risk transfers to the buyer upon loading at the port of origin.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-midnight-800 flex items-center gap-2 mb-3">
                                <AlertCircle size={18} className="text-gold-500" /> Quality Claims
                            </h3>
                            <p className="text-sm">Any claims regarding quality or quantity must be made in writing within 7 days of cargo arrival, accompanied by a surveyor's report.</p>
                        </div>
                    </div>

                    <section>
                        <h2 className="text-xl font-bold text-midnight-800">Payment Terms</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Standard:</strong> 30% Advance, Balance against Scan Copy of BL.</li>
                            <li><strong>L/C:</strong> Irrevocable Letter of Credit at sight from a prime bank is accepted for orders above $50,000.</li>
                            <li><strong>Currency:</strong> All invoices are raised in USD unless otherwise negotiated.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-midnight-800">Force Majeure</h2>
                        <p>Mahadev Marine Exports shall not be liable for delays caused by natural disasters, strikes, political unrest, or other events beyond our reasonable control.</p>
                    </section>

                    <div className="text-sm text-gray-500 mt-12 pt-8 border-t">
                        Effective Date: January 1, 2024<br />
                        Mahadev Marine Exports, Veraval, Gujarat, India.
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Terms;
