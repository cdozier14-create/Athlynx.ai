import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Sport configurations for seasonal focus
const FALL_SPORTS = [
  { id: "football", name: "Football", icon: "🏈", gender: "both" },
  { id: "soccer", name: "Soccer", icon: "⚽", gender: "both" },
  { id: "volleyball", name: "Volleyball", icon: "🏐", gender: "both" },
  { id: "cross-country", name: "Cross Country", icon: "🏃", gender: "both" },
];

const PLAYBOOK_TEMPLATES = {
  football: [
    { name: "Offensive Formations", plays: ["I-Formation", "Shotgun", "Pistol", "Spread", "Wing-T"] },
    { name: "Defensive Schemes", plays: ["4-3 Base", "3-4 Base", "Nickel", "Dime", "Cover 2", "Cover 3"] },
    { name: "Special Teams", plays: ["Punt Return", "Kick Return", "Onside Kick", "Fake Punt"] },
  ],
  soccer: [
    { name: "Formations", plays: ["4-4-2", "4-3-3", "3-5-2", "4-2-3-1", "5-3-2"] },
    { name: "Set Pieces", plays: ["Corner Kicks", "Free Kicks", "Penalty Kicks", "Throw-ins"] },
    { name: "Pressing", plays: ["High Press", "Mid Block", "Low Block", "Counter Press"] },
  ],
  volleyball: [
    { name: "Rotations", plays: ["5-1 Rotation", "6-2 Rotation", "4-2 Rotation"] },
    { name: "Offense", plays: ["Quick Set", "Slide", "Back Row Attack", "Pipe"] },
    { name: "Defense", plays: ["Perimeter", "Rotation", "Man Up", "Swing Block"] },
  ],
  "cross-country": [
    { name: "Race Strategy", plays: ["Negative Split", "Even Pace", "Front Run", "Kick Finish"] },
    { name: "Training", plays: ["Tempo Run", "Intervals", "Long Run", "Fartlek", "Hill Repeats"] },
    { name: "Pack Running", plays: ["Lead Pack", "Chase Pack", "Surge Strategy"] },
  ],
};

export default function WarriorsPlaybook() {
  const { user, isAuthenticated } = useAuth();
  const [selectedSport, setSelectedSport] = useState("football");
  const [selectedGender, setSelectedGender] = useState<"mens" | "womens" | "both">("both");
  const [activeTab, setActiveTab] = useState("playbook");

  const currentPlaybook = PLAYBOOK_TEMPLATES[selectedSport as keyof typeof PLAYBOOK_TEMPLATES] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3">
              <img src="/athlynx-logo-icon.png" alt="ATHLYNX" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold text-cyan-400">Warriors Playbook</h1>
                <p className="text-xs text-slate-400">Game Strategy & Film Review</p>
              </div>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-medium">
              🍂 FALL SEASON
            </span>
            {isAuthenticated ? (
              <a href="/portal" className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-lg text-sm font-medium">
                My Portal
              </a>
            ) : (
              <a href="/api/auth/login" className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Sign In
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Sport Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-300 mb-4">Select Your Sport</h2>
          <div className="flex flex-wrap gap-3">
            {FALL_SPORTS.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setSelectedSport(sport.id)}
                className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  selectedSport === sport.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span className="text-2xl">{sport.icon}</span>
                <span>{sport.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gender Toggle */}
        <div className="mb-8 flex items-center gap-4">
          <span className="text-slate-400 text-sm">Division:</span>
          <div className="flex bg-slate-800 rounded-lg p-1">
            {[
              { id: "both", label: "All" },
              { id: "mens", label: "Men's" },
              { id: "womens", label: "Women's" },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedGender(option.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedGender === option.id
                    ? "bg-cyan-500 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="playbook" className="data-[state=active]:bg-cyan-500">
              📋 Playbook
            </TabsTrigger>
            <TabsTrigger value="film" className="data-[state=active]:bg-cyan-500">
              🎬 Film Room
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-cyan-500">
              📊 Analytics
            </TabsTrigger>
            <TabsTrigger value="scouting" className="data-[state=active]:bg-cyan-500">
              🔍 Scouting
            </TabsTrigger>
          </TabsList>

          {/* Playbook Tab */}
          <TabsContent value="playbook" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {currentPlaybook.map((category, idx) => (
                <Card key={idx} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {category.plays.map((play, playIdx) => (
                      <button
                        key={playIdx}
                        onClick={() => toast.info(`Opening ${play} diagram...`)}
                        className="w-full text-left px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-slate-200 transition-colors flex items-center justify-between group"
                      >
                        <span>{play}</span>
                        <span className="text-slate-500 group-hover:text-cyan-400">→</span>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Create New Play */}
            <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
              <CardContent className="py-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Create Custom Play</h3>
                <p className="text-slate-400 mb-4">Design your own plays with our drag-and-drop editor</p>
                <Button 
                  onClick={() => toast.info("Play designer coming soon!")}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500"
                >
                  🎨 Open Play Designer
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Film Room Tab */}
          <TabsContent value="film" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">📤 Upload Film</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center">
                    <p className="text-slate-400 mb-4">Drag & drop game film or practice footage</p>
                    <Button variant="outline" onClick={() => toast.info("Film upload coming soon!")}>
                      Select Files
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">🤖 AI Film Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-400 text-sm">
                    Our AI analyzes your film to identify patterns, tendencies, and areas for improvement.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="text-green-400">✓</span> Formation recognition
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="text-green-400">✓</span> Player tracking
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="text-green-400">✓</span> Play success rate
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="text-green-400">✓</span> Opponent tendencies
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Films */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Film Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-500">
                  <p>No film uploaded yet</p>
                  <p className="text-sm mt-2">Upload your first game film to get started</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: "Games Analyzed", value: "0", icon: "🎮" },
                { label: "Plays Tracked", value: "0", icon: "📋" },
                { label: "Win Rate", value: "--", icon: "🏆" },
                { label: "Efficiency", value: "--", icon: "📈" },
              ].map((stat, idx) => (
                <Card key={idx} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="py-6 text-center">
                    <span className="text-3xl">{stat.icon}</span>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Performance Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center text-slate-500">
                <p>Analytics will appear after uploading game data</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scouting Tab */}
          <TabsContent value="scouting" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">🔍 Opponent Scouting Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Search opponent team..."
                      className="flex-1 bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white placeholder:text-slate-500"
                    />
                    <Button onClick={() => toast.info("Scouting search coming soon!")}>
                      Search
                    </Button>
                  </div>
                  <div className="text-center py-8 text-slate-500">
                    <p>Enter an opponent to generate a scouting report</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
              <CardContent className="py-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🤖</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">AI Scouting Assistant</h3>
                    <p className="text-slate-400 text-sm">
                      Our AI analyzes publicly available data to create comprehensive scouting reports
                    </p>
                  </div>
                  <Button className="ml-auto bg-amber-500 hover:bg-amber-400" onClick={() => toast.info("AI Scouting coming soon!")}>
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>Warriors Playbook by ATHLYNX • The Athlete's Playbook</p>
          <p className="mt-2">🏈 Football • ⚽ Soccer • 🏐 Volleyball • 🏃 Cross Country</p>
        </div>
      </footer>
    </div>
  );
}
