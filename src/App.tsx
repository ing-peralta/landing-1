/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { VuetifyShowcase } from './components/VuetifyShowcase';
import { MistralAiModule } from './components/MistralAiModule';
import { LiveSimulator } from './components/LiveSimulator';
import { PricingPayments } from './components/PricingPayments';
import { AdminDashboard } from './components/AdminDashboard';
import { TechStack } from './components/TechStack';
import { Testimonials } from './components/Testimonials';
import { WaitlistForm } from './components/WaitlistForm';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';

export default function App() {
  const [dashboardRole, setDashboardRole] = useState<'user' | 'company'>('company');
  const [dashboardEmail, setDashboardEmail] = useState('carlos.mendoza@empresa.com');
  const [dashboardPlan, setDashboardPlan] = useState('Plan Empresarial ($30/mes)');

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSimulator = () => {
    const el = document.getElementById('simulador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterDashboard = (role: 'user' | 'company', email: string, plan: string) => {
    setDashboardRole(role);
    if (email) setDashboardEmail(email);
    if (plan) setDashboardPlan(plan);

    const el = document.getElementById('dashboard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar onOpenWaitlist={scrollToWaitlist} />

      <main className="flex-1">
        {/* Hero Section with Vuetify Interface Display */}
        <Hero 
          onOpenWaitlist={scrollToWaitlist} 
          onExploreDemo={scrollToSimulator} 
        />

        {/* What Problem Converxar Solves (Text, Audio, OCR Images, Files) */}
        <ProblemSolution />

        {/* Vuetify Screenshots & Interactive Component Explorer */}
        <VuetifyShowcase />

        {/* Mistral AI Architecture, Streaming Console & Pixtral OCR */}
        <MistralAiModule />

        {/* Real-Time Interactive Translation Playground */}
        <LiveSimulator />

        {/* Pricing, Subscription & Payment Gateways (Stripe & Mercado Pago) */}
        <PricingPayments 
          onOpenWaitlist={scrollToWaitlist} 
          onEnterDashboard={handleEnterDashboard}
        />

        {/* Administration Dashboard (User & Company Views) */}
        <AdminDashboard 
          initialRole={dashboardRole}
          subscribedEmail={dashboardEmail}
          subscribedPlan={dashboardPlan}
        />

        {/* Tech Stack: Mistral AI API, Vue.js 3, Vuetify, Node.js */}
        <TechStack />

        {/* Testimonials & Proof of Impact */}
        <Testimonials />

        {/* Waitlist / Early Access & Free Trial Signup Form */}
        <WaitlistForm />

        {/* Frequently Asked Questions */}
        <Faq />
      </main>

      {/* Footer */}
      <Footer onOpenWaitlist={scrollToWaitlist} />
    </div>
  );
}
