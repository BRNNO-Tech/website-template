
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PACKAGES } from '../constants';
import { Calendar, Car, User, Phone, Mail, MessageSquare, CheckCircle2, Loader2, Wand2, Sparkles, X, ChevronRight } from 'lucide-react';
import { getPackageRecommendation } from '../services/geminiService';

const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAiModal, setShowAiModal] = useState(true);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [carConditionInput, setCarConditionInput] = useState('');
  const [aiResult, setAiResult] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    carInfo: '',
    serviceId: searchParams.get('package') || 'full-showroom',
    date: '',
    message: ''
  });

  useEffect(() => {
    const pkg = searchParams.get('package');
    if (pkg) {
      setFormData(prev => ({ ...prev, serviceId: pkg }));
      // If a package is already selected via URL, we can skip the AI modal if we want, 
      // but the prompt asks to add it before the form. Let's keep it for personalization.
    }
  }, [searchParams]);

  const handleAiConsult = async () => {
    if (!carConditionInput.trim()) {
      setShowAiModal(false);
      return;
    }

    setAiAnalyzing(true);
    try {
      const result = await getPackageRecommendation(carConditionInput);
      if (result) {
        setAiResult(result);
        // Find matching package ID
        const matchedPkg = PACKAGES.find(p => p.name.toLowerCase().includes(result.recommendedPackage.toLowerCase()));
        setFormData(prev => ({
          ...prev,
          serviceId: matchedPkg?.id || prev.serviceId,
          message: `AI Recommendation: ${result.recommendedPackage}\nSuggested Add-ons: ${result.suggestedAddons.join(', ')}\n\nUser Input: ${carConditionInput}`
        }));
      }
    } catch (error) {
      console.error("AI Consultation failed", error);
    } finally {
      setAiAnalyzing(false);
      setShowAiModal(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-xl w-full bg-white rounded-[3rem] p-12 shadow-2xl text-center space-y-8 border border-green-100">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-4xl font-bold font-lexend text-slate-900">Booking Received!</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Thanks, <span className="font-bold text-slate-900">{formData.customerName}</span>! We've received your request for the <span className="font-bold text-blue-600">{PACKAGES.find(p => p.id === formData.serviceId)?.name}</span>. 
          </p>
          <p className="text-slate-500">
            A detailing specialist will contact you shortly at <strong>{formData.phone}</strong> to confirm the exact time and location.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* AI Consultation Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAiModal(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-blue-600 p-8 text-white relative">
              <button 
                onClick={() => setShowAiModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                  <Wand2 size={32} />
                </div>
                <h2 className="text-3xl font-bold font-lexend">Precision Estimate</h2>
              </div>
              <p className="text-blue-100 leading-relaxed">
                Tell us a bit about your vehicle's current state. Our AI will analyze your needs and suggest the perfect treatment.
              </p>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 flex items-center">
                  <MessageSquare size={16} className="mr-2 text-blue-600" /> 
                  Condition & Specific Concerns
                </label>
                <textarea 
                  autoFocus
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all h-40 resize-none text-slate-700"
                  placeholder="Ex: I have coffee stains on the passenger seat and my headlights are getting a bit foggy..."
                  value={carConditionInput}
                  onChange={(e) => setCarConditionInput(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button 
                  onClick={handleAiConsult}
                  disabled={aiAnalyzing}
                  className="flex-grow bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center disabled:opacity-50"
                >
                  {aiAnalyzing ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Analyzing Vehicle...
                    </>
                  ) : (
                    <>
                      Analyze My Car
                      <ChevronRight size={20} className="ml-2" />
                    </>
                  )}
                </button>
                <button 
                  onClick={() => setShowAiModal(false)}
                  className="px-8 py-4 text-slate-500 font-bold hover:text-slate-700 transition-colors"
                >
                  Skip for now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="py-20 bg-slate-900 text-white text-center">
        <h1 className="text-5xl font-bold font-lexend">Reserve Your Spot</h1>
        <p className="mt-4 text-slate-300">Fast, easy, and professional detailing scheduling.</p>
      </header>

      <div className="max-w-7xl mx-auto px-4 -mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Booking Form */}
        <div className="lg:col-span-2 space-y-8">
          {aiResult && (
            <div className="bg-blue-600 text-white rounded-[2rem] p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 animate-in slide-in-from-left duration-500">
              <div className="bg-white/20 p-4 rounded-2xl">
                <Sparkles size={40} />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl font-bold font-lexend mb-1">AI Smart Suggestion: {aiResult.recommendedPackage}</h3>
                <p className="text-blue-100 text-sm opacity-90">{aiResult.reasoning}</p>
                {aiResult.suggestedAddons.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                    {aiResult.suggestedAddons.map((addon: string, i: number) => (
                      <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        + {addon}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={() => setAiResult(null)}
                className="text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center">
                  <User size={16} className="mr-2 text-blue-600" /> Full Name
                </label>
                <input 
                  required
                  type="text" 
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                  placeholder="John Doe"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center">
                  <Mail size={16} className="mr-2 text-blue-600" /> Email Address
                </label>
                <input 
                  required
                  type="email" 
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center">
                  <Phone size={16} className="mr-2 text-blue-600" /> Phone Number
                </label>
                <input 
                  required
                  type="tel" 
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                  placeholder="(555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center">
                  <Calendar size={16} className="mr-2 text-blue-600" /> Preferred Date
                </label>
                <input 
                  required
                  type="date" 
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center">
                <Car size={16} className="mr-2 text-blue-600" /> Vehicle Make & Model
              </label>
              <input 
                required
                type="text" 
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                placeholder="Ex: 2022 Tesla Model 3"
                value={formData.carInfo}
                onChange={(e) => setFormData({...formData, carInfo: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Select Detail Package</label>
              <select 
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all appearance-none bg-white font-bold text-slate-700"
                value={formData.serviceId}
                onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
              >
                {PACKAGES.map(p => (
                  <option key={p.id} value={p.id}>{p.name} - {p.price}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center">
                <MessageSquare size={16} className="mr-2 text-blue-600" /> Special Requests or Vehicle Condition
              </label>
              <textarea 
                rows={4}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                placeholder="Tell us about specific stains, pet hair, or any concerns..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={24} />
                  Processing...
                </>
              ) : 'Confirm Booking Request'}
            </button>
            <p className="text-center text-xs text-slate-400 font-medium italic">
              * Payment is handled on the day of service after your inspection.
            </p>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-xl space-y-6">
            <h3 className="text-2xl font-bold font-lexend">What Happens Next?</h3>
            <ul className="space-y-6">
              {[
                { step: '1', title: 'Request Sent', text: 'We receive your vehicle and timing details.' },
                { step: '2', title: 'Confirmation', text: 'A detailer calls to confirm address and availability.' },
                { step: '3', title: 'Service Day', text: 'We arrive at your location and transform your car.' },
                { step: '4', title: 'Inspection', text: 'You review our work before we finalize.' }
              ].map((s, i) => (
                <li key={i} className="flex space-x-4">
                  <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0">{s.step}</div>
                  <div>
                    <h5 className="font-bold text-sm mb-1">{s.title}</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-lg text-center space-y-4">
             <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
               <Phone size={32} />
             </div>
             <h4 className="font-bold text-lg">Need help booking?</h4>
             <p className="text-slate-500 text-sm">Call us directly to schedule over the phone.</p>
             <p className="text-2xl font-black text-slate-900">(555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
