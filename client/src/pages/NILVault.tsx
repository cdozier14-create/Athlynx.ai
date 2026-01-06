import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function NILVault() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for demonstration
  const mockDeals = [
    { id: 1, brand: "Nike", type: "Apparel", value: 5000, status: "active", expires: "Dec 2026" },
    { id: 2, brand: "Gatorade", type: "Endorsement", value: 2500, status: "pending", expires: "Mar 2026" },
    { id: 3, brand: "Local Car Dealer", type: "Appearance", value: 1000, status: "completed", expires: "N/A" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3">
              <img src="/athlynx-logo-icon.png" alt="ATHLYNX" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold text-emerald-400">NIL Vault</h1>
                <p className="text-xs text-slate-400">Deal Management & Contracts</p>
              </div>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">
              💰 SECURE & COMPLIANT
            </span>
            {isAuthenticated ? (
              <a href="/portal" className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg text-sm font-medium">
                My Portal
              </a>
            ) : (
              <a href="/api/auth/login" className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Sign In
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="py-16 text-center">
              <span className="text-6xl mb-4 block">🔐</span>
              <h2 className="text-2xl font-bold text-white mb-4">Secure Your NIL Deals</h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-6">
                Sign in to access your NIL Vault - manage contracts, track earnings, and protect your brand
              </p>
              <a href="/api/auth/login" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-lg font-medium">
                Sign In to Access Vault
              </a>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Earnings", value: "$8,500", icon: "💵", color: "emerald" },
                { label: "Active Deals", value: "2", icon: "📝", color: "blue" },
                { label: "Pending Deals", value: "1", icon: "⏳", color: "yellow" },
                { label: "Brand Value", value: "$15K", icon: "📈", color: "purple" },
              ].map((stat, idx) => (
                <Card key={idx} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="py-4 text-center">
                    <span className="text-2xl">{stat.icon}</span>
                    <p className={`text-2xl font-bold text-${stat.color}-400 mt-1`}>{stat.value}</p>
                    <p className="text-slate-400 text-xs">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-slate-800 border border-slate-700">
                <TabsTrigger value="dashboard" className="data-[state=active]:bg-emerald-500">
                  📊 Dashboard
                </TabsTrigger>
                <TabsTrigger value="deals" className="data-[state=active]:bg-emerald-500">
                  📝 My Deals
                </TabsTrigger>
                <TabsTrigger value="contracts" className="data-[state=active]:bg-emerald-500">
                  📄 Contracts
                </TabsTrigger>
                <TabsTrigger value="calculator" className="data-[state=active]:bg-emerald-500">
                  🧮 Value Calculator
                </TabsTrigger>
                <TabsTrigger value="templates" className="data-[state=active]:bg-emerald-500">
                  📋 Templates
                </TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">Earnings This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold text-emerald-400 mb-4">$2,500</div>
                      <div className="h-32 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-500">
                        [Earnings Chart]
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">Deal Pipeline</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-emerald-500/10 rounded-lg">
                        <span className="text-emerald-400">Active</span>
                        <span className="text-white font-bold">2 deals</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
                        <span className="text-yellow-400">Pending</span>
                        <span className="text-white font-bold">1 deal</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                        <span className="text-blue-400">Negotiating</span>
                        <span className="text-white font-bold">0 deals</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/30">
                  <CardContent className="py-6">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">🤖</span>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white">AI Deal Finder</h3>
                        <p className="text-slate-400 text-sm">
                          Let our AI find NIL opportunities that match your brand and audience
                        </p>
                      </div>
                      <Button className="bg-emerald-500 hover:bg-emerald-400" onClick={() => toast.info("AI searching for deals...")}>
                        Find Deals
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* My Deals Tab */}
              <TabsContent value="deals" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">My NIL Deals</h2>
                  <Button className="bg-emerald-500 hover:bg-emerald-400" onClick={() => toast.info("Add deal form coming soon!")}>
                    + Add Deal
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockDeals.map((deal) => (
                    <Card key={deal.id} className="bg-slate-800/50 border-slate-700">
                      <CardContent className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">
                              {deal.type === "Apparel" ? "👕" : deal.type === "Endorsement" ? "🎤" : "🤝"}
                            </div>
                            <div>
                              <h3 className="font-bold text-white">{deal.brand}</h3>
                              <p className="text-slate-400 text-sm">{deal.type} • Expires: {deal.expires}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-emerald-400">${deal.value.toLocaleString()}</p>
                            <span className={`text-xs px-2 py-1 rounded ${
                              deal.status === "active" ? "bg-emerald-500/20 text-emerald-400" :
                              deal.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                              "bg-slate-600 text-slate-400"
                            }`}>
                              {deal.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Contracts Tab */}
              <TabsContent value="contracts" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">📄 Contract Storage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center">
                      <p className="text-slate-400 mb-4">Drag & drop contracts to upload</p>
                      <Button variant="outline" onClick={() => toast.info("Contract upload coming soon!")}>
                        Select Files
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Contracts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-slate-500">
                      <p>No contracts uploaded yet</p>
                      <p className="text-sm mt-2">Upload your first contract to get started</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Value Calculator Tab */}
              <TabsContent value="calculator" className="space-y-6">
                <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
                  <CardContent className="py-8 text-center">
                    <span className="text-6xl mb-4 block">🧮</span>
                    <h2 className="text-2xl font-bold text-white mb-2">NIL Value Calculator</h2>
                    <p className="text-slate-400 max-w-xl mx-auto mb-6">
                      Calculate your estimated NIL value based on social following, engagement, sport, and market
                    </p>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">Your Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-slate-400 text-sm">Instagram Followers</label>
                        <input type="number" className="w-full bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white mt-1" placeholder="0" />
                      </div>
                      <div>
                        <label className="text-slate-400 text-sm">TikTok Followers</label>
                        <input type="number" className="w-full bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white mt-1" placeholder="0" />
                      </div>
                      <div>
                        <label className="text-slate-400 text-sm">Twitter/X Followers</label>
                        <input type="number" className="w-full bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white mt-1" placeholder="0" />
                      </div>
                      <div>
                        <label className="text-slate-400 text-sm">Engagement Rate (%)</label>
                        <input type="number" className="w-full bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white mt-1" placeholder="3.5" />
                      </div>
                      <Button className="w-full bg-purple-500 hover:bg-purple-400" onClick={() => toast.success("Estimated Value: $12,500/year")}>
                        Calculate Value
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">Estimated Value</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center py-8">
                      <p className="text-5xl font-bold text-emerald-400">$--</p>
                      <p className="text-slate-400 mt-2">per year</p>
                      <div className="mt-6 space-y-2 text-sm text-slate-400">
                        <p>• Social Media Posts: $--/post</p>
                        <p>• Appearances: $--/event</p>
                        <p>• Endorsements: $--/deal</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Templates Tab */}
              <TabsContent value="templates" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { name: "Social Media Post Agreement", icon: "📱", downloads: "2.5K" },
                    { name: "Appearance Contract", icon: "🤝", downloads: "1.8K" },
                    { name: "Endorsement Deal", icon: "⭐", downloads: "3.2K" },
                    { name: "Merchandise Agreement", icon: "👕", downloads: "1.2K" },
                    { name: "Camp/Clinic Contract", icon: "🏕️", downloads: "890" },
                    { name: "Autograph Session", icon: "✍️", downloads: "1.5K" },
                  ].map((template, idx) => (
                    <Card key={idx} className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-colors cursor-pointer">
                      <CardContent className="py-6 text-center">
                        <span className="text-4xl mb-3 block">{template.icon}</span>
                        <h3 className="font-bold text-white mb-1">{template.name}</h3>
                        <p className="text-slate-500 text-xs">{template.downloads} downloads</p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => toast.info(`Downloading ${template.name}...`)}
                        >
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>NIL Vault by ATHLYNX • The Athlete's Playbook</p>
          <p className="mt-2">🔐 Secure • 📝 Compliant • 💰 Profitable</p>
        </div>
      </footer>
    </div>
  );
}
