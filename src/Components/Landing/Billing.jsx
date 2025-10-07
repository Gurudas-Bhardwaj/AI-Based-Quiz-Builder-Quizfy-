import React, { useMemo, useState } from "react";
import { FaCrown, FaCheck } from "react-icons/fa";
import { FiCreditCard, FiDownload } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";

/**
 * Billing / Plans Page
 * - Requires Tailwind CSS and fonts you mentioned (Outfit, Montserrat, Poppins ...)
 * - Requires react-icons (npm i react-icons)
 *
 * Usage:
 * <BillingPage />
 */

const plans = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For individuals",
    monthly: 0,
    yearly: 0,
    features: [
      "Up to 20 participants",
      "Basic analytics",
      "1 active presentation",
      "Email support",
    ],
    color: "bg-indigo-100",
    accent: "text-indigo-600",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For teams & teachers",
    monthly: 12,
    yearly: 120, // yearly price (billed yearly) — you'll show discount
    features: [
      "Up to 200 participants",
      "Advanced analytics",
      "Unlimited presentations",
      "Priority email support",
    ],
    color: "bg-indigo-50",
    accent: "text-indigo-500",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For organisations",
    monthly: 45,
    yearly: 450,
    features: [
      "Unlimited participants",
      "SLA & dedicated support",
      "Custom integrations",
      "SSO & advanced security",
    ],
    color: "bg-stone-50",
    accent: "text-stone-700",
  },
];

const sampleHistory = [
  {
    id: "inv-001",
    date: "2025-08-02",
    plan: "Pro — Yearly",
    amount: "$120.00",
    status: "Paid",
  },
  {
    id: "inv-002",
    date: "2024-12-10",
    plan: "Pro — Monthly",
    amount: "$12.00",
    status: "Paid",
  },
  {
    id: "inv-003",
    date: "2024-09-03",
    plan: "Starter",
    amount: "$0.00",
    status: "Free",
  },
];

export default function BillingPage() {
  const [billingPeriod, setBillingPeriod] = useState("monthly"); // "monthly" | "yearly"
  const [selectedPlanId, setSelectedPlanId] = useState("pro");
  const [showCurrency] = useState("$"); // Replace/extend as needed

  const displayedPlans = useMemo(() => {
    return plans.map((p) => ({
      ...p,
      price: billingPeriod === "monthly" ? p.monthly : p.yearly,
    }));
  }, [billingPeriod]);

  const selectPlan = (id) => {
    setSelectedPlanId(id);
  };

  const handleCheckout = (planId) => {
    // hook this to your checkout flow or modal
    alert(`Proceed to checkout: ${planId} — ${billingPeriod}`);
  };

  return (
    <div className="w-full min-h-screen bg-white text-stone-800 font-Outfit p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-indigo-600">Billing & Plans</h1>
            <p className="mt-1 text-stone-500 max-w-lg">
              Manage subscription, billing details and invoices. Pick a plan that fits your needs.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Billing toggle */}
            <div className="flex items-center gap-3 bg-stone-100 rounded-full p-1.5">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  billingPeriod === "monthly"
                    ? "bg-white shadow-sm text-indigo-600"
                    : "text-stone-600"
                }`}
                aria-pressed={billingPeriod === "monthly"}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  billingPeriod === "yearly"
                    ? "bg-white shadow-sm text-indigo-600"
                    : "text-stone-600"
                }`}
                aria-pressed={billingPeriod === "yearly"}
              >
                Yearly <span className="ml-2 text-xs text-stone-400">save</span>
              </button>
            </div>

            <button
              onClick={() => alert("Open payment methods")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl shadow-sm text-sm"
            >
              <FiCreditCard className="w-4 h-4" />
              Payment Methods
            </button>
          </div>
        </header>

        {/* Plans grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {displayedPlans.map((p) => {
            const isSelected = selectedPlanId === p.id;
            const isFree = p.price === 0;
            const monthlyEquivalent =
              billingPeriod === "yearly" && p.yearly ? Math.round((p.yearly / 12) * 100) / 100 : p.monthly;

            return (
              <article
                key={p.id}
                className={`relative rounded-2xl p-6 border ${
                  isSelected ? "border-indigo-300 shadow-lg" : "border-stone-200"
                } bg-white transition-transform transform hover:-translate-y-1`}
                aria-labelledby={`plan-${p.id}`}
                role="region"
              >
                {p.popular && (
                  <div className="absolute -top-3 left-4 inline-flex items-center gap-2 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs shadow-sm">
                    <FaCrown className="w-3 h-3" /> Most popular
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 id={`plan-${p.id}`} className="text-xl font-semibold text-stone-900">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-sm text-stone-500">{p.tagline}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold text-indigo-600">
                      {isFree ? "Free" : `${showCurrency}${p.price}`}
                    </div>
                    {billingPeriod === "yearly" && !isFree && (
                      <div className="text-xs text-stone-400 mt-1">
                        <span>(${showCurrency}{monthlyEquivalent}/mo)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* features */}
                <ul className="mt-5 space-y-3">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-stone-700">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${p.popular ? "bg-indigo-100 text-indigo-500" : "bg-stone-100 text-stone-600"}`}>
                        <FaCheck className="w-3 h-3" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    onClick={() => selectPlan(p.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      isSelected ? "bg-white border border-indigo-300 text-indigo-600" : "bg-indigo-50 text-indigo-600"
                    }`}
                    aria-pressed={isSelected}
                  >
                    {isSelected ? "Selected" : "Choose"}
                  </button>

                  <button
                    onClick={() => handleCheckout(p.id)}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 shadow-sm"
                    aria-label={`Checkout ${p.name}`}
                  >
                    {isFree ? "Get Started" : "Upgrade"}
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        {/* Bottom area: Payment preview + Billing history */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment method */}
          <div className="rounded-2xl p-6 border border-stone-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-stone-900">Payment method</h4>
                <p className="text-sm text-stone-500 mt-1">Visa •••• 4242</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-3 py-1 rounded-md bg-stone-100 text-stone-700 text-sm">Edit</button>
                <button className="px-3 py-1 rounded-md bg-indigo-50 text-indigo-600 text-sm">Add</button>
              </div>
            </div>

            <div className="mt-6 text-sm text-stone-600">
              <p className="mb-2">Next billing date: <span className="font-medium text-stone-800">Sep 15, 2025</span></p>
              <p className="text-sm text-stone-500">Manage subscription from here or visit the invoices section for receipts.</p>
            </div>
          </div>

          {/* Billing history */}
          
        </section>
      </div>
    </div>
  );
}
