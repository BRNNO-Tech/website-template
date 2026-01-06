
import React from 'react';
import { ShieldCheck, Map, Users, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase">
              The Story
            </div>
            <h1 className="text-5xl font-bold font-lexend text-slate-900 leading-tight">
              Driven by Perfection, <br />
              <span className="text-blue-600">Defined by Care.</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              GlossMobile started in 2018 with a simple goal: provide the most convenient, high-quality automotive detailing experience in Southern California. We realized that car enthusiasts and busy professionals alike were tired of spending hours at detailing shops.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              We decided to bring the shop to you. By investing in custom-built mobile units equipped with high-pressure steam, filtered water systems, and the industry's finest chemicals, we deliver "garage-quality" results anywhere you are.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <p className="text-4xl font-bold text-slate-900">5,000+</p>
                <p className="text-slate-500 text-sm font-medium">Cars Detailed</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-slate-900">100%</p>
                <p className="text-slate-500 text-sm font-medium">Customer Sat</p>
              </div>
            </div>
          </div>
          <div className="relative">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600 rounded-3xl -z-10 opacity-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&q=80&w=1000" 
               alt="Team detailing a car" 
               className="rounded-[3rem] shadow-2xl w-full object-cover aspect-[4/5]"
             />
             <div className="absolute -bottom-8 -right-8 bg-slate-900 text-white p-10 rounded-[2rem] shadow-xl max-w-xs">
                <p className="text-lg italic mb-4">"We treat every car like it's a concourse entry. The details are everything."</p>
                <p className="font-bold text-blue-400">— Marcus V., Founder</p>
             </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl font-bold font-lexend mb-6">What Makes Us Different</h2>
            <p className="text-slate-600">We aren't just another mobile car wash. We are professional detailers dedicated to the craft.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <ShieldCheck />, title: 'Fully Insured', text: 'Peace of mind with complete liability coverage.' },
              { icon: <Map />, title: 'Mobile Units', text: 'On-board water and power. We need nothing from you.' },
              { icon: <Users />, title: 'Trained Pros', text: 'Certified detailers with years of paint correction experience.' },
              { icon: <Award />, title: 'Premium Gear', text: 'Rupes, Gtechniq, and Koch Chemie authorized users.' }
            ].map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 text-center space-y-4 hover:translate-y-[-4px] transition-transform">
                <div className="bg-blue-600/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
                  {React.cloneElement(v.icon as React.ReactElement, { size: 32 })}
                </div>
                <h4 className="text-xl font-bold font-lexend">{v.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-bold font-lexend">Where We Serve</h2>
            <p className="text-lg text-slate-600">Our mobile units cover a wide radius across the greater Los Angeles metropolitan area. If you're within 25 miles of Santa Monica, you're in our primary zone!</p>
            <div className="space-y-4">
              {[
                'Santa Monica & Venice',
                'Beverly Hills & West Hollywood',
                'Culver City & Marina Del Rey',
                'Pasadena & Glendale',
                'Orange County (Select Days)'
              ].map((area, i) => (
                <div key={i} className="flex items-center space-x-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>{area}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400 italic font-medium">* Out-of-zone travel fees may apply to some locations.</p>
          </div>
          <div className="flex-1 w-full h-[400px] bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-inner flex items-center justify-center">
            {/* Simple placeholder for a map or service area graphic */}
            <div className="text-slate-400 text-center space-y-4">
               <Map size={64} className="mx-auto" />
               <p className="font-bold font-lexend uppercase tracking-widest text-xs">Interactive Service Map Coming Soon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
