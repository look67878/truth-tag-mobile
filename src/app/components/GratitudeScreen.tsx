import { Share2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import gratitudeLetterImage from "../../assets/1.png";

interface GratitudeScreenProps {
  variant: "low" | "alternative";
  onNavigate: (screen: string) => void;
}

export function GratitudeScreen({ variant, onNavigate }: GratitudeScreenProps) {
  const isLow = variant === "low";

  const gratitudeImage = gratitudeLetterImage;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="px-6 pt-14 pb-8 text-center">
        <h1 className="text-3xl font-bold" style={{ color: "var(--nature-green)" }}>
          {isLow ? "Thank you!" : "Wonderful Choice!"}
        </h1>
        <p className="text-gray-600 mt-2">
          {isLow ? "You saved 2,200L of water compared to conventional cotton." : "You chose a low-impact alternative."}
        </p>
      </div>

      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
          <div className="h-40 rounded-2xl mb-5 overflow-hidden border border-emerald-100 bg-emerald-50">
            <ImageWithFallback src={gratitudeImage} alt="Amina smiling" className="w-full h-full object-cover" />
          </div>

          <p className="text-sm text-gray-500 mb-2">From Amina:</p>
          <p className="text-gray-700 leading-relaxed">
            {isLow
              ? '"Thank you for choosing clothes that use less water. Families like mine feel the difference."'
              : '"Wow! You chose a better option. That makes me so happy. Thank you so much!"'}
          </p>

          <div className="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="text-sm text-emerald-700">Your impact</div>
            <div className="text-2xl font-bold text-emerald-700">2,200L saved</div>
            <div className="text-sm text-emerald-700">= Water for Amina's family for 15 days</div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate("final-thanks")}
          className="h-12 rounded-xl text-white font-medium"
          style={{ background: "linear-gradient(135deg, var(--nature-green) 0%, var(--eco-accent) 100%)" }}
        >
          Done
        </button>
        <button className="h-12 rounded-xl border border-gray-300 text-gray-700 font-medium flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
}
