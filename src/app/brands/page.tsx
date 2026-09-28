'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import { MOCK_BRANDS } from '@/app/data/mockProducts';
import { Search, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const ALPHABET = ['ALL', 'A', 'B', 'D', 'G', 'N', 'S', 'Y'];

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');

  const filteredBrands = MOCK_BRANDS.filter((brand) => {
    if (searchQuery.trim() && !brand.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedLetter !== 'ALL' && !brand.name.toUpperCase().startsWith(selectedLetter)) {
      return false;
    }
    return true;
  });

  return (
    <FrontendLayout>
      <div className="py-2">
        <Breadcrumbs items={[{ label: 'Brand Directory' }]} />

        {/* Hero Banner */}
        <div className="rounded-3xl bg-surface border border-border p-6 sm:p-10 mb-8 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Authorized Dealers</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
              Official Brand Stores
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Shop directly from top global manufacturers with guaranteed authenticity and full manufacturer warranty.
            </p>
          </div>
        </div>

        {/* Search and Alphabet Controls */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search brands (e.g. Sony, Apple, Nike)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-surface border border-border focus:outline-hidden focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="text-xs text-muted-foreground">
              Showing <strong>{filteredBrands.length}</strong> official partners
            </div>
          </div>

          {/* Letter Index Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
            {ALPHABET.map((char) => (
              <button
                key={char}
                onClick={() => setSelectedLetter(char)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors ${
                  selectedLetter === char
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-surface hover:bg-background border border-border text-foreground'
                }`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs hover:shadow-md hover:border-accent/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Banner Thumbnail */}
                <div className="h-32 w-full overflow-hidden bg-surface relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.banner}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-xs text-[11px] font-semibold text-foreground border border-border">
                    {brand.itemCount} Products
                  </div>
                </div>

                <div className="p-6">
                  {/* Logo & Title */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl p-2 rounded-xl bg-surface border border-border">
                      {brand.logo}
                    </span>
                    <div>
                      <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">
                        {brand.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{brand.category}</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                    {brand.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href="/catalog"
                  className="w-full py-2.5 rounded-xl border border-border bg-surface hover:bg-background font-semibold text-xs text-foreground flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                >
                  <span>Explore {brand.name} Store</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FrontendLayout>
  );
}
