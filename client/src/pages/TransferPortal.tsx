import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const DIVISIONS = [
  { id: "d1", name: "Division I", schools: "350+" },
  { id: "d2", name: "Division II", schools: "300+" },
  { id: "d3", name: "Division III", schools: "400+" },
  { id: "naia", name: "NAIA", schools: "250+" },
  { id: "juco", name: "JUCO", schools: "500+" },
];

const SPORTS_LIST = [
  "Football", "Basketball", "Baseball", "Softball", "Soccer", 
  "Volleyball", "Track & Field", "Swimming", "Tennis", "Golf",
  "Wrestling", "Lacrosse", "Hockey", "Gymnastics", "Rowing"
];

export default function TransferPortal() {
  const { user, isAuthenticated } = useAuth();
  const [selectedDivision, setSelectedDivision] = useState("d1");
  const [selectedSport, setSelectedSport] = useState("Football");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3">
              <img src="/athlynx-logo-icon.png" alt="ATHLYNX" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold text-purple-400">Transfer Portal</h1>
                <p className="text-xs text-slate-400">AI-Powered Transfer Assistance</p>
              </div>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
              🎓 NCAA COMPLIANT
            </span>
            {isAuthenticated ? (
              <a href="/portal" className="bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded-lg text-sm font-medium">
                My Portal
              </a>
            ) : (
              <a href="/api/auth/login" className="bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Sign In
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Navigate Your Transfer
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            AI-powered guidance for Men's & Women's athletes at every level
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Transfers", value: "12,500+", icon: "🔄" },
            { label: "Schools Connected", value: "1,800+", icon: "🏫" },
            { label: "Successful Matches", value: "8,200+", icon: "✅" },
            { label: "AI Recommendations", value: "50K+", icon: "🤖" },
          ].map((stat, idx) => (
            <Card key={idx} className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-4 text-center">
                <span className="text-2xl">{stat.icon}</span>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-slate-400 text-xs">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700 flex-wrap">
            <TabsTrigger value="explore" className="data-[state=active]:bg-purple-500">
              🔍 Explore Schools
            </TabsTrigger>
            <TabsTrigger value="ai-match" className="data-[state=active]:bg-purple-500">
              🤖 AI Matching
            </TabsTrigger>
            <TabsTrigger value="my-profile" className="data-[state=active]:bg-purple-500">
              👤 My Profile
            </TabsTrigger>
            <TabsTrigger value="outreach" className="data-[state=active]:bg-purple-500">
              📧 Coach Outreach
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-purple-500">
              📅 Timeline
            </TabsTrigger>
          </TabsList>

          {/* Explore Schools Tab */}
          <TabsContent value="explore" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
              >
                {SPORTS_LIST.map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>

              <div className="flex bg-slate-800 rounded-lg p-1">
                {DIVISIONS.map((div) => (
                  <button
                    key={div.id}
                    onClick={() => setSelectedDivision(div.id)}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                      selectedDivision === div.id
                        ? "bg-purple-500 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {div.name}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Search schools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 min-w-[200px] bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder:text-slate-500"
              />
            </div>

            {/* School Results */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "University of Alabama", location: "Tuscaloosa, AL", conf: "SEC", rating: "⭐⭐⭐⭐⭐" },
                { name: "Ohio State University", location: "Columbus, OH", conf: "Big Ten", rating: "⭐⭐⭐⭐⭐" },
                { name: "University of Texas", location: "Austin, TX", conf: "SEC", rating: "⭐⭐⭐⭐⭐" },
                { name: "USC", location: "Los Angeles, CA", conf: "Big Ten", rating: "⭐⭐⭐⭐⭐" },
                { name: "University of Georgia", location: "Athens, GA", conf: "SEC", rating: "⭐⭐⭐⭐⭐" },
                { name: "University of Michigan", location: "Ann Arbor, MI", conf: "Big Ten", rating: "⭐⭐⭐⭐⭐" },
              ].map((school, idx) => (
                <Card key={idx} className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors cursor-pointer">
                  <CardContent className="py-4">
                    <h3 className="font-bold text-white">{school.name}</h3>
                    <p className="text-slate-400 text-sm">{school.location}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-purple-400 text-xs">{school.conf}</span>
                      <span className="text-xs">{school.rating}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full mt-3 bg-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white"
                      onClick={() => toast.info(`Viewing ${school.name} details...`)}
                    >
                      View Program
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Matching Tab */}
          <TabsContent value="ai-match" className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
              <CardContent className="py-8 text-center">
                <span className="text-6xl mb-4 block">🤖</span>
                <h2 className="text-2xl font-bold text-white mb-2">AI Transfer Matching</h2>
                <p className="text-slate-400 max-w-xl mx-auto mb-6">
                  Our AI analyzes your stats, preferences, academic profile, and career goals to find your perfect school match
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500"
                  onClick={() => toast.info("Complete your profile to get AI matches!")}
                >
                  🎯 Find My Match
                </Button>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-purple-400">📊 Stats Analysis</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-400 text-sm">
                  We compare your performance metrics against program requirements to find the best fit
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-purple-400">🎓 Academic Fit</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-400 text-sm">
                  Match your academic interests and GPA with schools that align with your educational goals
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-purple-400">💰 NIL Potential</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-400 text-sm">
                  Evaluate NIL opportunities and market size at each potential school
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Profile Tab */}
          <TabsContent value="my-profile" className="space-y-6">
            {!isAuthenticated ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="py-12 text-center">
                  <h3 className="text-xl font-bold text-white mb-4">Sign In to Create Your Profile</h3>
                  <p className="text-slate-400 mb-6">Build your transfer profile to get matched with schools</p>
                  <a href="/api/auth/login" className="inline-block bg-purple-500 hover:bg-purple-400 text-white px-6 py-3 rounded-lg font-medium">
                    Sign In to Continue
                  </a>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Basic Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-slate-400 text-sm">Current School</label>
                      <input className="w-full bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white mt-1" placeholder="Enter current school" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Sport</label>
                      <select className="w-full bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white mt-1">
                        {SPORTS_LIST.map((sport) => (
                          <option key={sport}>{sport}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Position</label>
                      <input className="w-full bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white mt-1" placeholder="Enter position" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Eligibility Remaining</label>
                      <select className="w-full bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white mt-1">
                        <option>4 Years</option>
                        <option>3 Years</option>
                        <option>2 Years</option>
                        <option>1 Year</option>
                        <option>Graduate Transfer</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-slate-400 text-sm">Preferred Division</label>
                      <select className="w-full bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white mt-1">
                        {DIVISIONS.map((div) => (
                          <option key={div.id}>{div.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Preferred Region</label>
                      <select className="w-full bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white mt-1">
                        <option>No Preference</option>
                        <option>Northeast</option>
                        <option>Southeast</option>
                        <option>Midwest</option>
                        <option>Southwest</option>
                        <option>West Coast</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Major/Field of Study</label>
                      <input className="w-full bg-slate-700 border-slate-600 rounded-lg px-4 py-2 text-white mt-1" placeholder="Enter intended major" />
                    </div>
                    <Button className="w-full bg-purple-500 hover:bg-purple-400 mt-4" onClick={() => toast.success("Profile saved!")}>
                      Save Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Coach Outreach Tab */}
          <TabsContent value="outreach" className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
              <CardContent className="py-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">📧</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">AI-Powered Coach Outreach</h3>
                    <p className="text-slate-400 text-sm">
                      Generate personalized emails to coaches based on your profile and their program needs
                    </p>
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-400" onClick={() => toast.info("Select a school first!")}>
                    Generate Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Outreach History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-500">
                  <p>No outreach emails sent yet</p>
                  <p className="text-sm mt-2">Start by exploring schools and generating personalized emails</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">📅 Transfer Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "Dec 1 - Jan 15", event: "Winter Transfer Window", status: "upcoming" },
                    { date: "Apr 15 - May 1", event: "Spring Transfer Window", status: "future" },
                    { date: "Ongoing", event: "Graduate Transfer Window", status: "active" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === "active" ? "bg-green-400" : 
                        item.status === "upcoming" ? "bg-yellow-400" : "bg-slate-500"
                      }`} />
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.event}</p>
                        <p className="text-slate-400 text-sm">{item.date}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.status === "active" ? "bg-green-500/20 text-green-400" :
                        item.status === "upcoming" ? "bg-yellow-500/20 text-yellow-400" : "bg-slate-600 text-slate-400"
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>Transfer Portal by ATHLYNX • The Athlete's Playbook</p>
          <p className="mt-2">Men's & Women's Sports • All Divisions • NCAA Compliant</p>
        </div>
      </footer>
    </div>
  );
}
