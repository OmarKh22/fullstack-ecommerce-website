'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { MOCK_PRODUCTS, Product } from '@/app/data/mockProducts';
import { useCart } from '@/app/context/CartContext';

export default function WishlistPage() {
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<Product[]>(MOCK_PRODUCTS.slice(0, 4));
  const [notification, setNotification] = useState<string | null>(null);

  const removeItem = (id: string) => {
    setWishlistItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearAll = () => {
    setWishlistItems([]);
  };

  const moveAllToCart = () => {
    wishlistItems.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        variant: item.brand
      });
    });
    setNotification('All items have been moved to your cart!');
    setTimeout(() => setNotification(null), 3000);
  };

  const moveToCart = (product: Product) => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        variant: product.brand
      },
      true
    );
    setNotification(`"${product.name}" added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <FrontendLayout>
      <div className="py-2">
        <Breadcrumbs items={[{ label: 'My Wishlist' }]} />

        {/* Feedback Alert */}
        {notification && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 flex items-center gap-3 text-sm font-medium animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
            <span>{notification}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-2">
              <Heart className="w-3.5 h-3.5 fill-accent" />
              <span>Saved Items</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              My Wishlist
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {wishlistItems.length} saved product{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearAll}
                className="px-4 py-2 text-xs font-medium rounded-xl border border-border text-muted-foreground hover:text-red-500 hover:border-red-200 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={moveAllToCart}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Move All to Cart</span>
              </button>
            </div>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="rounded-3xl border border-border bg-surface p-16 text-center max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Your Wishlist is Empty</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Save your favorite items here so you don&apos;t lose track of the deals you love.
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-sm transition-colors"
            >
              Discover Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl bg-card border border-border p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square rounded-xl bg-surface overflow-hidden mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeItem(product.id)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-background/90 backdrop-blur-xs border border-border text-muted-foreground hover:text-red-500 transition-colors shadow-xs"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 text-[10px] font-semibold rounded-md bg-emerald-600 text-white">
                      In Stock
                    </span>
                  </div>

                  <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">
                    {product.brand}
                  </p>
                  <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-base font-bold text-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => moveToCart(product)}
                  className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Move to Cart</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </FrontendLayout>
  );
}
