import { useEffect, useState } from "react";
import { Link } from "wouter";

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [sport, setSport] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    document.title = "ATHLYNX - The Athlete's Playbook | VIP Early Access";
  }, []);

  useEffect(() => {
    const targetDate = new Date("2026-02-01T00:00:00").getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) { alert("Please select your role"); return; }
    if (!sport) { alert("Please select your sport"); return; }
    setSubmitted(true);
  };

  const roles = ["Athlete", "Parent", "Coach", "Brand"];
  const sports = ["Baseball", "Football", "Basketball", "Soccer", "Track & Field", "Volleyball"];

  return (
    <div className="min-h-screen relative text-white overflow-x-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 25%, #0f2847 50%, #0a1e38 75%, #061424 100%)' }}></div>
      <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at top center, rgba(59, 130, 246, 0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom center, rgba(6, 182, 212, 0.1) 0%, transparent 60%)' }}></div>
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/95 backdrop-blur-md border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex md:hidden items-center justify-between">
            <span className="text-cyan-400 font-bold text-[10px] tracking-wider">ATHLYNX</span>
            <Link href="/founders"><button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-4 py-1.5 rounded-lg text-xs">Founders</button></Link>
          </div>
          <div className="hidden md:flex items-center justify-between">
            <span className="text-cyan-400 font-bold text-xs tracking-widest">THE FUTURE OF ATHLETE SUCCESS</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 mr-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-cyan-400 border border-cyan-500/50">DHG</div>
                <div className="text-left">
                  <p className="text-gray-400 text-[10px] uppercase">PARENT COMPANY</p>
                  <p className="text-cyan-400 font-semibold text-xs">Dozier Holdings Group</p>
                </div>
              </div>
              <div className="text-right mr-4">
                <p className="text-white font-bold text-sm">ATHLYNX</p>
                <p className="text-cyan-400 text-[10px] tracking-wider">THE ATHLETE'S PLAYBOOK</p>
              </div>
              <Link href="/founders"><button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-6 py-2 rounded-lg shadow-lg shadow-cyan-500/30 transition-all">Founders</button></Link>
              <Link href="/portal-login"><button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold px-6 py-2 rounded-lg shadow-lg shadow-yellow-500/30 transition-all">Portal Login</button></Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative w-full max-w-[640px] mx-auto px-4 pt-16 sm:pt-20 pb-8 space-y-6 sm:space-y-8">
        <div className="flex justify-center pt-4">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/50 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold text-xs">LIVE PLATFORM</span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-cyan-400 font-semibold text-xs">HIPAA-compliant</span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-gray-300 text-xs">Protecting our precious cargo</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg px-4 py-2">
            <span className="text-yellow-400 text-xs">⚠️ SITE UPDATING LIVE DAILY - Please be patient with us while we add future updates and apps!</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/vip">
            <div className="bg-slate-900/80 backdrop-blur-md border-2 border-cyan-500/50 rounded-xl px-8 py-4 cursor-pointer hover:border-cyan-400 transition-all">
              <div className="text-center">
                <div className="text-4xl mb-2">🎟️</div>
                <p className="text-cyan-400 font-bold text-lg">HAVE A VIP CODE?</p>
                <p className="text-gray-400 text-sm">TAP HERE TO ENTER</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-4">
            <span className="text-4xl">🏆</span>
            <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400">HEAVYWEIGHT CHAMPION</h2>
            <span className="text-4xl">🏆</span>
          </div>
          <p className="text-2xl font-bold text-cyan-400">OF THE WORLD</p>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 blur-[60px] opacity-40 animate-pulse"></div>
            <img src="/images/dhg-crab-shield-new.jpeg" alt="DHG Crab Shield" className="relative w-48 h-48 rounded-full shadow-[0_0_60px_rgba(6,182,212,0.6)] border-4 border-cyan-400/50" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-2xl font-black text-white">DOZIER HOLDINGS GROUP</h3>
          <p className="text-cyan-400 font-bold">THE UNDEFEATED CHAMPION</p>
          <p className="text-gray-400">THE LEGENDARY TRAINER</p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <img src="/athlynx-logo.png" alt="ATHLYNX" className="w-16 h-16 rounded-xl" />
            <div>
              <h3 className="text-xl font-black text-white">ATHLYNX</h3>
              <p className="text-cyan-400 text-sm">THE ATHLETE'S PLAYBOOK</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm">The mastermind behind the champion. Building champions, training winners, and creating empires.</p>
          <div className="text-center">
            <p className="text-cyan-400 font-bold text-sm mb-2">THE EMPIRE</p>
            <div className="flex justify-center gap-2 text-2xl"><span>🏆</span><span>💰</span><span>💍</span><span>🏢</span><span>📈</span></div>
            <p className="text-gray-400 text-xs mt-2">PASSIVE INCOME EMPIRE</p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-black text-white">THE COMPLETE ATHLETE ECOSYSTEM</h2>
          <p className="text-cyan-400 font-bold">10 Powerful Apps. One Platform. Unlimited Potential.</p>
        </div>

        <div className="bg-gradient-to-b from-slate-900/80 to-slate-800/60 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-cyan-400 font-bold text-sm">THE FUTURE OF ATHLETE SUCCESS</p>
            <p className="text-gray-400 text-sm">THE ATHLETE'S PLAYBOOK</p>
            <h3 className="text-3xl font-black text-white">VIP EARLY ACCESS</h3>
            <p className="text-yellow-400 font-bold text-xl">6 MONTHS FREE</p>
          </div>

          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">LAUNCHING IN</p>
            <div className="flex justify-center gap-4">
              <div className="bg-slate-800 rounded-lg px-4 py-2"><p className="text-3xl font-black text-cyan-400">{timeLeft.days}</p><p className="text-xs text-gray-400">DAYS</p></div>
              <div className="bg-slate-800 rounded-lg px-4 py-2"><p className="text-3xl font-black text-cyan-400">{timeLeft.hours}</p><p className="text-xs text-gray-400">HOURS</p></div>
              <div className="bg-slate-800 rounded-lg px-4 py-2"><p className="text-3xl font-black text-cyan-400">{timeLeft.minutes}</p><p className="text-xs text-gray-400">MINS</p></div>
              <div className="bg-slate-800 rounded-lg px-4 py-2"><p className="text-3xl font-black text-cyan-400">{timeLeft.seconds}</p><p className="text-xs text-gray-400">SECS</p></div>
            </div>
            <p className="text-cyan-400 font-bold">FEBRUARY 1, 2026</p>
          </div>

          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">FOUNDING MEMBER SPOTS</p>
            <p className="text-yellow-400 font-black text-2xl">LIMITED TO 10,000</p>
            <p className="text-gray-400 text-xs">Join athletes from 500+ schools already on the waitlist</p>
            <p className="text-cyan-400 text-xs font-bold">SEC • ACC • Big Ten • Big 12 • Pac-12</p>
          </div>

          {submitted ? (
            <div className="text-center space-y-4 py-8">
              <div className="text-6xl">🎉</div>
              <h3 className="text-2xl font-black text-green-400">YOU'RE IN!</h3>
              <p className="text-gray-300">Welcome to the ATHLYNX family. Check your email for your VIP access code.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none" />
              <input type="tel" placeholder="Phone (Optional)" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none" />
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-slate-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none">
                <option value="">Select Your Role</option>
                {roles.map((r) => (<option key={r} value={r}>{r}</option>))}
              </select>
              <select value={sport} onChange={(e) => setSport(e.target.value)} className="w-full bg-slate-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none">
                <option value="">Select Your Sport</option>
                {sports.map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
              <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black py-4 rounded-lg shadow-lg shadow-cyan-500/30 transition-all text-lg">🚀 JOIN THE WAITLIST</button>
            </form>
          )}
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-400 text-sm">ALREADY A VIP MEMBER?</p>
          <Link href="/vip"><button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold px-8 py-3 rounded-lg shadow-lg transition-all">Enter your access code to unlock all 6 apps</button></Link>
        </div>
      </div>

      <footer className="relative bg-slate-900/90 border-t border-cyan-500/30 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center items-center gap-4">
            <img src="/athlynx-logo.png" alt="ATHLYNX" className="w-10 h-10 rounded-lg" />
            <div><p className="text-white font-bold">ATHLYNX</p><p className="text-cyan-400 text-xs">THE ATHLETE'S PLAYBOOK</p></div>
          </div>
          <p className="text-gray-400 text-xs">A Dozier Holdings Group Company</p>
          <p className="text-gray-500 text-xs">© 2026 ATHLYNX. All rights reserved.</p>
          <div className="flex justify-center gap-4 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-cyan-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cyan-400">Terms of Service</Link>
            <Link href="/contact" className="hover:text-cyan-400">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
