import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const FEATURED_CAMPAIGNS = [
  {
    id: 1,
    brand: "Nike",
    logo: "🏃",
    title: "Back to School Athletes",
    budget: "$50,000",
    perAthlete: "$500-$5,000",
    sport: "All Sports",
    deadline: "Jan 31, 2026",
    applicants: 234,
    description: "Looking for college athletes to showcase Nike gear for back-to-school campaign",
    requirements: ["10K+ followers", "College athlete", "Active social media"],
  },
  {
    id: 2,
    brand: "Gatorade",
    logo: "⚡",
    title: "Fuel Your Game",
    budget: "$75,000",
    perAthlete: "$1,000-$10,000",
    sport: "Football, Basketball",
    deadline: "Feb 15, 2026",
    applicants: 156,
    description: "Athletes to create workout content featuring Gatorade products",
    requirements: ["D1 athlete", "Video content creator", "Fitness focused"],
  },
  {
    id: 3,
    brand: "Beats by Dre",
    logo: "🎧",
    title: "Game Day Playlist",
    budget: "$100,000",
    perAthlete: "$2,500-$15,000",
    sport: "All Sports",
    deadline: "Feb 28, 2026",
    applicants: 89,
    description: "Share your pre-game playlist and Beats headphones in action",
    requirements: ["25K+ followers", "Music lover", "High engagement"],
  },
  {
    id: 4,
    brand: "Chipotle",
    logo: "🌯",
    title: "Athlete Fuel Program",
    budget: "$30,000",
    perAthlete: "$250-$2,000",
    sport: "All Sports",
    deadline: "Jan 20, 2026",
    applicants: 412,
    description: "Post about your favorite Chipotle meal and how it fuels your training",
    requirements: ["5K+ followers", "Food content", "Authentic voice"],
  },
];

const AD_PACKAGES = [
  {
    name: "Starter",
    price: "$99",
    period: "/campaign",
    impressions: "10,000",
    features: ["Banner ads", "1 week duration", "Basic targeting", "Performance report"],
    color: "from-slate-500 to-slate-600",
  },
  {
    name: "Growth",
    price: "$499",
    period: "/campaign",
    impressions: "100,000",
    features: ["Banner + video ads", "1 month duration", "Advanced targeting", "A/B testing", "Weekly reports"],
    color: "from-blue-500 to-blue-600",
    popular: true,
  },
  {
    name: "Pro",
    price: "$1,999",
    period: "/campaign",
    impressions: "500,000",
    features: ["All ad formats", "3 month duration", "Premium placements", "Dedicated manager", "Real-time analytics"],
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    impressions: "Unlimited",
    features: ["Custom campaigns", "Sponsored challenges", "Exclusive partnerships", "White-glove service", "Custom integrations"],
    color: "from-amber-500 to-amber-600",
  },
];

export default function BrandDeals() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("campaigns");
  const [userType, setUserType] = useState<"athlete" | "brand">("athlete");

  const handleApply = (campaignId: number) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to apply for campaigns");
      return;
    }
    toast.success("Application submitted! The brand will review your profile.");
  };

  const handleCreateCampaign = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to create a campaign");
      return;
    }
    toast.success("Campaign creation coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/athlynx-logo-icon.png" alt="ATHLYNX" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold text-cyan-400">Brand Deals</h1>
              <p className="text-xs text-slate-400">NIL Campaigns & Advertising</p>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <div className="bg-slate-800 rounded-lg p-1 flex">
              <button
                onClick={() => setUserType("athlete")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  userType === "athlete" ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                I'm an Athlete
              </button>
              <button
                onClick={() => setUserType("brand")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  userType === "brand" ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                I'm a Brand
              </button>
            </div>
            <a href="/portal" className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Back to Portal
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            💰 $2.5M+ in deals closed
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            {userType === "athlete" ? (
              <>
                Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">PAID</span> for Your Influence
              </>
            ) : (
              <>
                Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">ATHLETES</span> Who Move Culture
              </>
            )}
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            {userType === "athlete"
              ? "Browse brand campaigns, apply with one click, and get paid for sponsored content. We handle the contracts."
              : "Launch campaigns, find the perfect athlete partners, and track ROI in real-time. Self-serve or white-glove service."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {userType === "athlete" ? (
              <>
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white px-8">
                  Browse Campaigns
                </Button>
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                  Create Media Kit
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8" onClick={handleCreateCampaign}>
                  Launch Campaign
                </Button>
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                  View Ad Packages
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-slate-700 bg-slate-800/50 py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-green-400">$2.5M+</p>
            <p className="text-slate-400 text-sm">Deals Closed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-cyan-400">5,000+</p>
            <p className="text-slate-400 text-sm">Active Athletes</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-400">500+</p>
            <p className="text-slate-400 text-sm">Brand Partners</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-amber-400">15-20%</p>
            <p className="text-slate-400 text-sm">Our Commission</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-slate-800 border border-slate-700 mx-auto flex w-fit">
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-cyan-500 px-6">
              🎯 Live Campaigns
            </TabsTrigger>
            <TabsTrigger value="ads" className="data-[state=active]:bg-cyan-500 px-6">
              📢 Ad Packages
            </TabsTrigger>
            <TabsTrigger value="sponsored" className="data-[state=active]:bg-cyan-500 px-6">
              ⭐ Sponsored Content
            </TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Featured Brand Campaigns</h2>
              <div className="flex gap-2">
                <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm">
                  <option>All Sports</option>
                  <option>Football</option>
                  <option>Basketball</option>
                  <option>Baseball</option>
                  <option>Soccer</option>
                </select>
                <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm">
                  <option>Highest Paying</option>
                  <option>Most Recent</option>
                  <option>Deadline Soon</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {FEATURED_CAMPAIGNS.map((campaign) => (
                <Card key={campaign.id} className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{campaign.logo}</span>
                        <div>
                          <p className="text-cyan-400 font-medium">{campaign.brand}</p>
                          <CardTitle className="text-white text-xl">{campaign.title}</CardTitle>
                        </div>
                      </div>
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                        {campaign.budget} Budget
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-300">{campaign.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500">Per Athlete</p>
                        <p className="text-emerald-400 font-bold">{campaign.perAthlete}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Sport</p>
                        <p className="text-white">{campaign.sport}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Deadline</p>
                        <p className="text-amber-400">{campaign.deadline}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Applicants</p>
                        <p className="text-white">{campaign.applicants}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-slate-500 text-sm mb-2">Requirements:</p>
                      <div className="flex flex-wrap gap-2">
                        {campaign.requirements.map((req, i) => (
                          <span key={i} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400"
                      onClick={() => handleApply(campaign.id)}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Ad Packages Tab */}
          <TabsContent value="ads" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Self-Serve Advertising</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Reach thousands of college athletes and sports fans. Create campaigns in minutes, track performance in real-time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {AD_PACKAGES.map((pkg) => (
                <Card 
                  key={pkg.name} 
                  className={`bg-slate-800/50 border-slate-700 relative ${pkg.popular ? "border-cyan-500 ring-2 ring-cyan-500/20" : ""}`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  )}
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-4`}>
                      <span className="text-2xl">📢</span>
                    </div>
                    <CardTitle className="text-white">{pkg.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">{pkg.price}</span>
                      <span className="text-slate-400">{pkg.period}</span>
                    </div>
                    <p className="text-cyan-400 text-sm">{pkg.impressions} impressions</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                          <span className="text-green-400">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${pkg.popular ? "bg-cyan-500 hover:bg-cyan-400" : "bg-slate-700 hover:bg-slate-600"}`}
                      onClick={handleCreateCampaign}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Ad Formats */}
            <Card className="bg-slate-800/50 border-slate-700 mt-12">
              <CardHeader>
                <CardTitle className="text-white">Available Ad Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-slate-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-3xl">🖼️</span>
                    </div>
                    <h3 className="font-bold text-white">Banner Ads</h3>
                    <p className="text-slate-400 text-sm">Homepage, feed, profile placements</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-slate-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-3xl">🎬</span>
                    </div>
                    <h3 className="font-bold text-white">Video Ads</h3>
                    <p className="text-slate-400 text-sm">Pre-roll, mid-roll, stories</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-slate-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-3xl">📱</span>
                    </div>
                    <h3 className="font-bold text-white">Native Ads</h3>
                    <p className="text-slate-400 text-sm">In-feed sponsored content</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-slate-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-3xl">🏆</span>
                    </div>
                    <h3 className="font-bold text-white">Sponsored Challenges</h3>
                    <p className="text-slate-400 text-sm">Viral campaign activations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sponsored Content Tab */}
          <TabsContent value="sponsored" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Sponsored Content Guidelines</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Create authentic sponsored content that resonates with your audience while staying FTC compliant.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <span className="text-4xl mb-4 block">📸</span>
                  <CardTitle className="text-white">Sponsored Posts</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300">
                  <p className="mb-4">Static image posts featuring brand products or services.</p>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Must include #ad or #sponsored</li>
                    <li>✓ Authentic to your personal brand</li>
                    <li>✓ High-quality imagery required</li>
                    <li>✓ Brand approval before posting</li>
                  </ul>
                  <p className="mt-4 text-green-400 font-bold">Avg. payout: $200-$2,000</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <span className="text-4xl mb-4 block">📹</span>
                  <CardTitle className="text-white">Sponsored Stories</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300">
                  <p className="mb-4">24-hour video content showcasing brand partnerships.</p>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Swipe-up links available</li>
                    <li>✓ Behind-the-scenes content</li>
                    <li>✓ Product demos encouraged</li>
                    <li>✓ Multiple story frames allowed</li>
                  </ul>
                  <p className="mt-4 text-green-400 font-bold">Avg. payout: $100-$1,000</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <span className="text-4xl mb-4 block">🎥</span>
                  <CardTitle className="text-white">Sponsored Reels</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300">
                  <p className="mb-4">Short-form video content with brand integration.</p>
                  <ul className="space-y-2 text-sm">
                    <li>✓ 15-60 second format</li>
                    <li>✓ Trending audio encouraged</li>
                    <li>✓ Creative freedom within guidelines</li>
                    <li>✓ Performance bonuses available</li>
                  </ul>
                  <p className="mt-4 text-green-400 font-bold">Avg. payout: $500-$5,000</p>
                </CardContent>
              </Card>
            </div>

            {/* Commission Structure */}
            <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 mt-8">
              <CardContent className="py-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">💰 How You Get Paid</h3>
                  <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                    <div>
                      <p className="text-4xl font-bold text-green-400">80-85%</p>
                      <p className="text-slate-400">You Keep</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-cyan-400">15-20%</p>
                      <p className="text-slate-400">ATHLYNX Commission</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-amber-400">48hrs</p>
                      <p className="text-slate-400">Payment Processing</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-y border-cyan-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-slate-400 mb-8">
            Join thousands of athletes already making money from brand partnerships.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white px-8">
              Create Your Profile
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>Brand Deals by ATHLYNX • The Athlete's Playbook</p>
          <p className="mt-2">💰 Get Paid • 🤝 Build Partnerships • 📈 Grow Your Brand</p>
        </div>
      </footer>
    </div>
  );
}
