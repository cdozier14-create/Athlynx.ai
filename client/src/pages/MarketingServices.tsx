import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const MARKETING_PACKAGES = [
  {
    name: "Starter",
    price: "$499",
    period: "/month",
    description: "Perfect for individual athletes",
    features: [
      "Social media management (2 platforms)",
      "4 posts per week",
      "Basic analytics",
      "Monthly strategy call",
      "Content calendar",
    ],
    color: "from-slate-500 to-slate-600",
  },
  {
    name: "Growth",
    price: "$1,499",
    period: "/month",
    description: "For athletes ready to scale",
    features: [
      "Social media management (4 platforms)",
      "Daily posts",
      "Advanced analytics",
      "Weekly strategy calls",
      "Content creation",
      "Influencer outreach",
      "Brand partnership support",
    ],
    color: "from-cyan-500 to-blue-500",
    popular: true,
  },
  {
    name: "Pro",
    price: "$3,999",
    period: "/month",
    description: "Full-service marketing team",
    features: [
      "All platforms managed",
      "Unlimited content",
      "Real-time analytics",
      "Dedicated account manager",
      "Video production",
      "PR & media relations",
      "NIL deal negotiation",
      "Crisis management",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams & organizations",
    features: [
      "Multi-athlete management",
      "Team branding",
      "Sponsorship acquisition",
      "Event marketing",
      "Full creative agency",
      "White-glove service",
      "Custom integrations",
    ],
    color: "from-amber-500 to-orange-500",
  },
];

const SERVICES = [
  {
    icon: "📱",
    title: "Social Media Management",
    description: "We handle all your social platforms - posting, engagement, growth",
    price: "From $299/mo",
  },
  {
    icon: "🎬",
    title: "Video Production",
    description: "Professional highlight reels, interviews, promotional content",
    price: "From $999/project",
  },
  {
    icon: "✍️",
    title: "Content Creation",
    description: "Graphics, captions, stories, and branded content",
    price: "From $199/mo",
  },
  {
    icon: "📰",
    title: "PR & Media Relations",
    description: "Press releases, media outreach, interview prep",
    price: "From $1,499/mo",
  },
  {
    icon: "🤝",
    title: "NIL Deal Support",
    description: "Find brands, negotiate deals, manage partnerships",
    price: "15% commission",
  },
  {
    icon: "📊",
    title: "Analytics & Reporting",
    description: "Track your growth, engagement, and ROI",
    price: "Included in packages",
  },
  {
    icon: "🎯",
    title: "Paid Advertising",
    description: "Facebook, Instagram, TikTok ad campaigns",
    price: "From $500/mo + ad spend",
  },
  {
    icon: "📧",
    title: "Email Marketing",
    description: "Newsletter setup, fan engagement, sponsorship outreach",
    price: "From $299/mo",
  },
];

const CASE_STUDIES = [
  {
    name: "Marcus Johnson",
    sport: "Football - QB",
    school: "SEC University",
    result: "500K followers in 6 months",
    deals: "$250K in NIL deals",
    image: "🏈",
  },
  {
    name: "Sarah Williams",
    sport: "Basketball - Guard",
    school: "Big 10 University",
    result: "300K followers in 4 months",
    deals: "$180K in NIL deals",
    image: "🏀",
  },
  {
    name: "Jake Thompson",
    sport: "Baseball - Pitcher",
    school: "ACC University",
    result: "200K followers in 3 months",
    deals: "$120K in NIL deals",
    image: "⚾",
  },
];

export default function MarketingServices() {
  const { user, isAuthenticated } = useAuth();

  const handleSelectPackage = (packageName: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to select a package");
      return;
    }
    toast.success(`${packageName} package selected! Our team will contact you within 24 hours.`);
  };

  const handleBookCall = () => {
    toast.success("Booking your strategy call! Check your email for calendar link.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/athlynx-logo-icon.png" alt="ATHLYNX" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold text-cyan-400">Marketing Services</h1>
              <p className="text-xs text-slate-400">Full-Service Athlete Marketing</p>
            </div>
          </a>
          <a href="/portal" className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Back to Portal
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
          🚀 FULL-SERVICE MARKETING AGENCY
        </span>
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          We <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Market</span> You
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          From social media to NIL deals, our team handles everything so you can focus on your sport.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-8" onClick={handleBookCall}>
            Book Free Strategy Call
          </Button>
          <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
            View Case Studies
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 bg-slate-800/50 border-y border-slate-700">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-purple-400">500+</p>
            <p className="text-slate-400 text-sm">Athletes Managed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-pink-400">$10M+</p>
            <p className="text-slate-400 text-sm">NIL Deals Closed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-cyan-400">50M+</p>
            <p className="text-slate-400 text-sm">Followers Grown</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-amber-400">1000+</p>
            <p className="text-slate-400 text-sm">Brand Partnerships</p>
          </div>
        </div>
      </section>

      {/* Marketing Packages */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Marketing Packages</h2>
          <p className="text-slate-400 text-center mb-12">Choose the level of support that fits your goals</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARKETING_PACKAGES.map((pkg) => (
              <Card
                key={pkg.name}
                className={`bg-slate-800/50 border-slate-700 relative ${
                  pkg.popular ? "border-purple-500 ring-2 ring-purple-500/20" : ""
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                )}
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-4`}>
                    <span className="text-2xl">📈</span>
                  </div>
                  <CardTitle className="text-white">{pkg.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">{pkg.price}</span>
                    <span className="text-slate-400">{pkg.period}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-green-400 mt-0.5">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${pkg.popular ? "bg-purple-500 hover:bg-purple-400" : "bg-slate-700 hover:bg-slate-600"}`}
                    onClick={() => handleSelectPackage(pkg.name)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Services */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">À La Carte Services</h2>
          <p className="text-slate-400 text-center mb-12">Pick and choose what you need</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <Card key={service.title} className="bg-slate-900/50 border-slate-700 hover:border-purple-500/50 transition-all">
                <CardContent className="py-6">
                  <span className="text-4xl block mb-4">{service.icon}</span>
                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                  <p className="text-purple-400 font-bold">{service.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
          <p className="text-slate-400 text-center mb-12">Real results from real athletes</p>

          <div className="grid md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((study) => (
              <Card key={study.name} className="bg-slate-800/50 border-slate-700">
                <CardContent className="py-8 text-center">
                  <span className="text-6xl block mb-4">{study.image}</span>
                  <h3 className="text-xl font-bold text-white mb-1">{study.name}</h3>
                  <p className="text-cyan-400 text-sm mb-1">{study.sport}</p>
                  <p className="text-slate-500 text-sm mb-4">{study.school}</p>
                  <div className="space-y-2">
                    <p className="text-green-400 font-bold">{study.result}</p>
                    <p className="text-amber-400 font-bold">{study.deals}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-y border-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Brand?</h2>
          <p className="text-slate-400 mb-8">
            Book a free strategy call with our team. No commitment, just results-focused advice.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-12" onClick={handleBookCall}>
            Book Your Free Call
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>ATHLYNX Marketing Services • Full-Service Athlete Marketing Agency</p>
          <p className="mt-2">📱 Social Media • 🎬 Video • 📰 PR • 🤝 NIL Deals</p>
        </div>
      </footer>
    </div>
  );
}
