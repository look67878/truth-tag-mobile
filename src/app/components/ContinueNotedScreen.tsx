import { CheckCircle2 } from "lucide-react";

interface ContinueNotedScreenProps {
  onNavigate: (screen: string) => void;
}

export function ContinueNotedScreen({ onNavigate }: ContinueNotedScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="px-6 pt-14 pb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--ocean-blue)" }}>
            Item Noted
          </h1>
          <p className="text-gray-600 mb-4">This item has been added to your wardrobe tracker.</p>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-4">
            <div className="text-sm text-gray-500">Water footprint</div>
            <div className="text-3xl font-bold text-red-600">2,700L</div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            From Amina: "Thank you for listening to my message. I hope next time you might try a more sustainable
            option. No pressure though."
          </p>

          <p className="text-sm text-gray-600 mt-4">
            Tip: Try scanning before checkout so it is easier to find alternatives.
          </p>
        </div>
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={() => onNavigate("final-thanks")}
          className="w-full h-14 rounded-2xl text-white font-medium"
          style={{ background: "linear-gradient(135deg, var(--ocean-blue) 0%, var(--ocean-blue-light) 100%)" }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
