import React from 'react';
import { Anchor, Mail, Phone, MapPin, Facebook, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <footer className="bg-midnight-950 text-white pt-24 pb-12 border-t border-white/5 relative z-10">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="inline-flex flex-col group w-fit">
              <div className="flex items-center gap-3 mb-2">
                <img src={logo} alt="Mahadev Marine" className="h-14 w-auto object-contain" />
                <span className="text-3xl font-serif font-bold">Mahadev<span className="text-gold-500">Marine</span></span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Premium seafood sourcing from the Indian Ocean. We connect artisanal fishing integrity with industrial-scale global logistics.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Instagram, label: 'Instagram' }
              ].map(({ Icon, label }, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold-600 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <Icon size={18} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-8">Divisions</h4>
            <ul className="space-y-4">
              {['Shrimp Division', 'Seafood Exports', 'Bio-Products', 'Logistics'].map((link) => (
                <li key={link}>
                  <Link to="/products" className="text-white/70 hover:text-white transition-colors text-sm flex items-center group w-fit">
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-8">Headquarters</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-gold-500 shrink-0 mt-1" />
                <span className="text-white/70 text-sm leading-relaxed">123 Harbour Road, GIDC Estate<br />Veraval, Gujarat - 362265</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-gold-500 shrink-0" />
                <span className="text-white/70 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-gold-500 shrink-0" />
                <span className="text-white/70 text-sm">export@mahadevmarine.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-8">Market Insights</h4>
            <p className="text-white/60 text-sm mb-6">Receive weekly pricing updates for Black Tiger & Vannamei.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex border-b border-white/20 pb-2 focus-within:border-gold-500 transition-colors">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Email address"
                required
                className="bg-transparent text-white w-full focus:outline-none placeholder-white/30 text-sm"
              />
              <button type="submit" aria-label="Subscribe" className="text-gold-500 hover:text-white transition-colors p-1">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 uppercase tracking-widest gap-4">
          <p>© {new Date().getFullYear()} Mahadev Marine Exports.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Trade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
