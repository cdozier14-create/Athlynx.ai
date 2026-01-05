import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface OnboardingBotProps {
  userName: string;
  onComplete: () => void;
}

interface BotMessage {
  id: number;
  text: string;
  highlight?: string;
  action?: {
    label: string;
    link: string;
  };
}

export default function OnboardingBot({ userName, onComplete }: OnboardingBotProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const messages: BotMessage[] = [
    {
      id: 1,
      text: `🎉 Welcome ${userName}! I'm your ATHLYNX guide. Let me show you around!`,
    },
    {
      id: 2,
      text: "📱 ATHLYNX is your ALL-IN-ONE platform - like Facebook, Instagram, TikTok, LinkedIn, and Reddit combined... but JUST FOR ATHLETES!",
    },
    {
      id: 3,
      text: "🏆 **PORTAL** - Your social network. Post highlights, connect with fans, build your brand!",
      highlight: "Portal",
      action: {
        label: "Open Portal",
        link: "/portal"
      }
    },
    {
      id: 4,
      text: "💬 **MESSENGER** - HIPAA-compliant messaging. Talk to coaches, agents, lawyers, family - all in one place!",
      highlight: "Messenger",
      action: {
        label: "Open Messenger",
        link: "/messenger"
      }
    },
    {
      id: 5,
      text: "💎 **DIAMOND GRIND** - Training, analytics, performance tracking. Your personal AI coach!",
      highlight: "Diamond Grind",
      action: {
        label: "Start Training",
        link: "/diamond-grind"
      }
    },
    {
      id: 6,
      text: "🎓 **TRANSFER PORTAL** - College connections, recruiting, NIL opportunities. Your path to the next level!",
      highlight: "Transfer Portal",
      action: {
        label: "Explore Colleges",
        link: "/transfer-portal"
      }
    },
    {
      id: 7,
      text: "🔗 **YOUR PROFILE URL** - Share your profile with coaches, scouts, and brands!",
      highlight: `athlynx.manus.space/@${userName.toLowerCase().replace(/\s+/g, "")}`,
      action: {
        label: "View My Profile",
        link: `/@${userName.toLowerCase().replace(/\s+/g, "")}`
      }
    },
    {
      id: 8,
      text: "🚀 **YOU'RE ALL SET!** Everything you need is here. Post, message, train, connect - all in one app. Welcome to the family!",
    },
  ];

  const currentMessage = messages[currentStep];

  const handleNext = () => {
    if (currentStep < messages.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-slate-900 to-blue-900 border-2 border-cyan-500/50 shadow-2xl p-8 relative">
        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Bot Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-50 animate-pulse" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-4xl border-4 border-cyan-400/50">
              🤖
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-8">
          <div className="text-2xl md:text-3xl font-bold text-white mb-4 leading-relaxed animate-fadeIn">
            {currentMessage.text.split("**").map((part, i) => 
              i % 2 === 1 ? <span key={i} className="text-cyan-400">{part}</span> : part
            )}
          </div>

          {currentMessage.highlight && (
            <div className="inline-block bg-cyan-500/20 border-2 border-cyan-500/50 rounded-lg px-6 py-3 mt-4">
              <code className="text-cyan-400 font-mono text-lg">{currentMessage.highlight}</code>
            </div>
          )}
        </div>

        {/* Action Button (if available) */}
        {currentMessage.action && (
          <div className="flex justify-center mb-6">
            <a href={currentMessage.action.link}>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold px-8 py-3 text-lg">
                {currentMessage.action.label} →
              </Button>
            </a>
          </div>
        )}

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {messages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentStep
                  ? "bg-cyan-400 w-8"
                  : index < currentStep
                  ? "bg-cyan-600"
                  : "bg-slate-700"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="text-gray-400 text-sm">
            Step {currentStep + 1} of {messages.length}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSkip}
              variant="outline"
              className="border-gray-600 text-gray-400 hover:bg-gray-800"
            >
              Skip Tour
            </Button>
            
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8"
            >
              {currentStep === messages.length - 1 ? "Let's Go! 🚀" : "Next →"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
