'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  variant?: string;
}

interface CartContextType {
  cart: CartItem[];
  cartItemCount: number;
  cartSubtotal: number;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }, openDrawer?: boolean) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

const INITIAL_CART: CartItem[] = [
  {
    id: 'cart-1',
    name: 'Wireless Noise-Canceling Headphones',
    price: 199.99,
    originalPrice: 249.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
    variant: 'Matte Black'
  },
  {
    id: 'cart-2',
    name: 'Smart Fitness Watch Series 7',
    price: 149.50,
    originalPrice: 199.00,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80',
    variant: '44mm Charcoal'
  }
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Sync from localStorage after mounting on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem('shopsphere_cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setCart(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors (e.g. private browsing)
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever cart updates after hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart, isHydrated]);

  const addToCart = (
    item: Omit<CartItem, 'quantity'> & { quantity?: number },
    openDrawer: boolean = false
  ) => {
    const qty = item.quantity && item.quantity > 0 ? item.quantity : 1;
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === item.id || (i.name === item.name && i.variant === item.variant)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
          image: item.image,
          variant: item.variant,
          quantity: qty
        }
      ];
    });

    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItemCount,
        cartSubtotal,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
