'use client';

import React, { useState, useMemo } from 'react';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import ProductCard from '@/app/components/ui/ProductCard';
import { MOCK_PRODUCTS } from '@/app/data/mockProducts';
import {
  SlidersHorizontal,
  Search,
  RotateCcw,
  Sparkles
} from 'lucide-react';

const CATEGORY_OPTIONS = [
  'All Categories',
  'Electronics',
  'Fashion & Apparel',
  'Home & Living',
  'Beauty & Health',
  'Sports & Outdoors'
];

const BRAND_OPTIONS = ['All Brands', 'Apple', 'Sony', 'Nike', 'Samsung', 'Breville', 'Garmin', 'Dyson'];

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      if (searchQuery.trim() && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedCategory !== 'All Categories' && product.category !== selectedCategory) {
        return false;
      }
      if (selectedBrand !== 'All Brands' && product.brand !== selectedBrand) {
        return false;
      }
      if (product.price > maxPrice) {
        return false;
      }
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [searchQuery, selectedCategory, selectedBrand, maxPrice, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedBrand('All Brands');
    setMaxPrice(2000);
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <FrontendLayout>
      <div className="py-2">
        <Breadcrumbs items={[{ label: 'Catalog' }]} />

        {/* Header Banner */}
        <div className="rounded-3xl bg-surface border border-border p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Collection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
              Product Catalog
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Explore our complete selection of premium electronics, apparel, lifestyle, and home products.
            </p>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-surface p-4 rounded-2xl border border-border">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search catalog products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-background border border-border focus:outline-hidden focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
            {/* Filter Toggle on Mobile */}
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="md:hidden px-3.5 py-2 rounded-xl border border-border bg-background text-sm font-medium flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-accent" />
              <span>Filters</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating'
                  )
                }
                aria-label="Sort products by"
                className="px-3 py-2 text-sm rounded-xl bg-background border border-border focus:outline-hidden focus:ring-2 focus:ring-accent text-foreground font-medium"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid & Sidebar Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <aside
            className={`md:block ${
              isMobileFiltersOpen ? 'block' : 'hidden'
            } md:col-span-1 space-y-6 bg-surface p-6 rounded-2xl border border-border h-fit sticky top-24`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="font-bold text-sm tracking-wide flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-accent" />
                Filters
              </h2>
              <button
                onClick={handleResetFilters}
                className="text-xs text-accent hover:underline flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                Category
              </label>
              <div className="space-y-1.5">
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-accent text-white font-semibold'
                        : 'text-foreground hover:bg-background'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                Brand
              </label>
              <div className="space-y-1.5">
                {BRAND_OPTIONS.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedBrand === brand
                        ? 'bg-accent text-white font-semibold'
                        : 'text-foreground hover:bg-background'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                  Max Price
                </span>
                <span className="font-bold text-foreground">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                <span>$50</span>
                <span>$2,000</span>
              </div>
            </div>

            {/* Stock Toggle */}
            <div className="pt-2 border-t border-border">
              <label className="flex items-center gap-2.5 text-xs font-medium text-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded-sm border-border text-accent focus:ring-accent"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>
          </aside>

          {/* Product Listing Main Column */}
          <main className="md:col-span-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
              <span>
                Showing <strong className="text-foreground">{filteredProducts.length}</strong> items
              </span>
              {(selectedCategory !== 'All Categories' || selectedBrand !== 'All Brands' || searchQuery) && (
                <span className="text-accent font-medium">Filtered results</span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
                <p className="text-base font-semibold text-foreground mb-2">No matching products found</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Try adjusting your search query, price limit, or category filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 text-xs font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </FrontendLayout>
  );
}
