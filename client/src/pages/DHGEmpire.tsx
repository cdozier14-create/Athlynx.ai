import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const EMPIRE_COMPANIES = [
  {
    name: "ATHLYNX",
    tagline: "The Athlete's Playbook",
    description: "The complete athlete ecosystem - NIL deals, training, recruiting, and AI-powered success",
    icon: "🏆",
    color: "from-cyan-500 to-blue-500",
    revenue: "$50M+ ARR Target",
    status: "DBA",
    url: "athlynx.ai",
  },
  {
    name: "DHG Energy",
    tagline: "Powering the Future",
    description: "Modular geothermal & gas flare power stations - 100% energy independence",
    icon: "🌋",
    color: "from-green-500 to-emerald-500",
    revenue: "Infrastructure",
    status: "DBA",
    url: "",
  },
  {
    name: "DHG Cloud",
    tagline: "AWS for Athletes",
    description: "Data centers, hosting, domains, and AI compute infrastructure",
    icon: "☁️",
    color: "from-purple-500 to-pink-500",
    revenue: "$25M+ ARR Target",
    status: "DBA",
    url: "",
  },
  {
    name: "DHG Media",
    tagline: "Own the Narrative",
    description: "Music streaming, podcasts, video production, and content creation",
    icon: "🎬",
    color: "from-red-500 to-orange-500",
    revenue: "$15M+ ARR Target",
    status: "DBA",
    url: "",
  },
  {
    name: "DHG Marketing",
    tagline: "Full-Service Agency",
    description: "Social media management, PR, brand deals, and athlete marketing",
    icon: "📈",
    color: "from-amber-500 to-yellow-500",
    revenue: "$10M+ ARR Target",
    status: "DBA",
    url: "",
  },
  {
    name: "DHG Real Estate",
    tagline: "Own the Land",
    description: "Data center properties, commercial real estate, and land acquisition",
    icon: "🏗️",
    color: "from-slate-500 to-slate-600",
    revenue: "Asset Holdings",
    status: "DBA",
    url: "",
  },
];

const LEADERSHIP_VALUES = [
  { icon: "✝️", title: "Faith First", description: "God above all. Every decision guided by faith." },
  { icon: "🇺🇸", title: "American Excellence", description: "Built in America. For Americans. By Americans." },
  { icon: "👑", title: "Leadership", description: "Honoring those who lead with courage and conviction." },
  { icon: "💪", title: "Hard Work", description: "Nothing replaces dedication, discipline, and drive." },
  { icon: "🤝", title: "Family", description: "Family is everything. Legacy is forever." },
  { icon: "🌟", title: "Excellence", description: "Good enough never is. We aim for greatness." },
];

export default function DHGEmpire() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="text-3xl">👑</span>
            <div>
              <h1 className="text-xl font-bold text-amber-400">DHG TRUST</h1>
              <p className="text-xs text-slate-400">Dozier Holdings Group</p>
            </div>
          </a>
          <a href="/portal" className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg text-sm font-bold">
            Enter Portal
          </a>
        </div>
      </header>

      {/* Hero - The Crown */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <span className="text-8xl block mb-6">👑</span>
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400">
              DHG TRUST
            </span>
          </h1>
          <p className="text-2xl text-amber-400 font-bold mb-2">DOZIER HOLDINGS GROUP</p>
          <p className="text-lg text-cyan-400 mb-2">Home of ATHLYNX.AI</p>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            The King and Queen of the Ball
          </p>
          
          {/* Founder Quote */}
          <div className="max-w-3xl mx-auto bg-slate-800/50 border border-amber-500/30 rounded-2xl p-8 mb-8">
            <p className="text-2xl italic text-slate-200 mb-4">
              "Look Ma and Nanny, I Made It!"
            </p>
            <p className="text-amber-400 font-bold">— Chad A. Dozier, Founder & CEO</p>
          </div>
        </div>
      </section>

      {/* Faith & Leadership Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-800/50 via-slate-900 to-slate-800/50 border-y border-amber-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-5xl block mb-4">✝️ 🇺🇸 👑</span>
            <h2 className="text-3xl font-bold mb-4">Faith. Country. Leadership.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We honor God, our great nation, and the leaders who guide us with courage and conviction.
            </p>
          </div>

          {/* Honor Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-800/50 border-amber-500/30 text-center">
              <CardContent className="py-8">
                <span className="text-5xl block mb-4">✝️</span>
                <h3 className="text-xl font-bold text-white mb-2">God First</h3>
                <p className="text-slate-400">
                  "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."
                </p>
                <p className="text-amber-400 text-sm mt-2">— Jeremiah 29:11</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-amber-500/30 text-center">
              <CardContent className="py-8">
                <span className="text-5xl block mb-4">🇺🇸</span>
                <h3 className="text-xl font-bold text-white mb-2">America First</h3>
                <p className="text-slate-400">
                  Honoring President Donald J. Trump (45th & 47th) and First Lady Melania Trump for their leadership and dedication to making America great.
                </p>
                <p className="text-amber-400 text-sm mt-2">🦅 MAGA</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-amber-500/30 text-center">
              <CardContent className="py-8">
                <span className="text-5xl block mb-4">👑</span>
                <h3 className="text-xl font-bold text-white mb-2">Royal Excellence</h3>
                <p className="text-slate-400">
                  The King and Queen of England represent tradition, excellence, and the enduring power of legacy. We build empires that last.
                </p>
                <p className="text-amber-400 text-sm mt-2">Long Live Excellence</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Empire - All Companies */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Empire</h2>
            <p className="text-slate-400">Vertically integrated. Fully owned. Unstoppable.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMPIRE_COMPANIES.map((company) => (
              <Card key={company.name} className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all group">
                <CardContent className="py-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-3xl">{company.icon}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{company.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      company.status === "Flagship" ? "bg-amber-500/20 text-amber-400" :
                      company.status === "Active" ? "bg-green-500/20 text-green-400" :
                      "bg-blue-500/20 text-blue-400"
                    }`}>
                      {company.status}
                    </span>
                  </div>
                  <p className="text-cyan-400 text-sm mb-2">{company.tagline}</p>
                  <p className="text-slate-400 text-sm mb-4">{company.description}</p>
                  <p className="text-amber-400 font-bold text-sm">{company.revenue}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {LEADERSHIP_VALUES.map((value) => (
              <div key={value.title} className="text-center">
                <span className="text-4xl block mb-3">{value.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-slate-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Stack */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">The Full Stack Empire</h2>
          <div className="space-y-2">
            {[
              { level: "ATHLETES", desc: "The talent. The stars. The future.", color: "bg-cyan-500" },
              { level: "ATHLYNX PLATFORM", desc: "NIL, Training, Recruiting, AI Agents", color: "bg-blue-500" },
              { level: "DHG MARKETING", desc: "Social media, PR, brand deals", color: "bg-purple-500" },
              { level: "DHG MEDIA", desc: "Music, podcasts, video, content", color: "bg-pink-500" },
              { level: "DHG CLOUD", desc: "Hosting, domains, websites, compute", color: "bg-indigo-500" },
              { level: "DHG DATA CENTERS", desc: "Servers, NOCs, infrastructure", color: "bg-slate-600" },
              { level: "DHG REAL ESTATE", desc: "Land, buildings, facilities", color: "bg-slate-700" },
              { level: "DHG ENERGY", desc: "Geothermal, gas flare, power stations", color: "bg-green-600" },
              { level: "THE EARTH", desc: "God's creation. Our foundation.", color: "bg-amber-700" },
            ].map((layer, i) => (
              <div key={layer.level} className={`${layer.color} rounded-lg p-4 text-center`}>
                <p className="font-bold text-white">{layer.level}</p>
                <p className="text-white/80 text-sm">{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mic Drop */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border-y border-amber-500/30">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-8xl block mb-6">🎤</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
              MIC DROP
            </span>
          </h2>
          <p className="text-2xl text-slate-300 mb-4">Focker Out.</p>
          <p className="text-xl text-amber-400 font-bold mb-8">
            "We don't just play the game. We own the game."
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold px-8">
              Join the Empire
            </Button>
            <Button size="lg" variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500/10">
              Investor Relations
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-500/20 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-4xl">👑</span>
            <h3 className="text-2xl font-bold text-amber-400 mt-2">DHG TRUST</h3>
            <p className="text-slate-400">Dozier Holdings Group • The Empire That Never Sleeps</p>
            <p className="text-cyan-400 text-sm mt-1">All companies operate as DBAs under DHG Trust</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-slate-400 text-sm mb-8">
            <span>✝️ Faith First</span>
            <span>🇺🇸 America First</span>
            <span>👑 Excellence Always</span>
            <span>💪 Never Stop</span>
          </div>
          
          <div className="text-center text-slate-500 text-sm">
            <p>© 2026 Dozier Holdings Group, LLC. All Rights Reserved.</p>
            <p className="mt-2">
              Chad A. Dozier, Founder & CEO | "Look Ma and Nanny, I Made It!"
            </p>
            <p className="mt-4 text-amber-400">
              🎤 MIC DROP. FOCKER OUT. 🎤
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
