
import React, { useState } from 'react';
import { GALLERY } from '../constants';
import { Camera, Image as ImageIcon, LayoutGrid } from 'lucide-react';

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const categories = ['All', 'Interior', 'Exterior', 'Paint Correction'];
  
  const filteredGallery = activeTab === 'All' 
    ? GALLERY 
    : GALLERY.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <h1 className="text-5xl font-bold font-lexend text-slate-900">Transformation Gallery</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">The proof is in the polish. Browse through some of our recent transformations and see the level of detail we provide.</p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-8 py-3 rounded-full font-bold transition-all text-sm uppercase tracking-widest ${
                  activeTab === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredGallery.map((item) => (
            <div key={item.id} className="group space-y-6">
              <div className="grid grid-cols-2 gap-2 rounded-[2rem] overflow-hidden shadow-lg border border-slate-200 bg-white p-2">
                <div className="relative overflow-hidden rounded-2xl h-64">
                   <img src={item.before} className="w-full h-full object-cover" alt="Before" />
                   <div className="absolute bottom-4 left-4 bg-red-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">Before</div>
                </div>
                <div className="relative overflow-hidden rounded-2xl h-64">
                   <img src={item.after} className="w-full h-full object-cover" alt="After" />
                   <div className="absolute bottom-4 left-4 bg-green-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">After</div>
                </div>
              </div>
              <div className="px-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">{item.category}</span>
                <h4 className="text-xl font-bold font-lexend text-slate-900">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
        
        {filteredGallery.length === 0 && (
          <div className="py-40 text-center text-slate-400 space-y-4">
             <LayoutGrid size={64} className="mx-auto opacity-20" />
             <p className="text-lg">No photos found in this category. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Instagram CTA */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <Camera size={48} className="mx-auto text-blue-500" />
          <h2 className="text-4xl font-bold font-lexend">See More on Instagram</h2>
          <p className="text-slate-400 text-lg">We post fresh results every single day. Follow us to see our latest work and get a behind-the-scenes look at our process.</p>
          <a href="#" className="inline-flex items-center space-x-3 bg-white text-slate-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-600 hover:text-white transition-all">
             <ImageIcon size={24} />
             <span>Follow @GlossMobile</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
