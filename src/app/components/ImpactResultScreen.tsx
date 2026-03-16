import { ArrowLeft, Droplet, Flame, Info } from "lucide-react";
import { useEffect, useState } from "react";

interface ImpactResultScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

export function ImpactResultScreen({ onNavigate, onBack }: ImpactResultScreenProps) {
  const [fillLevel, setFillLevel] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFillLevel(88);
    }, 220);

    return () => window.clearTimeout(timer);
  }, []);

  const liquidY = 220 - fillLevel * 2.2;

  return (
    <div className="h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 flex flex-col overflow-hidden">
      <div className="flex-shrink-0 px-6 pt-12 pb-6 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" style={{ color: "var(--ocean-blue)" }} />
        </button>
        <h2 style={{ color: "var(--ocean-blue)" }}>Impact Result</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}>
        <div className="px-6 mb-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-semibold" style={{ color: "var(--ocean-blue)" }}>
                  Cotton T-Shirt
                </h3>
                <p className="text-gray-500">Brand: H&amp;M</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">High Water Use</div>
            </div>

            <div className="text-center mb-5">
              <p className="text-sm text-gray-500">Production footprint</p>
            </div>

            <div className="relative w-[260px] h-[260px] mx-auto mb-6">
              <svg className="w-full h-full" viewBox="0 0 220 220" role="img" aria-label="Animated water footprint">
                <defs>
                  <clipPath id="impactCircleClip">
                    <circle cx="110" cy="110" r="94" />
                  </clipPath>
                  <linearGradient id="impactLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>

                <circle cx="110" cy="110" r="100" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="7 5" opacity="0.8" />
                <circle cx="110" cy="110" r="94" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />

                <g clipPath="url(#impactCircleClip)">
                  <rect
                    x="0"
                    y={liquidY}
                    width="220"
                    height="220"
                    fill="url(#impactLiquid)"
                    style={{ transition: "y 1.25s cubic-bezier(0.2, 0.9, 0.2, 1)" }}
                  />
                  <path
                    d={`M 0 ${liquidY} Q 28 ${liquidY - 10} 56 ${liquidY} T 112 ${liquidY} T 168 ${liquidY} T 224 ${liquidY} V 220 H 0 Z`}
                    fill="#ef4444"
                    opacity="0.38"
                    style={{ transition: "all 1.25s cubic-bezier(0.2, 0.9, 0.2, 1)" }}
                  >
                    <animate
                      attributeName="d"
                      dur="2.2s"
                      repeatCount="indefinite"
                      values={`
                        M 0 ${liquidY} Q 28 ${liquidY - 10} 56 ${liquidY} T 112 ${liquidY} T 168 ${liquidY} T 224 ${liquidY} V 220 H 0 Z;
                        M 0 ${liquidY} Q 28 ${liquidY + 6} 56 ${liquidY} T 112 ${liquidY} T 168 ${liquidY} T 224 ${liquidY} V 220 H 0 Z;
                        M 0 ${liquidY} Q 28 ${liquidY - 10} 56 ${liquidY} T 112 ${liquidY} T 168 ${liquidY} T 224 ${liquidY} V 220 H 0 Z
                      `}
                    />
                  </path>
                </g>

                <text x="110" y="94" textAnchor="middle" fontSize="44" fontWeight="700" fill="#b91c1c">
                  2,700
                </text>
                <text x="110" y="116" textAnchor="middle" fontSize="15" fill="#b91c1c" fontWeight="600">
                  liters
                </text>
                <text x="110" y="136" textAnchor="middle" fontSize="12" fill="#9a3412">
                  water footprint
                </text>
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-2xl bg-orange-50 border border-orange-200 p-4">
                <div className="flex items-center gap-2 text-orange-700 text-sm mb-1">
                  <Flame className="w-4 h-4" />
                  Carbon
                </div>
                <div className="text-2xl font-bold text-orange-700">5.4kg</div>
                <div className="text-xs text-orange-700/80">CO2e emissions</div>
              </div>

              <div className="rounded-2xl bg-sky-50 border border-sky-200 p-4">
                <div className="flex items-center gap-2 text-sky-700 text-sm mb-1">
                  <Droplet className="w-4 h-4" />
                  Benchmark
                </div>
                <div className="text-2xl font-bold text-sky-700">3.2x</div>
                <div className="text-xs text-sky-700/80">vs low-impact items</div>
              </div>
            </div>
            <div className="px-6 pb-8 space-y-3">
          <button
            onClick={() => onNavigate("alternatives")}
            className="w-full h-14 rounded-2xl text-white font-medium transition-transform active:scale-95"
            style={{ background: "linear-gradient(135deg, var(--nature-green) 0%, var(--eco-accent) 100%)" }}
          >
            Explore Lower-Impact Alternatives
          </button>
          {/* 次要 CTA - 绿色边框 */}
<button
  onClick={() => onNavigate("amina-info")}
  className="w-full h-14 rounded-2xl font-medium border-2 transition-transform active:scale-95 bg-white"
  style={{ borderColor: "var(--nature-green)", color: "var(--nature-green)" }}
>
  A letter from Bangladesh
</button>

          <button
            onClick={() => onNavigate("continue-noted")}
            className="w-full h-14 rounded-2xl font-medium text-white transition-transform active:scale-95"
            style={{ background: "linear-gradient(135deg, var(--ocean-blue) 0%, var(--ocean-blue-light) 100%)" }}
          >
            Continue with This Item
          </button>
        </div>

            <div className="space-y-1 text-gray-600 mb-5 text-sm">
              <div>Equivalent to 36 bathtubs of water</div>
              <div>Equivalent to 18 showers</div>
              <div>A UK household's water for about 2 days</div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-200">
  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
  <p className="text-sm text-blue-800">
    This item uses a bit more water than average. If you're curious about lower-impact options, we can show you some alternatives — but it's totally fine to continue with this choice too 😊
  </p>
</div>

          </div>
        </div>

        

        <div className="h-20" />
      </div>
    </div>
  );
}
