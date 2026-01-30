import React, { useState, useContext, createContext } from 'react';

// Comprehensive translation dictionary for all 4 languages
const DICTIONARY = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title': 'Depth to Destination',
    'hero.subtitle': 'Global Excellence in Premium Seafood Exports',

    // CTAs
    'cta.enquire': 'Request Quote',
    'cta.explore': 'Explore Divisions',
    'cta.viewProducts': 'View Products',
    'cta.orderNow': 'Order Now',
    'cta.requestSpec': 'Request Spec Sheet',

    // Categories
    'category.all': 'All Products',
    'category.seaCaught': 'Sea-Caught Shrimp',
    'category.aquaculture': 'Aquaculture Shrimp',
    'category.rawPeeled': 'Raw Peeled',
    'category.cooked': 'Cooked Shrimp',
    'category.valueAdded': 'Value-Added',
    'category.fresh': 'Fresh Seafood',
    'category.fish': 'Fish',
    'category.bio': 'Bio-Products',

    // Division Titles
    'division.rawShrimp': 'Raw Shrimp',
    'division.rawPeeled': 'Raw Peeled Products',
    'division.cooked': 'Cooked Ready-to-Eat',
    'division.valueAdded': 'Value-Added Premium',
    'division.freshSeafood': 'Fresh Seafood',
    'division.bio': 'Bio-Products',

    // Product Names - Raw Shrimp (Sea-Caught)
    'product.seaTiger': 'Sea Tiger Shrimp',
    'product.seaTiger.desc': 'Premium naturally-sourced shrimp with superior taste and texture. Large, meaty, distinctive flavor profile perfect for high-end culinary applications.',
    'product.whiteShrimp': 'White Shrimp',
    'product.whiteShrimp.desc': 'Mild, sweet, versatile shrimp perfect for any cuisine. Clean taste profile that adapts well to various cooking methods and seasonings.',
    'product.pinkBrown': 'Pink Brown Shrimp',
    'product.pinkBrown.desc': 'Tender, delicate shrimp perfect for fine dining. Subtle flavor profile with excellent texture, highly prized in gourmet preparations.',

    // Product Names - Raw Shrimp (Aquaculture)
    'product.vannamei': 'Vannamei Shrimp',
    'product.vannamei.desc': 'Most popular global variety with consistent size and quality. Sustainably farm-raised with strict quality controls.',
    'product.blackTiger': 'Black Tiger Shrimp',
    'product.blackTiger.desc': 'The monarch of prawns. Large size with distinctive stripes, firm texture, and sweet flavor.',

    // Product Names - Raw Peeled
    'product.pdto': 'Peeled Deveined Tail On (PDTO)',
    'product.pdto.desc': 'Premium choice for chefs & caterers. Shell & vein completely removed with tail intact for elegant presentation.',
    'product.pd': 'Peeled Deveined Tail Off (PD)',
    'product.pd.desc': 'Practical choice for bulk cooking & food service. Completely peeled & deveined with tail removed.',
    'product.pvpdto': 'Pulled Vein Tail On (PVPDTO)',
    'product.pvpdto.desc': 'Traditional presentation with modern convenience. Shell removed with vein pulled out cleanly.',
    'product.pud': 'Peeled Un-Deveined (PUD)',
    'product.pud.desc': 'For specialty cuisines & premium markets. Shell completely removed with vein intact.',
    'product.hlRaw': 'Headless Shell-On (HL)',
    'product.hlRaw.desc': 'Traditional raw format, perfect for restaurants. Head completely removed with shell intact.',
    'product.hlEasyPeelRaw': 'HL Easy-Peel',
    'product.hlEasyPeelRaw.desc': 'Consumer-friendly peeling innovation. Pre-scored shell for easy removal after cooking.',

    // Product Names - Cooked
    'product.cookedHeadOn': 'Cooked Head-On Shrimp',
    'product.cookedHeadOn.desc': 'Traditional presentation with superior flavor retention. Fully cooked and flash-frozen.',
    'product.cookedHL': 'Cooked Headless (HL) Shrimp',
    'product.cookedHL.desc': 'Professional kitchen standard, ready for immediate use. Heat & serve in 2-3 minutes.',
    'product.cookedHLEasyPeel': 'Cooked HL Easy-Peel',
    'product.cookedHLEasyPeel.desc': 'Pre-scored for convenient shell removal. Cook, peel, eat in under 5 minutes.',
    'product.cookedPDTO': 'Cooked PDTO',
    'product.cookedPDTO.desc': 'Fully prepared with elegant presentation and zero prep time.',
    'product.cookedPD': 'Cooked PD',
    'product.cookedPD.desc': 'Fully processed shrimp perfect for soups, salads, and mixed dishes.',

    // Product Names - Value-Added
    'product.butterfly': 'Butterfly Shrimp',
    'product.butterfly.desc': 'Elegant split presentation for premium restaurant offerings.',
    'product.nobashi': 'Nobashi Shrimp',
    'product.nobashi.desc': 'Japanese presentation with natural curve preserved. Premium sushi/sashimi grade.',
    'product.breaded': 'Breaded Shrimp',
    'product.breaded.desc': 'Golden, crispy coating with restaurant-quality finish. Ready to fry.',
    'product.shrimpSkewers': 'Shrimp Skewers',
    'product.shrimpSkewers.desc': 'Pre-cooked, ready-to-grill value-added product.',
    'product.spicedShrimp': 'Spiced Shrimp',
    'product.spicedShrimp.desc': 'Marinated varieties including Cajun, Garlic, and Asian-style seasonings.',

    // Product Names - Fresh Seafood
    'product.liveShrimp': 'Live Shrimp',
    'product.liveShrimp.desc': 'Premium live shrimp available on special request via air cargo.',
    'product.freshFish': 'Fresh Fish',
    'product.freshFish.desc': 'Fresh fish varieties processed within 4 hours of harvest.',
    'product.lobsterCrab': 'Lobster & Crab',
    'product.lobsterCrab.desc': 'Premium lobster and crab varieties available fresh via air cargo.',
    'product.oystersClams': 'Oysters & Clams',
    'product.oystersClams.desc': 'Fresh oysters and clams sourced from premium waters.',
    'product.squidOctopus': 'Squid & Octopus',
    'product.squidOctopus.desc': 'Fresh squid and octopus for Mediterranean and Asian cuisines.',
    'product.silverPomfret': 'Silver Pomfret',
    'product.silverPomfret.desc': 'Premium table fish highly sought after in Asian markets.',

    // Product Names - Bio-Products
    'product.chitinFlakes': 'Chitin Flakes',
    'product.chitinFlakes.desc': 'High-quality chitin derived from shrimp shells for industrial use.',
    'product.chitosan': 'Chitosan',
    'product.chitosan.desc': 'Pharmaceutical-grade chitosan for medical and cosmetic applications.',

    // Specs Labels
    'specs.sizes': 'Sizes',
    'specs.packing': 'Packing',
    'specs.glaze': 'Glaze',
    'specs.origin': 'Origin',
    'specs.certifications': 'Certifications',
    'specs.shelfLife': 'Shelf Life',
    'specs.processing': 'Processing',

    // Common Labels
    'common.highlights': 'Highlights',
    'common.bestFor': 'Best For',
    'common.specifications': 'Specifications',
    'common.contactUs': 'Contact Us',
    'common.readMore': 'Read More',
    'common.close': 'Close',
  },

  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.products': 'उत्पाद',
    'nav.contact': 'संपर्क',

    // Hero Section
    'hero.title': 'गहराई से गंतव्य तक',
    'hero.subtitle': 'प्रीमियम समुद्री भोजन निर्यात में वैश्विक उत्कृष्टता',

    // CTAs
    'cta.enquire': 'कोटेशन अनुरोध',
    'cta.explore': 'श्रेणियाँ देखें',
    'cta.viewProducts': 'उत्पाद देखें',
    'cta.orderNow': 'अभी ऑर्डर करें',
    'cta.requestSpec': 'स्पेक शीट अनुरोध',

    // Categories
    'category.all': 'सभी उत्पाद',
    'category.seaCaught': 'समुद्री झींगा',
    'category.aquaculture': 'जलीय कृषि झींगा',
    'category.rawPeeled': 'कच्चा छिला हुआ',
    'category.cooked': 'पका हुआ झींगा',
    'category.valueAdded': 'मूल्य वर्धित',
    'category.fresh': 'ताजा समुद्री भोजन',
    'category.fish': 'मछली',
    'category.bio': 'जैव उत्पाद',

    // Division Titles
    'division.rawShrimp': 'कच्चा झींगा',
    'division.rawPeeled': 'कच्चे छिले उत्पाद',
    'division.cooked': 'पका हुआ खाने के लिए तैयार',
    'division.valueAdded': 'प्रीमियम मूल्य वर्धित',
    'division.freshSeafood': 'ताजा समुद्री भोजन',
    'division.bio': 'जैव उत्पाद',

    // Product Names - Raw Shrimp (Sea-Caught)
    'product.seaTiger': 'सी टाइगर झींगा',
    'product.seaTiger.desc': 'बेहतर स्वाद और बनावट के साथ प्रीमियम प्राकृतिक झींगा। उच्च स्तरीय पाक अनुप्रयोगों के लिए उपयुक्त।',
    'product.whiteShrimp': 'सफेद झींगा',
    'product.whiteShrimp.desc': 'किसी भी व्यंजन के लिए हल्का, मीठा, बहुमुखी झींगा।',
    'product.pinkBrown': 'गुलाबी भूरा झींगा',
    'product.pinkBrown.desc': 'फाइन डाइनिंग के लिए कोमल, नाजुक झींगा।',

    // Product Names - Raw Shrimp (Aquaculture)
    'product.vannamei': 'वन्नामेई झींगा',
    'product.vannamei.desc': 'सुसंगत आकार और गुणवत्ता के साथ सबसे लोकप्रिय वैश्विक किस्म।',
    'product.blackTiger': 'ब्लैक टाइगर झींगा',
    'product.blackTiger.desc': 'झींगों का राजा। विशिष्ट धारियों के साथ बड़ा आकार।',

    // Product Names - Raw Peeled
    'product.pdto': 'छिला देवेइंड टेल ऑन (PDTO)',
    'product.pdto.desc': 'शेफ और कैटरर्स के लिए प्रीमियम विकल्प।',
    'product.pd': 'छिला देवेइंड टेल ऑफ (PD)',
    'product.pd.desc': 'थोक खाना पकाने और फूड सर्विस के लिए व्यावहारिक विकल्प।',
    'product.pvpdto': 'पुल्ड वेन टेल ऑन (PVPDTO)',
    'product.pvpdto.desc': 'आधुनिक सुविधा के साथ पारंपरिक प्रस्तुति।',
    'product.pud': 'छिला अन-देवेइंड (PUD)',
    'product.pud.desc': 'विशेष व्यंजनों और प्रीमियम बाजारों के लिए।',
    'product.hlRaw': 'हेडलेस शेल-ऑन (HL)',
    'product.hlRaw.desc': 'रेस्तरां के लिए पारंपरिक कच्चा प्रारूप।',
    'product.hlEasyPeelRaw': 'HL ईज़ी-पील',
    'product.hlEasyPeelRaw.desc': 'उपभोक्ता-अनुकूल छीलने का नवाचार।',

    // Product Names - Cooked
    'product.cookedHeadOn': 'पका हुआ हेड-ऑन झींगा',
    'product.cookedHeadOn.desc': 'बेहतर स्वाद प्रतिधारण के साथ पारंपरिक प्रस्तुति।',
    'product.cookedHL': 'पका हुआ हेडलेस (HL) झींगा',
    'product.cookedHL.desc': 'तुरंत उपयोग के लिए तैयार पेशेवर रसोई मानक।',
    'product.cookedHLEasyPeel': 'पका हुआ HL ईज़ी-पील',
    'product.cookedHLEasyPeel.desc': 'सुविधाजनक शेल हटाने के लिए प्री-स्कोर्ड।',
    'product.cookedPDTO': 'पका हुआ PDTO',
    'product.cookedPDTO.desc': 'शून्य तैयारी समय के साथ पूरी तरह से तैयार।',
    'product.cookedPD': 'पका हुआ PD',
    'product.cookedPD.desc': 'सूप, सलाद और मिश्रित व्यंजनों के लिए उपयुक्त।',

    // Product Names - Value-Added
    'product.butterfly': 'बटरफ्लाई झींगा',
    'product.butterfly.desc': 'प्रीमियम रेस्तरां पेशकशों के लिए सुंदर विभाजित प्रस्तुति।',
    'product.nobashi': 'नोबाशी झींगा',
    'product.nobashi.desc': 'प्राकृतिक वक्र संरक्षित के साथ जापानी प्रस्तुति। प्रीमियम सुशी ग्रेड।',
    'product.breaded': 'ब्रेडेड झींगा',
    'product.breaded.desc': 'रेस्तरां गुणवत्ता फिनिश के साथ सुनहरा, कुरकुरा कोटिंग।',
    'product.shrimpSkewers': 'झींगा स्केवर्स',
    'product.shrimpSkewers.desc': 'प्री-कुक्ड, ग्रिल के लिए तैयार मूल्य वर्धित उत्पाद।',
    'product.spicedShrimp': 'मसालेदार झींगा',
    'product.spicedShrimp.desc': 'केजुन, लहसुन और एशियाई शैली के मसालों सहित मैरिनेटेड किस्में।',

    // Product Names - Fresh Seafood
    'product.liveShrimp': 'जीवित झींगा',
    'product.liveShrimp.desc': 'विशेष अनुरोध पर एयर कार्गो के माध्यम से उपलब्ध प्रीमियम जीवित झींगा।',
    'product.freshFish': 'ताजी मछली',
    'product.freshFish.desc': 'कटाई के 4 घंटे के भीतर संसाधित ताजी मछली किस्में।',
    'product.lobsterCrab': 'लॉबस्टर और केकड़ा',
    'product.lobsterCrab.desc': 'एयर कार्गो के माध्यम से उपलब्ध प्रीमियम लॉबस्टर और केकड़ा।',
    'product.oystersClams': 'सीप और क्लैम',
    'product.oystersClams.desc': 'प्रीमियम पानी से प्राप्त ताजे सीप और क्लैम।',
    'product.squidOctopus': 'स्क्विड और ऑक्टोपस',
    'product.squidOctopus.desc': 'भूमध्यसागरीय और एशियाई व्यंजनों के लिए ताजा स्क्विड और ऑक्टोपस।',
    'product.silverPomfret': 'सिल्वर पोम्फ्रेट',
    'product.silverPomfret.desc': 'एशियाई बाजारों में अत्यधिक मांग वाली प्रीमियम टेबल मछली।',

    // Product Names - Bio-Products
    'product.chitinFlakes': 'काइटिन फ्लेक्स',
    'product.chitinFlakes.desc': 'औद्योगिक उपयोग के लिए झींगा के छिलकों से प्राप्त उच्च गुणवत्ता वाला काइटिन।',
    'product.chitosan': 'काइटोसन',
    'product.chitosan.desc': 'चिकित्सा और सौंदर्य प्रसाधन अनुप्रयोगों के लिए फार्मा-ग्रेड काइटोसन।',

    // Specs Labels
    'specs.sizes': 'आकार',
    'specs.packing': 'पैकिंग',
    'specs.glaze': 'ग्लेज़',
    'specs.origin': 'मूल',
    'specs.certifications': 'प्रमाणपत्र',
    'specs.shelfLife': 'शेल्फ लाइफ',
    'specs.processing': 'प्रसंस्करण',

    // Common Labels
    'common.highlights': 'मुख्य विशेषताएं',
    'common.bestFor': 'इसके लिए सर्वश्रेष्ठ',
    'common.specifications': 'विनिर्देश',
    'common.contactUs': 'संपर्क करें',
    'common.readMore': 'और पढ़ें',
    'common.close': 'बंद करें',
  },

  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.products': '产品',
    'nav.contact': '联系我们',

    // Hero Section
    'hero.title': '从深海到目的地',
    'hero.subtitle': '全球优质海鲜出口卓越品质',

    // CTAs
    'cta.enquire': '询价',
    'cta.explore': '探索部门',
    'cta.viewProducts': '查看产品',
    'cta.orderNow': '立即订购',
    'cta.requestSpec': '索取规格表',

    // Categories
    'category.all': '所有产品',
    'category.seaCaught': '海捕虾',
    'category.aquaculture': '养殖虾',
    'category.rawPeeled': '生去皮',
    'category.cooked': '熟虾',
    'category.valueAdded': '增值产品',
    'category.fresh': '新鲜海鲜',
    'category.fish': '鱼类',
    'category.bio': '生物产品',

    // Division Titles
    'division.rawShrimp': '生虾',
    'division.rawPeeled': '生去皮产品',
    'division.cooked': '即食熟食',
    'division.valueAdded': '增值优质产品',
    'division.freshSeafood': '新鲜海鲜',
    'division.bio': '生物产品',

    // Product Names - Raw Shrimp (Sea-Caught)
    'product.seaTiger': '海虎虾',
    'product.seaTiger.desc': '具有卓越口感和质地的优质天然虾。大而肉质，独特的风味，适合高端烹饪应用。',
    'product.whiteShrimp': '白虾',
    'product.whiteShrimp.desc': '温和、甜美、多用途的虾，适合任何菜肴。',
    'product.pinkBrown': '粉棕虾',
    'product.pinkBrown.desc': '适合精致餐饮的嫩滑细腻虾。',

    // Product Names - Raw Shrimp (Aquaculture)
    'product.vannamei': '南美白对虾',
    'product.vannamei.desc': '全球最受欢迎的品种，尺寸和质量一致。',
    'product.blackTiger': '黑虎虾',
    'product.blackTiger.desc': '虾中之王。大尺寸，独特条纹，肉质紧实。',

    // Product Names - Raw Peeled
    'product.pdto': '去皮去肠带尾 (PDTO)',
    'product.pdto.desc': '厨师和餐饮商的优质选择。',
    'product.pd': '去皮去肠去尾 (PD)',
    'product.pd.desc': '大批量烹饪和餐饮服务的实用选择。',
    'product.pvpdto': '拉肠带尾 (PVPDTO)',
    'product.pvpdto.desc': '结合现代便利的传统展示方式。',
    'product.pud': '去皮未去肠 (PUD)',
    'product.pud.desc': '适用于特色菜肴和高端市场。',
    'product.hlRaw': '无头带壳 (HL)',
    'product.hlRaw.desc': '适合餐厅的传统生食格式。',
    'product.hlEasyPeelRaw': 'HL易剥',
    'product.hlEasyPeelRaw.desc': '消费者友好的剥壳创新。',

    // Product Names - Cooked
    'product.cookedHeadOn': '熟带头虾',
    'product.cookedHeadOn.desc': '具有卓越风味保留的传统展示。',
    'product.cookedHL': '熟无头 (HL) 虾',
    'product.cookedHL.desc': '专业厨房标准，即刻可用。2-3分钟加热即可食用。',
    'product.cookedHLEasyPeel': '熟HL易剥',
    'product.cookedHLEasyPeel.desc': '预切痕便于去壳。5分钟内即可食用。',
    'product.cookedPDTO': '熟PDTO',
    'product.cookedPDTO.desc': '完全准备好，零准备时间的优雅展示。',
    'product.cookedPD': '熟PD',
    'product.cookedPD.desc': '完全加工的虾，适合汤、沙拉和混合菜肴。',

    // Product Names - Value-Added
    'product.butterfly': '蝴蝶虾',
    'product.butterfly.desc': '高端餐厅产品的优雅开背展示。',
    'product.nobashi': '伸直虾',
    'product.nobashi.desc': '保留自然弯曲的日式展示。优质寿司级别。',
    'product.breaded': '裹粉虾',
    'product.breaded.desc': '具有餐厅品质外观的金黄酥脆裹粉。',
    'product.shrimpSkewers': '虾串',
    'product.shrimpSkewers.desc': '预熟的烧烤即食增值产品。',
    'product.spicedShrimp': '调味虾',
    'product.spicedShrimp.desc': '包括凯郡、蒜香和亚洲风味的腌制品种。',

    // Product Names - Fresh Seafood
    'product.liveShrimp': '活虾',
    'product.liveShrimp.desc': '应特殊要求通过空运提供的优质活虾。',
    'product.freshFish': '鲜鱼',
    'product.freshFish.desc': '收获后4小时内加工的新鲜鱼类。',
    'product.lobsterCrab': '龙虾和螃蟹',
    'product.lobsterCrab.desc': '通过空运提供的优质龙虾和螃蟹。',
    'product.oystersClams': '牡蛎和蛤蜊',
    'product.oystersClams.desc': '来自优质水域的新鲜牡蛎和蛤蜊。',
    'product.squidOctopus': '鱿鱼和章鱼',
    'product.squidOctopus.desc': '适用于地中海和亚洲菜肴的新鲜鱿鱼和章鱼。',
    'product.silverPomfret': '银鲳鱼',
    'product.silverPomfret.desc': '在亚洲市场备受追捧的优质食用鱼。',

    // Product Names - Bio-Products
    'product.chitinFlakes': '甲壳素片',
    'product.chitinFlakes.desc': '从虾壳中提取的高品质甲壳素，用于工业用途。',
    'product.chitosan': '壳聚糖',
    'product.chitosan.desc': '用于医疗和化妆品应用的制药级壳聚糖。',

    // Specs Labels
    'specs.sizes': '规格',
    'specs.packing': '包装',
    'specs.glaze': '冰衣',
    'specs.origin': '产地',
    'specs.certifications': '认证',
    'specs.shelfLife': '保质期',
    'specs.processing': '加工',

    // Common Labels
    'common.highlights': '亮点',
    'common.bestFor': '最适用于',
    'common.specifications': '规格参数',
    'common.contactUs': '联系我们',
    'common.readMore': '阅读更多',
    'common.close': '关闭',
  },

  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.products': '製品',
    'nav.contact': 'お問い合わせ',

    // Hero Section
    'hero.title': '深海から目的地まで',
    'hero.subtitle': 'プレミアムシーフード輸出における世界的な卓越性',

    // CTAs
    'cta.enquire': '見積もり依頼',
    'cta.explore': '部門を探す',
    'cta.viewProducts': '製品を見る',
    'cta.orderNow': '今すぐ注文',
    'cta.requestSpec': '仕様書をリクエスト',

    // Categories
    'category.all': 'すべての製品',
    'category.seaCaught': '天然エビ',
    'category.aquaculture': '養殖エビ',
    'category.rawPeeled': '生むきエビ',
    'category.cooked': '調理済みエビ',
    'category.valueAdded': '付加価値製品',
    'category.fresh': '新鮮なシーフード',
    'category.fish': '魚',
    'category.bio': 'バイオ製品',

    // Division Titles
    'division.rawShrimp': '生エビ',
    'division.rawPeeled': '生むき製品',
    'division.cooked': '調理済み即食製品',
    'division.valueAdded': 'プレミアム付加価値製品',
    'division.freshSeafood': '新鮮なシーフード',
    'division.bio': 'バイオ製品',

    // Product Names - Raw Shrimp (Sea-Caught)
    'product.seaTiger': 'シータイガーシュリンプ',
    'product.seaTiger.desc': '優れた味わいと食感を持つプレミアム天然エビ。大きく肉厚で、高級料理に最適な独特の風味。',
    'product.whiteShrimp': 'ホワイトシュリンプ',
    'product.whiteShrimp.desc': 'あらゆる料理に適したマイルドで甘く万能なエビ。',
    'product.pinkBrown': 'ピンクブラウンシュリンプ',
    'product.pinkBrown.desc': '高級料理に最適な柔らかく繊細なエビ。',

    // Product Names - Raw Shrimp (Aquaculture)
    'product.vannamei': 'バナメイエビ',
    'product.vannamei.desc': '一貫したサイズと品質を持つ世界で最も人気のある品種。',
    'product.blackTiger': 'ブラックタイガーシュリンプ',
    'product.blackTiger.desc': 'エビの王様。特徴的な縞模様を持つ大型エビ。',

    // Product Names - Raw Peeled
    'product.pdto': 'むき身背ワタ取り尾付き (PDTO)',
    'product.pdto.desc': 'シェフやケータリング業者向けのプレミアム製品。',
    'product.pd': 'むき身背ワタ取り尾なし (PD)',
    'product.pd.desc': '大量調理やフードサービス向けの実用的な選択。',
    'product.pvpdto': '背ワタ抜き尾付き (PVPDTO)',
    'product.pvpdto.desc': '現代の利便性を備えた伝統的なプレゼンテーション。',
    'product.pud': 'むき身背ワタ付き (PUD)',
    'product.pud.desc': '特別料理やプレミアム市場向け。',
    'product.hlRaw': '頭なし殻付き (HL)',
    'product.hlRaw.desc': 'レストランに最適な伝統的な生のフォーマット。',
    'product.hlEasyPeelRaw': 'HL イージーピール',
    'product.hlEasyPeelRaw.desc': '消費者に優しいむきやすい革新製品。',

    // Product Names - Cooked
    'product.cookedHeadOn': '調理済み頭付きエビ',
    'product.cookedHeadOn.desc': '優れた風味保持を備えた伝統的なプレゼンテーション。',
    'product.cookedHL': '調理済み頭なし (HL) エビ',
    'product.cookedHL.desc': 'プロのキッチン標準、即座に使用可能。2-3分で温め提供。',
    'product.cookedHLEasyPeel': '調理済みHLイージーピール',
    'product.cookedHLEasyPeel.desc': '便利な殻除去のために事前にスコア付け。5分以内に食べられます。',
    'product.cookedPDTO': '調理済みPDTO',
    'product.cookedPDTO.desc': '準備時間ゼロで完全に準備されたエレガントなプレゼンテーション。',
    'product.cookedPD': '調理済みPD',
    'product.cookedPD.desc': 'スープ、サラダ、混合料理に最適な完全加工エビ。',

    // Product Names - Value-Added
    'product.butterfly': 'バタフライシュリンプ',
    'product.butterfly.desc': 'プレミアムレストラン向けのエレガントな開き切りプレゼンテーション。',
    'product.nobashi': 'のばしエビ',
    'product.nobashi.desc': '自然なカーブを保持した日本式プレゼンテーション。プレミアム寿司グレード。',
    'product.breaded': 'パン粉付きエビ',
    'product.breaded.desc': 'レストラン品質の仕上がりを持つゴールデンでサクサクの衣。',
    'product.shrimpSkewers': 'エビ串',
    'product.shrimpSkewers.desc': '調理済みですぐにグリルできる付加価値製品。',
    'product.spicedShrimp': 'スパイスエビ',
    'product.spicedShrimp.desc': 'ケイジャン、ガーリック、アジアンスタイルの調味料を含むマリネ品種。',

    // Product Names - Fresh Seafood
    'product.liveShrimp': '活エビ',
    'product.liveShrimp.desc': '特別リクエストにより航空貨物で利用可能なプレミアム活エビ。',
    'product.freshFish': '鮮魚',
    'product.freshFish.desc': '収穫後4時間以内に加工された新鮮な魚。',
    'product.lobsterCrab': 'ロブスターとカニ',
    'product.lobsterCrab.desc': '航空貨物で利用可能なプレミアムロブスターとカニ。',
    'product.oystersClams': '牡蠣とアサリ',
    'product.oystersClams.desc': 'プレミアム水域から調達された新鮮な牡蠣とアサリ。',
    'product.squidOctopus': 'イカとタコ',
    'product.squidOctopus.desc': '地中海料理とアジア料理向けの新鮮なイカとタコ。',
    'product.silverPomfret': 'シルバーポンフレット',
    'product.silverPomfret.desc': 'アジア市場で非常に人気のあるプレミアムテーブルフィッシュ。',

    // Product Names - Bio-Products
    'product.chitinFlakes': 'キチンフレーク',
    'product.chitinFlakes.desc': '産業用途向けにエビの殻から抽出された高品質キチン。',
    'product.chitosan': 'キトサン',
    'product.chitosan.desc': '医療および化粧品用途向けの製薬グレードキトサン。',

    // Specs Labels
    'specs.sizes': 'サイズ',
    'specs.packing': '包装',
    'specs.glaze': 'グレーズ',
    'specs.origin': '原産地',
    'specs.certifications': '認証',
    'specs.shelfLife': '賞味期限',
    'specs.processing': '加工',

    // Common Labels
    'common.highlights': 'ハイライト',
    'common.bestFor': '最適な用途',
    'common.specifications': '仕様',
    'common.contactUs': 'お問い合わせ',
    'common.readMore': '続きを読む',
    'common.close': '閉じる',
  },

  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.products': 'Продукция',
    'nav.contact': 'Контакты',

    // Hero Section
    'hero.title': 'Глубина до назначения',
    'hero.subtitle': 'Мировое превосходство в экспорте морепродуктов премиум-класса',

    // CTAs
    'cta.enquire': 'Запросить цену',
    'cta.explore': 'Исследовать отделы',
    'cta.viewProducts': 'Посмотреть продукцию',
    'cta.orderNow': 'Заказать сейчас',
    'cta.requestSpec': 'Запросить спецификацию',

    // Products (Simplified for brevity, can be expanded)
    'category.all': 'Все продукты',
    'category.seaCaught': 'Дикая креветка',
    'category.aquaculture': 'Аквакультура',
    'category.rawPeeled': 'Очищенные сырые',

    'common.contactUs': 'Связаться с нами',
  },

  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.products': 'Produits',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title': 'De la Profondeur à la Destination',
    'hero.subtitle': 'Excellence mondiale dans l\'exportation de fruits de mer haut de gamme',

    // CTAs
    'cta.enquire': 'Demander un devis',
    'cta.explore': 'Explorer les divisions',
    'cta.viewProducts': 'Voir les produits',
    'cta.orderNow': 'Commander maintenant',
    'cta.requestSpec': 'Fiche technique',

    // Products
    'category.all': 'Tous les produits',
    'category.seaCaught': 'Crevettes sauvages',
    'category.aquaculture': 'Aquaculture',
    'category.rawPeeled': 'Crues décortiquées',

    'common.contactUs': 'Contactez-nous',
  }
};

const TranslationContext = createContext(undefined);

export const TranslationProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return DICTIONARY[lang]?.[key] || DICTIONARY['en'][key] || key;
  };

  // Get all available languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  return React.createElement(
    TranslationContext.Provider,
    { value: { lang, setLang, t, languages } },
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
