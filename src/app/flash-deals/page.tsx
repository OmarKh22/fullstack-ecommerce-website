'use client';

import React, { useState, useEffect } from 'react';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import ProductCard from '@/app/components/ui/ProductCard';
import { MOCK_PRODUCTS } from '@/app/data/mockProducts';
import { Zap, Clock, Flame } from 'lucide-react';

export default function FlashDealsPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 34,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashDealProducts = MOCK_PRODUCTS.filter((p) => p.isFlashDeal || (p.discountPercent && p.discountPercent >= 25));

  return (
    <FrontendLayout>
      <div className="py-2">
        <Breadcrumbs items={[{ label: 'Flash Deals' }]} />

        {/* Hero Banner with Countdown Timer */}
        <div className="rounded-3xl bg-linear-to-r from-red-600 via-rose-600 to-amber-600 text-white p-6 sm:p-10 mb-8 shadow-md relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold mb-3">
                <Zap className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                <span>Lightning Sale &bull; Limited Quantity</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
                Flash Deals &amp; Steals
              </h1>
              <p className="text-white/80 text-sm sm:text-base">
                Huge price drops on premium gadgets, athletic wear, and essentials. Prices revert when the timer hits zero!
              </p>
            </div>

            {/* Countdown Clock Display */}
            <div className="bg-black/30 backdrop-blur-md p-5 rounded-2xl border border-white/20 self-stretch sm:self-auto">
              <div className="text-xs uppercase font-bold tracking-wider text-white/80 mb-2 flex items-center gap-1.5 justify-center sm:justify-start">
                <Clock className="w-4 h-4 text-yellow-300" />
                <span>Offer Closes In</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-center">
                <div className="bg-white/10 px-3.5 py-2 rounded-xl min-w-[54px]">
                  <span className="block text-2xl font-black">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-white/70">Hours</span>
                </div>
                <span className="text-xl font-bold">:</span>
                <div className="bg-white/10 px-3.5 py-2 rounded-xl min-w-[54px]">
                  <span className="block text-2xl font-black">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-white/70">Mins</span>
                </div>
                <span className="text-xl font-bold">:</span>
                <div className="bg-white/10 px-3.5 py-2 rounded-xl min-w-[54px]">
                  <span className="block text-2xl font-black">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-white/70">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Urgency Announcement */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-amber-600 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">
              Flash deal prices are locked for 15 minutes once added to your cart.
            </span>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-600 text-white">
            Over 1,200 Claimed Today
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDealProducts.map((product) => (
            <div key={product.id} className="space-y-2">
              <ProductCard product={product} />
              {/* Claimed progress bar */}
              <div className="p-2.5 rounded-xl bg-surface border border-border">
                <div className="flex justify-between text-[11px] font-semibold text-muted-foreground mb-1">
                  <span>Claimed: 78%</span>
                  <span className="text-red-500">Only 4 left</span>
                </div>
                <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                  <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FrontendLayout>
  );
}
