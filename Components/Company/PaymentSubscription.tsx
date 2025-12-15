"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
  CreditCard,
  Check,
  X,
  Zap,
  Crown,
  Building2,
  ArrowRight,
  Calendar,
  Shield,
  Users,
  Briefcase,
  Sparkles,
} from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: "monthly" | "yearly";
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
  maxJobs: number | string;
  maxApplications: number | string;
  aiScreening: boolean;
  prioritySupport: boolean;
}

const plans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "monthly",
    features: [
      "Up to 3 job postings",
      "Basic candidate management",
      "Email support",
      "Standard application tracking",
    ],
    icon: <Briefcase className="w-6 h-6" />,
    color: "bg-gray-500",
    maxJobs: 3,
    maxApplications: 50,
    aiScreening: false,
    prioritySupport: false,
  },
  {
    id: "basic",
    name: "Basic",
    price: 29,
    period: "monthly",
    features: [
      "Up to 10 job postings",
      "Advanced candidate management",
      "AI-powered resume screening",
      "Email & chat support",
      "Application analytics",
      "Custom job templates",
    ],
    popular: false,
    icon: <Zap className="w-6 h-6" />,
    color: "bg-blue-500",
    maxJobs: 10,
    maxApplications: 200,
    aiScreening: true,
    prioritySupport: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 79,
    period: "monthly",
    features: [
      "Unlimited job postings",
      "Advanced AI screening & ranking",
      "Priority candidate matching",
      "24/7 priority support",
      "Advanced analytics & reports",
      "Custom branding",
      "Bulk candidate management",
      "Interview scheduling tools",
    ],
    popular: true,
    icon: <Crown className="w-6 h-6" />,
    color: "bg-orange-500",
    maxJobs: "Unlimited",
    maxApplications: "Unlimited",
    aiScreening: true,
    prioritySupport: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    period: "monthly",
    features: [
      "Everything in Premium",
      "Dedicated account manager",
      "Custom integrations",
      "White-label solution",
      "Advanced security & compliance",
      "Multi-location support",
      "Custom AI training",
      "API access",
      "SLA guarantee",
    ],
    icon: <Building2 className="w-6 h-6" />,
    color: "bg-purple-500",
    maxJobs: "Unlimited",
    maxApplications: "Unlimited",
    aiScreening: true,
    prioritySupport: true,
  },
];

interface PaymentSubscriptionProps {
  currentPlan?: "FREE" | "BASIC" | "PREMIUM" | "ENTERPRISE";
  onPlanSelect?: (planId: string) => void;
}

export default function PaymentSubscription({
  currentPlan = "FREE",
  onPlanSelect,
}: PaymentSubscriptionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | null>(null);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowPaymentForm(true);
    if (onPlanSelect) {
      onPlanSelect(planId);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only - no backend call
    alert(`Payment processing for ${selectedPlan} plan would be handled here. This is frontend only.`);
    setShowPaymentForm(false);
    setSelectedPlan(null);
  };

  const getCurrentPlanData = () => {
    return plans.find((p) => p.id.toUpperCase() === currentPlan) || plans[0];
  };

  const getPrice = (plan: SubscriptionPlan) => {
    if (plan.price === 0) return "Free";
    const price = billingPeriod === "yearly" ? plan.price * 12 * 0.85 : plan.price;
    return billingPeriod === "yearly" ? `$${price}/year` : `$${plan.price}/month`;
  };

  return (
    <div className="space-y-8">
      {/* Current Plan Banner */}
      <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 ${getCurrentPlanData().color} rounded-full flex items-center justify-center text-white`}>
                {getCurrentPlanData().icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Current Plan: {getCurrentPlanData().name}
                </h3>
                <p className="text-sm text-gray-600">
                  {getCurrentPlanData().price === 0
                    ? "Free plan - Upgrade for more features"
                    : `Billed ${getCurrentPlanData().period === "monthly" ? "monthly" : "annually"}`}
                </p>
              </div>
            </div>
            <Badge className={`${getCurrentPlanData().color} text-white px-4 py-2`}>
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Billing Period Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-sm font-medium ${billingPeriod === "monthly" ? "text-gray-900" : "text-gray-500"}`}>
          Monthly
        </span>
        <button
          onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
          className={`relative w-14 h-8 rounded-full transition-colors ${
            billingPeriod === "yearly" ? "bg-orange-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
              billingPeriod === "yearly" ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${billingPeriod === "yearly" ? "text-gray-900" : "text-gray-500"}`}>
          Yearly
          <Badge className="ml-2 bg-green-500 text-white text-xs">Save 15%</Badge>
        </span>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && selectedPlan && (
        <Card className="border-2 border-orange-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Complete Your Subscription</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowPaymentForm(false);
                  setSelectedPlan(null);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <CardDescription>
              Select a payment method for {plans.find((p) => p.id === selectedPlan)?.name} plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              {/* Payment Method Selection */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border-2 rounded-lg transition ${
                      paymentMethod === "card"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-medium">Credit/Debit Card</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-4 border-2 rounded-lg transition ${
                      paymentMethod === "bank"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Building2 className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-medium">Bank Transfer</p>
                  </button>
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === "card" && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        maxLength={3}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* Bank Transfer Info */}
              {paymentMethod === "bank" && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Bank Transfer Details</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Bank:</strong> Saba Match Bank</p>
                    <p><strong>Account Number:</strong> 1234567890</p>
                    <p><strong>SWIFT Code:</strong> SABAMATCH</p>
                    <p><strong>Reference:</strong> {selectedPlan.toUpperCase()}-{Date.now()}</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    Please include the reference number when making the transfer. Your subscription will be activated within 1-2 business days.
                  </p>
                </div>
              )}

              {/* Summary */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-semibold">
                    {plans.find((p) => p.id === selectedPlan)?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Billing Period:</span>
                  <span className="font-semibold capitalize">{billingPeriod}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-orange-500">
                    {getPrice(plans.find((p) => p.id === selectedPlan)!)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowPaymentForm(false);
                    setSelectedPlan(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  disabled={!paymentMethod}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {paymentMethod === "bank" ? "Confirm Order" : "Subscribe Now"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Subscription Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = plan.id.toUpperCase() === currentPlan;
          const isSelected = selectedPlan === plan.id;

          return (
            <Card
              key={plan.id}
              className={`relative transition-all hover:shadow-lg ${
                plan.popular ? "border-2 border-orange-500 scale-105" : "border"
              } ${isCurrentPlan ? "bg-orange-50" : ""} ${isSelected ? "ring-2 ring-orange-500" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-orange-500 text-white px-4 py-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader>
                <div className={`w-12 h-12 ${plan.color} rounded-full flex items-center justify-center text-white mb-4`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {getPrice(plan)}
                  </span>
                  {plan.price > 0 && billingPeriod === "monthly" && (
                    <span className="text-gray-500 text-sm">/month</span>
                  )}
                </div>
                {isCurrentPlan && (
                  <Badge className="w-fit mt-2 bg-green-500 text-white">
                    Current Plan
                  </Badge>
                )}
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="w-4 h-4 text-orange-500" />
                    <span><strong>{plan.maxJobs}</strong> job postings</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-orange-500" />
                    <span><strong>{plan.maxApplications}</strong> applications</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {plan.aiScreening ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span>AI Screening</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 text-red-500" />
                        <span className="text-gray-400">AI Screening</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {plan.prioritySupport ? (
                      <>
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>Priority Support</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 text-red-500" />
                        <span className="text-gray-400">Priority Support</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                {isCurrentPlan ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className={`w-full ${plan.popular ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {plan.price === 0 ? "Get Started" : "Upgrade"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-orange-500 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure Payment</h4>
              <p className="text-sm text-gray-600">
                All payments are processed securely. You can cancel your subscription at any time.
                No hidden fees or long-term contracts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

