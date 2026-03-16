import { ArrowLeft, Droplet, Leaf } from "lucide-react";

interface AlternativesScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const alternatives = [
  { name: "Organic Cotton", footprint: "500L", reduction: "82% less", impact: "Low Impact", price: "£15.99" },
  { name: "Recycled Cotton", footprint: "200L", reduction: "93% less", impact: "Very Low Impact", price: "£18.99" },
  { name: "Hemp T-Shirt", footprint: "300L", reduction: "89% less", impact: "Low Impact", price: "£16.99" },
];

export function AlternativesScreen({ onNavigate, onBack }: AlternativesScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-8">
      <div className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-gray-100">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" style={{ color: "var(--ocean-blue)" }} />
        </button>
        <h2 style={{ color: "var(--ocean-blue)" }}>Better Options Available</h2>
        <div className="w-10" />
      </div>

      <div className="px-6 py-4">
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100 text-sm text-gray-700">
          Here are similar items with lower water footprints.
        </div>
      </div>

      <div className="px-6 space-y-4">
        {alternatives.map((item, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="font-semibold" style={{ color: "var(--ocean-blue)" }}>
                  {item.name}
                </h3>
                <div className="text-sm text-gray-600 mt-1">{item.footprint} ({item.reduction})</div>
                <div className="text-sm font-medium text-emerald-700">{item.impact}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold" style={{ color: "var(--ocean-blue)" }}>
                  {item.price}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onNavigate("product-details")}
                className="h-11 rounded-xl border border-gray-300 text-gray-700 font-medium"
              >
                View Details
              </button>
              <button
                onClick={() => onNavigate("gratitude-alternative")}
                className="h-11 rounded-xl text-white font-medium"
                style={{ background: "linear-gradient(135deg, var(--nature-green) 0%, var(--eco-accent) 100%)" }}
              >
                Choose This
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate("alternatives")}
          className="h-11 rounded-xl border border-gray-300 text-gray-700 font-medium"
        >
          Show More
        </button>
        <button onClick={onBack} className="h-11 rounded-xl border border-gray-300 text-gray-700 font-medium">
          Go Back
        </button>
      </div>
    </div>
  );
}
