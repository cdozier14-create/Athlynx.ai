import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileWizardProps {
  onComplete: (profile: UserProfile) => void;
}

interface UserProfile {
  // Step 1: Basic Info
  fullName: string;
  email: string;
  phone: string;
  
  // Step 2: Role Selection
  role: "athlete" | "parent" | "coach" | "agent" | "lawyer" | "family";
  
  // Step 3: Sport & Position (if athlete)
  sport?: string;
  position?: string;
  schoolYear?: string;
  school?: string;
  
  // Step 4: Profile Photo & Bio
  profilePhoto?: string;
  bio?: string;
  
  // Step 5: Social Links
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  
  // Generated
  profileUrl?: string;
}

export default function ProfileWizard({ onComplete }: ProfileWizardProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "",
    email: "",
    phone: "",
    role: "athlete",
  });

  const totalSteps = profile.role === "athlete" ? 5 : 4;

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile({ ...profile, ...updates });
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Generate profile URL
      const username = profile.fullName.toLowerCase().replace(/\s+/g, "");
      const finalProfile = {
        ...profile,
        profileUrl: `https://athlynx.manus.space/@${username}`,
      };
      onComplete(finalProfile);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <Card className="w-full max-w-2xl bg-slate-900/95 border-2 border-cyan-500/50 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/images/dhg-crab-shield-new.jpeg" 
              alt="ATHLYNX" 
              className="w-20 h-20 rounded-2xl border-4 border-cyan-400/50"
            />
          </div>
          <CardTitle className="text-3xl font-black text-white">
            🚀 Welcome to ATHLYNX!
          </CardTitle>
          <CardDescription className="text-cyan-400 text-lg">
            Let's create your profile - Step {step} of {totalSteps}
          </CardDescription>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-slate-800 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-bold text-white mb-4">📝 Basic Information</h3>
              
              <div>
                <Label htmlFor="fullName" className="text-white">Full Name *</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => updateProfile({ fullName: e.target.value })}
                  placeholder="John Doe"
                  className="bg-slate-800 border-cyan-500/30 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateProfile({ email: e.target.value })}
                  placeholder="john@example.com"
                  className="bg-slate-800 border-cyan-500/30 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => updateProfile({ phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="bg-slate-800 border-cyan-500/30 text-white"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Role Selection */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-bold text-white mb-4">👤 I am a...</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { value: "athlete", label: "🏆 Athlete", desc: "Player" },
                  { value: "parent", label: "👨‍👩‍👧 Parent", desc: "Family" },
                  { value: "coach", label: "🎓 Coach", desc: "Trainer" },
                  { value: "agent", label: "💼 Agent", desc: "Representative" },
                  { value: "lawyer", label: "⚖️ Lawyer", desc: "Legal" },
                  { value: "family", label: "👪 Family", desc: "Supporter" },
                ].map((roleOption) => (
                  <button
                    key={roleOption.value}
                    onClick={() => updateProfile({ role: roleOption.value as any })}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      profile.role === roleOption.value
                        ? "bg-cyan-500 border-cyan-400 text-white"
                        : "bg-slate-800 border-cyan-500/30 text-gray-300 hover:border-cyan-400"
                    }`}
                  >
                    <div className="text-3xl mb-2">{roleOption.label.split(" ")[0]}</div>
                    <div className="font-bold">{roleOption.label.split(" ").slice(1).join(" ")}</div>
                    <div className="text-sm opacity-75">{roleOption.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Sport & Position (Athletes only) */}
          {step === 3 && profile.role === "athlete" && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-bold text-white mb-4">⚽ Your Sport</h3>
              
              <div>
                <Label htmlFor="sport" className="text-white">Sport *</Label>
                <select
                  id="sport"
                  value={profile.sport || ""}
                  onChange={(e) => updateProfile({ sport: e.target.value })}
                  className="w-full bg-slate-800 border-2 border-cyan-500/30 text-white rounded-lg p-3"
                  required
                >
                  <option value="">Select your sport...</option>
                  <option value="football">Football</option>
                  <option value="basketball">Basketball</option>
                  <option value="baseball">Baseball</option>
                  <option value="soccer">Soccer</option>
                  <option value="track">Track & Field</option>
                  <option value="volleyball">Volleyball</option>
                  <option value="softball">Softball</option>
                  <option value="tennis">Tennis</option>
                  <option value="golf">Golf</option>
                  <option value="swimming">Swimming</option>
                  <option value="wrestling">Wrestling</option>
                  <option value="lacrosse">Lacrosse</option>
                  <option value="hockey">Hockey</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <Label htmlFor="position" className="text-white">Position</Label>
                <Input
                  id="position"
                  value={profile.position || ""}
                  onChange={(e) => updateProfile({ position: e.target.value })}
                  placeholder="e.g., Quarterback, Point Guard"
                  className="bg-slate-800 border-cyan-500/30 text-white"
                />
              </div>

              <div>
                <Label htmlFor="school" className="text-white">School/University</Label>
                <Input
                  id="school"
                  value={profile.school || ""}
                  onChange={(e) => updateProfile({ school: e.target.value })}
                  placeholder="e.g., University of Alabama"
                  className="bg-slate-800 border-cyan-500/30 text-white"
                />
              </div>

              <div>
                <Label htmlFor="schoolYear" className="text-white">Year</Label>
                <select
                  id="schoolYear"
                  value={profile.schoolYear || ""}
                  onChange={(e) => updateProfile({ schoolYear: e.target.value })}
                  className="w-full bg-slate-800 border-2 border-cyan-500/30 text-white rounded-lg p-3"
                >
                  <option value="">Select year...</option>
                  <option value="freshman">Freshman</option>
                  <option value="sophomore">Sophomore</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                  <option value="graduate">Graduate</option>
                  <option value="pro">Professional</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Profile Photo & Bio */}
          {step === (profile.role === "athlete" ? 4 : 3) && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-bold text-white mb-4">📸 Your Profile</h3>
              
              <div>
                <Label htmlFor="bio" className="text-white">Bio</Label>
                <textarea
                  id="bio"
                  value={profile.bio || ""}
                  onChange={(e) => updateProfile({ bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  className="w-full bg-slate-800 border-2 border-cyan-500/30 text-white rounded-lg p-3 h-32"
                  maxLength={500}
                />
                <p className="text-gray-400 text-sm mt-1">{(profile.bio || "").length}/500 characters</p>
              </div>

              <div className="bg-cyan-500/10 border-2 border-cyan-500/30 rounded-lg p-4">
                <p className="text-cyan-400 text-sm">
                  💡 <strong>Tip:</strong> You can upload your profile photo after completing setup!
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Social Links */}
          {step === (profile.role === "athlete" ? 5 : 4) && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-bold text-white mb-4">🔗 Connect Your Socials</h3>
              
              <div>
                <Label htmlFor="instagram" className="text-white">Instagram</Label>
                <Input
                  id="instagram"
                  value={profile.instagram || ""}
                  onChange={(e) => updateProfile({ instagram: e.target.value })}
                  placeholder="@username"
                  className="bg-slate-800 border-cyan-500/30 text-white"
                />
              </div>

              <div>
                <Label htmlFor="twitter" className="text-white">Twitter/X</Label>
                <Input
                  id="twitter"
                  value={profile.twitter || ""}
                  onChange={(e) => updateProfile({ twitter: e.target.value })}
                  placeholder="@username"
                  className="bg-slate-800 border-cyan-500/30 text-white"
                />
              </div>

              <div>
                <Label htmlFor="tiktok" className="text-white">TikTok</Label>
                <Input
                  id="tiktok"
                  value={profile.tiktok || ""}
                  onChange={(e) => updateProfile({ tiktok: e.target.value })}
                  placeholder="@username"
                  className="bg-slate-800 border-cyan-500/30 text-white"
                />
              </div>

              <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 text-sm">
                  ✅ <strong>Almost done!</strong> Click "Complete Profile" to finish setup.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {step > 1 && (
              <Button
                onClick={prevStep}
                variant="outline"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
              >
                ← Back
              </Button>
            )}
            
            <Button
              onClick={nextStep}
              className="ml-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold"
              disabled={
                (step === 1 && (!profile.fullName || !profile.email || !profile.phone)) ||
                (step === 3 && profile.role === "athlete" && !profile.sport)
              }
            >
              {step === totalSteps ? "Complete Profile ✅" : "Next →"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
