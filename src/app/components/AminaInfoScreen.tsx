import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import aminaImage from "../../assets/1.png";

interface AminaInfoScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

export function AminaInfoScreen({ onNavigate, onBack }: AminaInfoScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="px-6 pt-12 pb-6 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" style={{ color: "var(--ocean-blue)" }} />
        </button>
        <h2 style={{ color: "var(--ocean-blue)" }}>A little hello from Bangladesh</h2>
        <div className="w-10" />
      </div>

      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-sky-100">
          <div className="h-44 rounded-2xl mb-5 overflow-hidden border border-sky-100 bg-sky-50">
            <ImageWithFallback 
              src={aminaImage} 
              alt="Amina from Bangladesh" 
              className="w-full h-full object-cover" 
            />
          </div>

          <p className="text-sm text-gray-500 mb-2">From Amina (age 8):</p>
          <p className="text-gray-700 leading-relaxed">
  "Hi! I'm Amina, I'm 8. My mum makes clothes like this one. She works 12 hours a day, 
  and the factory uses so much water that our neighborhood taps run dry by noon. 
  I dream of becoming a teacher one day, but first I need to make sure there's enough water 
  for my little brother to drink. Your choice today could help families like mine. 
  Thank you for listening. 💙"
</p>

          <p className="text-sm text-gray-500 mt-4">Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-3">
        <button
          onClick={() => onNavigate("alternatives")}
          className="w-full h-14 rounded-2xl text-white font-medium"
          style={{ background: "linear-gradient(135deg, var(--nature-green) 0%, var(--eco-accent) 100%)" }}
        >
          See if there are other options
        </button>
        <button
          onClick={() => onNavigate("continue-noted")}
          className="w-full h-14 rounded-2xl border border-gray-300 text-gray-700 font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
