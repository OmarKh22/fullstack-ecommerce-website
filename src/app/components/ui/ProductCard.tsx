'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, Check } from 'lucide-react';
import { Product } from '@/app/data/mockProducts';
import { useCart } from '@/app/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      variant: product.brand
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group relative rounded-2xl bg-card border border-border p-4 shadow-xs hover:shadow-md hover:border-accent/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
            {product.badge && (
              <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-accent text-accent-foreground shadow-xs">
                {product.badge}
              </span>
            )}
            {product.discountPercent && (
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-red-600 text-white shadow-xs">
                -{product.discountPercent}%
              </span>
            )}
          </div>

          {/* Quick Wishlist Action */}
          <button
            onClick={handleToggleWishlist}
            aria-label="Add to wishlist"
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-background/90 backdrop-blur-xs border border-border text-foreground hover:text-red-500 hover:scale-110 transition-all shadow-xs"
          >
            <Heart
              className={`w-4 h-4 ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
              }`}
            />
          </button>
        </div>

        {/* Category & Brand */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
          <span className="font-medium uppercase tracking-wider text-[11px] text-accent">
            {product.brand}
          </span>
          <span>{product.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm text-foreground line-clamp-2 hover:text-accent transition-colors leading-snug mb-2">
          <Link href={`/catalog`}>{product.name}</Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold ml-1 text-foreground">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>
      </div>

      {/* Price & Action */}
      <div className="pt-3 border-t border-border flex items-center justify-between gap-2 mt-auto">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-foreground">
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
          onClick={handleAddToCart}
          className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
            isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-primary hover:bg-primary-hover text-primary-foreground'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
