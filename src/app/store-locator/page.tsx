'use client';

import React, { useState } from 'react';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import {
  MapPin,
  Search,
  Phone,
  Navigation,
  CheckCircle,
  Store
} from 'lucide-react';

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  distance: string;
  status: 'Open now' | 'Closed';
  services: string[];
}

const STORES: StoreLocation[] = [
  {
    id: 'store-1',
    name: 'ShopSphere Downtown Flagship',
    address: '450 Fifth Avenue',
    city: 'New York',
    state: 'NY',
    zip: '10018',
    phone: '(212) 555-0192',
    hours: 'Mon - Sat: 9:00 AM - 9:00 PM, Sun: 10:00 AM - 7:00 PM',
    distance: '1.2 miles away',
    status: 'Open now',
    services: ['Curbside Pickup', 'Tech Repair Bar', 'In-Store Returns', 'Personal Shopper']
  },
  {
    id: 'store-2',
    name: 'ShopSphere Brooklyn Heights',
    address: '122 Montague Street',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11201',
    phone: '(718) 555-0144',
    hours: 'Mon - Sun: 10:00 AM - 8:00 PM',
    distance: '3.8 miles away',
    status: 'Open now',
    services: ['Curbside Pickup', 'In-Store Returns', 'Audio Demo Room']
  },
  {
    id: 'store-3',
    name: 'ShopSphere SoHo Experience Hub',
    address: '568 Broadway',
    city: 'New York',
    state: 'NY',
    zip: '10012',
    phone: '(212) 555-0833',
    hours: 'Mon - Sat: 10:00 AM - 9:00 PM, Sun: 11:00 AM - 6:00 PM',
    distance: '2.5 miles away',
    status: 'Open now',
    services: ['Smart Home Gallery', 'In-Store Returns', 'Personal Styling']
  },
  {
    id: 'store-4',
    name: 'ShopSphere Garden State Plaza',
    address: 'One Garden State Plaza',
    city: 'Paramus',
    state: 'NJ',
    zip: '07652',
    phone: '(201) 555-0177',
    hours: 'Mon - Sat: 10:00 AM - 9:30 PM, Sun: Closed',
    distance: '14.6 miles away',
    status: 'Open now',
    services: ['Curbside Pickup', 'Tech Support', 'In-Store Returns']
  }
];

export default function StoreLocatorPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState<StoreLocation>(STORES[0]);
  const [radius, setRadius] = useState('25');

  const filteredStores = STORES.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.zip.includes(q) ||
      s.address.toLowerCase().includes(q)
    );
  });

  return (
    <FrontendLayout>
      <div className="py-2">
        <Breadcrumbs items={[{ label: 'Store Locator' }]} />

        {/* Page Header */}
        <div className="mb-8 pb-4 border-b border-border">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-2">
            <Store className="w-3.5 h-3.5" />
            <span>Retail &amp; Pickup Locations</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Find a Store Near You
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Experience products in person, pick up online orders in 2 hours, and get expert support.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8 bg-surface p-4 rounded-2xl border border-border">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter ZIP code, city, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-background border border-border focus:outline-hidden focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-muted-foreground whitespace-nowrap">Radius:</label>
            <select
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              aria-label="Filter stores by radius"
              className="px-3 py-2 text-sm rounded-xl bg-background border border-border focus:outline-hidden focus:ring-2 focus:ring-accent font-medium text-foreground"
            >
              <option value="10">Within 10 miles</option>
              <option value="25">Within 25 miles</option>
              <option value="50">Within 50 miles</option>
            </select>
          </div>
        </div>

        {/* 2-Column Split: Stores List & Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Stores List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs text-muted-foreground flex justify-between items-center mb-2">
              <span>{filteredStores.length} locations found</span>
              <span className="text-accent font-semibold">Sorted by distance</span>
            </div>

            {filteredStores.map((store) => {
              const isSelected = selectedStore.id === store.id;
              return (
                <div
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-accent bg-accent/5 ring-2 ring-accent/20'
                      : 'border-border bg-card hover:border-accent/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-bold text-base text-foreground">{store.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {store.address}, {store.city}, {store.state} {store.zip}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-accent shrink-0 whitespace-nowrap">
                      {store.distance}
                    </span>
                  </div>

                  {/* Hours and Status */}
                  <div className="space-y-1.5 my-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-semibold text-emerald-600">{store.status}</span>
                      <span>&bull;</span>
                      <span className="truncate">{store.hours}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{store.phone}</span>
                    </div>
                  </div>

                  {/* Services Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                    {store.services.map((svc) => (
                      <span
                        key={svc}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-surface text-foreground border border-border"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 flex gap-2">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        `${store.name} ${store.address} ${store.city}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Map Visual Mockup */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-surface p-6 sticky top-24 space-y-6">
              <div className="relative aspect-4/3 w-full rounded-2xl bg-linear-to-tr from-slate-200 via-slate-100 to-blue-50 dark:from-slate-800 dark:to-slate-900 border border-border overflow-hidden flex flex-col justify-between p-6">
                {/* Simulated Map Grid & Streets Graphic */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Map Controls */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border text-xs font-bold text-foreground shadow-xs">
                    🗺️ New York Metropolitan Area
                  </div>
                  <div className="flex flex-col gap-1">
                    <button className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-sm font-bold shadow-xs hover:bg-surface">
                      +
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-sm font-bold shadow-xs hover:bg-surface">
                      -
                    </button>
                  </div>
                </div>

                {/* Simulated Pins */}
                <div className="relative z-10 flex items-center justify-center gap-12 my-auto">
                  {STORES.map((store) => (
                    <div
                      key={store.id}
                      onClick={() => setSelectedStore(store)}
                      className={`cursor-pointer transition-transform hover:scale-125 flex flex-col items-center ${
                        selectedStore.id === store.id ? 'scale-125' : 'opacity-70'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg ${
                          selectedStore.id === store.id
                            ? 'bg-accent text-white ring-4 ring-accent/30'
                            : 'bg-primary text-white'
                        }`}
                      >
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold bg-background/90 px-1.5 py-0.5 rounded shadow-xs mt-1 whitespace-nowrap">
                        {store.name.split(' ')[1]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Selected Store Floating Info Banner */}
                <div className="relative z-10 bg-background/95 backdrop-blur-md p-4 rounded-xl border border-border shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{selectedStore.name}</h4>
                      <p className="text-xs text-muted-foreground">{selectedStore.address}, {selectedStore.city}</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      Open Today
                    </span>
                  </div>
                </div>
              </div>

              {/* Store Details Details Card */}
              <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Curbside &amp; Storefront Services
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free 2-Hour Order Pickup</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant In-Store Returns</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Device Setup &amp; Trade-In</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free Recycling Drop-off</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FrontendLayout>
  );
}
