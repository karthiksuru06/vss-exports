// Import local videos for products
import shrimpVideo1 from '../assets/images/WhatsApp Video 2026-01-27 at 7.09.57 PM.mp4';
import shrimpVideo2 from '../assets/images/WhatsApp Video 2026-01-27 at 7.09.57 PM (1).mp4';
import processingVideo from '../assets/images/Prawn_Processing_Documentary_Footage_Generated.mp4';
import packingVideo from '../assets/images/Seafood_Export_Packing_Floor_Video.mp4';
import facilityVideo1 from '../assets/images/WhatsApp Video 2026-01-28 at 10.04.02 AM.mp4';
import facilityVideo2 from '../assets/images/WhatsApp Video 2026-01-28 at 10.04.05 AM.mp4';
import facilityVideo3 from '../assets/images/WhatsApp Video 2026-01-28 at 10.04.06 AM.mp4';
import facilityVideo4 from '../assets/images/WhatsApp Video 2026-01-28 at 10.04.06 AM (1).mp4';

// Import product images (WhatsApp images from assets folder)
// These will be dynamically assigned to products
import productImg1 from '../assets/WhatsApp Image 2026-01-28 at 10.09.59 AM.jpeg';
import productImg2 from '../assets/WhatsApp Image 2026-01-28 at 10.09.59 AM (1).jpeg';
import productImg3 from '../assets/WhatsApp Image 2026-01-28 at 10.10.00 AM.jpeg';
import productImg4 from '../assets/WhatsApp Image 2026-01-28 at 10.10.00 AM (1).jpeg';
import productImg5 from '../assets/WhatsApp Image 2026-01-28 at 10.10.00 AM (2).jpeg';
import productImg6 from '../assets/WhatsApp Image 2026-01-28 at 10.10.00 AM (3).jpeg';
import productImg7 from '../assets/WhatsApp Image 2026-01-28 at 10.10.00 AM (4).jpeg';
import productImg8 from '../assets/WhatsApp Image 2026-01-28 at 10.10.00 AM (5).jpeg';
import productImg9 from '../assets/WhatsApp Image 2026-01-28 at 10.10.00 AM (6).jpeg';
import productImg10 from '../assets/WhatsApp Image 2026-01-28 at 10.10.00 AM (7).jpeg';
import productImg11 from '../assets/WhatsApp Image 2026-01-28 at 10.10.00 AM (8).jpeg';
import productImg12 from '../assets/WhatsApp Image 2026-01-28 at 10.10.01 AM.jpeg';
import productImg13 from '../assets/WhatsApp Image 2026-01-28 at 10.10.01 AM (1).jpeg';
import productImg14 from '../assets/WhatsApp Image 2026-01-28 at 10.10.01 AM (2).jpeg';
import productImg15 from '../assets/WhatsApp Image 2026-01-28 at 10.10.01 AM (3).jpeg';
import productImg16 from '../assets/WhatsApp Image 2026-01-28 at 10.10.02 AM.jpeg';
import productImg17 from '../assets/WhatsApp Image 2026-01-28 at 10.10.02 AM (1).jpeg';
import productImg18 from '../assets/WhatsApp Image 2026-01-28 at 10.10.04 AM.jpeg';
import productImg19 from '../assets/WhatsApp Image 2026-01-28 at 10.10.04 AM (1).jpeg';

// Placeholder image for products without specific images
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=800&auto=format&fit=crop';

// Helper function to safely get image with fallback
export const getProductImage = (image) => image || PLACEHOLDER_IMAGE;

export const NAV_ITEMS = [
  { label: 'nav.home', path: '/' },
  { label: 'nav.products', path: '/products' },
  { label: 'nav.contact', path: '/contact' },
];

export const STATS = [
  { value: 25, suffix: '+', label: 'Years Legacy' },
  { value: 50, suffix: '+', label: 'Global Destinations' },
  { value: 1200, suffix: 'MT', label: 'Monthly Volume' },
  { value: 100, suffix: '%', label: 'Traceability' },
];

// Updated divisions based on product catalog
export const DIVISIONS = [
  {
    id: 'raw-shrimp',
    title: 'Raw Shrimp',
    description: 'Premium sea-caught and aquaculture shrimp varieties with superior taste and texture.',
    icon: 'Shrimp',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=1000&auto=format&fit=crop',
    color: 'border-gold-600',
    features: ['Sea-Caught', 'Aquaculture', 'Zero Preservatives']
  },
  {
    id: 'raw-peeled',
    title: 'Raw Peeled Products',
    description: 'Restaurant-ready peeled shrimp in various processing styles for professional kitchens.',
    icon: 'UtensilsCrossed',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop',
    color: 'border-ocean-400',
    features: ['PDTO', 'PD', 'Easy-Peel', 'IQF Available']
  },
  {
    id: 'cooked',
    title: 'Cooked Ready-to-Eat',
    description: 'Fully cooked, flash-frozen shrimp ready for immediate use. No further cooking required.',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?q=80&w=1000&auto=format&fit=crop',
    color: 'border-orange-500',
    features: ['Ready-to-Eat', '18 Months Shelf Life', 'Heat & Serve']
  },
  {
    id: 'value-added',
    title: 'Value-Added Premium',
    description: 'Specialty preparations including butterfly, nobashi, and breaded products for premium markets.',
    icon: 'Star',
    image: 'https://images.unsplash.com/photo-1626804475297-411dbe631267?q=80&w=1000&auto=format&fit=crop',
    color: 'border-yellow-500',
    features: ['Butterfly Cut', 'Sushi-Grade', 'Restaurant Quality']
  },
  {
    id: 'fresh-seafood',
    title: 'Fresh Seafood',
    description: 'Premium fresh seafood delivered via air cargo within 48-72 hours globally.',
    icon: 'Plane',
    image: 'https://images.unsplash.com/photo-1534942205242-a42d3c2a117b?q=80&w=1000&auto=format&fit=crop',
    color: 'border-cyan-500',
    features: ['Air Cargo', '48-72 Hours Delivery', 'Live Available']
  },
  {
    id: 'bio',
    title: 'Bio-Products',
    description: 'Industrial marine extracts: Chitin & Chitosan for pharmaceutical and industrial applications.',
    icon: 'FlaskConical',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1000&auto=format&fit=crop',
    color: 'border-indigo-500',
    features: ['Pharma Grade', 'High Purity', 'Sustainable']
  },
];

// Comprehensive shrimp size grades (count per LB - international export standard)
export const SIZE_GRADES = [
  '8/12', '10/15', '16/20', '21/25', '26/30', '31/40',
  '41/50', '51/60', '61/70', '71/90', '91/120', '121/150', '151/200', '200/300'
];

// Glaze percentage options
export const GLAZE_OPTIONS = {
  standard: '10%-15%',
  custom: 'Up to 40%-50%'
};

// ============================================================================
// COMPREHENSIVE PRODUCTS CATALOG
// Based on Mahadev Marine Exports Product Catalog (December 2025)
// With multi-language support for arc wheel display
// ============================================================================

export const PRODUCTS = [
  // ============================================================================
  // RAW SHRIMP VARIETIES - SEA-CAUGHT
  // ============================================================================
  {
    id: 'sea-tiger',
    name: 'Sea Tiger Shrimp',
    nameKey: 'product.seaTiger',
    scientificName: 'Penaeus semisulcatus',
    description: 'Premium naturally-sourced shrimp with superior taste and texture. Large, meaty, distinctive flavor profile perfect for high-end culinary applications.',
    descriptionKey: 'product.seaTiger.desc',
    image: productImg1,
    video: shrimpVideo1,
    category: 'Sea-Caught Shrimp',
    categoryKey: 'category.seaCaught',
    division: 'raw-shrimp',
    processingType: ['Head-On', 'Head-Less', 'Whole Round'],
    specs: {
      sizes: ['U/5', '6/8', '8/12', '13/15', '16/20'],
      packing: ['2kg x 6 Block', '1kg IQF', '10kg Bulk'],
      glaze: ['10%', '15%', '20%', 'Custom'],
      origin: 'Indian Ocean (Wild Catch)',
      certifications: ['HACCP', 'BRC', 'BAP']
    },
    highlights: ['Large & Meaty', 'Distinctive Flavor', 'Premium Quality'],
    bestFor: ['Fine Dining', 'Grilling', 'Special Occasions'],
    // Multi-language info for arc wheel display
    info: {
      en: {
        name: 'Sea Tiger Shrimp',
        category: 'Sea-Caught Shrimp',
        description: 'Premium naturally-sourced shrimp with superior taste and texture',
        sizes: 'U/5 to 16/20',
        origin: 'Indian Ocean (Wild Catch)',
        processing: 'Head-On, Head-Less, Whole Round',
        packaging: '2kg Block, 1kg IQF, 10kg Bulk',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'सी टाइगर झींगा',
        category: 'समुद्री झींगा',
        description: 'बेहतरीन स्वाद और बनावट के साथ प्रीमियम प्राकृतिक झींगा',
        sizes: 'U/5 से 16/20',
        origin: 'हिंद महासागर (जंगली)',
        processing: 'सिर सहित, बिना सिर, पूर्ण गोल',
        packaging: '2kg ब्लॉक, 1kg IQF, 10kg थोक',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: '海虎虾',
        category: '海捕虾',
        description: '口感鲜美、质地优良的优质天然虾',
        sizes: 'U/5 至 16/20',
        origin: '印度洋（野生捕捞）',
        processing: '带头、去头、整虾',
        packaging: '2kg块冻, 1kg IQF, 10kg散装',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: 'シータイガーエビ',
        category: '天然海老',
        description: '優れた味わいと食感を持つプレミアム天然エビ',
        sizes: 'U/5 〜 16/20',
        origin: 'インド洋（天然）',
        processing: '有頭、無頭、丸ごと',
        packaging: '2kgブロック, 1kg IQF, 10kgバルク',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },
  {
    id: 'white-shrimp',
    name: 'White Shrimp',
    nameKey: 'product.whiteShrimp',
    scientificName: 'Penaeus indicus',
    description: 'Mild, sweet, versatile shrimp perfect for any cuisine. Clean taste profile that adapts well to various cooking methods and seasonings.',
    descriptionKey: 'product.whiteShrimp.desc',
    image: productImg2,
    video: shrimpVideo2,
    category: 'Sea-Caught Shrimp',
    categoryKey: 'category.seaCaught',
    division: 'raw-shrimp',
    processingType: ['Head-On', 'Head-Less', 'Peeled'],
    specs: {
      sizes: ['16/20', '21/25', '26/30', '31/40', '41/50'],
      packing: ['2kg x 6 Block', '1kg IQF'],
      glaze: ['10%', '15%', 'Custom'],
      origin: 'Indian Ocean (Wild Catch)',
      certifications: ['HACCP', 'BRC', 'BAP']
    },
    highlights: ['Mild & Sweet', 'Versatile', 'Clean Taste'],
    bestFor: ['Any Cuisine', 'Stir-Fry', 'Curries', 'Salads'],
    info: {
      en: {
        name: 'White Shrimp',
        category: 'Sea-Caught Shrimp',
        description: 'Mild, sweet, versatile shrimp perfect for any cuisine',
        sizes: '16/20 to 41/50',
        origin: 'Indian Ocean (Wild Catch)',
        processing: 'Head-On, Head-Less, Peeled',
        packaging: '2kg Block, 1kg IQF',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'सफेद झींगा',
        category: 'समुद्री झींगा',
        description: 'किसी भी व्यंजन के लिए हल्का, मीठा, बहुमुखी झींगा',
        sizes: '16/20 से 41/50',
        origin: 'हिंद महासागर (जंगली)',
        processing: 'सिर सहित, बिना सिर, छिला हुआ',
        packaging: '2kg ब्लॉक, 1kg IQF',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: '白虾',
        category: '海捕虾',
        description: '口感温和、甜美，适合各种烹饪方式',
        sizes: '16/20 至 41/50',
        origin: '印度洋（野生捕捞）',
        processing: '带头、去头、去壳',
        packaging: '2kg块冻, 1kg IQF',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: 'ホワイトシュリンプ',
        category: '天然海老',
        description: 'どんな料理にも合うマイルドで甘い万能エビ',
        sizes: '16/20 〜 41/50',
        origin: 'インド洋（天然）',
        processing: '有頭、無頭、むきエビ',
        packaging: '2kgブロック, 1kg IQF',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },
  {
    id: 'pink-brown-shrimp',
    name: 'Pink Brown Shrimp',
    nameKey: 'product.pinkBrown',
    scientificName: 'Metapenaeus monoceros',
    description: 'Tender, delicate shrimp perfect for fine dining. Subtle flavor profile with excellent texture, highly prized in gourmet preparations.',
    descriptionKey: 'product.pinkBrown.desc',
    image: productImg3,
    video: facilityVideo1,
    category: 'Sea-Caught Shrimp',
    categoryKey: 'category.seaCaught',
    division: 'raw-shrimp',
    processingType: ['Head-On', 'Head-Less'],
    specs: {
      sizes: ['31/40', '41/50', '51/60', '61/70'],
      packing: ['2kg Block', '1kg IQF'],
      glaze: ['10%', '15%'],
      origin: 'Indian Ocean (Wild Catch)',
      certifications: ['HACCP', 'BRC']
    },
    highlights: ['Tender', 'Delicate', 'Gourmet Quality'],
    bestFor: ['Fine Dining', 'Tempura', 'Delicate Preparations'],
    info: {
      en: {
        name: 'Pink Brown Shrimp',
        category: 'Sea-Caught Shrimp',
        description: 'Tender, delicate shrimp perfect for fine dining',
        sizes: '31/40 to 61/70',
        origin: 'Indian Ocean (Wild Catch)',
        processing: 'Head-On, Head-Less',
        packaging: '2kg Block, 1kg IQF',
        certification: 'HACCP, BRC'
      },
      hi: {
        name: 'गुलाबी भूरा झींगा',
        category: 'समुद्री झींगा',
        description: 'उत्कृष्ट भोजन के लिए कोमल, नाजुक झींगा',
        sizes: '31/40 से 61/70',
        origin: 'हिंद महासागर (जंगली)',
        processing: 'सिर सहित, बिना सिर',
        packaging: '2kg ब्लॉक, 1kg IQF',
        certification: 'HACCP, BRC'
      },
      zh: {
        name: '粉褐虾',
        category: '海捕虾',
        description: '适合高档餐饮的鲜嫩虾',
        sizes: '31/40 至 61/70',
        origin: '印度洋（野生捕捞）',
        processing: '带头、去头',
        packaging: '2kg块冻, 1kg IQF',
        certification: 'HACCP, BRC'
      },
      ja: {
        name: 'ピンクブラウンシュリンプ',
        category: '天然海老',
        description: '高級料理に最適な柔らかく繊細なエビ',
        sizes: '31/40 〜 61/70',
        origin: 'インド洋（天然）',
        processing: '有頭、無頭',
        packaging: '2kgブロック, 1kg IQF',
        certification: 'HACCP, BRC'
      }
    }
  },

  // ============================================================================
  // RAW SHRIMP VARIETIES - AQUACULTURE
  // ============================================================================
  {
    id: 'vannamei',
    name: 'Vannamei Shrimp',
    nameKey: 'product.vannamei',
    scientificName: 'Litopenaeus vannamei',
    description: 'Most popular global variety with consistent size and quality. Sustainably farm-raised with strict quality controls. Versatile and mild flavor perfect for global cuisines.',
    descriptionKey: 'product.vannamei.desc',
    image: productImg4,
    video: processingVideo,
    category: 'Aquaculture Shrimp',
    categoryKey: 'category.aquaculture',
    division: 'raw-shrimp',
    processingType: ['Head-On', 'Head-Less', 'PD', 'PDTO', 'HMSO'],
    specs: {
      sizes: ['16/20', '21/25', '26/30', '31/40', '41/50', '51/60', '61/70'],
      packing: ['1.8kg Block', '2kg Block', '1kg IQF', '1kg Retail Bag'],
      glaze: ['Net Weight', '5%', '10%', '15%', 'Custom'],
      origin: 'Aquaculture India (Andhra Pradesh)',
      certifications: ['HACCP', 'BRC', 'BAP', 'ASC']
    },
    highlights: ['Most Popular', 'Consistent Quality', 'Sustainable'],
    bestFor: ['Global Cuisines', 'Food Service', 'Retail', 'Industrial'],
    info: {
      en: {
        name: 'Vannamei Shrimp',
        category: 'Aquaculture Shrimp',
        description: 'Most popular global variety with consistent quality',
        sizes: '16/20 to 61/70',
        origin: 'Aquaculture India',
        processing: 'Head-On, Head-Less, PD, PDTO',
        packaging: '1.8kg/2kg Block, 1kg IQF',
        certification: 'HACCP, BRC, BAP, ASC'
      },
      hi: {
        name: 'वन्नामी झींगा',
        category: 'जलकृषि झींगा',
        description: 'सुसंगत गुणवत्ता के साथ सबसे लोकप्रिय वैश्विक किस्म',
        sizes: '16/20 से 61/70',
        origin: 'भारत जलकृषि',
        processing: 'सिर सहित, बिना सिर, PD, PDTO',
        packaging: '1.8kg/2kg ब्लॉक, 1kg IQF',
        certification: 'HACCP, BRC, BAP, ASC'
      },
      zh: {
        name: '南美白对虾',
        category: '养殖虾',
        description: '品质稳定的全球最受欢迎品种',
        sizes: '16/20 至 61/70',
        origin: '印度养殖',
        processing: '带头、去头、PD、PDTO',
        packaging: '1.8kg/2kg块冻, 1kg IQF',
        certification: 'HACCP, BRC, BAP, ASC'
      },
      ja: {
        name: 'バナメイエビ',
        category: '養殖エビ',
        description: '安定した品質で世界で最も人気のある品種',
        sizes: '16/20 〜 61/70',
        origin: 'インド養殖',
        processing: '有頭、無頭、PD、PDTO',
        packaging: '1.8kg/2kgブロック, 1kg IQF',
        certification: 'HACCP, BRC, BAP, ASC'
      }
    }
  },
  {
    id: 'black-tiger',
    name: 'Black Tiger Shrimp',
    nameKey: 'product.blackTiger',
    scientificName: 'Penaeus monodon',
    description: 'The monarch of prawns. Large size with distinctive stripes, firm texture, and sweet flavor. Premium market value with excellent presentation.',
    descriptionKey: 'product.blackTiger.desc',
    image: productImg5,
    video: shrimpVideo1,
    category: 'Aquaculture Shrimp',
    categoryKey: 'category.aquaculture',
    division: 'raw-shrimp',
    processingType: ['Head-On', 'Head-Less', 'Peeled', 'PDTO'],
    specs: {
      sizes: ['U/5', '6/8', '8/12', '13/15', '16/20', '21/25'],
      packing: ['2kg x 6 Block', '1kg IQF'],
      glaze: ['20%', '25%', 'Custom'],
      origin: 'Aquaculture India (Andhra Pradesh)',
      certifications: ['HACCP', 'BRC', 'BAP']
    },
    highlights: ['Premium Quality', 'Large Size', 'Distinctive Stripes'],
    bestFor: ['Fine Dining', 'Grilling', 'Premium Markets'],
    info: {
      en: {
        name: 'Black Tiger Shrimp',
        category: 'Aquaculture Shrimp',
        description: 'The monarch of prawns with distinctive stripes',
        sizes: 'U/5 to 21/25',
        origin: 'Aquaculture India',
        processing: 'Head-On, Head-Less, Peeled, PDTO',
        packaging: '2kg Block, 1kg IQF',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'ब्लैक टाइगर झींगा',
        category: 'जलकृषि झींगा',
        description: 'विशिष्ट धारियों के साथ झींगा का राजा',
        sizes: 'U/5 से 21/25',
        origin: 'भारत जलकृषि',
        processing: 'सिर सहित, बिना सिर, छिला हुआ, PDTO',
        packaging: '2kg ब्लॉक, 1kg IQF',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: '黑虎虾',
        category: '养殖虾',
        description: '虾中之王，条纹独特',
        sizes: 'U/5 至 21/25',
        origin: '印度养殖',
        processing: '带头、去头、去壳、PDTO',
        packaging: '2kg块冻, 1kg IQF',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: 'ブラックタイガー',
        category: '養殖エビ',
        description: '独特の縞模様を持つエビの王様',
        sizes: 'U/5 〜 21/25',
        origin: 'インド養殖',
        processing: '有頭、無頭、むきエビ、PDTO',
        packaging: '2kgブロック, 1kg IQF',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },

  // ============================================================================
  // RAW PEELED PRODUCTS
  // ============================================================================
  {
    id: 'pdto',
    name: 'Peeled Deveined Tail On (PDTO)',
    nameKey: 'product.pdto',
    scientificName: 'Premium Processed',
    description: 'Premium choice for chefs & caterers. Shell & vein completely removed with tail intact for elegant presentation. Translucent pink-white color indicates premium quality.',
    descriptionKey: 'product.pdto.desc',
    image: productImg6,
    video: packingVideo,
    category: 'Raw Peeled',
    categoryKey: 'category.rawPeeled',
    division: 'raw-peeled',
    processingType: ['IQF', 'Block Frozen'],
    specs: {
      sizes: ['16/20', '21/25', '26/30', '31/40', '41/50'],
      packing: ['1kg IQF', '2kg Block', 'Custom'],
      glaze: ['10%', '15%', '20%'],
      origin: 'India',
      certifications: ['HACCP', 'BRC', 'BAP']
    },
    highlights: ['Tail Intact', 'Premium Presentation', 'Restaurant Ready'],
    bestFor: ['Skewers', 'Stir-Fries', 'Fine Dining', 'Cocktail Shrimp'],
    info: {
      en: {
        name: 'PDTO (Peeled Deveined Tail On)',
        category: 'Raw Peeled',
        description: 'Premium choice for chefs with tail intact',
        sizes: '16/20 to 41/50',
        origin: 'India',
        processing: 'IQF, Block Frozen',
        packaging: '1kg IQF, 2kg Block',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'PDTO (छिला हुआ पूंछ सहित)',
        category: 'कच्चा छिला',
        description: 'शेफ के लिए प्रीमियम विकल्प, पूंछ बरकरार',
        sizes: '16/20 से 41/50',
        origin: 'भारत',
        processing: 'IQF, ब्लॉक फ्रोजन',
        packaging: '1kg IQF, 2kg ब्लॉक',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: 'PDTO（去壳去肠留尾）',
        category: '生剥虾',
        description: '厨师首选，保留虾尾',
        sizes: '16/20 至 41/50',
        origin: '印度',
        processing: 'IQF、块冻',
        packaging: '1kg IQF, 2kg块冻',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: 'PDTO（殻むき背わた除去尾付き）',
        category: '生むきエビ',
        description: 'シェフに最適、尾付き',
        sizes: '16/20 〜 41/50',
        origin: 'インド',
        processing: 'IQF、ブロック冷凍',
        packaging: '1kg IQF, 2kgブロック',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },
  {
    id: 'pd',
    name: 'Peeled Deveined Tail Off (PD)',
    nameKey: 'product.pd',
    scientificName: 'Premium Processed',
    description: 'Practical choice for bulk cooking & food service. Completely peeled & deveined with tail removed. Perfect uniformity for industrial cooking with maximum meat yield.',
    descriptionKey: 'product.pd.desc',
    image: productImg7,
    video: facilityVideo2,
    category: 'Raw Peeled',
    categoryKey: 'category.rawPeeled',
    division: 'raw-peeled',
    processingType: ['IQF', 'Block Frozen'],
    specs: {
      sizes: ['21/25', '26/30', '31/40', '41/50', '51/60', '61/70'],
      packing: ['1kg IQF', '2kg Block', 'Bulk'],
      glaze: ['10%', '15%', 'Net Weight'],
      origin: 'India',
      certifications: ['HACCP', 'BRC', 'BAP']
    },
    highlights: ['Maximum Yield', 'Uniform Size', 'Cost-Effective'],
    bestFor: ['Soups', 'Salads', 'Pasta', 'Curries', 'Breading'],
    info: {
      en: {
        name: 'PD (Peeled Deveined)',
        category: 'Raw Peeled',
        description: 'Practical choice for bulk cooking, maximum yield',
        sizes: '21/25 to 61/70',
        origin: 'India',
        processing: 'IQF, Block Frozen',
        packaging: '1kg IQF, 2kg Block, Bulk',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'PD (छिला हुआ)',
        category: 'कच्चा छिला',
        description: 'थोक खाना पकाने के लिए व्यावहारिक विकल्प',
        sizes: '21/25 से 61/70',
        origin: 'भारत',
        processing: 'IQF, ब्लॉक फ्रोजन',
        packaging: '1kg IQF, 2kg ब्लॉक, थोक',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: 'PD（去壳去肠）',
        category: '生剥虾',
        description: '大批量烹饪的实用选择',
        sizes: '21/25 至 61/70',
        origin: '印度',
        processing: 'IQF、块冻',
        packaging: '1kg IQF, 2kg块冻, 散装',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: 'PD（殻むき背わた除去）',
        category: '生むきエビ',
        description: '大量調理に最適、最大収量',
        sizes: '21/25 〜 61/70',
        origin: 'インド',
        processing: 'IQF、ブロック冷凍',
        packaging: '1kg IQF, 2kgブロック, バルク',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },
  {
    id: 'pvpdto',
    name: 'Pulled Vein Tail On (PVPDTO)',
    nameKey: 'product.pvpdto',
    scientificName: 'Premium Processed',
    description: 'Traditional presentation with modern convenience. Shell removed with vein pulled out cleanly, tail retained for visual appeal and easier preparation.',
    descriptionKey: 'product.pvpdto.desc',
    image: productImg8,
    video: facilityVideo3,
    category: 'Raw Peeled',
    categoryKey: 'category.rawPeeled',
    division: 'raw-peeled',
    processingType: ['IQF', 'Block Frozen'],
    specs: {
      sizes: ['16/20', '21/25', '26/30', '31/40'],
      packing: ['1kg IQF', '2kg Block'],
      glaze: ['10%', '15%'],
      origin: 'India',
      certifications: ['HACCP', 'BRC', 'BAP']
    },
    highlights: ['Traditional Style', 'Easy Peel', 'Visual Appeal'],
    bestFor: ['BBQ', 'Grilling', 'Easy-Peel Applications'],
    info: {
      en: {
        name: 'PVPDTO (Pulled Vein Tail On)',
        category: 'Raw Peeled',
        description: 'Traditional style with easy-peel convenience',
        sizes: '16/20 to 31/40',
        origin: 'India',
        processing: 'IQF, Block Frozen',
        packaging: '1kg IQF, 2kg Block',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'PVPDTO (पूंछ सहित खींची नस)',
        category: 'कच्चा छिला',
        description: 'पारंपरिक शैली, आसान छीलने में सुविधाजनक',
        sizes: '16/20 से 31/40',
        origin: 'भारत',
        processing: 'IQF, ब्लॉक फ्रोजन',
        packaging: '1kg IQF, 2kg ब्लॉक',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: 'PVPDTO（抽肠留尾）',
        category: '生剥虾',
        description: '传统风格，方便去壳',
        sizes: '16/20 至 31/40',
        origin: '印度',
        processing: 'IQF、块冻',
        packaging: '1kg IQF, 2kg块冻',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: 'PVPDTO（背わた引き尾付き）',
        category: '生むきエビ',
        description: '伝統的なスタイル、簡単に殻むき',
        sizes: '16/20 〜 31/40',
        origin: 'インド',
        processing: 'IQF、ブロック冷凍',
        packaging: '1kg IQF, 2kgブロック',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },
  {
    id: 'pud',
    name: 'Peeled Un-Deveined (PUD)',
    nameKey: 'product.pud',
    scientificName: 'Premium Processed',
    description: 'For specialty cuisines & premium markets. Shell completely removed with vein intact, preferred in many Asian dishes for authentic flavor profile.',
    descriptionKey: 'product.pud.desc',
    image: productImg9,
    video: facilityVideo4,
    category: 'Raw Peeled',
    categoryKey: 'category.rawPeeled',
    division: 'raw-peeled',
    processingType: ['Tail-On', 'Tail-Off', 'IQF', 'Block'],
    specs: {
      sizes: ['26/30', '31/40', '41/50', '51/60'],
      packing: ['1kg IQF', '2kg Block'],
      glaze: ['10%', '15%'],
      origin: 'India',
      certifications: ['HACCP', 'BRC']
    },
    highlights: ['Authentic Flavor', 'Asian Cuisine', 'Cost-Effective'],
    bestFor: ['Asian Cuisines', 'Specialty Dishes', 'Bulk Processing'],
    info: {
      en: {
        name: 'PUD (Peeled Un-Deveined)',
        category: 'Raw Peeled',
        description: 'Authentic flavor for Asian cuisines',
        sizes: '26/30 to 51/60',
        origin: 'India',
        processing: 'Tail-On, Tail-Off, IQF, Block',
        packaging: '1kg IQF, 2kg Block',
        certification: 'HACCP, BRC'
      },
      hi: {
        name: 'PUD (छिला बिना नस निकाला)',
        category: 'कच्चा छिला',
        description: 'एशियाई व्यंजनों के लिए प्रामाणिक स्वाद',
        sizes: '26/30 से 51/60',
        origin: 'भारत',
        processing: 'पूंछ सहित, पूंछ रहित, IQF, ब्लॉक',
        packaging: '1kg IQF, 2kg ब्लॉक',
        certification: 'HACCP, BRC'
      },
      zh: {
        name: 'PUD（去壳不去肠）',
        category: '生剥虾',
        description: '亚洲料理的正宗风味',
        sizes: '26/30 至 51/60',
        origin: '印度',
        processing: '带尾、去尾、IQF、块冻',
        packaging: '1kg IQF, 2kg块冻',
        certification: 'HACCP, BRC'
      },
      ja: {
        name: 'PUD（殻むき背わたあり）',
        category: '生むきエビ',
        description: 'アジア料理に本格的な風味',
        sizes: '26/30 〜 51/60',
        origin: 'インド',
        processing: '尾付き、尾なし、IQF、ブロック',
        packaging: '1kg IQF, 2kgブロック',
        certification: 'HACCP, BRC'
      }
    }
  },
  {
    id: 'hl-raw',
    name: 'Headless Shell-On (HL)',
    nameKey: 'product.hlRaw',
    scientificName: 'Premium Processed',
    description: 'Traditional raw format, perfect for restaurants. Head completely removed with shell intact for optimal flavor during cooking. Extended shelf life in frozen state.',
    descriptionKey: 'product.hlRaw.desc',
    image: productImg10,
    video: shrimpVideo2,
    category: 'Raw Peeled',
    categoryKey: 'category.rawPeeled',
    division: 'raw-peeled',
    processingType: ['Block Frozen', 'IQF'],
    specs: {
      sizes: ['13/15', '16/20', '21/25', '26/30', '31/40', '41/50'],
      packing: ['2kg Block', '10kg Bulk', 'IQF'],
      glaze: ['10%', '15%', '20%'],
      origin: 'India',
      certifications: ['HACCP', 'BRC', 'BAP']
    },
    highlights: ['Shell-On Flavor', 'Traditional', 'Extended Shelf Life'],
    bestFor: ['Steaming', 'Boiling', 'Grilling', 'Restaurant Use'],
    info: {
      en: {
        name: 'HL (Headless Shell-On)',
        category: 'Raw Peeled',
        description: 'Traditional format with shell-on flavor',
        sizes: '13/15 to 41/50',
        origin: 'India',
        processing: 'Block Frozen, IQF',
        packaging: '2kg Block, 10kg Bulk, IQF',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'HL (बिना सिर खोल सहित)',
        category: 'कच्चा छिला',
        description: 'खोल सहित स्वाद के साथ पारंपरिक प्रारूप',
        sizes: '13/15 से 41/50',
        origin: 'भारत',
        processing: 'ब्लॉक फ्रोजन, IQF',
        packaging: '2kg ब्लॉक, 10kg थोक, IQF',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: 'HL（去头带壳）',
        category: '生剥虾',
        description: '传统格式，带壳风味',
        sizes: '13/15 至 41/50',
        origin: '印度',
        processing: '块冻、IQF',
        packaging: '2kg块冻, 10kg散装, IQF',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: 'HL（無頭殻付き）',
        category: '生むきエビ',
        description: '殻付きの風味を持つ伝統的な形式',
        sizes: '13/15 〜 41/50',
        origin: 'インド',
        processing: 'ブロック冷凍、IQF',
        packaging: '2kgブロック, 10kgバルク, IQF',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },
  {
    id: 'hl-easy-peel-raw',
    name: 'HL Easy-Peel',
    nameKey: 'product.hlEasyPeelRaw',
    scientificName: 'Premium Processed',
    description: 'Consumer-friendly peeling innovation. Pre-scored shell for easy removal after cooking while retaining shell flavor benefits. Perfect for home cooking and casual dining.',
    descriptionKey: 'product.hlEasyPeelRaw.desc',
    image: productImg11,
    video: processingVideo,
    category: 'Raw Peeled',
    categoryKey: 'category.rawPeeled',
    division: 'raw-peeled',
    processingType: ['IQF', 'Block Frozen'],
    specs: {
      sizes: ['16/20', '21/25', '26/30', '31/40'],
      packing: ['1kg IQF', '2kg Block'],
      glaze: ['10%', '15%'],
      origin: 'India',
      certifications: ['HACCP', 'BRC', 'BAP']
    },
    highlights: ['Easy Removal', 'Consumer Friendly', 'Shell Flavor'],
    bestFor: ['Home Cooking', 'Casual Dining', 'Family Meals'],
    info: {
      en: {
        name: 'HL Easy-Peel',
        category: 'Raw Peeled',
        description: 'Consumer-friendly with pre-scored shell',
        sizes: '16/20 to 31/40',
        origin: 'India',
        processing: 'IQF, Block Frozen',
        packaging: '1kg IQF, 2kg Block',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'HL आसान छीलने वाला',
        category: 'कच्चा छिला',
        description: 'प्री-स्कोर्ड खोल के साथ उपभोक्ता के अनुकूल',
        sizes: '16/20 से 31/40',
        origin: 'भारत',
        processing: 'IQF, ब्लॉक फ्रोजन',
        packaging: '1kg IQF, 2kg ब्लॉक',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: 'HL易剥虾',
        category: '生剥虾',
        description: '预划壳，消费者友好',
        sizes: '16/20 至 31/40',
        origin: '印度',
        processing: 'IQF、块冻',
        packaging: '1kg IQF, 2kg块冻',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: 'HLイージーピール',
        category: '生むきエビ',
        description: '殻に切れ目入り、消費者に優しい',
        sizes: '16/20 〜 31/40',
        origin: 'インド',
        processing: 'IQF、ブロック冷凍',
        packaging: '1kg IQF, 2kgブロック',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },

  // ============================================================================
  // COOKED READY-TO-EAT PRODUCTS
  // ============================================================================
  {
    id: 'cooked-head-on',
    name: 'Cooked Head-On Shrimp',
    nameKey: 'product.cookedHeadOn',
    scientificName: 'Fully Cooked',
    description: 'Traditional presentation with superior flavor retention. Fully cooked and flash-frozen, ready for immediate use. Perfect for fine dining and impressive presentations.',
    descriptionKey: 'product.cookedHeadOn.desc',
    image: productImg12,
    video: packingVideo,
    category: 'Cooked Shrimp',
    categoryKey: 'category.cooked',
    division: 'cooked',
    processingType: ['IQF', 'Block Frozen'],
    specs: {
      sizes: ['8/12', '13/15', '16/20', '21/25'],
      packing: ['1kg IQF', '2kg Block'],
      glaze: ['10%', '15%'],
      origin: 'India',
      certifications: ['HACCP', 'BRC', 'BAP'],
      shelfLife: '18 months frozen',
      thawTime: '4-6 hours refrigerated'
    },
    highlights: ['Ready-to-Eat', 'Superior Flavor', 'Impressive Presentation'],
    bestFor: ['Fine Dining', 'Seafood Platters', 'Impressive Presentations'],
    info: {
      en: {
        name: 'Cooked Head-On Shrimp',
        category: 'Cooked Shrimp',
        description: 'Ready-to-eat with superior flavor retention',
        sizes: '8/12 to 21/25',
        origin: 'India',
        processing: 'Fully Cooked, IQF, Block Frozen',
        packaging: '1kg IQF, 2kg Block',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'पका हुआ सिर सहित झींगा',
        category: 'पका हुआ झींगा',
        description: 'बेहतर स्वाद के साथ खाने के लिए तैयार',
        sizes: '8/12 से 21/25',
        origin: 'भारत',
        processing: 'पूर्ण पका हुआ, IQF, ब्लॉक फ्रोजन',
        packaging: '1kg IQF, 2kg ब्लॉक',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: '熟带头虾',
        category: '熟虾',
        description: '即食，风味保留极佳',
        sizes: '8/12 至 21/25',
        origin: '印度',
        processing: '全熟、IQF、块冻',
        packaging: '1kg IQF, 2kg块冻',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: '調理済み有頭エビ',
        category: '調理済みエビ',
        description: '優れた風味を持つ即食エビ',
        sizes: '8/12 〜 21/25',
        origin: 'インド',
        processing: '完全調理済み、IQF、ブロック冷凍',
        packaging: '1kg IQF, 2kgブロック',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },
  {
    id: 'cooked-hl',
    name: 'Cooked Headless (HL) Shrimp',
    nameKey: 'product.cookedHL',
    scientificName: 'Fully Cooked',
    description: 'Professional kitchen standard, ready for immediate use. Reduced waste with maximum meat yield. Heat & serve in 2-3 minutes.',
    descriptionKey: 'product.cookedHL.desc',
    image: productImg13,
    video: facilityVideo1,
    category: 'Cooked Shrimp',
    categoryKey: 'category.cooked',
    division: 'cooked',
    processingType: ['IQF', 'Block Frozen'],
    specs: {
      sizes: ['16/20', '21/25', '26/30', '31/40', '41/50'],
      packing: ['1kg IQF', '2kg Block'],
      glaze: ['10%', '15%'],
      origin: 'India',
      certifications: ['HACCP', 'BRC', 'BAP'],
      shelfLife: '18 months frozen',
      prepTime: '2-3 minutes'
    },
    highlights: ['Maximum Yield', 'Heat & Serve', 'Professional Grade'],
    bestFor: ['Salads', 'Appetizers', 'Mixed Seafood', 'Food Service'],
    info: {
      en: {
        name: 'Cooked Headless (HL) Shrimp',
        category: 'Cooked Shrimp',
        description: 'Professional grade, heat & serve in 2-3 min',
        sizes: '16/20 to 41/50',
        origin: 'India',
        processing: 'Fully Cooked, IQF, Block Frozen',
        packaging: '1kg IQF, 2kg Block',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'पका हुआ बिना सिर (HL) झींगा',
        category: 'पका हुआ झींगा',
        description: 'प्रोफेशनल ग्रेड, 2-3 मिनट में गरम करें और परोसें',
        sizes: '16/20 से 41/50',
        origin: 'भारत',
        processing: 'पूर्ण पका हुआ, IQF, ब्लॉक फ्रोजन',
        packaging: '1kg IQF, 2kg ब्लॉक',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: '熟去头虾（HL）',
        category: '熟虾',
        description: '专业级，2-3分钟加热即食',
        sizes: '16/20 至 41/50',
        origin: '印度',
        processing: '全熟、IQF、块冻',
        packaging: '1kg IQF, 2kg块冻',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: '調理済み無頭エビ（HL）',
        category: '調理済みエビ',
        description: 'プロ仕様、2-3分で温めて提供',
        sizes: '16/20 〜 41/50',
        origin: 'インド',
        processing: '完全調理済み、IQF、ブロック冷凍',
        packaging: '1kg IQF, 2kgブロック',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },
  {
    id: 'cooked-hl-easy-peel',
    name: 'Cooked HL Easy-Peel',
    nameKey: 'product.cookedHLEasyPeel',
    scientificName: 'Fully Cooked',
    description: 'Pre-scored for convenient shell removal after cooking. Cook, peel, eat in under 5 minutes. Perfect for family meals and casual dining.',
    descriptionKey: 'product.cookedHLEasyPeel.desc',
    image: productImg14,
    video: facilityVideo2,
    category: 'Cooked Shrimp',
    categoryKey: 'category.cooked',
    division: 'cooked',
    processingType: ['IQF'],
    specs: {
      sizes: ['21/25', '26/30', '31/40'],
      packing: ['1kg IQF', '500g Retail'],
      glaze: ['10%', '15%'],
      origin: 'India',
      certifications: ['HACCP', 'BRC', 'BAP'],
      shelfLife: '18 months frozen',
      prepTime: 'Under 5 minutes'
    },
    highlights: ['Easy Peel', 'Quick Prep', 'Family Friendly'],
    bestFor: ['Family Meals', 'Casual Dining', 'Quick Appetizers'],
    info: {
      en: {
        name: 'Cooked HL Easy-Peel',
        category: 'Cooked Shrimp',
        description: 'Pre-scored shell, ready in under 5 minutes',
        sizes: '21/25 to 31/40',
        origin: 'India',
        processing: 'Fully Cooked, IQF',
        packaging: '1kg IQF, 500g Retail',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'पका हुआ HL आसान छीलने वाला',
        category: 'पका हुआ झींगा',
        description: 'प्री-स्कोर्ड खोल, 5 मिनट से कम में तैयार',
        sizes: '21/25 से 31/40',
        origin: 'भारत',
        processing: 'पूर्ण पका हुआ, IQF',
        packaging: '1kg IQF, 500g रिटेल',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: '熟HL易剥虾',
        category: '熟虾',
        description: '预划壳，5分钟内即可食用',
        sizes: '21/25 至 31/40',
        origin: '印度',
        processing: '全熟、IQF',
        packaging: '1kg IQF, 500g零售装',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: '調理済みHLイージーピール',
        category: '調理済みエビ',
        description: '殻に切れ目入り、5分以内で準備完了',
        sizes: '21/25 〜 31/40',
        origin: 'インド',
        processing: '完全調理済み、IQF',
        packaging: '1kg IQF, 500gリテール',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },
  {
    id: 'cooked-pdto',
    name: 'Cooked Peeled Deveined Tail On (PDTO)',
    nameKey: 'product.cookedPDTO',
    scientificName: 'Fully Cooked',
    description: 'Fully prepared with elegant presentation and zero prep time. Completely ready to serve cold or warm. Perfect for appetizers, cocktails, and elegant dishes.',
    descriptionKey: 'product.cookedPDTO.desc',
    image: productImg15,
    video: facilityVideo3,
    category: 'Cooked Shrimp',
    categoryKey: 'category.cooked',
    division: 'cooked',
    processingType: ['IQF'],
    specs: {
      sizes: ['16/20', '21/25', '26/30', '31/40'],
      packing: ['1kg IQF', '500g Retail'],
      glaze: ['10%', '15%'],
      origin: 'India',
      certifications: ['HACCP', 'BRC', 'BAP'],
      shelfLife: '18 months frozen',
      serving: 'Cold or warm (2-3 min reheat)'
    },
    highlights: ['Zero Prep', 'Elegant Presentation', 'Versatile Serving'],
    bestFor: ['Appetizers', 'Seafood Cocktails', 'Sushi', 'Elegant Dishes'],
    info: {
      en: {
        name: 'Cooked PDTO',
        category: 'Cooked Shrimp',
        description: 'Zero prep, elegant presentation',
        sizes: '16/20 to 31/40',
        origin: 'India',
        processing: 'Fully Cooked, IQF',
        packaging: '1kg IQF, 500g Retail',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'पका हुआ PDTO',
        category: 'पका हुआ झींगा',
        description: 'शून्य तैयारी, शानदार प्रस्तुति',
        sizes: '16/20 से 31/40',
        origin: 'भारत',
        processing: 'पूर्ण पका हुआ, IQF',
        packaging: '1kg IQF, 500g रिटेल',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: '熟PDTO',
        category: '熟虾',
        description: '零准备，优雅呈现',
        sizes: '16/20 至 31/40',
        origin: '印度',
        processing: '全熟、IQF',
        packaging: '1kg IQF, 500g零售装',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: '調理済みPDTO',
        category: '調理済みエビ',
        description: '準備不要、エレガントな盛り付け',
        sizes: '16/20 〜 31/40',
        origin: 'インド',
        processing: '完全調理済み、IQF',
        packaging: '1kg IQF, 500gリテール',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },
  {
    id: 'cooked-pd',
    name: 'Cooked Peeled Deveined Tail Off (PD)',
    nameKey: 'product.cookedPD',
    scientificName: 'Fully Cooked',
    description: 'Fully processed shrimp perfect for soups, salads, and mixed dishes. Heat through or serve cold with 18 months frozen shelf life.',
    descriptionKey: 'product.cookedPD.desc',
    image: productImg16,
    video: facilityVideo4,
    category: 'Cooked Shrimp',
    categoryKey: 'category.cooked',
    division: 'cooked',
    processingType: ['IQF', 'Block'],
    specs: {
      sizes: ['26/30', '31/40', '41/50', '51/60'],
      packing: ['1kg IQF', '2kg Block'],
      glaze: ['10%', '15%'],
      origin: 'India',
      certifications: ['HACCP', 'BRC', 'BAP'],
      shelfLife: '18 months frozen',
      serving: 'Heat through or serve cold'
    },
    highlights: ['Fully Processed', 'Versatile Use', 'Long Shelf Life'],
    bestFor: ['Pasta', 'Risotto', 'Stir-Fries', 'Salads', 'Mixed Seafood'],
    info: {
      en: {
        name: 'Cooked PD',
        category: 'Cooked Shrimp',
        description: 'Fully processed, heat through or serve cold',
        sizes: '26/30 to 51/60',
        origin: 'India',
        processing: 'Fully Cooked, IQF, Block',
        packaging: '1kg IQF, 2kg Block',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'पका हुआ PD',
        category: 'पका हुआ झींगा',
        description: 'पूर्ण प्रसंस्कृत, गरम या ठंडा परोसें',
        sizes: '26/30 से 51/60',
        origin: 'भारत',
        processing: 'पूर्ण पका हुआ, IQF, ब्लॉक',
        packaging: '1kg IQF, 2kg ब्लॉक',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: '熟PD',
        category: '熟虾',
        description: '全加工，可加热或冷食',
        sizes: '26/30 至 51/60',
        origin: '印度',
        processing: '全熟、IQF、块冻',
        packaging: '1kg IQF, 2kg块冻',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: '調理済みPD',
        category: '調理済みエビ',
        description: '完全加工済み、温めても冷たいままでも',
        sizes: '26/30 〜 51/60',
        origin: 'インド',
        processing: '完全調理済み、IQF、ブロック',
        packaging: '1kg IQF, 2kgブロック',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },

  // ============================================================================
  // VALUE-ADDED PREMIUM PRODUCTS
  // ============================================================================
  {
    id: 'butterfly',
    name: 'Butterfly Shrimp',
    nameKey: 'product.butterfly',
    scientificName: 'Premium Cut',
    description: 'Elegant split presentation for premium restaurant offerings. Shrimp split lengthwise to create stunning butterfly/fan appearance. 20-30% premium markup value.',
    descriptionKey: 'product.butterfly.desc',
    image: productImg17,
    video: packingVideo,
    category: 'Value-Added',
    categoryKey: 'category.valueAdded',
    division: 'value-added',
    processingType: ['Raw', 'Cooked', 'IQF'],
    specs: {
      sizes: ['8/12', '12/16', '16/20'],
      packing: ['1kg IQF', '500g Retail'],
      glaze: ['10%', '15%'],
      origin: 'India',
      certifications: ['HACCP', 'BRC', 'BAP']
    },
    highlights: ['Stunning Presentation', 'Premium Pricing', 'Restaurant Quality'],
    bestFor: ['Fine Dining', 'Special Occasions', 'Upscale Restaurants'],
    pricePoint: 'Premium (20-30% markup)',
    info: {
      en: {
        name: 'Butterfly Shrimp',
        category: 'Value-Added',
        description: 'Elegant split for stunning presentation',
        sizes: '8/12 to 16/20',
        origin: 'India',
        processing: 'Raw, Cooked, IQF',
        packaging: '1kg IQF, 500g Retail',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'बटरफ्लाई झींगा',
        category: 'मूल्य वर्धित',
        description: 'शानदार प्रस्तुति के लिए सुंदर कट',
        sizes: '8/12 से 16/20',
        origin: 'भारत',
        processing: 'कच्चा, पका हुआ, IQF',
        packaging: '1kg IQF, 500g रिटेल',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: '蝴蝶虾',
        category: '增值产品',
        description: '优雅切割，精美呈现',
        sizes: '8/12 至 16/20',
        origin: '印度',
        processing: '生、熟、IQF',
        packaging: '1kg IQF, 500g零售装',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: 'バタフライシュリンプ',
        category: '付加価値製品',
        description: '美しい盛り付けのためのエレガントカット',
        sizes: '8/12 〜 16/20',
        origin: 'インド',
        processing: '生、調理済み、IQF',
        packaging: '1kg IQF, 500gリテール',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },
  {
    id: 'nobashi',
    name: 'Nobashi Shrimp',
    nameKey: 'product.nobashi',
    scientificName: 'Sushi-Grade',
    description: 'Japanese presentation with natural curve preserved. Premium sushi/sashimi grade with pristine appearance. Specially processed for authentic presentation in high-end sushi restaurants.',
    descriptionKey: 'product.nobashi.desc',
    image: productImg18,
    video: processingVideo,
    category: 'Value-Added',
    categoryKey: 'category.valueAdded',
    division: 'value-added',
    processingType: ['Raw', 'Stretched', 'IQF'],
    specs: {
      sizes: ['3L', '2L', 'L', 'M'],
      packing: ['30pc/tray', '20pc/tray', 'Custom'],
      glaze: 'Minimal',
      origin: 'India',
      certifications: ['HACCP', 'BRC', 'Sushi-Grade']
    },
    highlights: ['Sushi-Grade', 'Natural Curve', 'Pristine Appearance'],
    bestFor: ['Sushi Restaurants', 'Japanese Cuisine', 'Premium Markets'],
    pricePoint: 'Premium',
    info: {
      en: {
        name: 'Nobashi Shrimp',
        category: 'Value-Added',
        description: 'Sushi-grade with natural curve preserved',
        sizes: '3L, 2L, L, M',
        origin: 'India',
        processing: 'Raw, Stretched, IQF',
        packaging: '30pc/tray, 20pc/tray',
        certification: 'HACCP, BRC, Sushi-Grade'
      },
      hi: {
        name: 'नोबाशी झींगा',
        category: 'मूल्य वर्धित',
        description: 'प्राकृतिक वक्र के साथ सुशी-ग्रेड',
        sizes: '3L, 2L, L, M',
        origin: 'भारत',
        processing: 'कच्चा, खींचा हुआ, IQF',
        packaging: '30पीस/ट्रे, 20पीस/ट्रे',
        certification: 'HACCP, BRC, सुशी-ग्रेड'
      },
      zh: {
        name: '伸展虾',
        category: '增值产品',
        description: '寿司级，保留自然弯曲',
        sizes: '3L, 2L, L, M',
        origin: '印度',
        processing: '生、拉伸、IQF',
        packaging: '30只/盘, 20只/盘',
        certification: 'HACCP, BRC, 寿司级'
      },
      ja: {
        name: 'のばしエビ',
        category: '付加価値製品',
        description: '自然なカーブを保った寿司グレード',
        sizes: '3L, 2L, L, M',
        origin: 'インド',
        processing: '生、ストレッチ、IQF',
        packaging: '30尾/トレイ, 20尾/トレイ',
        certification: 'HACCP, BRC, 寿司グレード'
      }
    }
  },
  {
    id: 'breaded',
    name: 'Breaded Shrimp',
    nameKey: 'product.breaded',
    scientificName: 'Ready-to-Fry',
    description: 'Golden, crispy coating with restaurant-quality finish. Ready to deep fry (2-3 min) or air-fry until golden. Consistent quality with minimal prep and high profit margin.',
    descriptionKey: 'product.breaded.desc',
    image: productImg19,
    video: facilityVideo1,
    category: 'Value-Added',
    categoryKey: 'category.valueAdded',
    division: 'value-added',
    processingType: ['Pre-Cooked', 'Raw Breaded'],
    specs: {
      sizes: ['16/20', '21/25', '26/30'],
      packing: ['1kg Box', '500g Retail', '2kg Foodservice'],
      coating: 'Premium Breadcrumb',
      origin: 'India',
      certifications: ['HACCP', 'BRC', 'BAP'],
      shelfLife: '24 months frozen',
      cookTime: '2-3 minutes'
    },
    highlights: ['Ready-to-Fry', 'Consistent Quality', 'High Margin'],
    bestFor: ['Appetizers', 'Party Platters', 'Casual Dining', 'Food Service'],
    info: {
      en: {
        name: 'Breaded Shrimp',
        category: 'Value-Added',
        description: 'Golden crispy coating, ready-to-fry',
        sizes: '16/20 to 26/30',
        origin: 'India',
        processing: 'Pre-Cooked, Raw Breaded',
        packaging: '1kg Box, 500g Retail, 2kg Foodservice',
        certification: 'HACCP, BRC, BAP'
      },
      hi: {
        name: 'ब्रेडेड झींगा',
        category: 'मूल्य वर्धित',
        description: 'सुनहरा कुरकुरा कोटिंग, तलने के लिए तैयार',
        sizes: '16/20 से 26/30',
        origin: 'भारत',
        processing: 'प्री-कुक्ड, रॉ ब्रेडेड',
        packaging: '1kg बॉक्स, 500g रिटेल, 2kg फूडसर्विस',
        certification: 'HACCP, BRC, BAP'
      },
      zh: {
        name: '裹粉虾',
        category: '增值产品',
        description: '金黄酥脆，即炸即食',
        sizes: '16/20 至 26/30',
        origin: '印度',
        processing: '预煮、生裹粉',
        packaging: '1kg盒装, 500g零售装, 2kg餐饮装',
        certification: 'HACCP, BRC, BAP'
      },
      ja: {
        name: 'パン粉エビ',
        category: '付加価値製品',
        description: '黄金色でサクサク、揚げるだけ',
        sizes: '16/20 〜 26/30',
        origin: 'インド',
        processing: '調理済み、生パン粉付き',
        packaging: '1kgボックス, 500gリテール, 2kgフードサービス',
        certification: 'HACCP, BRC, BAP'
      }
    }
  },
  {
    id: 'shrimp-skewers',
    name: 'Shrimp Skewers',
    nameKey: 'product.shrimpSkewers',
    scientificName: 'Value-Added',
    description: 'Pre-cooked, ready-to-grill value-added product. Convenient skewer format for easy grilling and serving. Perfect for BBQ and outdoor events.',
    descriptionKey: 'product.shrimpSkewers.desc',
    image: productImg1,
    video: packingVideo,
    category: 'Value-Added',
    categoryKey: 'category.valueAdded',
    division: 'value-added',
    processingType: ['Pre-Cooked', 'Skewered'],
    specs: {
      sizes: ['21/25', '26/30'],
      packing: ['6 skewers/pack', '12 skewers/pack'],
      style: 'Ready-to-Grill',
      origin: 'India',
      certifications: ['HACCP', 'BRC']
    },
    highlights: ['Ready-to-Grill', 'Convenient', 'Perfect Portions'],
    bestFor: ['BBQ', 'Outdoor Events', 'Quick Meals'],
    info: {
      en: {
        name: 'Shrimp Skewers',
        category: 'Value-Added',
        description: 'Ready-to-grill, convenient format',
        sizes: '21/25 to 26/30',
        origin: 'India',
        processing: 'Pre-Cooked, Skewered',
        packaging: '6 or 12 skewers/pack',
        certification: 'HACCP, BRC'
      },
      hi: {
        name: 'झींगा स्क्यूअर्स',
        category: 'मूल्य वर्धित',
        description: 'ग्रिल के लिए तैयार, सुविधाजनक प्रारूप',
        sizes: '21/25 से 26/30',
        origin: 'भारत',
        processing: 'प्री-कुक्ड, स्क्यूअर्ड',
        packaging: '6 या 12 स्क्यूअर्स/पैक',
        certification: 'HACCP, BRC'
      },
      zh: {
        name: '虾串',
        category: '增值产品',
        description: '即烤即食，方便格式',
        sizes: '21/25 至 26/30',
        origin: '印度',
        processing: '预煮、串好',
        packaging: '6或12串/包',
        certification: 'HACCP, BRC'
      },
      ja: {
        name: 'エビ串',
        category: '付加価値製品',
        description: 'グリル準備完了、便利な形式',
        sizes: '21/25 〜 26/30',
        origin: 'インド',
        processing: '調理済み、串刺し',
        packaging: '6本または12本/パック',
        certification: 'HACCP, BRC'
      }
    }
  },
  {
    id: 'spiced-shrimp',
    name: 'Spiced Shrimp',
    nameKey: 'product.spicedShrimp',
    scientificName: 'Marinated',
    description: 'Marinated varieties including Cajun, Garlic, and Asian-style seasonings. Ready to cook with bold flavors already infused.',
    descriptionKey: 'product.spicedShrimp.desc',
    image: productImg2,
    video: facilityVideo2,
    category: 'Value-Added',
    categoryKey: 'category.valueAdded',
    division: 'value-added',
    processingType: ['Cajun', 'Garlic Butter', 'Asian-Style', 'Custom'],
    specs: {
      sizes: ['21/25', '26/30', '31/40'],
      packing: ['500g Retail', '1kg Foodservice'],
      flavors: ['Cajun', 'Garlic', 'Asian-Style', 'Custom'],
      origin: 'India',
      certifications: ['HACCP', 'BRC']
    },
    highlights: ['Bold Flavors', 'Ready to Cook', 'Multiple Varieties'],
    bestFor: ['Quick Meals', 'Party Food', 'Home Cooking'],
    info: {
      en: {
        name: 'Spiced Shrimp',
        category: 'Value-Added',
        description: 'Marinated with bold flavors, ready to cook',
        sizes: '21/25 to 31/40',
        origin: 'India',
        processing: 'Cajun, Garlic Butter, Asian-Style',
        packaging: '500g Retail, 1kg Foodservice',
        certification: 'HACCP, BRC'
      },
      hi: {
        name: 'मसालेदार झींगा',
        category: 'मूल्य वर्धित',
        description: 'बोल्ड फ्लेवर के साथ मैरीनेट, पकाने के लिए तैयार',
        sizes: '21/25 से 31/40',
        origin: 'भारत',
        processing: 'केजन, लहसुन मक्खन, एशियाई-शैली',
        packaging: '500g रिटेल, 1kg फूडसर्विस',
        certification: 'HACCP, BRC'
      },
      zh: {
        name: '调味虾',
        category: '增值产品',
        description: '腌制入味，即煮即食',
        sizes: '21/25 至 31/40',
        origin: '印度',
        processing: '卡津、蒜香黄油、亚洲风味',
        packaging: '500g零售装, 1kg餐饮装',
        certification: 'HACCP, BRC'
      },
      ja: {
        name: 'スパイスエビ',
        category: '付加価値製品',
        description: '風味豊かにマリネ、調理するだけ',
        sizes: '21/25 〜 31/40',
        origin: 'インド',
        processing: 'ケイジャン、ガーリックバター、アジアンスタイル',
        packaging: '500gリテール, 1kgフードサービス',
        certification: 'HACCP, BRC'
      }
    }
  },

  // ============================================================================
  // FRESH SEAFOOD VIA AIR CARGO
  // ============================================================================
  {
    id: 'live-shrimp',
    name: 'Live Shrimp',
    nameKey: 'product.liveShrimp',
    scientificName: 'Fresh Live',
    description: 'Premium live shrimp available on special request. Delivered via specialized air cargo with temperature-controlled packaging within 48-72 hours globally.',
    descriptionKey: 'product.liveShrimp.desc',
    image: productImg3,
    video: shrimpVideo1,
    category: 'Fresh Seafood',
    categoryKey: 'category.fresh',
    division: 'fresh-seafood',
    processingType: ['Live', 'Temperature Controlled'],
    specs: {
      sizes: ['Various'],
      packing: ['Specialized Insulated Containers', 'Dry Ice'],
      delivery: '48-72 hours globally',
      origin: 'India',
      certifications: ['HACCP', 'Live Export Certified']
    },
    highlights: ['Live Delivery', 'Premium Quality', 'Global Reach'],
    bestFor: ['Premium Restaurants', 'Specialty Markets', 'Live Seafood Display'],
    orderNote: 'Special Request Required',
    info: {
      en: {
        name: 'Live Shrimp',
        category: 'Fresh Seafood',
        description: 'Premium live delivery, 48-72 hours globally',
        sizes: 'Various',
        origin: 'India',
        processing: 'Live, Temperature Controlled',
        packaging: 'Insulated Containers, Dry Ice',
        certification: 'HACCP, Live Export Certified'
      },
      hi: {
        name: 'जीवित झींगा',
        category: 'ताजा समुद्री भोजन',
        description: 'प्रीमियम जीवित डिलीवरी, वैश्विक स्तर पर 48-72 घंटे',
        sizes: 'विभिन्न',
        origin: 'भारत',
        processing: 'जीवित, तापमान नियंत्रित',
        packaging: 'इंसुलेटेड कंटेनर, ड्राई आइस',
        certification: 'HACCP, लाइव एक्सपोर्ट सर्टिफाइड'
      },
      zh: {
        name: '活虾',
        category: '鲜活海鲜',
        description: '优质活体配送，全球48-72小时',
        sizes: '多种规格',
        origin: '印度',
        processing: '活体、温控',
        packaging: '保温容器、干冰',
        certification: 'HACCP, 活体出口认证'
      },
      ja: {
        name: '活エビ',
        category: '新鮮シーフード',
        description: 'プレミアム活配送、世界48-72時間',
        sizes: '各種',
        origin: 'インド',
        processing: '活、温度管理',
        packaging: '保温容器、ドライアイス',
        certification: 'HACCP, 活輸出認証'
      }
    }
  },
  {
    id: 'fresh-fish',
    name: 'Fresh Fish',
    nameKey: 'product.freshFish',
    scientificName: 'Various Species',
    description: 'Fresh fish varieties as requested, processed within 4 hours of harvest. Delivered via air cargo with specialized insulated containers and dry ice.',
    descriptionKey: 'product.freshFish.desc',
    image: 'https://images.unsplash.com/photo-1534942205242-a42d3c2a117b?q=80&w=800&auto=format&fit=crop',
    video: 'https://cdn.pixabay.com/video/2016/09/05/4964-182620860_large.mp4',
    category: 'Fresh Seafood',
    categoryKey: 'category.fresh',
    division: 'fresh-seafood',
    processingType: ['Whole', 'Gutted', 'Filleted'],
    specs: {
      sizes: ['Per Request'],
      packing: ['Insulated Containers', 'Dry Ice'],
      delivery: '48-72 hours globally',
      processing: 'Within 4 hours of harvest',
      origin: 'India',
      certifications: ['HACCP', 'Air Cargo Ready']
    },
    highlights: ['Same Day Processing', 'Air Cargo', 'Custom Species'],
    bestFor: ['Restaurants', 'Premium Markets', 'Fresh Counters'],
    info: {
      en: {
        name: 'Fresh Fish',
        category: 'Fresh Seafood',
        description: 'Processed within 4 hours, air cargo delivery',
        sizes: 'Per Request',
        origin: 'India',
        processing: 'Whole, Gutted, Filleted',
        packaging: 'Insulated Containers, Dry Ice',
        certification: 'HACCP, Air Cargo Ready'
      },
      hi: {
        name: 'ताजी मछली',
        category: 'ताजा समुद्री भोजन',
        description: '4 घंटे के भीतर प्रसंस्कृत, एयर कार्गो डिलीवरी',
        sizes: 'अनुरोध पर',
        origin: 'भारत',
        processing: 'पूर्ण, सफाई किया हुआ, फिलेट',
        packaging: 'इंसुलेटेड कंटेनर, ड्राई आइस',
        certification: 'HACCP, एयर कार्गो तैयार'
      },
      zh: {
        name: '鲜鱼',
        category: '鲜活海鲜',
        description: '4小时内加工，空运配送',
        sizes: '按需定制',
        origin: '印度',
        processing: '整条、去内脏、去骨',
        packaging: '保温容器、干冰',
        certification: 'HACCP, 空运就绪'
      },
      ja: {
        name: '鮮魚',
        category: '新鮮シーフード',
        description: '4時間以内に加工、航空便配送',
        sizes: 'リクエストに応じて',
        origin: 'インド',
        processing: '丸ごと、内臓除去、フィレ',
        packaging: '保温容器、ドライアイス',
        certification: 'HACCP, 航空貨物対応'
      }
    }
  },
  {
    id: 'lobster-crab',
    name: 'Lobster & Crab',
    nameKey: 'product.lobsterCrab',
    scientificName: 'Premium Shellfish',
    description: 'Premium lobster and crab varieties available fresh via air cargo. Quality guaranteed with complete traceability from harvest to delivery.',
    descriptionKey: 'product.lobsterCrab.desc',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=800&auto=format&fit=crop',
    video: facilityVideo3,
    category: 'Fresh Seafood',
    categoryKey: 'category.fresh',
    division: 'fresh-seafood',
    processingType: ['Live', 'Cooked', 'Frozen'],
    specs: {
      sizes: ['Various Grades'],
      packing: ['Specialized Containers'],
      delivery: '48-72 hours globally',
      origin: 'India',
      certifications: ['HACCP', 'Export Certified']
    },
    highlights: ['Premium Quality', 'Live Available', 'Air Cargo'],
    bestFor: ['Fine Dining', 'Luxury Hotels', 'Premium Markets'],
    info: {
      en: {
        name: 'Lobster & Crab',
        category: 'Fresh Seafood',
        description: 'Premium shellfish via air cargo',
        sizes: 'Various Grades',
        origin: 'India',
        processing: 'Live, Cooked, Frozen',
        packaging: 'Specialized Containers',
        certification: 'HACCP, Export Certified'
      },
      hi: {
        name: 'लॉबस्टर और केकड़ा',
        category: 'ताजा समुद्री भोजन',
        description: 'एयर कार्गो द्वारा प्रीमियम शेलफिश',
        sizes: 'विभिन्न ग्रेड',
        origin: 'भारत',
        processing: 'जीवित, पका हुआ, फ्रोजन',
        packaging: 'विशेष कंटेनर',
        certification: 'HACCP, निर्यात प्रमाणित'
      },
      zh: {
        name: '龙虾和蟹',
        category: '鲜活海鲜',
        description: '空运优质甲壳类',
        sizes: '多种规格',
        origin: '印度',
        processing: '活体、熟、冻',
        packaging: '专用容器',
        certification: 'HACCP, 出口认证'
      },
      ja: {
        name: 'ロブスター＆カニ',
        category: '新鮮シーフード',
        description: '航空便によるプレミアム甲殻類',
        sizes: '各種グレード',
        origin: 'インド',
        processing: '活、調理済み、冷凍',
        packaging: '専用コンテナ',
        certification: 'HACCP, 輸出認証'
      }
    }
  },
  {
    id: 'oysters-clams',
    name: 'Oysters & Clams',
    nameKey: 'product.oystersClams',
    scientificName: 'Bivalve Mollusks',
    description: 'Fresh oysters and clams sourced from premium waters. Delivered with temperature control for optimal freshness and food safety.',
    descriptionKey: 'product.oystersClams.desc',
    image: 'https://images.unsplash.com/photo-1606850780554-b55ea4dd0b70?q=80&w=800&auto=format&fit=crop',
    video: facilityVideo4,
    category: 'Fresh Seafood',
    categoryKey: 'category.fresh',
    division: 'fresh-seafood',
    processingType: ['Live', 'Shucked', 'Half-Shell'],
    specs: {
      sizes: ['Various Grades'],
      packing: ['Mesh Bags', 'Trays'],
      delivery: '48-72 hours globally',
      origin: 'India',
      certifications: ['HACCP', 'Shellfish Certified']
    },
    highlights: ['Premium Quality', 'Temperature Controlled', 'Fresh'],
    bestFor: ['Oyster Bars', 'Fine Dining', 'Seafood Restaurants'],
    info: {
      en: {
        name: 'Oysters & Clams',
        category: 'Fresh Seafood',
        description: 'Premium bivalves, temperature controlled',
        sizes: 'Various Grades',
        origin: 'India',
        processing: 'Live, Shucked, Half-Shell',
        packaging: 'Mesh Bags, Trays',
        certification: 'HACCP, Shellfish Certified'
      },
      hi: {
        name: 'सीप और क्लैम',
        category: 'ताजा समुद्री भोजन',
        description: 'प्रीमियम बाइवाल्व, तापमान नियंत्रित',
        sizes: 'विभिन्न ग्रेड',
        origin: 'भारत',
        processing: 'जीवित, खोला हुआ, आधा-खोल',
        packaging: 'मेश बैग, ट्रे',
        certification: 'HACCP, शेलफिश प्रमाणित'
      },
      zh: {
        name: '牡蛎和蛤蜊',
        category: '鲜活海鲜',
        description: '优质双壳类，温控配送',
        sizes: '多种规格',
        origin: '印度',
        processing: '活体、去壳、半壳',
        packaging: '网袋、托盘',
        certification: 'HACCP, 贝类认证'
      },
      ja: {
        name: '牡蠣と蛤',
        category: '新鮮シーフード',
        description: 'プレミアム二枚貝、温度管理',
        sizes: '各種グレード',
        origin: 'インド',
        processing: '活、むき身、ハーフシェル',
        packaging: 'メッシュバッグ、トレイ',
        certification: 'HACCP, 貝類認証'
      }
    }
  },
  {
    id: 'squid-octopus',
    name: 'Squid & Octopus',
    nameKey: 'product.squidOctopus',
    scientificName: 'Cephalopods',
    description: 'Fresh squid and octopus varieties for Mediterranean and Asian cuisines. Available whole, cleaned, or portioned as per buyer specifications.',
    descriptionKey: 'product.squidOctopus.desc',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=800&auto=format&fit=crop',
    video: packingVideo,
    category: 'Fresh Seafood',
    categoryKey: 'category.fresh',
    division: 'fresh-seafood',
    processingType: ['Whole', 'Cleaned', 'Tubes & Tentacles', 'Rings'],
    specs: {
      sizes: ['Various'],
      packing: ['IQF', 'Block', 'Fresh'],
      delivery: '48-72 hours (fresh)',
      origin: 'India',
      certifications: ['HACCP', 'Export Certified']
    },
    highlights: ['Multiple Cuts', 'Fresh or Frozen', 'Versatile'],
    bestFor: ['Mediterranean Cuisine', 'Asian Cuisine', 'Calamari'],
    info: {
      en: {
        name: 'Squid & Octopus',
        category: 'Fresh Seafood',
        description: 'Multiple cuts for Mediterranean & Asian cuisines',
        sizes: 'Various',
        origin: 'India',
        processing: 'Whole, Cleaned, Tubes & Tentacles, Rings',
        packaging: 'IQF, Block, Fresh',
        certification: 'HACCP, Export Certified'
      },
      hi: {
        name: 'स्क्विड और ऑक्टोपस',
        category: 'ताजा समुद्री भोजन',
        description: 'भूमध्यसागरीय और एशियाई व्यंजनों के लिए विभिन्न कट',
        sizes: 'विभिन्न',
        origin: 'भारत',
        processing: 'पूर्ण, साफ किया हुआ, ट्यूब और टेंटेकल्स, रिंग्स',
        packaging: 'IQF, ब्लॉक, ताजा',
        certification: 'HACCP, निर्यात प्रमाणित'
      },
      zh: {
        name: '鱿鱼和章鱼',
        category: '鲜活海鲜',
        description: '多种切法，适合地中海和亚洲料理',
        sizes: '多种规格',
        origin: '印度',
        processing: '整只、清洗、管和触须、圈',
        packaging: 'IQF、块冻、鲜品',
        certification: 'HACCP, 出口认证'
      },
      ja: {
        name: 'イカとタコ',
        category: '新鮮シーフード',
        description: '地中海・アジア料理向け各種カット',
        sizes: '各種',
        origin: 'インド',
        processing: '丸ごと、洗浄済み、胴と足、リング',
        packaging: 'IQF、ブロック、生',
        certification: 'HACCP, 輸出認証'
      }
    }
  },

  // ============================================================================
  // SPECIALTY FISH (keeping existing)
  // ============================================================================
  {
    id: 'silver-pomfret',
    name: 'Silver Pomfret',
    nameKey: 'product.silverPomfret',
    scientificName: 'Pampus argenteus',
    description: 'A premium table fish highly sought after in Asian markets. Delicate white meat with minimal bones, perfect for steaming and pan-frying.',
    descriptionKey: 'product.silverPomfret.desc',
    image: 'https://images.unsplash.com/photo-1534942205242-a42d3c2a117b?q=80&w=800&auto=format&fit=crop',
    video: 'https://cdn.pixabay.com/video/2016/09/05/4964-182620860_large.mp4',
    category: 'Fish',
    categoryKey: 'category.fish',
    division: 'fresh-seafood',
    processingType: ['Whole Round', 'Gutted', 'IWP'],
    specs: {
      sizes: ['300/400', '400/500', '500/600', '600+'],
      packing: ['10kg Bulk', 'IWP'],
      origin: 'Wild Catch - Indian Ocean',
      certifications: ['HACCP', 'BRC']
    },
    highlights: ['Premium Quality', 'Minimal Bones', 'Delicate Meat'],
    bestFor: ['Asian Markets', 'Steaming', 'Pan-Frying'],
    info: {
      en: {
        name: 'Silver Pomfret',
        category: 'Fish',
        description: 'Premium table fish, delicate white meat',
        sizes: '300/400 to 600+',
        origin: 'Wild Catch - Indian Ocean',
        processing: 'Whole Round, Gutted, IWP',
        packaging: '10kg Bulk, IWP',
        certification: 'HACCP, BRC'
      },
      hi: {
        name: 'सिल्वर पॉम्फ्रेट',
        category: 'मछली',
        description: 'प्रीमियम टेबल मछली, नाजुक सफेद मांस',
        sizes: '300/400 से 600+',
        origin: 'जंगली - हिंद महासागर',
        processing: 'पूर्ण गोल, सफाई किया हुआ, IWP',
        packaging: '10kg थोक, IWP',
        certification: 'HACCP, BRC'
      },
      zh: {
        name: '银鲳鱼',
        category: '鱼类',
        description: '优质餐桌鱼，肉质细嫩',
        sizes: '300/400 至 600+',
        origin: '印度洋野生捕捞',
        processing: '整条、去内脏、IWP',
        packaging: '10kg散装, IWP',
        certification: 'HACCP, BRC'
      },
      ja: {
        name: 'シルバーポンフレット',
        category: '魚類',
        description: 'プレミアムテーブルフィッシュ、繊細な白身',
        sizes: '300/400 〜 600+',
        origin: 'インド洋（天然）',
        processing: '丸ごと、内臓除去、IWP',
        packaging: '10kgバルク, IWP',
        certification: 'HACCP, BRC'
      }
    }
  },

  // ============================================================================
  // BIO-PRODUCTS
  // ============================================================================
  {
    id: 'chitin-flakes',
    name: 'Chitin Flakes',
    nameKey: 'product.chitinFlakes',
    scientificName: 'Industrial Grade',
    description: 'High-quality chitin derived from shrimp shells. Used in agriculture, textiles, water treatment, and pharmaceutical applications. Sustainable processing by-product.',
    descriptionKey: 'product.chitinFlakes.desc',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop',
    video: null,
    category: 'Bio-Products',
    categoryKey: 'category.bio',
    division: 'bio',
    processingType: ['Flakes', 'Powder'],
    specs: {
      sizes: ['Mesh 80', 'Mesh 100'],
      packing: ['25kg HDPE Bag'],
      origin: 'Processing By-product',
      certifications: ['Industrial Grade', 'Quality Tested']
    },
    highlights: ['Sustainable', 'Multi-Industry Use', 'High Purity'],
    bestFor: ['Agriculture', 'Textiles', 'Water Treatment', 'Pharmaceuticals'],
    info: {
      en: {
        name: 'Chitin Flakes',
        category: 'Bio-Products',
        description: 'Industrial chitin from shrimp shells',
        sizes: 'Mesh 80, Mesh 100',
        origin: 'Processing By-product',
        processing: 'Flakes, Powder',
        packaging: '25kg HDPE Bag',
        certification: 'Industrial Grade'
      },
      hi: {
        name: 'काइटिन फ्लेक्स',
        category: 'जैव-उत्पाद',
        description: 'झींगा के खोल से औद्योगिक काइटिन',
        sizes: 'मेश 80, मेश 100',
        origin: 'प्रसंस्करण उप-उत्पाद',
        processing: 'फ्लेक्स, पाउडर',
        packaging: '25kg HDPE बैग',
        certification: 'औद्योगिक ग्रेड'
      },
      zh: {
        name: '甲壳素片',
        category: '生物产品',
        description: '来自虾壳的工业级甲壳素',
        sizes: '80目, 100目',
        origin: '加工副产品',
        processing: '片状、粉状',
        packaging: '25kg HDPE袋',
        certification: '工业级'
      },
      ja: {
        name: 'キチンフレーク',
        category: 'バイオ製品',
        description: 'エビ殻由来の産業用キチン',
        sizes: 'メッシュ80, メッシュ100',
        origin: '加工副産物',
        processing: 'フレーク、パウダー',
        packaging: '25kg HDPEバッグ',
        certification: '産業用グレード'
      }
    }
  },
  {
    id: 'chitosan',
    name: 'Chitosan',
    nameKey: 'product.chitosan',
    scientificName: 'Pharma Grade',
    description: 'Pharmaceutical-grade chitosan derived from chitin. High purity for medical, cosmetic, and food industry applications.',
    descriptionKey: 'product.chitosan.desc',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop',
    video: null,
    category: 'Bio-Products',
    categoryKey: 'category.bio',
    division: 'bio',
    processingType: ['Powder', 'Solution'],
    specs: {
      sizes: ['Various Molecular Weights'],
      packing: ['1kg', '5kg', '25kg'],
      purity: '90%+',
      origin: 'Derived from Chitin',
      certifications: ['Pharma Grade', 'Food Grade Available']
    },
    highlights: ['High Purity', 'Pharma Grade', 'Multiple Applications'],
    bestFor: ['Pharmaceuticals', 'Cosmetics', 'Food Industry', 'Medical'],
    info: {
      en: {
        name: 'Chitosan',
        category: 'Bio-Products',
        description: 'Pharmaceutical-grade, high purity',
        sizes: 'Various Molecular Weights',
        origin: 'Derived from Chitin',
        processing: 'Powder, Solution',
        packaging: '1kg, 5kg, 25kg',
        certification: 'Pharma Grade, Food Grade'
      },
      hi: {
        name: 'काइटोसन',
        category: 'जैव-उत्पाद',
        description: 'फार्मा-ग्रेड, उच्च शुद्धता',
        sizes: 'विभिन्न आणविक भार',
        origin: 'काइटिन से प्राप्त',
        processing: 'पाउडर, सॉल्यूशन',
        packaging: '1kg, 5kg, 25kg',
        certification: 'फार्मा ग्रेड, फूड ग्रेड'
      },
      zh: {
        name: '壳聚糖',
        category: '生物产品',
        description: '药用级，高纯度',
        sizes: '多种分子量',
        origin: '甲壳素衍生',
        processing: '粉末、溶液',
        packaging: '1kg, 5kg, 25kg',
        certification: '药用级, 食品级'
      },
      ja: {
        name: 'キトサン',
        category: 'バイオ製品',
        description: '医薬品グレード、高純度',
        sizes: '各種分子量',
        origin: 'キチン由来',
        processing: 'パウダー、溶液',
        packaging: '1kg, 5kg, 25kg',
        certification: '医薬品グレード, 食品グレード'
      }
    }
  }
];

// Product categories for filtering
export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Products', labelKey: 'category.all' },
  { id: 'sea-caught', label: 'Sea-Caught Shrimp', labelKey: 'category.seaCaught' },
  { id: 'aquaculture', label: 'Aquaculture Shrimp', labelKey: 'category.aquaculture' },
  { id: 'raw-peeled', label: 'Raw Peeled', labelKey: 'category.rawPeeled' },
  { id: 'cooked', label: 'Cooked Shrimp', labelKey: 'category.cooked' },
  { id: 'value-added', label: 'Value-Added', labelKey: 'category.valueAdded' },
  { id: 'fresh', label: 'Fresh Seafood', labelKey: 'category.fresh' },
  { id: 'fish', label: 'Fish', labelKey: 'category.fish' },
  { id: 'bio', label: 'Bio-Products', labelKey: 'category.bio' }
];

// Company certifications
export const CERTIFICATIONS = [
  { name: 'HACCP', description: 'Hazard Analysis Critical Control Points', benefit: 'Food safety assurance' },
  { name: 'BRC', description: 'British Retail Consortium', benefit: 'Global retail acceptance' },
  { name: 'BAP', description: 'Best Aquaculture Practices', benefit: 'Sustainable sourcing' },
  { name: 'EU-Approved', description: 'European Union Certified', benefit: 'EU market access' },
  { name: 'Halal', description: 'Halal Certified', benefit: 'Islamic market compliance' },
  { name: 'MPEDA', description: 'Marine Products Export Development Authority', benefit: 'Indian export certified' }
];

// Processing facilities
export const FACILITIES = [
  {
    name: 'Visakhapatnam',
    features: ['Advanced IQF Technology', 'HACCP Certified', 'MPEDA Certified', 'International Export Certified']
  },
  {
    name: 'Kakinada',
    features: ['Premium Processing Center', 'State-of-the-art Packaging', 'Real-time Temperature Monitoring']
  },
  {
    name: 'Nellore',
    features: ['Advanced IQF Technology', 'HACCP Certified', 'EU-Approved', 'Halal Certified']
  },
  {
    name: 'Bhimavaram',
    features: ['Premium Processing Center', 'Real-time Monitoring', 'EU-Approved', 'Halal Certified']
  }
];

// Business model info
export const BUSINESS_MODEL = {
  commission: '$0.50/kg',
  benefits: [
    'Daily or stage-wise photo updates',
    'No capital investment in processing',
    'Access to certified global exporters',
    'Real-time supply chain monitoring',
    'Quality assurance & traceability',
    'Fast delivery via sea/air cargo'
  ],
  bulkDiscounts: [
    { range: '1-5 MT', discount: 'Standard $0.50/kg' },
    { range: '5-20 MT', discount: 'Standard $0.50/kg' },
    { range: '20-50 MT', discount: '5% discount on commission' },
    { range: '50+ MT', discount: '10% discount on commission' }
  ]
};

// Contact information
export const CONTACT_INFO = {
  company: 'Mahadev Marine Exports Pvt. Ltd.',
  address: 'Tuni, Andhra Pradesh, India',
  processingLocations: 'Visakhapatnam & Kakinada',
  contacts: [
    {
      name: 'Harsha Arigela',
      title: 'Chairman & Executive Director',
      phone: '+91 9059861256',
      email: 'mahadevmarineexports@gmail.com'
    },
    {
      name: 'Mahesh Revu',
      title: 'Operational Director',
      phone: '+91 7989591952',
      email: 'mahadevmarineinternational@gmail.com'
    }
  ],
  responseTime: 'Email inquiry: Response within 2 hours',
  availability: 'Phone: 8 AM - 8 PM IST',
  whatsapp: 'Real-time updates & photos'
};
