import { ArrowLeft, MapPin, Calendar, Package, AlertCircle, CheckCircle2 } from "lucide-react";

interface ProductDetailsScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

export function ProductDetailsScreen({ onNavigate, onBack }: ProductDetailsScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" style={{ color: 'var(--ocean-blue)' }} />
        </button>
        <h2 style={{ color: 'var(--ocean-blue)' }}>Product Details</h2>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Eco Score Badge - Large */}
      <div className="px-6 mb-8">
        <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-8 text-white shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-white/80 mb-1">Eco Score</div>
              <div className="text-6xl font-bold">47</div>
            </div>
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '47%' }} />
            </div>
            <span className="text-sm text-white/80">Below Average</span>
          </div>
        </div>
      </div>

      {/* Clothing Composition */}
      <div className="px-6 mb-6">
        <h3 className="mb-4" style={{ color: 'var(--ocean-blue)' }}>Material Composition</h3>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-4">
            {[
              { material: 'Conventional Cotton', percentage: 70, sustainable: false },
              { material: 'Polyester (Virgin)', percentage: 25, sustainable: false },
              { material: 'Elastane', percentage: 5, sustainable: false }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {item.sustainable ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                    )}
                    <span className="text-gray-700">{item.material}</span>
                  </div>
                  <span className="font-medium" style={{ color: 'var(--ocean-blue)' }}>
                    {item.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.sustainable ? 'var(--nature-green)' : '#f97316'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-orange-900 mb-1">Non-Organic Materials</div>
                <div className="text-sm text-orange-700">
                  Contains pesticide-intensive conventional cotton and non-recycled synthetic fibers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manufacturing Info */}
      <div className="px-6 mb-6">
        <h3 className="mb-4" style={{ color: 'var(--ocean-blue)' }}>Manufacturing</h3>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="text-gray-500 text-sm">Production Location</div>
              <div className="font-medium" style={{ color: 'var(--ocean-blue)' }}>
                Bangladesh
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-500" />
            </div>
            <div className="flex-1">
              <div className="text-gray-500 text-sm">Manufacturing Date</div>
              <div className="font-medium" style={{ color: 'var(--ocean-blue)' }}>
                March 2024
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <Package className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <div className="text-gray-500 text-sm">Supply Chain</div>
              <div className="font-medium" style={{ color: 'var(--ocean-blue)' }}>
                4,200 km traveled
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="px-6 mb-8">
        <h3 className="mb-4" style={{ color: 'var(--ocean-blue)' }}>Certifications</h3>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-center py-8">
            <div className="text-center text-gray-400">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No eco-certifications found</p>
              <p className="text-sm mt-1">This product lacks verified sustainability standards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-8">
        <button
          onClick={() => onNavigate('alternatives')}
          className="w-full h-14 rounded-2xl text-white font-medium transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, var(--nature-green) 0%, var(--eco-accent) 100%)' }}
        >
          Find Better Alternatives
        </button>
      </div>
    </div>
  );
}
