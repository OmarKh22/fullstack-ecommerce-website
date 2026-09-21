'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Star,
  Flame,
  Zap,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Sliders,
  TrendingUp,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroSlide {
  id: string;
  tag: string;
  tagBg: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  discountBadge: string;
  stockCount: number;
  image: string;
  bgGradient: string;
  videoUrl?: string;
  variants: Array<{
    id: string;
    name: string;
    colorHex: string;
    image: string;
  }>;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    tag: 'NEW ARRIVAL 2026',
    tagBg: 'bg-accent text-accent-foreground',
    title: 'AuraSound Max Pro',
    subtitle: 'Spatial Audio Headphones',
    description: 'Immerse yourself in high-fidelity studio acoustics with active noise cancellation and 60-hour ultra battery life.',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.9,
    reviewsCount: 1240,
    discountBadge: 'SAVE 25%',
    stockCount: 14,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    bgGradient: 'from-blue-600/10 via-indigo-500/5 to-transparent',
    variants: [
      { id: 'v1', name: 'Matte Obsidian', colorHex: '#111827', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80' },
      { id: 'v2', name: 'Silver Frost', colorHex: '#E5E7EB', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80' },
      { id: 'v3', name: 'Midnight Navy', colorHex: '#1E3A8A', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'slide-2',
    tag: 'LIMITED EDITION',
    tagBg: 'bg-amber-500 text-white',
    title: 'Chronos Elite Series 8',
    subtitle: 'Titanium Smart Watch',
    description: 'Aircraft-grade titanium casing paired with sapphire glass display, ECG heart diagnostics, and real-time GPS tracking.',
    price: 449.00,
    originalPrice: 599.00,
    rating: 4.8,
    reviewsCount: 890,
    discountBadge: 'SAVE $150',
    stockCount: 7,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    bgGradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    variants: [
      { id: 'v1', name: 'Charcoal Titanium', colorHex: '#374151', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80' },
      { id: 'v2', name: 'Desert Gold', colorHex: '#D97706', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'slide-3',
    tag: 'BEST SELLER',
    tagBg: 'bg-emerald-600 text-white',
    title: 'VisionView Curved 34"',
    subtitle: '175Hz Quantum OLED Display',
    description: 'Ultra-wide 1800R curved gaming screen delivering ultra-fast 0.03ms response time and HDR true black illumination.',
    price: 799.50,
    originalPrice: 999.00,
    rating: 5.0,
    reviewsCount: 2100,
    discountBadge: 'HOT DEAL',
    stockCount: 22,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    bgGradient: 'from-emerald-600/10 via-teal-500/5 to-transparent',
    variants: [
      { id: 'v1', name: 'Space Gray', colorHex: '#4B5563', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80' }
    ]
  }
];

const FEATURED_CARDS = [
  {
    id: 'f1',
    badge: 'FLASH SALE',
    title: 'Mechanical Keyboards',
    subtitle: 'Up to 40% OFF',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80',
    linkText: 'Claim Offer',
    badgeBg: 'bg-red-500 text-white'
  },
  {
    id: 'f2',
    badge: 'NEW COLLECTION',
    title: 'Ergonomic Desk Setups',
    subtitle: 'Designed for focus',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&auto=format&fit=crop&q=80',
    linkText: 'Explore Lookbook',
    badgeBg: 'bg-accent text-accent-foreground'
  }
];

export default function EcommerceHeroSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const slide = HERO_SLIDES[currentSlideIndex];
  const activeVariant = slide.variants.find(v => v.id === selectedVariantId) || slide.variants[0];

  // Set default variant when slide changes
  useEffect(() => {
    if (slide.variants.length > 0) {
      setSelectedVariantId(slide.variants[0].id);
    }
  }, [currentSlideIndex]);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <div className="w-full bg-background text-foreground font-sans antialiased selection:bg-accent selection:text-accent-foreground transition-colors duration-300">
      
      {}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface/80 to-background pt-4 pb-8 md:pt-6 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Grid Layout: Split Hero + Right Side Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

            {/* MAIN INTERACTIVE HERO SLIDER (8 Cols) */}
            <div className="lg:col-span-8 bg-card border border-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden flex flex-col justify-between group">
              
              {/* Dynamic Background Glow Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} opacity-60 transition-all duration-700 pointer-events-none`} />

              {/* Top Slider Navigation Controls Bar */}
              <div className="relative z-10 flex items-center justify-between gap-2 mb-6 sm:mb-8">
                {/* Category / Collection Switcher Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {HERO_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                        currentSlideIndex === idx
                          ? 'bg-primary text-primary-foreground shadow-xs scale-105'
                          : 'bg-surface text-muted-foreground hover:bg-border/60 hover:text-foreground'
                      }`}
                    >
                      {s.tag}
                    </button>
                  ))}
                </div>

                {/* Autoplay & Direction Controls */}
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => setIsAutoplay(!isAutoplay)}
                    className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full border border-border bg-surface text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Clock className={`w-3 h-3 ${isAutoplay ? 'text-accent animate-spin' : ''}`} />
                    <span>{isAutoplay ? 'Autoplay On' : 'Paused'}</span>
                  </button>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-xl bg-surface border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-xl bg-surface border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      aria-label="Next Slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Slide Content: Split View (Text Content Left / Product Image Right) */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center flex-1">
                
                {/* Left Text & Pricing Details */}
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${slide.tagBg}`}>
                      {slide.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {slide.rating} ({slide.reviewsCount})
                    </span>
                  </div>

                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-sm font-semibold text-accent mt-0.5">
                      {slide.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Interactive Color/Variant Picker */}
                  {slide.variants.length > 1 && (
                    <div className="pt-1">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                        Finish: <strong className="text-foreground">{activeVariant.name}</strong>
                      </span>
                      <div className="flex items-center space-x-2">
                        {slide.variants.map((v) => (
                          <button
                            key={v.id}
                            onClick={() => setSelectedVariantId(v.id)}
                            className={`w-6 h-6 rounded-full border-2 transition-all p-0.5 flex items-center justify-center ${
                              selectedVariantId === v.id ? 'border-accent scale-110 shadow-xs' : 'border-transparent hover:scale-105'
                            }`}
                            aria-label={`Select ${v.name}`}
                          >
                            <span
                              className="w-full h-full rounded-full border border-black/10"
                              style={{ backgroundColor: v.colorHex }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price Tag & Stock Counter */}
                  <div className="pt-2 flex items-baseline gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-foreground">
                        ${slide.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through font-medium">
                        ${slide.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <span className="bg-red-500/10 text-red-600 text-xs font-extrabold px-2 py-0.5 rounded-md border border-red-500/20">
                      {slide.discountBadge}
                    </span>
                  </div>

                  {/* Stock Bar Indicator */}
                  <div className="pt-1 max-w-xs">
                    <div className="flex items-center justify-between text-[11px] font-medium mb-1">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-500 inline" /> Selling fast
                      </span>
                      <span className="text-foreground font-bold">{slide.stockCount} left in stock</span>
                    </div>
                    <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden border border-border">
                      <div
                        className="bg-accent h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (slide.stockCount / 30) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
                    >
                      <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => setIsVideoOpen(true)}
                      className="bg-surface hover:bg-border/60 text-foreground border border-border px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 text-accent fill-accent" />
                      <span>Watch Preview</span>
                    </button>
                  </div>
                </div>

                {/* Right Product Image Visual Stage */}
                <div className="relative flex items-center justify-center min-h-[260px] sm:min-h-[320px] group/img">
                  
                  {/* Floating Promotional Badge */}
                  <div className="absolute top-2 right-2 z-20 bg-background/90 backdrop-blur-md border border-border px-3 py-1.5 rounded-2xl shadow-lg flex items-center gap-2 animate-bounce">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Top Rated 2026</p>
                      <p className="text-xs font-black text-foreground">Official Flagship</p>
                    </div>
                  </div>

                  {/* Floating User Live Shopping Proof */}
                  <div className="absolute bottom-2 left-2 z-20 bg-background/90 backdrop-blur-md border border-border px-3 py-1.5 rounded-2xl shadow-lg flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <Image width={24} height={24} className="w-6 h-6 rounded-full border border-background" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="User" />
                      <Image width={24} height={24} className="w-6 h-6 rounded-full border border-background" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="User" />
                    </div>
                    <span className="text-[11px] font-bold text-foreground">+1.2k bought today</span>
                  </div>

                  {/* Main Displayed Product Image */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      width={400}
                      height={400}
                      src={activeVariant.image}
                      alt={slide.title}
                      unoptimized
                      className="max-h-[280px] sm:max-h-[340px] w-auto object-contain drop-shadow-2xl transition-all duration-500 group-hover/img:scale-105"
                    />
                  </div>

                </div>

              </div>

              {/* Bottom Carousel Indicator Dots */}
              <div className="relative z-10 flex items-center justify-center space-x-2 mt-6 pt-4 border-t border-border/50">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlideIndex === idx ? 'w-8 bg-accent' : 'w-2 bg-border hover:bg-muted-foreground'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

            {/* SIDE HIGHLIGHT FEATURE CARDS (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-6">
              {FEATURED_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="flex-1 bg-card border border-border rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-accent/50 transition-all duration-300"
                >
                  <div className="relative z-10 space-y-2 max-w-[65%]">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${card.badgeBg}`}>
                      {card.badge}
                    </span>
                    <h3 className="text-lg font-extrabold text-foreground leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground">
                      {card.subtitle}
                    </p>
                    <Link
                      href="/collection"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline pt-2"
                    >
                      <span>{card.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute right-[-10%] bottom-[-10%] w-1/2 h-auto max-h-[160px] object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}

              {/* LIVE STATS COUNTER CARD */}
              <div className="bg-surface border border-border rounded-3xl p-5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase block">Satisfaction Rate</span>
                    <span className="text-lg font-black text-foreground">99.4% Positive</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-green-500/10 text-green-600 px-2 py-1 rounded-lg border border-green-500/20">
                  VERIFIED
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {}
      <section className="bg-background border-b border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-surface transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Free Express Shipping</h4>
                <p className="text-[11px] text-muted-foreground">On all orders over $99</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-surface transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">2-Year Guarantee</h4>
                <p className="text-[11px] text-muted-foreground">Full hardware warranty</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-surface transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">30-Day Free Returns</h4>
                <p className="text-[11px] text-muted-foreground">Hassle-free money back</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-surface transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">24/7 Expert Support</h4>
                <p className="text-[11px] text-muted-foreground">Live chat or phone anytime</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative">
            <div className="p-4 border-b border-border flex items-center justify-between bg-surface">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-accent fill-accent" />
                <h3 className="font-bold text-sm text-foreground">Product Preview: {slide.title}</h3>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-border/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <div className="text-center p-6 text-white space-y-3">
                <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent flex items-center justify-center mx-auto text-accent">
                  <Play className="w-8 h-8 fill-accent ml-1" />
                </div>
                <p className="text-sm font-bold">Interactive Video Showcase Simulation</p>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  High-definition 4K 60FPS walkthrough highlighting key physical features and material ergonomics.
                </p>
              </div>
            </div>

            <div className="p-4 bg-surface border-t border-border flex justify-end">
              <button
                onClick={() => setIsVideoOpen(false)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary-hover transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-border animate-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <div>
            <p className="text-xs font-bold">Added to Cart!</p>
            <p className="text-[11px] text-muted-foreground">{slide.title} ({activeVariant.name})</p>
          </div>
        </div>
      )}

    </div>
  );
}