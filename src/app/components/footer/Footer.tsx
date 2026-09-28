'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-16 text-foreground">
      {/* Feature Value Props Banner */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border shadow-xs">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Free Express Shipping</h4>
                <p className="text-xs text-muted-foreground">On all orders over $75</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border shadow-xs">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Secure Payment</h4>
                <p className="text-xs text-muted-foreground">100% encrypted & protected</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border shadow-xs">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">30-Day Hassle-Free Returns</h4>
                <p className="text-xs text-muted-foreground">Easy exchange policy</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border shadow-xs">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">24/7 Dedicated Support</h4>
                <p className="text-xs text-muted-foreground">Live chat & phone assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight text-foreground">
                Shop<span className="text-accent">Sphere</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your premium destination for curated electronics, apparel, home essentials, and everyday lifestyle goods.
            </p>

            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Subscribe for exclusive discounts
              </p>
              <form className="flex gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm rounded-lg bg-background border border-border focus:outline-hidden focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-primary-foreground font-medium text-sm rounded-lg flex items-center gap-1 transition-colors"
                >
                  Join <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-4">Shop & Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/catalog" className="hover:text-accent transition-colors">Product Catalog</Link></li>
              <li><Link href="/trending" className="hover:text-accent transition-colors">Trending Now</Link></li>
              <li><Link href="/flash-deals" className="hover:text-accent transition-colors">Flash Deals</Link></li>
              <li><Link href="/todays-deals" className="hover:text-accent transition-colors">Today&apos;s Deals</Link></li>
              <li><Link href="/new" className="hover:text-accent transition-colors">New Arrivals</Link></li>
              <li><Link href="/clearance" className="hover:text-accent transition-colors">Clearance</Link></li>
              <li><Link href="/brands" className="hover:text-accent transition-colors">Brand Directory</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-4">Popular Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/category/electronics" className="hover:text-accent transition-colors">Electronics</Link></li>
              <li><Link href="/category/fashion" className="hover:text-accent transition-colors">Fashion &amp; Apparel</Link></li>
              <li><Link href="/category/home-living" className="hover:text-accent transition-colors">Home &amp; Living</Link></li>
              <li><Link href="/category/beauty-health" className="hover:text-accent transition-colors">Beauty &amp; Health</Link></li>
              <li><Link href="/category/sports-outdoors" className="hover:text-accent transition-colors">Sports &amp; Outdoors</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/track-order" className="hover:text-accent transition-colors">Track Order</Link></li>
              <li><Link href="/orders" className="hover:text-accent transition-colors">Order History</Link></li>
              <li><Link href="/wishlist" className="hover:text-accent transition-colors">My Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-accent transition-colors">Shopping Cart</Link></li>
              <li><Link href="/store-locator" className="hover:text-accent transition-colors">Store Locator</Link></li>
              <li><Link href="/support" className="hover:text-accent transition-colors">Help &amp; Support</Link></li>
              <li><Link href="/settings" className="hover:text-accent transition-colors">Account Settings</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} ShopSphere Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/support" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/support" className="hover:text-foreground">Terms of Service</Link>
            <Link href="/support" className="hover:text-foreground">Shipping Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
