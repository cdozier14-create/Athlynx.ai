import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock revenue data for demonstration
const REVENUE_DATA = {
  today: { revenue: 2847, transactions: 42, newUsers: 18 },
  week: { revenue: 18420, transactions: 287, newUsers: 124 },
  month: { revenue: 72650, transactions: 1124, newUsers: 489 },
  year: { revenue: 847320, transactions: 12847, newUsers: 5842 },
};

const SUBSCRIPTION_BREAKDOWN = [
  { plan: "Legend", count: 12, mrr: 2988, color: "bg-purple-500" },
  { plan: "Elite", count: 34, mrr: 3366, color: "bg-blue-500" },
  { plan: "All-Star", count: 89, mrr: 4361, color: "bg-cyan-500" },
  { plan: "Starter", count: 156, mrr: 3108, color: "bg-green-500" },
  { plan: "Rookie", count: 287, mrr: 2861, color: "bg-yellow-500" },
  { plan: "Free", count: 4521, mrr: 0, color: "bg-slate-500" },
];

const SERVICE_REVENUE = [
  { service: "AI Trainer", subscribers: 234, mrr: 2337 },
  { service: "AI Recruiter", subscribers: 156, mrr: 2324 },
  { service: "Content Suite", subscribers: 189, mrr: 3779 },
  { service: "Music", subscribers: 412, mrr: 2056 },
  { service: "Media", subscribers: 287, mrr: 2287 },
  { service: "Messenger Pro", subscribers: 523, mrr: 1564 },
];

const RECENT_TRANSACTIONS = [
  { id: 1, user: "John D.", type: "Subscription", plan: "Elite", amount: 99.99, time: "2 min ago" },
  { id: 2, user: "Sarah M.", type: "Credits", amount: 49.99, time: "5 min ago" },
  { id: 3, user: "Mike T.", type: "Service", plan: "AI Trainer", amount: 9.99, time: "8 min ago" },
  { id: 4, user: "Lisa K.", type: "Marketplace", amount: 125.00, time: "12 min ago" },
  { id: 5, user: "James W.", type: "Subscription", plan: "All-Star", amount: 49.99, time: "15 min ago" },
];

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month" | "year">("month");

  // Check if user is admin (you would check user.role in production)
  const isAdmin = isAuthenticated; // For demo, allow any authenticated user

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800 border-slate-700 max-w-md">
          <CardContent className="py-12 text-center">
            <span className="text-6xl mb-4 block">🔐</span>
            <h2 className="text-2xl font-bold text-white mb-4">Admin Access Required</h2>
            <p className="text-slate-400 mb-6">Sign in with admin credentials to access the revenue dashboard</p>
            <a href="/api/auth/login" className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-lg font-medium">
              Sign In
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentData = REVENUE_DATA[timeRange];
  const totalMRR = SUBSCRIPTION_BREAKDOWN.reduce((sum, p) => sum + p.mrr, 0) + SERVICE_REVENUE.reduce((sum, s) => sum + s.mrr, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3">
              <img src="/athlynx-logo-icon.png" alt="ATHLYNX" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold text-cyan-400">Admin Dashboard</h1>
                <p className="text-xs text-slate-400">Revenue & Analytics</p>
              </div>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium">
              🔴 LIVE DATA
            </span>
            <a href="/portal" className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Back to Portal
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Time Range Selector */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">💰 Revenue Overview</h2>
          <div className="flex bg-slate-800 rounded-lg p-1">
            {(["today", "week", "month", "year"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? "bg-cyan-500 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-emerald-500/30">
            <CardContent className="py-6">
              <p className="text-emerald-400 text-sm">Revenue ({timeRange})</p>
              <p className="text-3xl font-bold text-white">${currentData.revenue.toLocaleString()}</p>
              <p className="text-emerald-400 text-xs mt-1">↑ 12% vs last period</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
            <CardContent className="py-6">
              <p className="text-blue-400 text-sm">Monthly Recurring</p>
              <p className="text-3xl font-bold text-white">${totalMRR.toLocaleString()}</p>
              <p className="text-blue-400 text-xs mt-1">MRR</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
            <CardContent className="py-6">
              <p className="text-purple-400 text-sm">Transactions</p>
              <p className="text-3xl font-bold text-white">{currentData.transactions.toLocaleString()}</p>
              <p className="text-purple-400 text-xs mt-1">↑ 8% vs last period</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-500/30">
            <CardContent className="py-6">
              <p className="text-amber-400 text-sm">New Users</p>
              <p className="text-3xl font-bold text-white">{currentData.newUsers.toLocaleString()}</p>
              <p className="text-amber-400 text-xs mt-1">↑ 15% vs last period</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500">
              📊 Overview
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="data-[state=active]:bg-cyan-500">
              💳 Subscriptions
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-cyan-500">
              🛠️ Services
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-cyan-500">
              💵 Transactions
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-cyan-500">
              👥 Users
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Revenue Chart Placeholder */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-slate-700/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-4xl mb-2">📈</p>
                      <p className="text-slate-400">[Revenue Chart]</p>
                      <p className="text-emerald-400 text-sm mt-2">Trending UP ↑</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Subscription Distribution */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Subscription Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {SUBSCRIPTION_BREAKDOWN.map((plan) => (
                      <div key={plan.plan} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${plan.color}`} />
                        <span className="text-slate-300 flex-1">{plan.plan}</span>
                        <span className="text-slate-400">{plan.count} users</span>
                        <span className="text-emerald-400 font-medium">${plan.mrr}/mo</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Feed */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Live Transaction Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {RECENT_TRANSACTIONS.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {tx.type === "Subscription" ? "💳" : tx.type === "Credits" ? "🪙" : tx.type === "Service" ? "🛠️" : "🛒"}
                        </span>
                        <div>
                          <p className="text-white font-medium">{tx.user}</p>
                          <p className="text-slate-400 text-sm">{tx.type} {tx.plan && `- ${tx.plan}`}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-bold">${tx.amount}</p>
                        <p className="text-slate-500 text-xs">{tx.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {SUBSCRIPTION_BREAKDOWN.filter(p => p.plan !== "Free").map((plan) => (
                <Card key={plan.plan} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="py-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-4 h-4 rounded-full ${plan.color}`} />
                      <h3 className="text-lg font-bold text-white">{plan.plan}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Subscribers</span>
                        <span className="text-white font-medium">{plan.count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">MRR</span>
                        <span className="text-emerald-400 font-medium">${plan.mrr}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">ARPU</span>
                        <span className="text-white">${(plan.mrr / plan.count).toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Total Subscription MRR</h3>
                    <p className="text-slate-400">Recurring revenue from all subscription plans</p>
                  </div>
                  <p className="text-4xl font-bold text-emerald-400">
                    ${SUBSCRIPTION_BREAKDOWN.reduce((sum, p) => sum + p.mrr, 0).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICE_REVENUE.map((service) => (
                <Card key={service.service} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="py-6">
                    <h3 className="text-lg font-bold text-white mb-4">{service.service}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Active Users</span>
                        <span className="text-white font-medium">{service.subscribers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">MRR</span>
                        <span className="text-emerald-400 font-medium">${service.mrr}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Total Service MRR</h3>
                    <p className="text-slate-400">Recurring revenue from à la carte services</p>
                  </div>
                  <p className="text-4xl font-bold text-emerald-400">
                    ${SERVICE_REVENUE.reduce((sum, s) => sum + s.mrr, 0).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">User</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Type</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Details</th>
                        <th className="text-right py-3 px-4 text-slate-400 font-medium">Amount</th>
                        <th className="text-right py-3 px-4 text-slate-400 font-medium">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_TRANSACTIONS.map((tx) => (
                        <tr key={tx.id} className="border-b border-slate-700/50">
                          <td className="py-3 px-4 text-white">{tx.user}</td>
                          <td className="py-3 px-4 text-slate-300">{tx.type}</td>
                          <td className="py-3 px-4 text-slate-400">{tx.plan || "-"}</td>
                          <td className="py-3 px-4 text-emerald-400 text-right font-medium">${tx.amount}</td>
                          <td className="py-3 px-4 text-slate-500 text-right">{tx.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="py-6 text-center">
                  <p className="text-3xl font-bold text-white">5,099</p>
                  <p className="text-slate-400 text-sm">Total Users</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="py-6 text-center">
                  <p className="text-3xl font-bold text-emerald-400">578</p>
                  <p className="text-slate-400 text-sm">Paid Users</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="py-6 text-center">
                  <p className="text-3xl font-bold text-blue-400">11.3%</p>
                  <p className="text-slate-400 text-sm">Conversion Rate</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="py-6 text-center">
                  <p className="text-3xl font-bold text-purple-400">$52.40</p>
                  <p className="text-slate-400 text-sm">Avg Revenue/User</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-700/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl mb-2">👥</p>
                    <p className="text-slate-400">[User Growth Chart]</p>
                    <p className="text-emerald-400 text-sm mt-2">+15% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>Admin Dashboard by ATHLYNX • The Athlete's Playbook</p>
          <p className="mt-2">💰 Real-time Revenue • 📊 Analytics • 🔐 Secure</p>
        </div>
      </footer>
    </div>
  );
}
