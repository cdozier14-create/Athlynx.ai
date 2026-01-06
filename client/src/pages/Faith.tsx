import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const DAILY_VERSES = [
  { verse: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13" },
  { verse: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.", reference: "2 Timothy 1:7" },
  { verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9" },
  { verse: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", reference: "Isaiah 40:31" },
];

const DEVOTIONALS = [
  { title: "Competing with Purpose", author: "Fellowship of Christian Athletes", duration: "5 min", category: "Competition" },
  { title: "Overcoming Fear of Failure", author: "Athletes in Action", duration: "7 min", category: "Mental Game" },
  { title: "Leading Your Team", author: "FCA", duration: "6 min", category: "Leadership" },
  { title: "Handling Pressure", author: "Athletes in Action", duration: "5 min", category: "Performance" },
  { title: "Finding Identity Beyond Sports", author: "FCA", duration: "8 min", category: "Identity" },
  { title: "Gratitude in Victory and Defeat", author: "Athletes in Action", duration: "5 min", category: "Character" },
];

export default function Faith() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("daily");
  const [todayVerse] = useState(DAILY_VERSES[Math.floor(Math.random() * DAILY_VERSES.length)]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-amber-950/30 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3">
              <img src="/athlynx-logo-icon.png" alt="ATHLYNX" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold text-amber-400">Faith</h1>
                <p className="text-xs text-slate-400">Spiritual Wellness for Athletes</p>
              </div>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-medium">
              ✝️ ATHLETE DEVOTIONALS
            </span>
            {isAuthenticated ? (
              <a href="/portal" className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-lg text-sm font-medium">
                My Portal
              </a>
            ) : (
              <a href="/api/auth/login" className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Sign In
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Daily Verse Hero */}
        <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 mb-8">
          <CardContent className="py-12 text-center">
            <p className="text-xs text-amber-400 uppercase tracking-wider mb-4">Today's Verse</p>
            <blockquote className="text-2xl md:text-3xl font-serif text-white mb-4 max-w-3xl mx-auto leading-relaxed">
              "{todayVerse.verse}"
            </blockquote>
            <p className="text-amber-400 font-medium">— {todayVerse.reference}</p>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="daily" className="data-[state=active]:bg-amber-500">
              📖 Daily Devotional
            </TabsTrigger>
            <TabsTrigger value="library" className="data-[state=active]:bg-amber-500">
              📚 Library
            </TabsTrigger>
            <TabsTrigger value="prayer" className="data-[state=active]:bg-amber-500">
              🙏 Prayer Wall
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-amber-500">
              👥 Community
            </TabsTrigger>
            <TabsTrigger value="journal" className="data-[state=active]:bg-amber-500">
              ✍️ Journal
            </TabsTrigger>
          </TabsList>

          {/* Daily Devotional Tab */}
          <TabsContent value="daily" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Today's Devotional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-2">Competing with Purpose</h3>
                  <p className="text-slate-400 text-sm mb-4">By Fellowship of Christian Athletes • 5 min read</p>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-slate-300 leading-relaxed">
                      As athletes, we often define ourselves by our performance. A good game means we're valuable; 
                      a bad game means we're worthless. But God sees us differently. Our identity isn't found in 
                      stats or wins—it's found in being His children.
                    </p>
                    <p className="text-slate-300 leading-relaxed mt-4">
                      Today, as you compete, remember that you're already loved, already accepted, already enough. 
                      Play freely, knowing that your worth isn't on the line. Give your best as an act of worship, 
                      not as a way to earn approval.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-6">
                  <h4 className="text-white font-medium mb-3">Reflection Questions</h4>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• How do you typically feel after a loss? What does that reveal about where you find your identity?</li>
                    <li>• What would it look like to compete freely today, without the pressure of proving yourself?</li>
                    <li>• How can you use your platform as an athlete to glorify God?</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1 bg-amber-500 hover:bg-amber-400" onClick={() => toast.success("Devotional marked as complete!")}>
                    ✓ Mark Complete
                  </Button>
                  <Button variant="outline" onClick={() => toast.info("Sharing devotional...")}>
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Streak Card */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Daily Streak</p>
                    <p className="text-3xl font-bold text-amber-400">0 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-sm">Devotionals Read</p>
                    <p className="text-3xl font-bold text-white">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Library Tab */}
          <TabsContent value="library" className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {["All", "Competition", "Mental Game", "Leadership", "Performance", "Identity", "Character"].map((cat) => (
                <button
                  key={cat}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEVOTIONALS.map((devo, idx) => (
                <Card key={idx} className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-colors cursor-pointer">
                  <CardContent className="py-6">
                    <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">{devo.category}</span>
                    <h3 className="font-bold text-white mt-3 mb-1">{devo.title}</h3>
                    <p className="text-slate-400 text-sm">{devo.author}</p>
                    <p className="text-slate-500 text-xs mt-2">{devo.duration} read</p>
                    <Button 
                      size="sm" 
                      className="w-full mt-4 bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-white"
                      onClick={() => toast.info(`Opening "${devo.title}"...`)}
                    >
                      Read Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Prayer Wall Tab */}
          <TabsContent value="prayer" className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
              <CardContent className="py-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🙏</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">Share a Prayer Request</h3>
                    <p className="text-slate-400 text-sm">
                      Let the ATHLYNX community pray with you
                    </p>
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-400" onClick={() => toast.info("Prayer request form coming soon!")}>
                    + Add Request
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Prayer Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { request: "Praying for strength during recovery from injury", prayers: 24, time: "2h ago" },
                    { request: "Guidance for my transfer decision", prayers: 18, time: "5h ago" },
                    { request: "Peace before championship game", prayers: 42, time: "1d ago" },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-slate-700/50 rounded-lg">
                      <p className="text-white">{item.request}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-slate-500 text-xs">{item.time}</span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-amber-400"
                          onClick={() => toast.success("Praying with you 🙏")}
                        >
                          🙏 {item.prayers} praying
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">🏈 FCA Huddles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm mb-4">
                    Connect with Fellowship of Christian Athletes groups near you
                  </p>
                  <Button className="w-full" variant="outline" onClick={() => toast.info("Finding FCA huddles near you...")}>
                    Find Local Huddles
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">🎯 Athletes in Action</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm mb-4">
                    Join AIA events and connect with Christian athletes worldwide
                  </p>
                  <Button className="w-full" variant="outline" onClick={() => toast.info("Loading AIA events...")}>
                    View Events
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Athlete Testimonies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-500">
                  <p>Watch inspiring stories from Christian athletes</p>
                  <Button className="mt-4 bg-amber-500 hover:bg-amber-400" onClick={() => toast.info("Testimonies coming soon!")}>
                    Browse Testimonies
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Journal Tab */}
          <TabsContent value="journal" className="space-y-6">
            {!isAuthenticated ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="py-12 text-center">
                  <h3 className="text-xl font-bold text-white mb-4">Sign In to Access Your Journal</h3>
                  <p className="text-slate-400 mb-6">Keep a private spiritual journal of your journey</p>
                  <a href="/api/auth/login" className="inline-block bg-amber-500 hover:bg-amber-400 text-white px-6 py-3 rounded-lg font-medium">
                    Sign In
                  </a>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">✍️ New Journal Entry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      className="w-full h-40 bg-slate-700 border-slate-600 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 resize-none"
                      placeholder="What's on your heart today? Reflect on your faith journey, prayers, or insights from today's devotional..."
                    />
                    <Button className="mt-4 bg-amber-500 hover:bg-amber-400" onClick={() => toast.success("Journal entry saved!")}>
                      Save Entry
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Entries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-slate-500">
                      <p>No journal entries yet</p>
                      <p className="text-sm mt-2">Start writing to capture your spiritual journey</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>Faith by ATHLYNX • The Athlete's Playbook</p>
          <p className="mt-2">✝️ Devotionals • 🙏 Prayer • 👥 Community • ✍️ Journal</p>
        </div>
      </footer>
    </div>
  );
}
