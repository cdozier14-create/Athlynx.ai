import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const INFRASTRUCTURE_STACK = [
  {
    level: 1,
    title: "Domain Services",
    icon: "🌐",
    description: "Register your perfect domain",
    features: [".com, .ai, .athlete, .sport domains", "DNS management", "Domain privacy", "Auto-renewal"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    level: 2,
    title: "AI Website Builder",
    icon: "🤖",
    description: "AI builds your entire site",
    features: ["AI Wizard conversations", "Auto-generated content", "Smart design layouts", "SEO optimization"],
    color: "from-purple-500 to-pink-500",
  },
  {
    level: 3,
    title: "Hosting & Servers",
    icon: "🖥️",
    description: "Enterprise-grade hosting",
    features: ["Dedicated servers", "Load balancing", "Auto-scaling", "99.99% uptime"],
    color: "from-green-500 to-emerald-500",
  },
  {
    level: 4,
    title: "Data Centers",
    icon: "🏢",
    description: "We own the facilities",
    features: ["Tier 4 data centers", "Redundant systems", "Physical security", "Climate controlled"],
    color: "from-amber-500 to-orange-500",
  },
  {
    level: 5,
    title: "Hardware & Cabling",
    icon: "🔌",
    description: "Full infrastructure control",
    features: ["Custom server builds", "Fiber optic cabling", "Network switches", "Storage arrays"],
    color: "from-red-500 to-pink-500",
  },
  {
    level: 6,
    title: "NOC Centers",
    icon: "📡",
    description: "24/7 Network Operations",
    features: ["Real-time monitoring", "Incident response", "Performance analytics", "Security operations"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    level: 7,
    title: "On-Site Support",
    icon: "👷",
    description: "Boots on the ground",
    features: ["Field technicians", "Hardware maintenance", "Emergency response", "Preventive care"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    level: 8,
    title: "Real Estate",
    icon: "🏗️",
    description: "We own the land",
    features: ["Strategic locations", "Land acquisition", "Facility construction", "Expansion ready"],
    color: "from-slate-500 to-slate-600",
  },
  {
    level: 9,
    title: "Geothermal Power",
    icon: "🌋",
    description: "100% Energy Independent",
    features: ["Renewable energy", "Zero grid dependency", "Carbon neutral", "Sustainable forever"],
    color: "from-green-600 to-emerald-600",
  },
];

const DOMAIN_PRICING = [
  { extension: ".com", price: "$12.99", renewal: "$14.99" },
  { extension: ".ai", price: "$79.99", renewal: "$89.99" },
  { extension: ".athlete", price: "$29.99", renewal: "$34.99" },
  { extension: ".sport", price: "$24.99", renewal: "$29.99" },
  { extension: ".team", price: "$19.99", renewal: "$24.99" },
  { extension: ".coach", price: "$19.99", renewal: "$24.99" },
];

const DATA_CENTER_LOCATIONS = [
  { city: "Dallas, TX", status: "Operational", capacity: "10,000 servers", power: "Geothermal" },
  { city: "Phoenix, AZ", status: "Operational", capacity: "8,000 servers", power: "Geothermal + Solar" },
  { city: "Atlanta, GA", status: "Building", capacity: "15,000 servers", power: "Geothermal" },
  { city: "Chicago, IL", status: "Planning", capacity: "12,000 servers", power: "Geothermal" },
];

export default function Infrastructure() {
  const [searchDomain, setSearchDomain] = useState("");

  const handleDomainSearch = () => {
    if (!searchDomain) {
      toast.error("Please enter a domain name");
      return;
    }
    toast.success(`Checking availability for ${searchDomain}...`);
  };

  const handleContactSales = () => {
    toast.success("Enterprise sales team will contact you within 24 hours!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/athlynx-logo-icon.png" alt="ATHLYNX" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold text-cyan-400">ATHLYNX Infrastructure</h1>
              <p className="text-xs text-slate-400">The Full Stack Empire</p>
            </div>
          </a>
          <a href="/portal" className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Back to Portal
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-cyan-500/10 to-blue-500/10" />
        <div className="relative z-10">
          <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            🌋 POWERED BY GEOTHERMAL ENERGY
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            We Own <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">EVERYTHING</span>
          </h1>
          <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto">
            From the domain you register to the land our data centers sit on. From the AI that builds your website to the geothermal power that runs it all.
          </p>
          <p className="text-2xl font-bold text-cyan-400 mb-8">
            100% Vertically Integrated. 100% Energy Independent.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white px-8">
              Start Building
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800" onClick={handleContactSales}>
              Enterprise Solutions
            </Button>
          </div>
        </div>
      </section>

      {/* Domain Search */}
      <section className="py-12 px-4 bg-slate-800/50 border-y border-slate-700">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">🌐 Find Your Perfect Domain</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your domain name..."
              value={searchDomain}
              onChange={(e) => setSearchDomain(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            <Button className="bg-cyan-500 hover:bg-cyan-400 px-8" onClick={handleDomainSearch}>
              Search
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {DOMAIN_PRICING.map((domain) => (
              <div key={domain.extension} className="bg-slate-900 rounded-lg px-4 py-2 text-center">
                <p className="text-cyan-400 font-bold">{domain.extension}</p>
                <p className="text-white text-sm">{domain.price}/yr</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Stack */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">The Full Stack</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Every layer of the technology stack, owned and operated by ATHLYNX. No dependencies. No middlemen.
          </p>

          <div className="space-y-4">
            {INFRASTRUCTURE_STACK.map((layer, index) => (
              <Card key={layer.level} className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${layer.color}`} />
                <CardContent className="py-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex items-center gap-4 md:w-1/3">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-3xl">{layer.icon}</span>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs">LEVEL {layer.level}</p>
                        <h3 className="text-xl font-bold text-white">{layer.title}</h3>
                        <p className="text-slate-400 text-sm">{layer.description}</p>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                      {layer.features.map((feature, i) => (
                        <div key={i} className="bg-slate-900/50 rounded-lg px-3 py-2 text-center">
                          <p className="text-slate-300 text-sm">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Geothermal Power Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-y border-green-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-6xl block mb-4">🌋</span>
            <h2 className="text-3xl font-bold mb-4">Geothermal Powered</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              We don't depend on power companies. Our data centers run on 100% geothermal energy - clean, renewable, and completely under our control.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <Card className="bg-slate-800/50 border-green-500/30">
              <CardContent className="py-8">
                <p className="text-4xl font-bold text-green-400">100%</p>
                <p className="text-slate-400">Renewable Energy</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-green-500/30">
              <CardContent className="py-8">
                <p className="text-4xl font-bold text-green-400">0</p>
                <p className="text-slate-400">Grid Dependency</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-green-500/30">
              <CardContent className="py-8">
                <p className="text-4xl font-bold text-green-400">24/7</p>
                <p className="text-slate-400">Consistent Power</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-green-500/30">
              <CardContent className="py-8">
                <p className="text-4xl font-bold text-green-400">∞</p>
                <p className="text-slate-400">Sustainable Forever</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Center Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">🏢 Data Center Locations</h2>
          <p className="text-slate-400 text-center mb-12">Strategic locations across the United States</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DATA_CENTER_LOCATIONS.map((dc) => (
              <Card key={dc.city} className="bg-slate-800/50 border-slate-700">
                <CardContent className="py-6 text-center">
                  <span className="text-4xl block mb-3">🏢</span>
                  <h3 className="text-xl font-bold text-white mb-2">{dc.city}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                    dc.status === "Operational" ? "bg-green-500/20 text-green-400" :
                    dc.status === "Building" ? "bg-amber-500/20 text-amber-400" :
                    "bg-blue-500/20 text-blue-400"
                  }`}>
                    {dc.status}
                  </span>
                  <p className="text-slate-400 text-sm">{dc.capacity}</p>
                  <p className="text-green-400 text-sm mt-1">⚡ {dc.power}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Website Builder */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-6xl block mb-4">🤖</span>
            <h2 className="text-3xl font-bold mb-4">AI Builds Your Website</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Just tell our AI what you want. Our Trainers, Bots, Wizards, and Agents handle everything from design to deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="py-8 text-center">
                <span className="text-4xl block mb-3">🧙</span>
                <h3 className="font-bold text-white">AI Wizard</h3>
                <p className="text-slate-400 text-sm">Guides you through the entire process</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="py-8 text-center">
                <span className="text-4xl block mb-3">🎨</span>
                <h3 className="font-bold text-white">Design Bot</h3>
                <p className="text-slate-400 text-sm">Creates stunning layouts automatically</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="py-8 text-center">
                <span className="text-4xl block mb-3">✍️</span>
                <h3 className="font-bold text-white">Content Agent</h3>
                <p className="text-slate-400 text-sm">Writes all your copy and content</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="py-8 text-center">
                <span className="text-4xl block mb-3">📈</span>
                <h3 className="font-bold text-white">SEO Trainer</h3>
                <p className="text-slate-400 text-sm">Optimizes for search engines</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-8">
              Start Building with AI
            </Button>
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Enterprise & White-Label Solutions</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Teams, schools, and organizations can white-label our entire infrastructure. Your brand, our power.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400" onClick={handleContactSales}>
                  Contact Enterprise Sales
                </Button>
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                  Download Capabilities Deck
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>ATHLYNX Infrastructure • The Full Stack Empire</p>
          <p className="mt-2">🌐 Domains • 🤖 AI Building • 🖥️ Servers • 🏢 Data Centers • 🌋 Geothermal Power</p>
          <p className="mt-4 text-green-400">100% Vertically Integrated • 100% Energy Independent</p>
        </div>
      </footer>
    </div>
  );
}
