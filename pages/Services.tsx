
import React, { useState } from 'react';
import { PACKAGES } from '../constants';
import { CheckCircle, Info, Sparkles, Wand2, Loader2, PlusCircle } from 'lucide-react';
import { getPackageRecommendation } from '../services/geminiService';

const Services: React.FC = () => {
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleRecommend = async () => {
    if (!desc.trim()) return;
    setLoading(true);
    const result = await getPackageRecommendation(desc);
    setRecommendation(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Detailing" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <h1 className="text-5xl font-bold font-lexend">Our Packages</h1>
          <p className="text-xl text-slate-300">Choose from our precision-engineered detailing options.</p>
        </div>
      </header>

      {/* AI Assistant Section */}
      <section className="py-12 -mt-10 relative z-20 max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-blue-100 flex flex-col md:flex-row gap-8 items-center">
          <div className="bg-blue-600/10 p-4 rounded-full text-blue-600 shrink-0">
            <Wand2 size={40} />
          </div>
          <div className="flex-grow space-y-4 w-full">
            <h4 className="text-xl font-bold font-lexend">Not sure what you need?</h4>
            <p className="text-slate-600 text-sm">Describe your car's state and our AI will suggest a package + add-ons.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="text" 
                placeholder="Ex: Stained seats and cloudy headlights..."
                className="flex-grow px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleRecommend()}
              />
              <button 
                onClick={handleRecommend}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center whitespace-nowrap"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Get Advice'}
              </button>
            </div>
            {recommendation && (
              <div className="mt-6 p-6 bg-blue-50 rounded-[2rem] border border-blue-100 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center space-x-2 mb-4 text-blue-800 font-black text-lg">
                  <Sparkles size={24} className="text-blue-600" />
                  <span>{recommendation.recommendedPackage}</span>
                </div>
                
                <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                  <span className="font-bold">Why?</span> {recommendation.reasoning}
                </p>

                {recommendation.suggestedAddons && recommendation.suggestedAddons.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Suggested Add-ons</p>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.suggestedAddons.map((addon: string, i: number) => (
                        <span key={i} className="bg-white border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold text-blue-700 flex items-center">
                          <PlusCircle size={10} className="mr-1" /> {addon}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-blue-200/50">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Est. Time: {recommendation.estimatedTime}</p>
                  <a 
                    href={`#/booking?package=${PACKAGES.find(p => p.name.includes(recommendation.recommendedPackage))?.id || ''}`}
                    className="text-blue-600 text-sm font-bold hover:underline"
                  >
                    Book This Plan →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Package Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Info size={120} />
              </div>
              <div className="space-y-6 flex-grow">
                <div>
                  <h3 className="text-3xl font-bold font-lexend text-slate-900 mb-2">{pkg.name}</h3>
                  <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Starts at</p>
                  <p className="text-5xl font-black text-blue-600 mb-4">{pkg.price}</p>
                </div>
                <p className="text-slate-600 leading-relaxed">{pkg.description}</p>
                <div className="h-px bg-slate-100"></div>
                <ul className="space-y-4">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start text-slate-700">
                      <CheckCircle size={18} className="text-blue-500 mr-3 mt-1 shrink-0" />
                      <span className="text-sm font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12">
                <a href={`#/booking?package=${pkg.id}`} className="block w-full text-center bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200">
                  Select This Package
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-lexend mb-4">Powerful Add-ons</h2>
            <p className="text-slate-600">Upgrade your experience with targeted restorations.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Headlight Restoration', price: '+$50', desc: 'Clear up foggy or yellowed lenses.' },
              { name: 'Ceramic Coating', price: '+$150+', desc: 'Unmatched gloss and hydrophobic protection.' },
              { name: 'Engine Bay Detail', price: '+$45', desc: 'Remove grease and grime from under the hood.' },
              { name: 'Pet Hair Removal', price: '+$35+', desc: 'Deep extraction of stubborn pet fur.' }
            ].map((addon, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center space-y-4">
                <h5 className="font-bold text-lg text-slate-900">{addon.name}</h5>
                <p className="text-blue-600 font-bold text-2xl">{addon.price}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{addon.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
