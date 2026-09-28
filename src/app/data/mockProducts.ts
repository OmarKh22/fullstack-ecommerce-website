export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  image: string;
  inStock: boolean;
  stockCount?: number;
  badge?: string;
  isTrending?: boolean;
  isFlashDeal?: boolean;
  isNewArrival?: boolean;
  isClearance?: boolean;
  isTodaysDeal?: boolean;
  dealEndsInHours?: number;
  description?: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    category: 'Electronics',
    categorySlug: 'electronics',
    brand: 'Sony',
    price: 348.0,
    originalPrice: 399.99,
    discountPercent: 13,
    rating: 4.8,
    reviewCount: 1420,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 24,
    badge: 'Best Seller',
    isTrending: true,
    isTodaysDeal: true,
    description: 'Industry-leading noise cancellation with two processors and 8 microphones for unprecedented sound purity.'
  },
  {
    id: 'prod-2',
    name: 'Apple MacBook Air 15-inch M3 Chip (16GB RAM, 512GB SSD)',
    category: 'Electronics',
    categorySlug: 'electronics',
    brand: 'Apple',
    price: 1499.0,
    originalPrice: 1699.0,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 890,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 15,
    badge: 'Popular',
    isTrending: true,
    isNewArrival: true,
    description: 'Impossibly thin and fast with up to 18 hours of battery life and a stunning Liquid Retina display.'
  },
  {
    id: 'prod-3',
    name: 'Nike Air Zoom Pegasus 40 Premium Running Shoes',
    category: 'Fashion & Apparel',
    categorySlug: 'fashion',
    brand: 'Nike',
    price: 99.99,
    originalPrice: 140.0,
    discountPercent: 29,
    rating: 4.7,
    reviewCount: 654,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 38,
    badge: 'Flash Deal',
    isFlashDeal: true,
    dealEndsInHours: 6,
    isTrending: true,
    description: 'Springy responsiveness for every run, tuned with Nike React technology and dual Zoom Air units.'
  },
  {
    id: 'prod-4',
    name: 'Samsung 65" Class OLED 4K S90C Smart TV',
    category: 'Electronics',
    categorySlug: 'electronics',
    brand: 'Samsung',
    price: 1599.99,
    originalPrice: 2099.99,
    discountPercent: 24,
    rating: 4.7,
    reviewCount: 320,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 7,
    badge: 'Save $500',
    isTodaysDeal: true,
    description: 'Quantum HDR OLED technology with dramatic brightness and authentic billion shades of color.'
  },
  {
    id: 'prod-5',
    name: 'Theragun Pro Gen 5 Deep Tissue Percussive Massager',
    category: 'Beauty & Health',
    categorySlug: 'beauty-health',
    brand: 'Therabody',
    price: 399.0,
    originalPrice: 599.0,
    discountPercent: 33,
    rating: 4.6,
    reviewCount: 412,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 19,
    badge: '33% OFF',
    isFlashDeal: true,
    dealEndsInHours: 4,
    description: 'Smarter and quieter than ever. Relieve muscle soreness, improve recovery, and enhance flexibility.'
  },
  {
    id: 'prod-6',
    name: 'Breville Barista Touch Espresso Machine Stainless Steel',
    category: 'Home & Living',
    categorySlug: 'home-living',
    brand: 'Breville',
    price: 899.95,
    originalPrice: 999.95,
    discountPercent: 10,
    rating: 4.9,
    reviewCount: 780,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 12,
    badge: 'Staff Pick',
    isNewArrival: true,
    description: 'Automated touchscreen coffee machine with pre-programmed cafe drinks menu and microfoam texturing.'
  },
  {
    id: 'prod-7',
    name: 'Minimalist Matte Ceramic Dinnerware Set (16 Pieces)',
    category: 'Home & Living',
    categorySlug: 'home-living',
    brand: 'NordicHome',
    price: 49.99,
    originalPrice: 120.0,
    discountPercent: 58,
    rating: 4.4,
    reviewCount: 230,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 5,
    badge: 'Clearance',
    isClearance: true,
    description: 'Artisan crafted stoneware plates and bowls with organic edges and durable scratch-resistant glaze.'
  },
  {
    id: 'prod-8',
    name: 'Garmin Fenix 7X Pro Sapphire Solar Smartwatch',
    category: 'Sports & Outdoors',
    categorySlug: 'sports-outdoors',
    brand: 'Garmin',
    price: 749.99,
    originalPrice: 899.99,
    discountPercent: 17,
    rating: 4.8,
    reviewCount: 520,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 14,
    badge: 'Solar Charging',
    isTrending: true,
    description: 'Multisport GPS smartwatch with built-in LED flashlight, endurance score, and solar battery charging.'
  },
  {
    id: 'prod-9',
    name: 'Levi’s Premium Vintage Trucker Denim Jacket',
    category: 'Fashion & Apparel',
    categorySlug: 'fashion',
    brand: 'Levi\'s',
    price: 48.0,
    originalPrice: 98.0,
    discountPercent: 51,
    rating: 4.5,
    reviewCount: 890,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 3,
    badge: '51% OFF',
    isClearance: true,
    description: 'The iconic denim jacket silhouette with vintage-inspired wash and soft cotton twill weave.'
  },
  {
    id: 'prod-10',
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    category: 'Home & Living',
    categorySlug: 'home-living',
    brand: 'Dyson',
    price: 649.99,
    originalPrice: 749.99,
    discountPercent: 13,
    rating: 4.8,
    reviewCount: 1102,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 22,
    badge: 'Best Tech',
    isTrending: true,
    isTodaysDeal: true,
    description: 'Laser reveals invisible dust with intelligent piezo sensor calculating particle count continuously.'
  },
  {
    id: 'prod-11',
    name: 'Anker Prime 20,000mAh Power Bank (200W Output)',
    category: 'Electronics',
    categorySlug: 'electronics',
    brand: 'Anker',
    price: 89.99,
    originalPrice: 129.99,
    discountPercent: 31,
    rating: 4.9,
    reviewCount: 940,
    image: 'https://images.unsplash.com/photo-1609592424364-7770932c253d?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 45,
    badge: 'Flash Deal',
    isFlashDeal: true,
    dealEndsInHours: 8,
    description: 'Ultra-fast multi-device charging station with digital smart display showing power stats in real-time.'
  },
  {
    id: 'prod-12',
    name: 'Yeti Tundra 45 Hard Cooler Desert Bronze',
    category: 'Sports & Outdoors',
    categorySlug: 'sports-outdoors',
    brand: 'Yeti',
    price: 275.0,
    originalPrice: 325.0,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 680,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986b88?w=600&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 11,
    badge: 'Heavy Duty',
    isNewArrival: true,
    description: 'Legendary toughness with PermaFrost insulation capable of keeping ice frozen for multiple days.'
  }
];

export const MOCK_BRANDS = [
  {
    id: 'apple',
    name: 'Apple',
    category: 'Electronics & Computers',
    logo: '🍎',
    itemCount: 48,
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80',
    description: 'Innovative hardware, software, and services built with exceptional craft and precision.'
  },
  {
    id: 'sony',
    name: 'Sony',
    category: 'Audio, Vision & Gaming',
    logo: '🎧',
    itemCount: 36,
    banner: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    description: 'Pioneering sound fidelity, alpha cameras, and PlayStation gaming entertainment.'
  },
  {
    id: 'nike',
    name: 'Nike',
    category: 'Athletics & Footwear',
    logo: '👟',
    itemCount: 62,
    banner: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
    description: 'Bringing inspiration and innovation to every athlete with cutting-edge sport performance.'
  },
  {
    id: 'samsung',
    name: 'Samsung',
    category: 'Smartphones & Displays',
    logo: '📱',
    itemCount: 54,
    banner: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    description: 'Empowering future experiences through galaxy smartphones, home appliances, and microLED screens.'
  },
  {
    id: 'dyson',
    name: 'Dyson',
    category: 'Home Care & Beauty',
    logo: '🌀',
    itemCount: 22,
    banner: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&auto=format&fit=crop&q=80',
    description: 'Engineering intelligent cordless vacuums, supersonic hair dryers, and air purifiers.'
  },
  {
    id: 'garmin',
    name: 'Garmin',
    category: 'Adventure GPS & Watches',
    logo: '🧭',
    itemCount: 29,
    banner: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
    description: 'Engineered on the inside for life on the outside. Rugged GPS navigation and multisport watches.'
  }
];
