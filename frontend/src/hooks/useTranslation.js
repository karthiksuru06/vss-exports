import React, { useState, useContext, createContext } from 'react';

// Mock translation dictionary
const DICTIONARY = {
  en: {
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.contact': 'Contact',
    'hero.title': 'Depth to Destination',
    'hero.subtitle': 'Global Excellence in Premium Seafood Exports',
    'cta.enquire': 'Request Quote',
    'cta.explore': 'Explore Divisions',
  },
  hi: {
    'nav.home': 'होम',
    'nav.products': 'उत्पाद',
    'nav.contact': 'संपर्क',
    'hero.title': 'गहराई से गंतव्य तक',
    'hero.subtitle': 'प्रीमियम समुद्री भोजन निर्यात में वैश्विक उत्कृष्टता',
    'cta.enquire': 'कोटेशन अनुरोध',
    'cta.explore': 'श्रेणियाँ देखें',
  },
  zh: {
    'nav.home': '首页',
    'nav.products': '产品',
    'nav.contact': '联系我们',
    'hero.title': '从深海到目的地',
    'hero.subtitle': '全球优质海鲜出口卓越品质',
    'cta.enquire': '询价',
    'cta.explore': '探索部门',
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.products': '製品',
    'nav.contact': 'お問い合わせ',
    'hero.title': '深海から目的地まで',
    'hero.subtitle': 'プレミアムシーフード輸出における世界的な卓越性',
    'cta.enquire': '見積もり依頼',
    'cta.explore': '部門を探す',
  }
};

const TranslationContext = createContext(undefined);

export const TranslationProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return DICTIONARY[lang][key] || DICTIONARY['en'][key] || key;
  };

  return React.createElement(
    TranslationContext.Provider,
    { value: { lang, setLang, t } },
    children
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
