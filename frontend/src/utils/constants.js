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

export const DIVISIONS = [
  {
    id: 'shrimp',
    title: 'Shrimp Division',
    description: 'Premium Black Tiger & Vannamei processing excellence.',
    icon: 'Shrimp',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=1000&auto=format&fit=crop',
    color: 'border-gold-600',
    features: ['HACCP Certified', 'Automated Grading', 'Custom Glazing']
  },
  {
    id: 'seafood',
    title: 'Seafood Division',
    description: 'High-value catch: Pomfret, Kingfish, Tuna & more.',
    icon: 'Fish',
    image: 'https://images.unsplash.com/photo-1534942205242-a42d3c2a117b?q=80&w=1000&auto=format&fit=crop',
    color: 'border-ocean-400',
    features: ['Air Cargo Ready', 'Sashimi Grade', 'Blast Frozen']
  },
  {
    id: 'bio',
    title: 'Bio-Products',
    description: 'Industrial marine extracts: Chitin & Chitosan.',
    icon: 'FlaskConical',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1000&auto=format&fit=crop',
    color: 'border-indigo-500',
    features: ['Pharma Grade', 'High Purity', 'Sustainable']
  },
];

export const PRODUCTS = [
  {
    id: '1',
    name: 'Black Tiger Shrimp',
    scientificName: 'Penaeus monodon',
    description: 'The monarch of prawns. Distinctive stripes, firm texture, and sweet flavor. Processed in our state-of-the-art Veraval facility.',
    image: 'https://images.unsplash.com/photo-1626804475297-411dbe631267?q=80&w=800&auto=format&fit=crop',
    category: 'Shrimp',
    division: 'shrimp',
    processingType: ['Head-On', 'Head-Less', 'Peeled'],
    specs: {
      sizes: ['U/5', '6/8', '8/12', '13/15', '16/20'],
      packing: ['2kg x 6 Block', '1kg IQF'],
      glaze: ['20%', '25%', 'Custom'],
      origin: 'Indian Ocean (FAO 51)'
    },
    transformation: [
      { label: 'Raw Catch', duration: 1, image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=400&auto=format&fit=crop' },
      { label: 'Grading', duration: 1, image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=400&auto=format&fit=crop' },
      { label: 'Export Ready', duration: 2, image: 'https://images.unsplash.com/photo-1626804475297-411dbe631267?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: '2',
    name: 'Vannamei Shrimp',
    scientificName: 'Litopenaeus vannamei',
    description: 'Sustainably farmed white leg shrimp. Versatile, consistent size, and mild flavor perfect for global cuisines.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
    category: 'Shrimp',
    division: 'shrimp',
    processingType: ['PD', 'PDTO', 'HMSO'],
    specs: {
      sizes: ['31/40', '41/50', '51/60', '61/70'],
      packing: ['1.8kg Block', '1kg Retail Bag'],
      glaze: ['Net Weight', '5%', '10%'],
      origin: 'Aquaculture India'
    },
    transformation: [
        { label: 'Harvest', duration: 1, image: 'https://images.unsplash.com/photo-1678809549303-346765276337?q=80&w=400&auto=format&fit=crop' },
        { label: 'Peeling', duration: 1, image: 'https://images.unsplash.com/photo-1615141982880-131f4794101f?q=80&w=400&auto=format&fit=crop' },
        { label: 'Final IQF', duration: 2, image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: '3',
    name: 'Silver Pomfret',
    scientificName: 'Pampus argenteus',
    description: 'A premium table fish highly sought after in Asian markets. Delicate white meat with minimal bones.',
    image: 'https://images.unsplash.com/photo-1534942205242-a42d3c2a117b?q=80&w=800&auto=format&fit=crop',
    category: 'Fish',
    division: 'seafood',
    processingType: ['Whole Round', 'Gutted'],
    specs: {
      sizes: ['300/400', '400/500', '500/600', '600+'],
      packing: ['10kg Bulk', 'IWP'],
      origin: 'Wild Catch'
    }
  },
  {
    id: '4',
    name: 'Chitin Flakes',
    scientificName: 'Industrial Grade',
    description: 'High-quality chitin derived from shrimp shells. Used in agriculture, textiles, and water treatment.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop',
    category: 'Bio-Products',
    division: 'bio',
    processingType: ['Flakes', 'Powder'],
    specs: {
      sizes: ['Mesh 80', 'Mesh 100'],
      packing: ['25kg HDPE Bag'],
      origin: 'Processing By-product'
    }
  },
];
