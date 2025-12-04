import { Sparkles, ChevronDown, Flame, Crown, Music } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { useTranslations } from '@/utils/translations';

export function Hero() {
  const { locale } = useTranslations();
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides =
    locale === 'en'
      ? [
          {
            title: 'Reog Ponorogo',
            subtitle: 'A Cultural Wonder from East Java',
            description:
              'Witness the world-renowned Reog Ponorogo performance featuring the iconic 50kg Dadak Merak mask.',
            image:
              'https://images.unsplash.com/photo-1698824554771-293b5dcc42db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
          {
            title: 'Cultural Heritage',
            subtitle: 'UNESCO Intangible Heritage of Humanity',
            description:
              'Colorful storytelling dance that portrays legendary heroes, wisdom, and the spirit of Ponorogo.',
            image:
              'https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
        ]
      : [
    {
      title: 'Reog Ponorogo',
      subtitle: 'Pesona Budaya dari Jawa Timur',
            description:
              'Saksikan kemegahan pertunjukan Reog Ponorogo dengan topeng Dadak Merak ikonik berbobot 50 kg.',
            image:
              'https://images.unsplash.com/photo-1698824554771-293b5dcc42db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      title: 'Warisan Budaya',
            subtitle: 'Diakui UNESCO sebagai Warisan Dunia',
            description:
              'Tarian tradisional penuh warna yang menceritakan legenda kepahlawanan dan kearifan lokal Ponorogo.',
            image:
              'https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
        ];

  const heroBadge = locale === 'en' ? "Indonesia's Cultural Legacy" : 'Warisan Budaya Indonesia';
  const chips = locale === 'en'
    ? ['UNESCO Heritage', '700+ Years of Tradition', '50-60 kg Mask']
    : ['Warisan UNESCO', '700+ Tahun Tradisi', 'Topeng 50-60 kg'];
  const exploreLabel = locale === 'en' ? 'Explore Reog Ponorogo' : 'Jelajahi Reog Ponorogo';
  const whatsappLabel = locale === 'en' ? 'Ask via WhatsApp' : 'Tanya via WhatsApp';
  const scrollLabel = locale === 'en' ? 'Scroll' : 'Gulir';

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[120vh] flex items-center justify-center overflow-visible">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <ImageWithFallback
            src={slide.image}
            alt={slide.title}
            className="w-full h-[120vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/85"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/50 via-transparent to-amber-900/30"></div>
        </div>
      ))}

      {}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-40 h-40 border-2 border-amber-500/20 rounded-full animate-[float_6s_ease-in-out_infinite]">
          <div className="absolute inset-4 border-2 border-amber-400/30 rounded-full"></div>
        </div>
        <div className="absolute top-1/3 right-[15%] w-32 h-32 border-2 border-red-500/20 rounded-full animate-[float_8s_ease-in-out_infinite]">
          <div className="absolute inset-3 border-2 border-red-400/30 rounded-full"></div>
        </div>
        <div className="absolute bottom-1/4 left-[20%] w-24 h-24 border-2 border-amber-400/25 rounded-full animate-[float_7s_ease-in-out_infinite]"></div>
        
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 left-1/3 w-[600px] h-[600px] bg-gradient-radial from-red-500/8 via-red-600/4 to-transparent rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]"></div>

        <div className="absolute top-[15%] right-[25%] text-amber-500/20 animate-[float_9s_ease-in-out_infinite]">
          <Crown size={48} />
        </div>
        <div className="absolute bottom-[20%] left-[15%] text-red-500/20 animate-[float_11s_ease-in-out_infinite]">
          <Music size={40} />
        </div>
        <div className="absolute top-[40%] left-[8%] text-amber-400/15 animate-[float_8s_ease-in-out_infinite]">
          <Flame size={36} />
        </div>
      </div>

      <div className="relative z-10 text-center px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-red-950 px-4 sm:px-8 py-2 sm:py-4 rounded-full shadow-lg sm:shadow-2xl animate-[slideDown_1s_ease-out] border-2 border-amber-400/50 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            <Sparkles size={18} className="sm:size-6 animate-[spin_4s_linear_infinite] relative z-10" />
            <span className="tracking-wide relative z-10 text-sm sm:text-base">{heroBadge}</span>
            <Sparkles size={18} className="sm:size-6 animate-[spin_4s_linear_infinite_reverse] relative z-10" />
          </div>
        </div>

        <div className="mb-6 sm:mb-8 animate-[slideUp_1s_ease-out_0.2s_both]">
          <h1 className="text-white mb-3 sm:mb-4 tracking-tight leading-tight text-center">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 mb-4 sm:mb-5 md:mb-6 drop-shadow-2xl relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold overflow-visible pb-2">
              {heroSlides[currentSlide].title}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-gradient-to-br from-amber-500/25 via-amber-400/20 to-red-500/15 blur-3xl rounded-full -z-10"></div>
            </span>
            <span className="block drop-shadow-2xl text-white/95 relative overflow-hidden text-base sm:text-lg md:text-xl pt-2">
              {heroSlides[currentSlide].subtitle}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
            </span>
          </h1>
        </div>

        <div className="text-amber-50/95 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 text-sm sm:text-base md:text-lg animate-[slideUp_1s_ease-out_0.4s_both] relative text-center">
          <span className="relative inline-block">
            {heroSlides[currentSlide].description}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/5 via-red-500/5 to-amber-500/5 blur-2xl -z-10 rounded-full"></div>
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 animate-[slideUp_1s_ease-out_0.5s_both]">
            {[Crown, Music, Flame].map((Icon, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-amber-500/30">
                <Icon size={16} className="sm:size-5 text-amber-400" />
                <span className="text-white text-xs sm:text-sm">{chips[idx]}</span>
          </div>
            ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 animate-[slideUp_1s_ease-out_0.6s_both]">
          <button
            onClick={() => {
              const element = document.getElementById('reog');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-red-950 px-6 sm:px-10 py-3 sm:py-5 rounded-2xl transition-all transform hover:scale-105 shadow-lg sm:shadow-2xl hover:shadow-amber-500/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              <span className="text-sm sm:text-base">{exploreLabel}</span>
              <ChevronDown size={20} className="sm:size-6 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => {
              window.open('https://wa.me/62882009759102?text=Halo%2C+saya+ingin+bertanya+tentang+Reog+Ponorogo', '_blank');
            }}
            className="group relative bg-green-600 hover:bg-green-700 text-white px-6 sm:px-10 py-3 sm:py-5 rounded-2xl transition-all transform hover:scale-105 shadow-lg sm:shadow-2xl hover:shadow-green-500/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span className="text-sm sm:text-base">{whatsappLabel}</span>
            </span>
          </button>
        </div>

        <div className="flex gap-3 justify-center mb-8 animate-[fadeIn_1s_ease-out_0.8s_both]">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? 'w-12 bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg shadow-amber-500/50' 
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-amber-400 text-sm tracking-widest uppercase animate-pulse">{scrollLabel}</span>
        <div className="w-8 h-14 border-2 border-amber-400 rounded-full flex justify-center p-2 shadow-lg shadow-amber-500/30">
          <div className="w-2 h-4 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full animate-[scrollDot_2s_ease-in-out_infinite]"></div>
        </div>
      </div>

    </div>
  );
}
