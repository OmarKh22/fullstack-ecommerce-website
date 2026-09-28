import React from 'react';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import ProductCard from '@/app/components/ui/ProductCard';
import { MOCK_PRODUCTS } from '@/app/data/mockProducts';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CATEGORY_MAP: Record<
  string,
  {
    name: string;
    description: string;
    subcategories: string[];
    bannerImage: string;
    icon: string;
  }
> = {
  electronics: {
    name: 'Electronics & Computers',
    description: 'Cutting-edge laptops, noise-canceling headphones, 4K displays, and high-tech smart peripherals.',
    subcategories: ['Laptops & Desktops', 'Audio & Headphones', 'Smartphones', 'Wearables', 'Gaming Accessories'],
    bannerImage: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&auto=format&fit=crop&q=80',
    icon: '⚡'
  },
  fashion: {
    name: 'Fashion & Apparel',
    description: 'Elevated essentials, premium outerwear, designer denim, and athletic streetwear built for comfort.',
    subcategories: ['Men\'s Fashion', 'Women\'s Apparel', 'Footwear', 'Accessories', 'Outerwear'],
    bannerImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    icon: '👗'
  },
  'home-living': {
    name: 'Home & Living',
    description: 'Transform your living spaces with artisan ceramics, smart kitchen appliances, and modern furniture.',
    subcategories: ['Kitchen & Dining', 'Espresso Machines', 'Modern Furniture', 'Home Organization', 'Bedding'],
    bannerImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
    icon: '🏠'
  },
  'beauty-health': {
    name: 'Beauty & Health',
    description: 'Holistic wellness products, deep tissue percussive therapy, organic skincare, and grooming essentials.',
    subcategories: ['Recovery & Massage', 'Skincare', 'Personal Care', 'Fitness Tech', 'Vitamins'],
    bannerImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80',
    icon: '✨'
  },
  'sports-outdoors': {
    name: 'Sports & Outdoors',
    description: 'Rugged GPS smartwatches, expedition coolers, technical running shoes, and adventure camping gear.',
    subcategories: ['Running Gear', 'Adventure GPS', 'Coolers & Storage', 'Camping Gear', 'Fitness'],
    bannerImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=1200&auto=format&fit=crop&q=80',
    icon: '🏔️'
  }
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Resolve category info or fallback
  const categoryInfo = CATEGORY_MAP[slug] || {
    name: slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    description: `Browse all curated products and collections in ${slug.replace('-', ' ')}.`,
    subcategories: ['Best Sellers', 'New Releases', 'Deals', 'Trending'],
    bannerImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80',
    icon: '🏷️'
  };

  // Filter products by category slug or provide related products
  const categoryProducts = MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === slug
  );

  const displayProducts = categoryProducts.length > 0 ? categoryProducts : MOCK_PRODUCTS.slice(0, 8);

  return (
    <FrontendLayout>
      <div className="py-2">
        <Breadcrumbs
          items={[
            { label: 'Catalog', href: '/catalog' },
            { label: categoryInfo.name }
          ]}
        />

        {/* Dynamic Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-8 border border-border bg-surface">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={categoryInfo.bannerImage}
              alt={categoryInfo.name}
              className="w-full h-full object-cover opacity-20 filter blur-xs scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/60" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">
              <span>{categoryInfo.icon}</span>
              <span>Official Department</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
              {categoryInfo.name}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {categoryInfo.description}
            </p>
          </div>
        </div>

        {/* Subcategories Chips Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 flex-wrap pb-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-1">
                Explore:
              </span>
              {categoryInfo.subcategories.map((subcat) => (
                <button
                  key={subcat}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-surface hover:bg-background border border-border text-foreground whitespace-nowrap transition-colors"
                >
                  {subcat}
                </button>
              ))}
            </div>

            <span className="text-xs text-muted-foreground">
              <strong>{displayProducts.length}</strong> items available
            </span>
          </div>
        </div>

        {/* Products Listing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </FrontendLayout>
  );
}
