import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import icon from '../../assets/images/icon_premium.png';
import logo from '../../assets/images/logo_premium.png';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          type: 'newsletter',
          message: 'Footer Subscription'
        }),
      });
      alert(t('footer.thankYou') || 'Subscribed successfully!');
      setEmail('');
    } catch (error) {
      console.error('Newsletter error', error);
    }
  };

  return (
    <footer className="bg-midnight-950 text-white pt-24 pb-12 border-t border-white/5 relative z-10">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="inline-flex flex-col group w-fit pr-4">
              <div className="flex items-center gap-6 sm:gap-8 mb-4 transition-transform duration-500 hover:scale-105">
                <img src={icon} alt="VV Icon" className="h-[7rem] w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500 mr-2" />
                <div className="flex flex-col">
                  <span className="text-3xl font-serif font-bold text-white">{t('brand.vv')} <span className="text-gold-500">{t('brand.marine')}</span></span>
                  <span className="text-[11px] tracking-[0.4em] uppercase text-ocean-300 font-bold mt-1">{t('brand.exports')}</span>
                </div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {t('brand.description')}
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com/vvmarine' },
                { Icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/vv-marine-exports' },
                { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/vv_marine_exports?utm_source=qr&igsh=bTd6NTJwbG5nYTdz' }
              ].map(({ Icon, label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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
            <h4 className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-8">{t('footer.divisions')}</h4>
            <ul className="space-y-4">
              {[
                { key: 'footer.shrimpDivision' },
                { key: 'footer.seafoodExports' },
                { key: 'footer.bioProducts' },
                { key: 'footer.logistics' }
              ].map((item) => (
                <li key={item.key}>
                  <Link to="/products" className="text-white/70 hover:text-white transition-colors text-sm flex items-center group w-fit">
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-8">{t('footer.headquarters')}</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-gold-500 shrink-0 mt-1" />
                <span className="text-white/70 text-sm leading-relaxed">{t('footer.address')}<br />{t('footer.city')}</span>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-gold-500 shrink-0 mt-1" />
                <span className="text-white/70 text-sm">
                  +91 9392505751<br />
                  +91 7032367611
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-gold-500 shrink-0" />
                <span className="text-white/70 text-sm">export@vvmarine.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-8">{t('footer.marketInsights')}</h4>
            <p className="text-white/60 text-sm mb-6">{t('footer.newsletter')}</p>
            <form onSubmit={handleNewsletterSubmit} className="flex border-b border-white/20 pb-2 focus-within:border-gold-500 transition-colors">
              <label htmlFor="newsletter-email" className="sr-only">{t('footer.emailPlaceholder')}</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder')}
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
          <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacyPolicy') || 'Privacy Policy'}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{t('footer.termsOfTrade') || 'Terms of Trade'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
