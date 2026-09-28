'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Tag
} from 'lucide-react';

import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const { cart: cartItems, updateQuantity, removeItem } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SAVE15') {
      setPromoApplied(true);
      setPromoDiscount(0.15);
    } else if (promoCode.trim()) {
      alert('Promo code not recognized. Try "SAVE15" for 15% off!');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountTotal = promoApplied ? subtotal * promoDiscount : 0;
  const shipping = subtotal > 150 ? 0 : 15.0;
  const estimatedTax = subtotal * 0.08;
  const orderTotal = subtotal - discountTotal + shipping + estimatedTax;

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingThreshold = 150;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <FrontendLayout>
      <div className="py-2">
        <Breadcrumbs items={[{ label: 'Shopping Cart' }]} />

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Shopping Cart
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              You have {totalItemsCount} item{totalItemsCount !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          <Link
            href="/catalog"
            className="text-xs sm:text-sm font-semibold text-accent hover:underline flex items-center gap-1"
          >
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-border bg-surface p-16 text-center max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Your Cart is Empty</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Looks like you haven&apos;t added any items to your shopping cart yet.
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-sm transition-colors"
            >
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Items List */}
            <div className="lg:col-span-2 space-y-4">
              {/* Free Shipping Progress Indicator */}
              <div className="rounded-2xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between text-xs font-medium mb-2">
                  <span className="text-foreground">
                    {amountToFreeShipping > 0 ? (
                      <>
                        Add <strong className="text-accent">${amountToFreeShipping.toFixed(2)}</strong> more for <strong>FREE Express Shipping</strong>
                      </>
                    ) : (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        ✓ You&apos;ve unlocked FREE Express Shipping!
                      </span>
                    )}
                  </span>
                  <span className="text-muted-foreground">{Math.round(shippingProgress)}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                    <div className="flex gap-4 items-center">
                      {/* Thumbnail */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-surface overflow-hidden shrink-0 border border-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5 mb-2">
                          {item.variant}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-foreground text-sm sm:text-base">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price ? (
                            <span className="text-xs text-muted-foreground line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Controls */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
                      <div className="flex items-center gap-2 border border-border rounded-xl p-1 bg-surface">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded-lg hover:bg-background text-foreground transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded-lg hover:bg-background text-foreground transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-bold text-sm sm:text-base text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-surface p-6 sticky top-24">
                <h2 className="text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">
                  Order Summary
                </h2>

                {/* Subtotal breakdown */}
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Promo Discount (15%)</span>
                      <span>-${discountTotal.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-emerald-600 font-semibold">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Sales Tax</span>
                    <span className="text-foreground font-medium">${estimatedTax.toFixed(2)}</span>
                  </div>

                  <div className="pt-3 border-t border-border flex justify-between text-base font-bold text-foreground">
                    <span>Order Total</span>
                    <span className="text-xl text-foreground font-extrabold">
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Form */}
                <form onSubmit={applyPromo} className="mb-6">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                    Discount / Voucher Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. SAVE15"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-background border border-border focus:outline-hidden focus:ring-2 focus:ring-accent uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-emerald-600 mt-1 font-medium">
                      Coupon SAVE15 applied successfully!
                    </p>
                  )}
                </form>

                {/* Checkout Button */}
                <button className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-4 border-t border-border space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                    <span>256-Bit Bank-Grade SSL Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-accent shrink-0" />
                    <span>30-Day Money Back Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-accent shrink-0" />
                    <span>Fast Dispatched from nearest warehouse</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </FrontendLayout>
  );
}
