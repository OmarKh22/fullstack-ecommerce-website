'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FrontendLayout from '@/app/components/layouts/FrontendLayout';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import {
  Search,
  Package,
  RotateCcw,
  CreditCard,
  ShieldCheck,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'Orders',
    question: 'How do I track my order shipment status?',
    answer: 'Once your order is processed and dispatched, you will receive an automated shipping confirmation email containing your tracking number and carrier link. You can also view live delivery status anytime on our dedicated Track Order page.'
  },
  {
    category: 'Returns',
    question: 'What is your return policy and how do I initiate a return?',
    answer: 'We offer a 30-day hassle-free return window for all unused, undamaged items in their original packaging. Simply head to your Order History, select "Request Return", and print your prepaid return shipping label.'
  },
  {
    category: 'Shipping',
    question: 'How long does standard vs express shipping take?',
    answer: 'Standard shipping generally arrives within 3-5 business days. Express 2-Day and Overnight delivery are available at checkout for urgent orders. All orders over $75 qualify for complimentary express delivery.'
  },
  {
    category: 'Payments',
    question: 'What payment methods and financing options are accepted?',
    answer: 'We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and interest-free installment options via Klarna and Affirm.'
  },
  {
    category: 'Warranty',
    question: 'Are electronic devices covered under manufacturer warranty?',
    answer: 'Yes! As an authorized dealer for Apple, Sony, Samsung, Dyson, and Garmin, all products sold through ShopSphere carry full official manufacturer warranties plus our 1-year store guarantee.'
  }
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <FrontendLayout>
      <div className="py-2">
        <Breadcrumbs items={[{ label: 'Help & Support' }]} />

        {/* Hero Help Center Header */}
        <div className="rounded-3xl bg-surface border border-border p-6 sm:p-12 mb-8 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Customer Care Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
              How Can We Help You Today?
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Search our help documentation or choose a category below for rapid resolution.
            </p>

            {/* Help Search Bar */}
            <div className="relative max-w-lg mx-auto">
              <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search keywords (e.g. refund, tracking, warranty)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl bg-background border border-border focus:outline-hidden focus:ring-2 focus:ring-accent shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Quick Topic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link
            href="/track-order"
            className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-foreground mb-1">Track &amp; Manage Orders</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Check delivery progress, modify delivery instructions, or report damaged items.
            </p>
          </Link>

          <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-foreground mb-1">Returns &amp; Refunds</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Start a return request, download prepaid labels, and inspect refund balances.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-foreground mb-1">Billing &amp; Payments</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Understand payment authorizations, promo vouchers, and installment financing.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-foreground mb-1">Warranty &amp; Protection</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Manufacturer warranty claims, accidental damage coverage, and repair hubs.
            </p>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Quick answers to common questions about orders, payments, and returns.
            </p>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-card overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground hover:bg-surface transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-accent shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Channels Banner */}
        <div className="rounded-3xl border border-border bg-surface p-8 text-center max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-foreground mb-2">Still Need Assistance?</h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Our expert customer support team is available 24 hours a day, 7 days a week.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-background border border-border">
              <MessageCircle className="w-6 h-6 text-accent mx-auto mb-2" />
              <h4 className="font-bold text-sm text-foreground">24/7 Live Chat</h4>
              <p className="text-xs text-muted-foreground mt-1">Typical reply in 1 min</p>
              <button className="mt-3 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-semibold">
                Start Chat
              </button>
            </div>

            <div className="p-4 rounded-xl bg-background border border-border">
              <Phone className="w-6 h-6 text-accent mx-auto mb-2" />
              <h4 className="font-bold text-sm text-foreground">Phone Support</h4>
              <p className="text-xs text-muted-foreground mt-1">+1 (800) 555-0199</p>
              <a
                href="tel:18005550199"
                className="inline-block mt-3 px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-background text-foreground text-xs font-semibold"
              >
                Call Toll-Free
              </a>
            </div>

            <div className="p-4 rounded-xl bg-background border border-border">
              <Mail className="w-6 h-6 text-accent mx-auto mb-2" />
              <h4 className="font-bold text-sm text-foreground">Email Support</h4>
              <p className="text-xs text-muted-foreground mt-1">support@shopsphere.com</p>
              <a
                href="mailto:support@shopsphere.com"
                className="inline-block mt-3 px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-background text-foreground text-xs font-semibold"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </FrontendLayout>
  );
}
