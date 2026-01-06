
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, MapPin, CheckCircle, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { PACKAGES, TESTIMONIALS } from '../constants';

const Home: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-50"
            alt="Shiny car detailing"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-600/30 backdrop-blur-md px-4 py-2 rounded-full border border-blue-400/30">
              <Star className="text-yellow-400 fill-yellow-400" size={16} />
              <span className="text-sm font-semibold tracking-wide uppercase">Top-Rated Mobile Detailing</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-lexend leading-tight">
              A Showroom Shine, <span className="text-blue-500">Delivered</span> to Your Door.
            </h1>
            <p className="text-xl text-slate-200 leading-relaxed">
              Premium automotive detailing in the Los Angeles area. We bring the equipment, the expertise, and the gloss to you.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/booking" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center group">
                Book My Detail
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center">
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Summary */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm">The Gloss Experience</h2>
            <h3 className="text-4xl font-bold font-lexend text-slate-900">Why Choose GlossMobile?</h3>
            <p className="text-lg text-slate-600">We prioritize convenience without compromising on the meticulous quality your vehicle deserves.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Clock className="text-blue-600" />, title: 'Time-Saving', text: 'No more waiting at the shop. We come to your home or office while you go about your day.' },
              { icon: <Shield className="text-blue-600" />, title: 'Pro Grade Care', text: 'We use premium, ph-balanced chemicals and ceramic-infused sealants for long-lasting protection.' },
              { icon: <MapPin className="text-blue-600" />, title: 'Local Expertise', text: 'Proudly serving Los Angeles, Santa Monica, and Beverly Hills with dedicated mobile units.' }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow group">
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {React.cloneElement(feature.icon as React.ReactElement, { size: 28 })}
                </div>
                <h4 className="text-xl font-bold font-lexend mb-4 text-slate-900">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <Quote size={400} className="text-blue-500 absolute -top-20 -left-20 rotate-12" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-blue-500 font-bold tracking-widest uppercase text-sm">Customer Stories</h2>
            <h3 className="text-4xl font-bold font-lexend text-white">What Our Clients Say</h3>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {TESTIMONIALS.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-slate-800/50 backdrop-blur-md p-10 md:p-16 rounded-[3rem] border border-slate-700/50 shadow-2xl relative">
                      <Quote className="text-blue-600 mb-8 opacity-40" size={48} />
                      <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium italic mb-10">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center space-x-6">
                        <div className="relative">
                          <img 
                            src={testimonial.photo} 
                            alt={testimonial.name} 
                            className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-600/30"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-blue-600 p-1.5 rounded-full border-2 border-slate-800">
                             <CheckCircle size={12} className="text-white" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white font-lexend">{testimonial.name}</h4>
                          <p className="text-blue-400 text-sm font-semibold">{testimonial.role}</p>
                          <div className="flex mt-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center mt-12 space-x-4">
              <button 
                onClick={prevTestimonial}
                className="p-4 rounded-full bg-slate-800 text-white hover:bg-blue-600 transition-all border border-slate-700 shadow-xl"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-4 rounded-full bg-slate-800 text-white hover:bg-blue-600 transition-all border border-slate-700 shadow-xl"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${activeTestimonial === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-700'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services List */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl space-y-4">
              <h2 className="text-4xl font-bold font-lexend text-slate-900">Our Most Popular Packages</h2>
              <p className="text-slate-600">Choose a plan that fits your car's needs and your budget.</p>
            </div>
            <Link to="/services" className="text-blue-600 font-bold flex items-center hover:underline">
              View All Services <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex-grow space-y-6">
                  <div className="flex justify-between items-start">
                    <h4 className="text-2xl font-bold font-lexend text-slate-900">{pkg.name}</h4>
                    <span className="text-2xl font-black text-blue-600">{pkg.price}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{pkg.description}</p>
                  <ul className="space-y-3">
                    {pkg.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center text-sm text-slate-700">
                        <CheckCircle size={14} className="text-green-500 mr-2 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 pt-0 mt-auto">
                  <Link 
                    to={`/booking?package=${pkg.id}`} 
                    className="block text-center bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors"
                  >
                    Select Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500 rounded-full opacity-20"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-blue-400 rounded-full opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold font-lexend text-white">Ready for a spotless ride?</h2>
          <p className="text-xl text-blue-100">Booking takes less than 2 minutes. We'll handle the rest.</p>
          <Link to="/booking" className="inline-block bg-white text-blue-600 px-12 py-5 rounded-full font-bold text-xl hover:bg-slate-50 transition-all shadow-xl shadow-blue-900/30">
            Book Your Appointment Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
