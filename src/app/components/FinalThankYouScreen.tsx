import { Heart, BarChart3, ScanLine, Share2 } from "lucide-react";

interface FinalThankYouScreenProps {
  onNavigate: (screen: string) => void;
}

export function FinalThankYouScreen({ onNavigate }: FinalThankYouScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <div className="px-6 pt-12 pb-8 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 mx-auto mb-4 flex items-center justify-center">
          <Heart className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold" style={{ color: "var(--ocean-blue)" }}>
          Thank You!
        </h1>
        <p className="text-gray-600 mt-3">
          Thank you for using HydroThread and caring about our planet.
        </p>
      </div>

      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-cyan-100">
          <h3 className="font-semibold mb-4" style={{ color: "var(--ocean-blue)" }}>
            Your journey so far
          </h3>
          <div className="space-y-2 text-gray-700">
            <div>Items scanned today: 1</div>
            <div>Total water saved: 2,200L</div>
            <div>Low-impact choices: 1</div>
          </div>

          <p className="text-gray-700 mt-5 leading-relaxed">
            From Amina: "Thank you for being part of our community. Together, we are making a difference."
          </p>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-3">
        <button
          onClick={() => onNavigate("home")}
          className="w-full h-12 rounded-xl text-white font-medium flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg, var(--nature-green) 0%, var(--eco-accent) 100%)" }}
        >
          <ScanLine className="w-4 h-4" />
          Homepage 
        </button>
      </div>
    </div>
  );
}
