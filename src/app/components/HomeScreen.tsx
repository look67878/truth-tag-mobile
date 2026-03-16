import { Scan, Droplet, Leaf, TrendingDown } from "lucide-react";

type ScanResultTarget = "impact-result" | "impact-result-sustainable";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onStartScan: (target: ScanResultTarget) => void;
}

export function HomeScreen({ onNavigate, onStartScan }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 pt-12 pb-8">
        <h1 className="text-4xl font-bold" style={{ color: "var(--ocean-blue)" }}>
          HydroThread
        </h1>
        <p className="mt-2 text-gray-600">Scan. Learn. Choose Better.</p>
      </div>

      <div className="px-6 mb-8">
        <div
          className="rounded-3xl p-6"
          style={{ background: "linear-gradient(135deg, var(--ocean-blue) 0%, var(--ocean-blue-light) 100%)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/80">Your Impact</span>
            <Droplet className="w-5 h-5 text-white/60" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-5xl font-bold text-white">2,200</span>
            <span className="text-white/80 text-xl">L</span>
          </div>
          <p className="text-white/80">Total Water Saved</p>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white text-xl font-bold">1</div>
                <div className="text-white/70 text-sm">Low-Impact Choice</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white text-xl font-bold">1</div>
                <div className="text-white/70 text-sm">Items Scanned Today</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mb-8">
        <div
          className="relative w-full h-32 rounded-3xl shadow-lg overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--nature-green) 0%, var(--eco-accent) 100%)" }}
        >
          <button
            onClick={() => onStartScan("impact-result")}
            className="absolute inset-y-0 left-0 w-1/2 transition-colors active:bg-black/10"
            aria-label="扫描高耗水产品"
          />
          <button
            onClick={() => onStartScan("impact-result-sustainable")}
            className="absolute inset-y-0 right-0 w-1/2 transition-colors active:bg-black/10"
            aria-label="扫描低耗水产品"
          />

          <div className="absolute top-4 bottom-4 left-1/2 w-px bg-white/35 pointer-events-none" />

          <div className="absolute inset-0 flex items-center justify-center gap-4 pointer-events-none">
            <Scan className="w-12 h-12 text-white" strokeWidth={2.5} />
            <span className="text-2xl font-bold text-white">Scan Barcode</span>
          </div>

          <div className="absolute bottom-3 left-1/4 -translate-x-1/2 text-white/90 text-xs font-medium pointer-events-none">
            高水足迹
          </div>
          <div className="absolute bottom-3 left-3/4 -translate-x-1/2 text-white/90 text-xs font-medium pointer-events-none">
            低水足迹
          </div>
        </div>
      </div>

      <div className="px-6 pb-8">
        <h3 className="mb-4" style={{ color: "var(--ocean-blue)" }}>
          Recent Scans
        </h3>
        <div className="space-y-3">
          {[
            { name: "Cotton T-Shirt", score: 47, brand: "H&M" },
            { name: "Organic Cotton Tee", score: 89, brand: "Patagonia" },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate("product-details")}
              className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between hover:border-[var(--nature-green)] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Leaf className="w-6 h-6" style={{ color: "var(--nature-green)" }} />
                </div>
                <div className="text-left">
                  <div className="font-medium" style={{ color: "var(--ocean-blue)" }}>
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-500">{item.brand}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold" style={{ color: "var(--nature-green)" }}>
                  {item.score}
                </div>
                <div className="text-xs text-gray-500">Eco Score</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
