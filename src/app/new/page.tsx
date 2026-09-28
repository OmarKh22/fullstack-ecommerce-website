'use client';

import React, { useState } from 'react';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import ProductCard from '@/app/components/ui/ProductCard';
import { MOCK_PRODUCTS } from '@/app/data/mockProducts';
import { Sparkles, Calendar } from 'lucide-react';

const DROP_PERIODS = ['All New Drops', 'Just Arrived (48h)', 'This Week', 'This Month'];

export default function NewArrivalsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('All New Drops');

  const newProducts = MOCK_PRODUCTS.filter((p) => p.isNewArrival || p.id === 'prod-1' || p.id === 'prod-8');

  return (
    <FrontendLayout>
      <div className="py-2">
        <Breadcrumbs items={[{ label: 'New Arrivals' }]} />

        {/* Hero Banner */}
        <div className="rounded-3xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 sm:p-10 mb-8 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Autumn 2026 Collection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Fresh Drops &amp; New Releases
            </h1>
            <p className="text-white/80 text-sm sm:text-base">
              Be the first to get hands on the newest tech releases, seasonal fashion additions, and state-of-the-art gear.
            </p>
          </div>
        </div>

        {/* Drop Timing Filters */}
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {DROP_PERIODS.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedPeriod === period
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-surface hover:bg-background border border-border text-foreground'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <div className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>Updated Daily at Midnight</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <div key={product.id} className="relative">
              <div className="absolute top-4 left-4 z-20">
                <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-accent text-accent-foreground shadow-sm">
                  NEW
                </span>
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </FrontendLayout>
  );
}
