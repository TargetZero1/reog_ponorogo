import { Palette, UtensilsCrossed, BookOpen, Sparkles, Crown, Music, Clock, Award, Users, Heart } from 'lucide-react';
import { ImageWithFallback } from '../Components/figma/ImageWithFallback';
import { Layout } from '../Components/Layout';
import { ContainerBackground } from '../Components/ContainerBackground';
import { useState, useEffect, useRef } from 'react';

export default function BudayaDanSejarah() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((el, index) => {
      if (!el) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const culturalAspects = [
    {
      icon: <Palette size={32} />,
      title: 'Kerajinan Lokal',
      subtitle: 'Traditional Crafts & Artistry',
      items: [
        {
          name: 'Topeng Reog',
          description: 'Topeng kayu berukir dengan detail rumit, dibuat oleh pengrajin tangan ahli yang mewarisi keterampilan turun-temurun. Setiap topeng memiliki karakteristik unik yang mencerminkan filosofi budaya Ponorogo.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80&auto=format'
        },
        {
          name: 'Anyaman Bambu',
          description: 'Kerajinan dari bambu untuk properti Jathil dan perlengkapan pertunjukan, menunjukkan kearifan lokal dalam memanfaatkan alam secara berkelanjutan.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80&auto=format'
        },
        {
          name: 'Batik Ponorogo',
          description: 'Motif batik khas dengan ornamen Reog yang menjadi identitas budaya daerah. Setiap motif memiliki makna filosofis yang dalam.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80&auto=format'
        }
      ],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: <UtensilsCrossed size={32} />,
      title: 'Kuliner Khas',
      subtitle: 'Traditional Cuisine & Flavors',
      items: [
        {
          name: 'Sate Ponorogo',
          description: 'Sate ayam dengan bumbu kacang yang khas dan gurih, terkenal di seluruh Jawa Timur. Disajikan dengan lontong dan sambal kacang yang menggugah selera.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80&auto=format'
        },
        {
          name: 'Nasi Pecel',
          description: 'Nasi dengan sayuran rebus dan bumbu pecel pedas yang menggugah selera. Makanan khas yang menjadi identitas kuliner Ponorogo.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80&auto=format'
        },
        {
          name: 'Dawet Jabung',
          description: 'Minuman segar dari tepung beras dengan kuah santan dan gula merah. Minuman tradisional yang menyegarkan di cuaca panas.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80&auto=format'
        }
      ],
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      icon: <BookOpen size={32} />,
      title: 'Filosofi & Kearifan',
      subtitle: 'Wisdom & Cultural Philosophy',
      items: [
        {
          name: 'Nilai Kepahlawanan',
          description: 'Warok mengajarkan tentang keberanian, kejujuran, dan semangat juang tinggi dalam menghadapi kehidupan. Filosofi yang menginspirasi generasi muda.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80&auto=format'
        },
        {
          name: 'Harmoni Alam',
          description: 'Dadak Merak melambangkan keseimbangan antara manusia dan alam, dengan bulu merak sebagai simbol keindahan alam yang harus dijaga.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80&auto=format'
        },
        {
          name: 'Gotong Royong',
          description: 'Pertunjukan Reog melibatkan banyak orang, mengajarkan nilai kerja sama dan solidaritas komunitas yang kuat.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80&auto=format'
        }
      ],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    }
  ];

  const timelineEvents = [
    {
      year: 'Abad 15',
      period: '1400-1500',
      title: 'Asal Mula Reog',
      description: 'Reog Ponorogo mulai berkembang sebagai bentuk perlawanan terhadap penjajahan dan kritik sosial terhadap penguasa melalui seni pertunjukan yang penuh makna.',
      color: 'from-red-600 to-red-700',
      icon: <Clock size={24} />
    },
    {
      year: '1960-an',
      period: '1960-1970',
      title: 'Era Kemerdekaan',
      description: 'Reog mulai diangkat sebagai kesenian daerah yang dilindungi dan dipromosikan oleh pemerintah sebagai identitas budaya Ponorogo yang membanggakan.',
      color: 'from-amber-600 to-amber-700',
      icon: <Award size={24} />
    },
    {
      year: '2024',
      period: 'Sekarang',
      title: 'Warisan Dunia',
      description: 'Reog Ponorogo terus dilestarikan dan dipromosikan ke kancah internasional sebagai warisan budaya Indonesia yang tak ternilai dan diakui UNESCO.',
      color: 'from-red-800 to-red-900',
      icon: <Crown size={24} />
    }
  ];

  const stats = [
    { icon: <Crown size={32} />, label: 'Warisan UNESCO', value: '2024', color: 'from-amber-500 to-amber-600' },
    { icon: <Clock size={32} />, label: 'Tahun Tradisi', value: '700+', color: 'from-red-500 to-red-600' },
    { icon: <Users size={32} />, label: 'Komunitas Aktif', value: '50+', color: 'from-amber-500 to-red-500' },
    { icon: <Heart size={32} />, label: 'Pelestarian', value: '100%', color: 'from-red-600 to-amber-600' }
  ];

  return (
    <Layout fullScreenHero={true}>
      {/* Hero Section */}
      <div className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZXxlbnwxfHx8fDE3NjMxMDAxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080)',
            backgroundAttachment: 'fixed'
          }}
        >
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/60 via-transparent to-amber-900/40"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] w-40 h-40 border-2 border-amber-500/20 rounded-full animate-[float_6s_ease-in-out_infinite]">
            <div className="absolute inset-4 border-2 border-amber-400/30 rounded-full"></div>
          </div>
          <div className="absolute top-1/3 right-[15%] w-32 h-32 border-2 border-red-500/20 rounded-full animate-[float_8s_ease-in-out_infinite]">
            <div className="absolute inset-3 border-2 border-red-400/30 rounded-full"></div>
          </div>
          <div className="absolute bottom-1/4 left-[20%] w-24 h-24 border-2 border-amber-400/25 rounded-full animate-[float_7s_ease-in-out_infinite]"></div>
          
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-1/3 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-red-500/8 via-red-600/4 to-transparent rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]"></div>

          <div className="absolute top-[15%] right-[25%] text-amber-500/20 animate-[float_9s_ease-in-out_infinite]">
            <Crown size={48} />
          </div>
          <div className="absolute bottom-[20%] left-[15%] text-red-500/20 animate-[float_11s_ease-in-out_infinite]">
            <Music size={40} />
          </div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* UNESCO Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-red-950 px-4 sm:px-8 py-2 sm:py-4 rounded-full mb-10 sm:mb-12 md:mb-16 shadow-lg sm:shadow-2xl animate-[slideDown_1s_ease-out] border-2 border-amber-400/50 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            <Sparkles size={18} className="sm:size-6 animate-[spin_4s_linear_infinite] relative z-10" />
            <span className="tracking-wide relative z-10 text-sm sm:text-base font-semibold">Budaya & Sejarah</span>
            <Sparkles size={18} className="sm:size-6 animate-[spin_4s_linear_infinite_reverse] relative z-10" />
          </div>

          <div className="mb-6 sm:mb-8 animate-[slideUp_1s_ease-out_0.2s_both]">
            <h1 className="text-white mb-2 sm:mb-4 tracking-tight leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 mb-4 drop-shadow-2xl relative text-2xl sm:text-4xl md:text-5xl font-bold overflow-visible px-2">
                Budaya & Sejarah Ponorogo
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-gradient-to-br from-amber-500/25 via-amber-400/20 to-red-500/15 blur-3xl rounded-full -z-10"></div>
              </span>
            </h1>
          </div>

          <p className="text-amber-50/95 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 text-sm sm:text-base md:text-lg animate-[slideUp_1s_ease-out_0.4s_both]">
            Jelajahi kekayaan budaya dan sejarah Ponorogo yang telah diakui UNESCO sebagai Warisan Budaya Tak Benda Manusia
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto animate-[slideUp_1s_ease-out_0.6s_both]">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-black/30 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-amber-500/30 hover:border-amber-500/60 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white mb-3 mx-auto shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-amber-400 font-bold text-lg sm:text-2xl mb-1">{stat.value}</div>
                <div className="text-white/80 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cultural Aspects Section */}
      <div className="py-12 md:py-20 bg-gradient-to-br from-amber-50 via-white to-red-50 relative overflow-hidden">
        <ContainerBackground index={3} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 shadow-lg font-semibold text-sm sm:text-base">
              <Palette size={18} className="sm:size-6" />
              <span>Kekayaan Budaya</span>
            </div>
            <h2 className="text-red-950 mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold">
              Aspek Budaya Ponorogo
            </h2>
            <p className="text-neutral-700 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg px-4">
              Ponorogo bukan hanya tentang Reog. Kota ini kaya dengan tradisi, kuliner, 
              kerajinan tangan, dan filosofi hidup yang telah diwariskan lintas generasi.
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 to-red-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-16 md:space-y-24">
            {culturalAspects.map((aspect, index) => (
              <div
                key={index}
                ref={(el) => { sectionRefs.current[index] = el; }}
                className={`transition-all duration-1000 ${
                  visibleSections.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                  {/* Header */}
                  <div className={`bg-gradient-to-br ${aspect.color} p-6 md:p-8 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    <div className="relative z-10 flex items-center gap-4 md:gap-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                        {aspect.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">{aspect.title}</h3>
                        <p className="text-white/90 text-sm md:text-base">{aspect.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div className="p-6 md:p-8">
                    <div className="grid md:grid-cols-3 gap-6">
                      {aspect.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="group relative bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-6 border border-neutral-200 hover:border-amber-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
                        >
                          <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                          <h4 className="text-red-950 mb-3 font-bold text-lg group-hover:text-amber-600 transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-neutral-600 leading-relaxed text-sm md:text-base mb-4">
                            {item.description}
                          </p>
                          <div className={`w-0 group-hover:w-full h-1 bg-gradient-to-r ${aspect.color} rounded-full transition-all duration-500`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-12 md:py-20 bg-gradient-to-br from-red-950 via-red-900 to-red-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(184,81,0,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,0,0,0.1),transparent_50%)]"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-red-950 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 shadow-lg font-semibold text-sm sm:text-base">
              <Clock size={18} className="sm:size-6" />
              <span>Garis Waktu Sejarah</span>
            </div>
            <h2 className="text-amber-300 mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold">
              Perjalanan Budaya
            </h2>
            <p className="text-amber-50/80 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg px-4">
              Sejarah panjang Reog Ponorogo yang telah melewati berbagai era dan terus berkembang hingga menjadi warisan dunia
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 to-amber-400 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-red-600 to-amber-500 transform md:-translate-x-1/2"></div>

            <div className="space-y-12 md:space-y-16">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  ref={(el) => { sectionRefs.current[culturalAspects.length + index] = el; }}
                  className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-8 transition-all duration-1000 ${
                    visibleSections.has(culturalAspects.length + index)
                      ? 'opacity-100 translate-x-0'
                      : index % 2 === 0 ? 'opacity-0 -translate-x-10' : 'opacity-0 translate-x-10'
                  }`}
                >
                  {/* Year Badge */}
                  <div className={`flex-shrink-0 w-24 h-24 bg-gradient-to-br ${event.color} rounded-2xl flex flex-col items-center justify-center text-white shadow-2xl transform hover:scale-110 transition-transform relative z-10`}>
                    <div className="absolute -inset-1 bg-gradient-to-br ${event.color} rounded-2xl blur opacity-50"></div>
                    {event.icon}
                    <span className="text-xs font-semibold mt-1">{event.year}</span>
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 hover:border-amber-400/50 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl ${
                    index % 2 === 0 ? 'md:mr-auto md:max-w-[45%]' : 'md:ml-auto md:max-w-[45%]'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${event.color} rounded-lg flex items-center justify-center text-white`}>
                        {event.icon}
                      </div>
                      <div>
                        <div className="text-amber-400 text-sm font-semibold">{event.period}</div>
                        <h3 className="text-white text-xl md:text-2xl font-bold">{event.title}</h3>
                      </div>
                    </div>
                    <p className="text-amber-50/90 leading-relaxed text-sm md:text-base">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
