'use client';

import React, { useState } from 'react';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import ProductCard from '@/app/components/ui/ProductCard';
import { MOCK_PRODUCTS } from '@/app/data/mockProducts';
import { Flame, TrendingUp, Sparkles } from 'lucide-react';

const TRENDING_TAGS = ['All Trends', '🎧 Audio & Tech', '👟 Footwear', '☕ Coffee & Kitchen', '⏱️ Wearables'];

export default function TrendingPage() {
  const [selectedTag, setSelectedTag] = useState('All Trends');

  const trendingProducts = MOCK_PRODUCTS.filter((p) => p.isTrending);

  return (
    <FrontendLayout>
      <div className="py-2">
        <Breadcrumbs items={[{ label: 'Trending Now' }]} />

        {/* Hero Section */}
        <div className="rounded-3xl bg-linear-to-r from-orange-500/10 via-amber-500/10 to-rose-500/10 border border-border p-6 sm:p-10 mb-8 relative overflow-hidden">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 text-xs font-bold mb-3">
              <Flame className="w-3.5 h-3.5 fill-orange-500" />
              <span>Real-Time Virality & Demand</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
              Trending Products This Week
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Discover what customers are viewing, sharing, and buying the most across all categories.
            </p>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-2 pb-4 mb-6 overflow-x-auto">
          {TRENDING_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-surface hover:bg-background border border-border text-foreground'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Stats highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-surface border border-border flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Hourly Sales Spike</p>
              <h4 className="text-base font-bold text-foreground">+142% vs last week</h4>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-border flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Top Category</p>
              <h4 className="text-base font-bold text-foreground">Noise Canceling Audio</h4>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-border flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Customer Satisfaction</p>
              <h4 className="text-base font-bold text-foreground">4.8 / 5.0 Average</h4>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product, index) => (
            <div key={product.id} className="relative">
              <div className="absolute -top-3 -left-2 z-20 px-2.5 py-1 rounded-lg bg-orange-600 text-white font-black text-xs shadow-md flex items-center gap-1">
                <Flame className="w-3 h-3 fill-white" />
                <span>#{index + 1}</span>
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </FrontendLayout>
  );
}
