import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Dr. Budiman Sudjatmiko',
      role: 'Pakar Budaya Jawa',
      avatar: '👨‍🏫',
      text: 'Reog Ponorogo adalah salah satu warisan budaya terbesar Indonesia. Setiap pertunjukan menyimpan filosofi mendalam tentang kepahlawanan, kesetiaan, dan semangat juang yang patut kita lestarikan untuk generasi mendatang.',
      rating: 5
    },
    {
      name: 'Sarah Mitchell',
      role: 'Travel Blogger, UK',
      avatar: '👩‍💼',
      text: 'Absolutely mesmerizing! The Reog Ponorogo performance was the highlight of my trip to Indonesia. The massive peacock mask and the energy of the dancers left me speechless. A must-see cultural experience!',
      rating: 5
    },
    {
      name: 'Budi Santoso',
      role: 'Ketua Paguyuban Reog Jakarta',
      avatar: '👨‍🎨',
      text: 'Sebagai pelaku seni Reog, saya sangat bangga melihat semakin banyak generasi muda yang tertarik mempelajari dan melestarikan kesenian ini. Reog adalah identitas kami yang tak ternilai harganya.',
      rating: 5
    },
    {
      name: 'Maria Santos',
      role: 'Cultural Researcher, Philippines',
      avatar: '👩‍🔬',
      text: 'The complexity and symbolism in Reog Ponorogo are fascinating. Each character represents different values and the performance tells a story that transcends language barriers. Truly a masterpiece of Southeast Asian culture.',
      rating: 5
    },
    {
      name: 'Ahmad Hidayat',
      role: 'Wisatawan dari Surabaya',
      avatar: '🧑‍💼',
      text: 'Festival Reog Ponorogo adalah pengalaman yang luar biasa! Selain pertunjukan yang memukau, kota Ponorogo juga menawarkan banyak tempat wisata indah dan kuliner yang enak. Pasti akan kembali lagi!',
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-amber-500 text-red-950 px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4 shadow-lg font-semibold text-xs sm:text-sm">
          <Quote size={16} className="sm:size-5" />
          <span>Testimoni</span>
        </div>
        <h2 className="text-white mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">Apa Kata Mereka?</h2>
        <p className="text-amber-50/80 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base px-4">
          Dengarkan pengalaman dan kesan dari para pengunjung, budayawan, dan pecinta seni dari berbagai belahan dunia
        </p>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-400 mx-auto mt-4 sm:mt-6 rounded-full"></div>
      </div>

      {/* Main Testimonial Carousel */}
      <div className="relative mb-8 sm:mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden">
            {/* Quote decoration */}
            <Quote size={60} className="sm:size-20 absolute top-4 left-4 text-amber-500/20" />
            
            <div className="relative z-10">
              {/* Avatar and info */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl flex-shrink-0">
                  <span className="text-2xl sm:text-4xl">{testimonials[currentIndex].avatar}</span>
                </div>
                <div className="text-left min-w-0">
                  <h3 className="text-white mb-1 text-sm sm:text-base font-semibold">{testimonials[currentIndex].name}</h3>
                  <p className="text-amber-400 text-xs sm:text-sm">{testimonials[currentIndex].role}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 sm:mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={16} className="sm:size-5 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 italic">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Navigation dots */}
              <div className="flex gap-2 justify-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-6 sm:w-8 bg-amber-500' 
                        : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevTestimonial}
          className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-xl hover:bg-amber-400 transition-all hover:scale-110 text-red-950"
        >
          <ChevronLeft size={20} className="sm:size-6" />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-xl hover:bg-amber-400 transition-all hover:scale-110 text-red-950"
        >
          <ChevronRight size={20} className="sm:size-6" />
        </button>
      </div>

      {/* Small testimonial cards */}
      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
        {testimonials
          .filter((_, index) => index !== currentIndex)
          .slice(0, 3)
          .map((testimonial, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(testimonials.indexOf(testimonial))}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/50 transition-all cursor-pointer hover:bg-white/10 group"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-amber-500/80 to-amber-600/80 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl sm:text-2xl">{testimonial.avatar}</span>
                </div>
                <div className="text-left min-w-0">
                  <h4 className="text-white group-hover:text-amber-400 transition-colors text-xs sm:text-sm font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-white/60 text-xs">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-white/70 text-xs sm:text-sm line-clamp-3 italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
