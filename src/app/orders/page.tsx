'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import {
  Package,
  Search,
  Truck,
  CheckCircle,
  Clock,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Cancelled';
  deliveryDate: string;
  trackingNumber: string;
  items: OrderItem[];
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-98231',
    date: 'Sep 24, 2026',
    total: 348.0,
    status: 'In Transit',
    deliveryDate: 'Expected Sep 29, 2026',
    trackingNumber: 'TRK-9023412-US',
    items: [
      {
        id: '1',
        name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
        price: 348.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'ORD-97452',
    date: 'Sep 15, 2026',
    total: 1598.99,
    status: 'Delivered',
    deliveryDate: 'Delivered on Sep 18, 2026',
    trackingNumber: 'TRK-8812304-US',
    items: [
      {
        id: '2',
        name: 'Apple MacBook Air 15-inch M3 Chip (16GB RAM)',
        price: 1499.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&auto=format&fit=crop&q=80'
      },
      {
        id: '3',
        name: 'Nike Air Zoom Pegasus 40 Premium',
        price: 99.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'ORD-94109',
    date: 'Aug 28, 2026',
    total: 899.95,
    status: 'Delivered',
    deliveryDate: 'Delivered on Sep 02, 2026',
    trackingNumber: 'TRK-7412948-US',
    items: [
      {
        id: '4',
        name: 'Breville Barista Touch Espresso Machine Stainless Steel',
        price: 899.95,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&auto=format&fit=crop&q=80'
      }
    ]
  }
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'In Transit' | 'Delivered' | 'Processing'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (activeTab !== 'All' && order.status !== activeTab) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesId = order.id.toLowerCase().includes(q);
      const matchesItem = order.items.some((i) => i.name.toLowerCase().includes(q));
      return matchesId || matchesItem;
    }
    return true;
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'In Transit':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
            <Truck className="w-3.5 h-3.5" /> In Transit
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" /> Processing
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <FrontendLayout>
      <div className="py-2">
        <Breadcrumbs items={[{ label: 'Order History' }]} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Order History
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track recent shipments, print invoices, and view order details.
            </p>
          </div>
          <Link
            href="/track-order"
            className="px-4 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:bg-accent/90 transition-colors flex items-center gap-1.5"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Track by Order ID</span>
          </Link>
        </div>

        {/* Controls: Search and Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 border-b sm:border-b-0 border-border pb-2 sm:pb-0 overflow-x-auto">
            {(['All', 'In Transit', 'Delivered', 'Processing'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search order # or item name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-surface border border-border focus:outline-hidden focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="rounded-3xl border border-border bg-surface p-12 text-center max-w-lg mx-auto my-8">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-base font-bold text-foreground">No orders found</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              We couldn&apos;t find any orders matching your selected filters.
            </p>
            <button
              onClick={() => {
                setActiveTab('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="bg-surface p-4 sm:p-5 border-b border-border flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <span className="text-muted-foreground block text-[11px]">ORDER PLACED</span>
                      <span className="font-semibold text-foreground">{order.date}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">TOTAL</span>
                      <span className="font-bold text-foreground">${order.total.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">ORDER #</span>
                      <span className="font-semibold text-foreground">{order.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.status)}
                    <button className="text-accent hover:underline font-semibold text-xs flex items-center gap-1">
                      Invoice <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Delivery Note & Items */}
                <div className="p-4 sm:p-6 space-y-4">
                  <p className="text-xs font-semibold text-foreground">
                    {order.deliveryDate}
                  </p>

                  <div className="divide-y divide-border">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl bg-surface border border-border overflow-hidden shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-foreground line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Qty: {item.quantity} &bull; ${item.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <Link
                            href="/catalog"
                            className="px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-background text-xs font-semibold text-foreground flex items-center gap-1.5 transition-colors"
                          >
                            <RotateCcw className="w-3 h-3" /> Buy Again
                          </Link>
                          <Link
                            href={`/track-order?orderId=${order.id}`}
                            className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-xs font-semibold text-primary-foreground flex items-center gap-1.5 transition-colors"
                          >
                            Track Package
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </FrontendLayout>
  );
}
