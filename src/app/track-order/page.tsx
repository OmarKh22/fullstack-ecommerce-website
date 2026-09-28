'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import {
  Truck,
  Search,
  CheckCircle2
} from 'lucide-react';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || 'ORD-98231';

  const [orderId, setOrderId] = useState(initialOrderId);
  const [emailOrPhone, setEmailOrPhone] = useState('alex.morgan@example.com');
  const [hasSearched, setHasSearched] = useState(true);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const steps = [
    { title: 'Order Confirmed', date: 'Sep 24, 10:30 AM', completed: true },
    { title: 'Packed & Processed', date: 'Sep 24, 04:15 PM', completed: true },
    { title: 'In Transit with FedEx', date: 'Sep 25, 08:45 AM', completed: true, current: true },
    { title: 'Out for Delivery', date: 'Expected Sep 28', completed: false },
    { title: 'Delivered', date: 'Expected Sep 28', completed: false }
  ];

  return (
    <div className="py-2">
      <Breadcrumbs items={[{ label: 'Track Order' }]} />

      {/* Header */}
      <div className="mb-8 pb-4 border-b border-border">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-2">
          <Truck className="w-3.5 h-3.5" />
          <span>Real-Time Logistics Tracker</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Track Your Order
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your order tracking ID and associated email to check live carrier status.
        </p>
      </div>

      {/* Search Input Form */}
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 mb-8 max-w-3xl">
        <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Order ID / Tracking #
            </label>
            <input
              type="text"
              placeholder="e.g. ORD-98231"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-background border border-border focus:outline-hidden focus:ring-2 focus:ring-accent font-medium uppercase"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Billing Email or Phone
            </label>
            <input
              type="text"
              placeholder="you@domain.com"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-background border border-border focus:outline-hidden focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="sm:col-span-1 flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Track</span>
            </button>
          </div>
        </form>
      </div>

      {/* Tracking Results Card */}
      {hasSearched && (
        <div className="space-y-8 max-w-4xl">
          {/* Status Highlight Banner */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Carrier: FedEx Express Priority
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-foreground mt-1">
                  On Schedule &bull; Expected Delivery Monday, Sep 28
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Tracking Number: <strong className="text-foreground">FX-90481249-USA</strong>
                </p>
              </div>

              <span className="px-3.5 py-1.5 rounded-full bg-accent/10 text-accent font-bold text-xs border border-accent/20 flex items-center gap-1.5">
                <Truck className="w-4 h-4" /> In Transit
              </span>
            </div>

            {/* Stepper Progress Bar */}
            <div className="py-8">
              <div className="relative">
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-border -z-0 hidden md:block" />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex md:flex-col items-center md:items-center gap-4 md:gap-2 relative z-10">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                          step.completed
                            ? 'bg-accent text-white shadow-xs'
                            : 'bg-surface border-2 border-border text-muted-foreground'
                        }`}
                      >
                        {step.completed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>

                      <div className="md:text-center">
                        <h4 className="text-xs font-bold text-foreground">{step.title}</h4>
                        <p className="text-[11px] text-muted-foreground">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shipping Destination summary */}
            <div className="p-4 rounded-xl bg-surface border border-border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-muted-foreground block text-[11px]">SHIP FROM</span>
                <strong className="text-foreground">Logistics Hub West, Reno, NV</strong>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">DESTINATION</span>
                <strong className="text-foreground">742 Evergreen Terr, Springfield, OR</strong>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">SIGNATURE</span>
                <strong className="text-foreground">Direct Signature Required</strong>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h4 className="font-bold text-base text-foreground mb-4">Detailed Shipment Travel History</h4>
            <div className="relative border-l-2 border-border ml-3 pl-6 space-y-6 text-xs">
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full bg-accent ring-4 ring-background" />
                <p className="font-bold text-foreground">Departed FedEx Sorting Facility</p>
                <p className="text-muted-foreground">Sacramento Distribution Center, CA &bull; Sep 25, 08:45 AM</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full bg-border ring-4 ring-background" />
                <p className="font-bold text-foreground">Arrived at FedEx Hub</p>
                <p className="text-muted-foreground">Sacramento Distribution Center, CA &bull; Sep 25, 02:10 AM</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full bg-border ring-4 ring-background" />
                <p className="font-bold text-foreground">Package Picked Up by Carrier</p>
                <p className="text-muted-foreground">Reno Fulfillment Center, NV &bull; Sep 24, 05:30 PM</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full bg-border ring-4 ring-background" />
                <p className="font-bold text-foreground">Shipping Label Created &amp; Data Received</p>
                <p className="text-muted-foreground">ShopSphere Order Automation &bull; Sep 24, 10:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <FrontendLayout>
      <Suspense fallback={<div className="py-12 text-center text-muted-foreground">Loading tracker...</div>}>
        <TrackOrderContent />
      </Suspense>
    </FrontendLayout>
  );
}
