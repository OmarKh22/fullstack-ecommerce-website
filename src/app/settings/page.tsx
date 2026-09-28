'use client';

import React, { useState } from 'react';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import {
  User,
  Shield,
  MapPin,
  Bell,
  CheckCircle2,
  Save
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'addresses' | 'notifications'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [profile, setProfile] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    country: 'United States',
    language: 'English (US)'
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    priceDrops: false,
    newsletter: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <FrontendLayout>
      <div className="py-2">
        <Breadcrumbs items={[{ label: 'Account Settings' }]} />

        {/* Page Header */}
        <div className="mb-8 pb-4 border-b border-border">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Account Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your personal profile, addresses, security, and notification preferences.
          </p>
        </div>

        {saveSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 flex items-center gap-3 text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <aside className="md:col-span-1 space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-foreground hover:bg-surface'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'security'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-foreground hover:bg-surface'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Password & Security</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-foreground hover:bg-surface'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-foreground hover:bg-surface'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </button>
          </aside>

          {/* Settings Main Content Area */}
          <main className="md:col-span-3">
            {activeTab === 'profile' && (
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <h2 className="text-xl font-bold text-foreground mb-1">Personal Profile</h2>
                <p className="text-xs text-muted-foreground mb-6">
                  Update your personal details used for orders and shipping.
                </p>

                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-surface border border-border focus:outline-hidden focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-surface border border-border focus:outline-hidden focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-surface border border-border focus:outline-hidden focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-surface border border-border focus:outline-hidden focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">Password & Security</h2>
                  <p className="text-xs text-muted-foreground">
                    Ensure your account is using a long, random password to stay secure.
                  </p>
                </div>

                <form onSubmit={handleSave} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-surface border border-border focus:outline-hidden focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-surface border border-border focus:outline-hidden focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-surface border border-border focus:outline-hidden focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">Saved Addresses</h2>
                    <p className="text-xs text-muted-foreground">
                      Manage your delivery and billing destinations.
                    </p>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:bg-accent/90 transition-colors">
                    + Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border-2 border-accent bg-accent/5 relative">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-accent text-white mb-2">
                      Default Shipping
                    </span>
                    <h4 className="font-bold text-sm text-foreground">Alex Morgan</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      742 Evergreen Terrace<br />
                      Suite 4B<br />
                      Springfield, OR 97477<br />
                      United States
                    </p>
                    <div className="mt-4 flex gap-3 text-xs font-semibold text-accent">
                      <button className="hover:underline">Edit</button>
                      <button className="text-muted-foreground hover:text-red-500">Remove</button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-border bg-surface relative">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-surface text-muted-foreground border border-border mb-2">
                      Office
                    </span>
                    <h4 className="font-bold text-sm text-foreground">Alex Morgan (Work)</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      100 Silicon Way<br />
                      Floor 3<br />
                      San Francisco, CA 94107<br />
                      United States
                    </p>
                    <div className="mt-4 flex gap-3 text-xs font-semibold text-accent">
                      <button className="hover:underline">Edit</button>
                      <button className="text-muted-foreground hover:text-red-500">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">Notification Preferences</h2>
                  <p className="text-xs text-muted-foreground">
                    Choose what alerts and marketing updates you wish to receive.
                  </p>
                </div>

                <div className="divide-y divide-border">
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">Order & Tracking Updates</h4>
                      <p className="text-xs text-muted-foreground">Get real-time delivery notifications via email & SMS.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.orderUpdates}
                      onChange={(e) => setNotifications({ ...notifications, orderUpdates: e.target.checked })}
                      className="rounded-sm border-border text-accent focus:ring-accent w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">Promotions & Flash Sales</h4>
                      <p className="text-xs text-muted-foreground">Receive special discount codes and flash deal alerts.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.promotions}
                      onChange={(e) => setNotifications({ ...notifications, promotions: e.target.checked })}
                      className="rounded-sm border-border text-accent focus:ring-accent w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">Wishlist Price Drops</h4>
                      <p className="text-xs text-muted-foreground">Be alerted immediately when saved items go on sale.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.priceDrops}
                      onChange={(e) => setNotifications({ ...notifications, priceDrops: e.target.checked })}
                      className="rounded-sm border-border text-accent focus:ring-accent w-4 h-4 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </FrontendLayout>
  );
}
