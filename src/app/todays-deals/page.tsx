'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import ProductCard from '@/app/components/ui/ProductCard';
import { MOCK_PRODUCTS } from '@/app/data/mockProducts';
import { Target, ShoppingCart, Star, Sparkles, Check } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';

const DEAL_CATEGORIES = ['All Today\'s Deals', 'Deal of the Day', 'Tech & Audio', 'Smart Home', 'Under $100'];

export default function TodaysDealsPage() {
  const { addToCart } = useCart();
  const [selectedCat, setSelectedCat] = useState('All Today\'s Deals');
  const [spotlightAdded, setSpotlightAdded] = useState(false);

  const todaysDeals = MOCK_PRODUCTS.filter((p) => p.isTodaysDeal || p.discountPercent);

  const spotlightDeal = MOCK_PRODUCTS.find((p) => p.id === 'prod-4') || MOCK_PRODUCTS[0];

  const handleSpotlightAdd = () => {
    addToCart(
      {
        id: spotlightDeal.id,
        name: spotlightDeal.name,
        price: spotlightDeal.price,
        originalPrice: spotlightDeal.originalPrice,
        image: spotlightDeal.image,
        variant: 'Deal of the Day'
      },
      true
    );
    setSpotlightAdded(true);
    setTimeout(() => setSpotlightAdded(false), 2000);
  };

  return (
    <FrontendLayout>
      <div className="py-2">
        <Breadcrumbs items={[{ label: 'Today\'s Deals' }]} />

        {/* Hero Banner */}
        <div className="rounded-3xl bg-surface border border-border p-6 sm:p-8 mb-8 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">
              <Target className="w-3.5 h-3.5" />
              <span>Refreshed Every 24 Hours</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-2">
              Today&apos;s Featured Deals
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Handpicked daily bargains selected by our editors with massive manufacturer savings.
            </p>
          </div>
        </div>

        {/* Spotlight "Deal of the Day" Card */}
        <div className="rounded-3xl border-2 border-accent/30 bg-surface p-6 sm:p-8 mb-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Image */}
            <div className="w-full lg:w-1/2 aspect-video sm:aspect-4/3 rounded-2xl overflow-hidden bg-background border border-border relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image
                src={spotlightDeal.image}
                alt={spotlightDeal.name}
                className="w-full h-full object-cover"
                width={500}
                height={500}
                priority
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-sm">
                Deal of the Day &bull; Save $500
              </span>
            </div>

            {/* Details */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Featured Spotlight Bargain</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
                {spotlightDeal.name}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {spotlightDeal.description}
              </p>

              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold ml-1 text-foreground">
                    {spotlightDeal.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  ({spotlightDeal.reviewCount.toLocaleString()} verified customer reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-black text-foreground">
                  ${spotlightDeal.price.toFixed(2)}
                </span>
                {spotlightDeal.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${spotlightDeal.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-red-600/10 text-red-600 text-xs font-bold">
                  24% OFF
                </span>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleSpotlightAdd}
                  className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
                    spotlightAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-primary hover:bg-primary-hover text-primary-foreground'
                  }`}
                >
                  {spotlightAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Claim Deal of the Day</span>
                    </>
                  )}
                </button>
                <Link
                  href="/catalog"
                  className="px-4 py-3 rounded-xl border border-border bg-background hover:bg-surface font-semibold text-xs text-foreground transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 pb-4 mb-8 overflow-x-auto">
          {DEAL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCat === cat
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-surface hover:bg-background border border-border text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {todaysDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </FrontendLayout>
  );
}
