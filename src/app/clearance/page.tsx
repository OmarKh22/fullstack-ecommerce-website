'use client';

import React, { useState } from 'react';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import ProductCard from '@/app/components/ui/ProductCard';
import { MOCK_PRODUCTS } from '@/app/data/mockProducts';
import { Tag, AlertTriangle, Percent, ArrowDownRight } from 'lucide-react';

const DISCOUNT_FILTERS = ['All Clearance', '50%+ Off', 'Under $100', 'Last Chance (< 5 left)'];

export default function ClearancePage() {
  const [selectedFilter, setSelectedFilter] = useState('All Clearance');

  const clearanceProducts = MOCK_PRODUCTS.filter(
    (p) => p.isClearance || (p.discountPercent && p.discountPercent >= 40) || p.price < 50
  );

  return (
    <FrontendLayout>
      <div className="py-2">
        <Breadcrumbs items={[{ label: 'Clearance & Outlet' }]} />

        {/* Hero Banner */}
        <div className="rounded-3xl bg-linear-to-r from-red-600 via-rose-600 to-amber-700 text-white p-6 sm:p-10 mb-8 relative overflow-hidden shadow-sm">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold mb-3">
              <Tag className="w-3.5 h-3.5" />
              <span>Final Markdown Season</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
              Clearance &amp; Outlet Store
            </h1>
            <p className="text-white/80 text-sm sm:text-base">
              Massive reductions on discontinued styles, overstock inventory, and end-of-season favorites.
            </p>
          </div>
        </div>

        {/* Warning Policy Box */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <strong className="font-bold">Clearance Policy:</strong> Items marked as Final Clearance are eligible for return only in exchange for store credit or replacement if defective. Quantities are strictly limited.
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 pb-4 mb-8 overflow-x-auto">
          {DISCOUNT_FILTERS.map((filt) => (
            <button
              key={filt}
              onClick={() => setSelectedFilter(filt)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === filt
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-surface hover:bg-background border border-border text-foreground'
              }`}
            >
              {filt}
            </button>
          ))}
        </div>

        {/* Grid of Clearance Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clearanceProducts.map((product) => (
            <div key={product.id} className="relative space-y-2">
              <ProductCard product={product} />
              <div className="flex items-center justify-between text-[11px] font-semibold text-red-600 px-1">
                <span>⚠️ Final Sale &bull; Low Stock</span>
                <span>{product.stockCount ? `${product.stockCount} left` : 'Last units'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FrontendLayout>
  );
}
