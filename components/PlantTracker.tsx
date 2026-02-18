
import React, { useState, useEffect } from 'react';
import { MapPin, Camera, CheckCircle2, Info, Loader2, Sparkles } from 'lucide-react';
import { getPlantingRecommendations } from '../services/geminiService';

interface PlantTrackerProps {
  onVerified: (credits: number) => void;
}

const PlantTracker: React.FC<PlantTrackerProps> = ({ onVerified }) => {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<any>(null);

  const fetchRecommendations = async () => {
    if (!location) return;
    setLoading(true);
    const recs = await getPlantingRecommendations(location);
    setRecommendations(recs);
    setLoading(false);
  };

  const handlePlantingComplete = () => {
    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      onVerified(selectedPlant?.creditsValue || 200);
      setStep(4);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <MapPin size={120} />
        </div>

        {step === 1 && (
          <div className="space-y-4 relative z-10">
            <h2 className="text-2xl font-bold text-slate-800">Where are you planting?</h2>
            <p className="text-slate-500 text-sm">We'll give you double credits for planting in areas with low tree density.</p>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city, park, or use GPS..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm font-medium"
              />
            </div>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
              <Info className="text-blue-500 flex-shrink-0" size={20} />
              <p className="text-xs text-blue-700 leading-relaxed">
                Tip: Planting native species in urban areas helps restore local biodiversity and earns bonus "Ecosystem Saver" badges.
              </p>
            </div>
            <button 
              disabled={!location}
              onClick={() => { fetchRecommendations(); setStep(2); }}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${
                location ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Next Step
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 relative z-10">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="text-emerald-500" size={24} />
              Rooty's Recommendations
            </h2>
            <p className="text-slate-500 text-sm">AI-picked plants perfect for <span className="font-bold text-slate-700">{location}</span></p>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <Loader2 className="text-emerald-600 animate-spin" size={40} />
                <p className="text-sm font-medium text-slate-400">Analyzing soil and climate...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recommendations.map((rec, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedPlant(rec)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedPlant?.name === rec.name 
                        ? 'border-emerald-500 bg-emerald-50 shadow-inner' 
                        : 'border-slate-100 hover:border-emerald-200 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-800">{rec.name}</h4>
                      <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-bold">
                        +{rec.creditsValue} Credits
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{rec.reason}</p>
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-4 border border-slate-200 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50">Back</button>
              <button 
                disabled={!selectedPlant}
                onClick={() => setStep(3)} 
                className={`flex-[2] py-4 rounded-xl font-bold text-sm transition-all ${
                  selectedPlant ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Log Planting
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center py-4 relative z-10">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera size={40} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Prove your impact!</h2>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">Take a photo of your <span className="font-bold text-emerald-600">{selectedPlant?.name}</span> in its new home to verify and claim your credits.</p>
            
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer group">
              <p className="text-slate-400 group-hover:text-emerald-600 font-medium">Click to upload photo</p>
            </div>

            <button 
              onClick={handlePlantingComplete}
              disabled={loading}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'Finish & Verify'}
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-200">
              <CheckCircle2 size={48} className="text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-800">Amazing Job!</h2>
              <p className="text-slate-500">Your planting has been submitted for verification.</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl inline-block border border-emerald-100">
              <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-1">You Earned</p>
              <div className="text-4xl font-black text-emerald-700">+{selectedPlant?.creditsValue || 200}</div>
              <p className="text-emerald-600 text-xs font-semibold mt-1">Rooted Credits</p>
            </div>
            <div className="pt-4">
              <button 
                onClick={() => { setStep(1); setLocation(''); setSelectedPlant(null); }} 
                className="text-emerald-600 font-bold hover:underline"
              >
                Plant another one?
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantTracker;
