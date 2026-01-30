import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Anchor, Fish, FlaskConical } from 'lucide-react';
import { DIVISIONS } from '../../utils/constants';

const icons = {
  Shrimp: <Anchor />,
  Fish: <Fish />,
  FlaskConical: <FlaskConical />
};

const DivisionShowcase = () => {
  return (
    <section className="py-24 bg-midnight-900 relative">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Our Divisions</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DIVISIONS.map((division, idx) => (
            <motion.div
              key={division.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className={`group relative overflow-hidden rounded-sm border-2 ${division.color} border-opacity-30 hover:border-opacity-100 transition-colors duration-500 flex flex-col min-h-[500px] md:h-[600px] shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                <div className="absolute inset-0 bg-midnight-900/60 group-hover:bg-midnight-900/40 transition-colors duration-500 z-10" />
                <img
                  src={division.image}
                  alt={division.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Content Overlay */}
              <div className="relative z-20 h-full flex flex-col justify-end p-8 lg:p-12">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-6 border border-white/20">
                    {icons[division.icon]}
                  </div>

                  <h3 className="text-3xl font-serif font-bold text-white mb-4">
                    {division.title}
                  </h3>

                  <div className="w-full h-px bg-white/30 mb-6 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  <p className="text-ocean-100/80 text-lg mb-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 line-clamp-3">
                    {division.description}
                  </p>

                  <ul className="space-y-2 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    {division.features.map((feat, i) => (
                      <li key={i} className="flex items-center text-sm text-gold-400 font-medium uppercase tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-2"></span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link to="/products" className="inline-block">
                    <span className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm border-b border-gold-500 pb-1 hover:text-gold-500 transition-colors cursor-pointer">
                      View Catalog <ArrowUpRight size={16} />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Decorative Number */}
              <div className="absolute top-6 right-6 text-9xl font-serif font-bold text-white/5 z-0 pointer-events-none">
                0{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DivisionShowcase;
