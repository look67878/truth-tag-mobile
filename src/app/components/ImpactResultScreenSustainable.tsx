import { ArrowLeft, CheckCircle2, Droplet, Leaf } from "lucide-react";
import { useEffect, useState } from "react";

interface ImpactResultScreenSustainableProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

export function ImpactResultScreenSustainable({ onNavigate, onBack }: ImpactResultScreenSustainableProps) {
  const [fillLevel, setFillLevel] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFillLevel(22);
    }, 220);

    return () => window.clearTimeout(timer);
  }, []);

  const liquidY = 220 - fillLevel * 2.2;

  return (
    <div className="h-screen bg-gradient-to-b from-cyan-50 via-white to-emerald-50 flex flex-col overflow-hidden">
      <div className="flex-shrink-0 px-6 pt-12 pb-6 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-emerald-100 flex items-center justify-center shadow-sm">
          <ArrowLeft className="w-5 h-5" style={{ color: "var(--ocean-blue)" }} />
        </button>
        <h2 style={{ color: "var(--ocean-blue)" }}>Impact Result</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}>
        <div className="px-6 mb-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-semibold" style={{ color: "var(--ocean-blue)" }}>
                  Organic Cotton T-Shirt
                </h3>
                <p className="text-gray-500">Brand: Patagonia</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">Low Water Use</div>
            </div>

            <div className="text-center mb-5">
              <p className="text-sm text-gray-500">Production footprint</p>
            </div>

            <div className="relative w-[260px] h-[260px] mx-auto mb-6">
              <svg className="w-full h-full" viewBox="0 0 220 220" role="img" aria-label="Animated low water footprint">
                <defs>
                  <clipPath id="sustainableCircleClip">
                    <circle cx="110" cy="110" r="94" />
                  </clipPath>
                  <linearGradient id="sustainableLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>

                <circle cx="110" cy="110" r="100" fill="none" stroke="#67e8f9" strokeWidth="2" strokeDasharray="6 6" opacity="0.8" />
                <circle cx="110" cy="110" r="94" fill="#ecfeff" stroke="#99f6e4" strokeWidth="2" />

                <g clipPath="url(#sustainableCircleClip)">
                  <rect
                    x="0"
                    y={liquidY}
                    width="220"
                    height="220"
                    fill="url(#sustainableLiquid)"
                    style={{ transition: "y 1.25s cubic-bezier(0.2, 0.9, 0.2, 1)" }}
                  />
                  <path
                    d={`M 0 ${liquidY} Q 28 ${liquidY - 4} 56 ${liquidY} T 112 ${liquidY} T 168 ${liquidY} T 224 ${liquidY} V 220 H 0 Z`}
                    fill="#06b6d4"
                    opacity="0.28"
                    style={{ transition: "all 1.25s cubic-bezier(0.2, 0.9, 0.2, 1)" }}
                  >
                    <animate
                      attributeName="d"
                      dur="3.6s"
                      repeatCount="indefinite"
                      values={`
                        M 0 ${liquidY} Q 28 ${liquidY - 4} 56 ${liquidY} T 112 ${liquidY} T 168 ${liquidY} T 224 ${liquidY} V 220 H 0 Z;
                        M 0 ${liquidY} Q 28 ${liquidY + 3} 56 ${liquidY} T 112 ${liquidY} T 168 ${liquidY} T 224 ${liquidY} V 220 H 0 Z;
                        M 0 ${liquidY} Q 28 ${liquidY - 4} 56 ${liquidY} T 112 ${liquidY} T 168 ${liquidY} T 224 ${liquidY} V 220 H 0 Z
                      `}
                    />
                  </path>
                </g>

                <text x="110" y="110" textAnchor="middle" fontSize="44" fontWeight="700" fill="#0284c7">
                  500
                </text>
                <text x="110" y="132" textAnchor="middle" fontSize="15" fill="#0284c7" fontWeight="600">
                  liters
                </text>
                <text x="110" y="152" textAnchor="middle" fontSize="12" fill="#0369a1">
                  water footprint
                </text>
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-2xl bg-cyan-50 border border-cyan-200 p-4">
                <div className="flex items-center gap-2 text-cyan-700 text-sm mb-1">
                  <Droplet className="w-4 h-4" />
                  Water Saved
                </div>
                <div className="text-2xl font-bold text-cyan-700">2,200L</div>
                <div className="text-xs text-cyan-700/80">vs conventional cotton</div>
              </div>

              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
                <div className="flex items-center gap-2 text-emerald-700 text-sm mb-1">
                  <Leaf className="w-4 h-4" />
                  Carbon
                </div>
                <div className="text-2xl font-bold text-emerald-700">0.8kg</div>
                <div className="text-xs text-emerald-700/80">CO2e emissions</div>
              </div>
            </div>
            <div className="px-6 pb-8">
          <button
            onClick={() => onNavigate("gratitude-low")}
            className="w-full h-14 rounded-2xl text-white font-medium transition-transform active:scale-95"
            style={{ background: "linear-gradient(135deg, var(--nature-green) 0%, var(--eco-accent) 100%)" }}
          >
            A thank-you letter from Bangladesh
          </button>
        </div>

            <div className="space-y-1 text-gray-700 mb-5 text-sm">
              <div>Equivalent to about 7 bathtubs of water</div>
              <div>Equivalent to around 3 showers</div>
              <div>About 82% lower than a typical alternative</div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
              <p className="text-sm text-emerald-800">Great choice. This item has a low, sustainable water footprint.</p>
            </div>
          </div>
        </div>

        

        <div className="h-20" />
      </div>
    </div>
  );
}
