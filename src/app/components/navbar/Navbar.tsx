'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  Menu,
  X,
  Globe,
  Tag,
  Zap,
  TrendingUp,
  Sparkles,
  Home,
  Grid,
  Settings,
  Package,
  LogOut,
  Trash2,
  Plus,
  Minus,
  Check,
  Percent,
  SlidersHorizontal,
  Flame
} from 'lucide-react';

// Interfaces for component state
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  featuredImage?: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '⚡',
    subcategories: ['Laptops & Computers', 'Smartphones & Tablets', 'Audio & Headphones', 'Wearable Tech', 'Gaming Accessories'],
    featuredImage: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    icon: '👕',
    subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Footwear', 'Jewelry & Watches', 'Bags & Accessories'],
    featuredImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'home',
    name: 'Home & Living',
    icon: '🏡',
    subcategories: ['Furniture', 'Kitchenware', 'Home Decor', 'Lighting', 'Bedding & Bath'],
    featuredImage: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'beauty',
    name: 'Beauty & Wellness',
    icon: '✨',
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Personal Care'],
    featuredImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80'
  }
];

const SEARCH_SUGGESTIONS = [
  'Wireless Noise-Canceling Headphones',
  'Mechanical Gaming Keyboard',
  'Ultra-Wide Curved Monitor 34"',
  'Ergonomic Leather Office Chair',
  'Smart Fitness Watch Series 7',
  'Organic Cotton Oversized Hoodie',
  'Stainless Steel Thermal Water Bottle'
];

export default function EcommerceNavbar() {
  // Top Banner State
  const [showPromoBanner, setShowPromoBanner] = useState<boolean>(true);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Nav Menu States
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<boolean>(false);
  const [activeMegaTab, setActiveMegaTab] = useState<string>(CATEGORIES[0].id);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<string>('USD / EN');

  // Mobile Drawer & Sticky Nav State
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'menu' | 'categories' | 'account'>('menu');

  // Interactive Cart Drawer & Wishlist State
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [wishlistCount, setWishlistCount] = useState<number>(3);
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Wireless Noise-Canceling Headphones',
      price: 199.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80',
      variant: 'Matte Black'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch Series 7',
      price: 149.50,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&auto=format&fit=crop&q=80',
      variant: '44mm Charcoal'
    }
  ]);

  // Handle Ctrl+K shortcut for Search focusing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsSearchFocused(false);
        setIsMegaMenuOpen(false);
        setIsAccountMenuOpen(false);
        setIsLangMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart helper functions
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleAddToCartDemo = () => {
    const randomItems: Omit<CartItem, 'quantity'>[] = [
      {
        id: Date.now().toString(),
        name: 'Mechanical RGB Keyboard',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&auto=format&fit=crop&q=80',
        variant: 'Tactile Switches'
      },
      {
        id: Date.now().toString(),
        name: 'Ultra-Wide Curved Gaming Monitor',
        price: 429.00,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&auto=format&fit=crop&q=80',
        variant: '34-Inch 144Hz'
      }
    ];

    const newItem = randomItems[Math.floor(Math.random() * randomItems.length)];
    
    setCart(prev => {
      const existing = prev.find(i => i.name === newItem.name);
      if (existing) {
        return prev.map(i => i.name === newItem.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  return (
    <div className="w-full bg-background text-foreground font-sans antialiased selection:bg-accent selection:text-accent-foreground">
      
      {/* ------------------------------------------------------------------------ */}
      {/* 1. TOP ANNOUNCEMENT BANNER                                               */}
      {/* ------------------------------------------------------------------------ */}
      {showPromoBanner && (
        <div className="bg-primary text-primary-foreground text-xs py-2 px-4 transition-all duration-300 border-b border-border">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-hidden whitespace-nowrap text-ellipsis">
              <span className="bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Flame className="w-3 h-3 text-white inline" /> FLASH SALE
              </span>
              <span className="truncate">
                Spring Clearance! Get up to <strong className="font-bold underline decoration-accent">50% OFF</strong> select tech products. Use code <code className="bg-primary-hover px-1.5 py-0.5 rounded text-accent font-mono">SPRING50</code>
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 text-xs text-muted-foreground">
              <a href="#store-locator" className="hover:text-primary-foreground transition-colors">Store Locator</a>
              <a href="#track-order" className="hover:text-primary-foreground transition-colors">Track Order</a>
              <a href="#support" className="hover:text-primary-foreground transition-colors">Help & Support</a>
              <button
                onClick={() => setShowPromoBanner(false)}
                className="text-primary-foreground/70 hover:text-primary-foreground ml-2 p-0.5 rounded transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => setShowPromoBanner(false)}
              className="md:hidden text-primary-foreground/80 hover:text-primary-foreground p-0.5"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* 2. MAIN HEADER NAVIGATION BAR                                            */}
      {/* ------------------------------------------------------------------------ */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">

            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="p-2 rounded-md text-foreground hover:bg-surface transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo / Title */}
            <div className="flex items-center">
              <a href="#" className="flex items-center space-x-2 group">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-black text-xl shadow-md group-hover:bg-primary-hover transition-colors">
                  N
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg md:text-xl tracking-tight text-foreground flex items-center gap-1">
                    NEXUS<span className="text-accent">STORE</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold hidden sm:inline-block">
                    E-Commerce Platform
                  </span>
                </div>
              </a>
            </div>

            {/* Central Interactive Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-6 relative">
              <div className={`w-full flex items-center border rounded-xl bg-surface transition-all duration-200 ${
                isSearchFocused ? 'border-accent shadow-sm ring-2 ring-accent/20 bg-background' : 'border-border'
              }`}>
                {/* Category Dropdown Selector */}
                <div className="relative border-r border-border min-w-[130px]">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-transparent py-2.5 pl-3 pr-8 text-xs font-semibold text-foreground focus:outline-none cursor-pointer appearance-none"
                  >
                    <option value="All">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home & Living</option>
                    <option value="Beauty">Beauty</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Input Query */}
                <div className="relative flex-1 flex items-center">
                  <Search className="w-4 h-4 text-muted-foreground ml-3 shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    placeholder="Search 50,000+ products, brands..."
                    className="w-full bg-transparent py-2.5 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-1 hover:bg-border/50 rounded-full text-muted-foreground mr-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {/* Keyboard Shortcut Badge */}
                  {!searchQuery && (
                    <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground bg-background border border-border rounded shadow-xs mr-2">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  )}
                </div>

                <button className="bg-primary hover:bg-primary-hover text-primary-foreground px-5 py-2.5 rounded-r-xl transition-colors font-medium text-sm flex items-center gap-1.5">
                  <span>Search</span>
                </button>
              </div>

              {/* Autocomplete Suggestions Overlay */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3 text-xs font-semibold text-muted-foreground border-b border-border flex items-center justify-between">
                    <span>POPULAR SUGGESTIONS</span>
                    <span className="text-[10px] text-muted-foreground">Press ESC to close</span>
                  </div>
                  <ul className="py-2">
                    {SEARCH_SUGGESTIONS.filter(item => 
                      item.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((suggestion, index) => (
                      <li key={index}>
                        <button
                          onClick={() => {
                            setSearchQuery(suggestion);
                            setIsSearchFocused(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-surface flex items-center justify-between transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Search className="w-3.5 h-3.5 text-muted-foreground" />
                            {suggestion}
                          </span>
                          <TrendingUp className="w-3.5 h-3.5 text-muted-foreground/50" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="p-3 bg-surface border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>Trending in <strong>{selectedCategory}</strong></span>
                    <a href="#" className="text-accent hover:underline font-medium">Browse catalog →</a>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons Header (Wishlist, Cart, Account, Currency Selector) */}
            <div className="flex items-center space-x-1 sm:space-x-3">



              {/* Wishlist Button */}
              <a
                href="#wishlist"
                className="relative p-2.5 text-foreground hover:bg-surface rounded-xl transition-colors flex items-center justify-center group"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </a>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative p-2.5 text-foreground hover:bg-surface rounded-xl transition-colors flex items-center justify-center group"
                aria-label="Open Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground text-[10px] font-bold min-w-[18px] h-4 px-1 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* User Account Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl text-foreground hover:bg-surface transition-colors border border-transparent hover:border-border"
                  aria-label="User account menu"
                >
                  <div className="w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center text-xs font-bold text-foreground">
                    OK
                  </div>
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-xs font-semibold text-foreground leading-none">Omar Khaled</span>
                    <span className="text-[10px] text-muted-foreground leading-tight">My Account</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden md:block" />
                </button>

                {isAccountMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-border">
                      <p className="text-xs font-bold text-foreground">Omar Khaled</p>
                      <p className="text-[11px] text-muted-foreground truncate">test@test.com</p>
                    </div>
                    <div className="py-1">
                      <a href="#orders" className="flex items-center gap-2.5 px-3 py-2 text-xs text-foreground hover:bg-surface rounded-lg transition-colors">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span>My Orders & Returns</span>
                      </a>
                      <a href="#wishlist" className="flex items-center gap-2.5 px-3 py-2 text-xs text-foreground hover:bg-surface rounded-lg transition-colors">
                        <Heart className="w-4 h-4 text-muted-foreground" />
                        <span>Saved Wishlist ({wishlistCount})</span>
                      </a>
                      <a href="#settings" className="flex items-center gap-2.5 px-3 py-2 text-xs text-foreground hover:bg-surface rounded-lg transition-colors">
                        <Settings className="w-4 h-4 text-muted-foreground" />
                        <span>Account Settings</span>
                      </a>
                    </div>
                    <div className="pt-1 border-t border-border">
                      <button
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Mobile Search Input (Visible on small screens) */}
          <div className="pb-3 lg:hidden">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="w-full bg-surface border border-border rounded-xl py-2 pl-9 pr-8 text-sm text-foreground focus:outline-none focus:border-accent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 p-1 text-muted-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------------------ */}
        {/* 3. SECONDARY LINKS / CATEGORIES BAR                                      */}
        {/* ------------------------------------------------------------------------ */}
        <div className="border-t border-border bg-surface/50 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-11 text-xs">

              {/* Left Side Navigation & Mega Menu Trigger */}
              <div className="flex items-center space-x-6">

                {/* All Categories Mega Menu Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                    className="flex items-center gap-2 font-bold text-primary hover:text-accent transition-colors py-2"
                  >
                    <Grid className="w-4 h-4 text-accent" />
                    <span>All Categories</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega Menu Overlay Dropdown */}
                  {isMegaMenuOpen && (
                    <div
                      onMouseLeave={() => setIsMegaMenuOpen(false)}
                      className="absolute top-full left-0 w-[720px] bg-card border border-border rounded-b-2xl shadow-2xl p-6 z-50 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      {/* Left Sidebar Category Tabs */}
                      <div className="space-y-1 border-r border-border pr-4">
                        <p className="text-[10px] font-extrabold uppercase text-muted-foreground tracking-wider mb-2">Departments</p>
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setActiveMegaTab(cat.id)}
                            onMouseEnter={() => setActiveMegaTab(cat.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                              activeMegaTab === cat.id
                                ? 'bg-primary text-primary-foreground shadow-xs'
                                : 'text-foreground hover:bg-surface'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{cat.icon}</span>
                              <span>{cat.name}</span>
                            </span>
                            <ChevronDown className="-rotate-90 w-3 h-3 opacity-60" />
                          </button>
                        ))}
                      </div>

                      {/* Middle Category Details */}
                      <div className="col-span-2 flex flex-col justify-between">
                        <div>
                          {(() => {
                            const activeCat = CATEGORIES.find(c => c.id === activeMegaTab) || CATEGORIES[0];
                            return (
                              <div>
                                <h4 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                                  <span>{activeCat.icon}</span> {activeCat.name}
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {activeCat.subcategories.map((sub, idx) => (
                                    <a
                                      key={idx}
                                      href={`#${sub.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="p-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                                    >
                                      {sub}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            );
                          })()}
                        </div>

                        {/* Banner Preview inside Mega Menu */}
                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between bg-surface rounded-xl p-3">
                          <div>
                            <span className="text-[10px] font-bold text-accent uppercase tracking-wider">New Arrival</span>
                            <p className="text-xs font-bold text-foreground">Explore Next-Gen Smart Home Setup</p>
                          </div>
                          <a href="#featured" className="text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary-hover transition-colors">
                            Shop Now
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Secondary Links */}
                <nav className="flex items-center space-x-6 text-foreground font-medium">
                  <a href="#trending" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                    <TrendingUp className="w-3.5 h-3.5 text-accent" />
                    <span>Trending</span>
                  </a>
                  <a href="#flash-deals" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Flash Sales</span>
                    <span className="bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">HOT</span>
                  </a>
                  <a href="#new" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>New Arrivals</span>
                  </a>
                  <a href="#brands" className="hover:text-accent transition-colors">
                    Top Brands
                  </a>
                  <a href="#clearance" className="hover:text-accent transition-colors">
                    Clearance
                  </a>
                </nav>

              </div>

              {/* Right Side Quick Promotion */}
              <div className="flex items-center space-x-4 text-muted-foreground">
                <a href="#todays-deals" className="flex items-center gap-1 text-accent font-semibold hover:underline">
                  <Percent className="w-3.5 h-3.5" />
                  <span>Today's Special Deals</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------------ */}
      {/* 4. SLIDE-OUT MOBILE NAVIGATION DRAWER                                    */}
      {/* ------------------------------------------------------------------------ */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileDrawerOpen(false)}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Content */}
          <div className="fixed top-0 bottom-0 left-0 w-full max-w-xs bg-background shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-surface">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-lg">
                  N
                </div>
                <span className="font-extrabold text-base tracking-tight text-foreground">
                  NEXUS<span className="text-accent">STORE</span>
                </span>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-border/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Tabs */}
            <div className="flex border-b border-border bg-background">
              <button
                onClick={() => setMobileTab('menu')}
                className={`flex-1 py-2.5 text-xs font-bold border-b-2 ${
                  mobileTab === 'menu' ? 'border-accent text-accent' : 'border-transparent text-muted-foreground'
                }`}
              >
                Menu
              </button>
              <button
                onClick={() => setMobileTab('categories')}
                className={`flex-1 py-2.5 text-xs font-bold border-b-2 ${
                  mobileTab === 'categories' ? 'border-accent text-accent' : 'border-transparent text-muted-foreground'
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => setMobileTab('account')}
                className={`flex-1 py-2.5 text-xs font-bold border-b-2 ${
                  mobileTab === 'account' ? 'border-accent text-accent' : 'border-transparent text-muted-foreground'
                }`}
              >
                Account
              </button>
            </div>

            {/* Tab Body Contents */}
            <div className="flex-1 overflow-y-auto p-4">
              {mobileTab === 'menu' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Explore</p>
                    <a href="#trending" className="flex items-center gap-3 p-2.5 text-sm font-semibold text-foreground rounded-xl hover:bg-surface">
                      <TrendingUp className="w-4 h-4 text-accent" /> Trending Products
                    </a>
                    <a href="#flash" className="flex items-center gap-3 p-2.5 text-sm font-semibold text-foreground rounded-xl hover:bg-surface">
                      <Zap className="w-4 h-4 text-amber-500" /> Flash Deals
                    </a>
                    <a href="#new" className="flex items-center gap-3 p-2.5 text-sm font-semibold text-foreground rounded-xl hover:bg-surface">
                      <Sparkles className="w-4 h-4 text-indigo-500" /> New Arrivals
                    </a>
                  </div>

                  <div className="pt-4 border-t border-border space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Customer Service</p>
                    <a href="#orders" className="block p-2 text-xs text-foreground hover:bg-surface rounded-lg">Track My Order</a>
                    <a href="#shipping" className="block p-2 text-xs text-foreground hover:bg-surface rounded-lg">Shipping Info</a>
                    <a href="#help" className="block p-2 text-xs text-foreground hover:bg-surface rounded-lg">Help Center</a>
                  </div>
                </div>
              )}

              {mobileTab === 'categories' && (
                <div className="space-y-4">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.id} className="border border-border rounded-xl p-3">
                      <div className="flex items-center gap-2 font-bold text-sm text-foreground mb-2">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </div>
                      <div className="space-y-1.5 pl-6 border-l-2 border-border">
                        {cat.subcategories.map((sub, idx) => (
                          <a key={idx} href="#" className="block text-xs text-muted-foreground hover:text-foreground py-0.5">
                            {sub}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {mobileTab === 'account' && (
                <div className="space-y-3">
                  <div className="p-3 bg-surface rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
                      JD
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Omar Khaled</p>
                      <p className="text-xs text-muted-foreground">test@test.com</p>
                    </div>
                  </div>
                  <div className="space-y-1 pt-2">
                    <a href="#orders" className="flex items-center gap-2.5 p-2.5 text-xs text-foreground rounded-lg hover:bg-surface">
                      <Package className="w-4 h-4 text-muted-foreground" /> My Orders
                    </a>
                    <a href="#wishlist" className="flex items-center gap-2.5 p-2.5 text-xs text-foreground rounded-lg hover:bg-surface">
                      <Heart className="w-4 h-4 text-muted-foreground" /> Wishlist ({wishlistCount})
                    </a>
                    <a href="#settings" className="flex items-center gap-2.5 p-2.5 text-xs text-foreground rounded-lg hover:bg-surface">
                      <Settings className="w-4 h-4 text-muted-foreground" /> Settings
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-4 border-t border-border bg-surface text-xs text-muted-foreground flex items-center justify-between">
              <span>Currency: USD ($)</span>
              <button className="text-accent font-semibold">Change</button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* 5. INTERACTIVE CART DRAWER OVERLAY                                       */}
      {/* ------------------------------------------------------------------------ */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            onClick={() => setIsCartDrawerOpen(false)}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-xs transition-opacity"
          />

          {/* Cart Sidebar */}
          <div className="fixed top-0 bottom-0 right-0 w-full max-w-md bg-card shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-surface">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-base text-foreground">Your Shopping Cart</h3>
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-border/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-border">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                  <ShoppingCart className="w-12 h-12 stroke-1 mb-3 opacity-40" />
                  <p className="font-semibold text-foreground text-base">Your cart is empty</p>
                  <p className="text-xs mt-1 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
                  <button
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="mt-4 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl hover:bg-primary-hover transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="py-4 flex gap-3 first:pt-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-border shrink-0 bg-surface"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-foreground line-clamp-2">{item.name}</h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.variant && (
                          <p className="text-[10px] text-muted-foreground mt-0.5">{item.variant}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>

                        {/* Quantity Buttons */}
                        <div className="flex items-center border border-border rounded-lg bg-surface">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-border/50 text-foreground transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-border/50 text-foreground transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Subtotal */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-border bg-surface space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-green-600 uppercase text-[10px]">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-foreground pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-accent">${cartSubtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-3 rounded-xl shadow-md transition-colors text-sm flex items-center justify-center gap-2">
                  <span>Proceed to Checkout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* 6. MOBILE STICKY BOTTOM NAVIGATION BAR                                  */}
      {/* ------------------------------------------------------------------------ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-30 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <a href="#" className="flex flex-col items-center p-1 text-accent">
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Home</span>
        </a>
        
        <button
          onClick={() => { setIsMobileDrawerOpen(true); setMobileTab('categories'); }}
          className="flex flex-col items-center p-1 text-muted-foreground hover:text-foreground"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Categories</span>
        </button>

        <a href="#wishlist" className="flex flex-col items-center p-1 text-muted-foreground hover:text-foreground relative">
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Wishlist</span>
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-1 bg-accent text-accent-foreground text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </a>

        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="flex flex-col items-center p-1 text-muted-foreground hover:text-foreground relative"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Cart</span>
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-1 bg-primary text-primary-foreground text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>

        <button
          onClick={() => { setIsMobileDrawerOpen(true); setMobileTab('account'); }}
          className="flex flex-col items-center p-1 text-muted-foreground hover:text-foreground"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Profile</span>
        </button>
      </div>



    </div>
  );
}