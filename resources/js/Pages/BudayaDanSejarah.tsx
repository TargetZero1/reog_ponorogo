import { Palette, UtensilsCrossed, BookOpen, Sparkles, Crown, Music } from 'lucide-react';
import { ImageWithFallback } from '../Components/figma/ImageWithFallback';
import { Layout } from '../Components/Layout';
import { ContainerBackground } from '../Components/ContainerBackground';

export default function BudayaDanSejarah() {
  const culturalAspects = [
    {
      icon: <Palette size={24} className="sm:size-8" />,
      title: 'Kerajinan Lokal',
      items: [
        {
          name: 'Topeng Reog',
          description: 'Topeng kayu berukir dengan detail rumit, dibuat oleh pengrajin tangan ahli yang mewarisi keterampilan turun-temurun.'
        },
        {
          name: 'Anyaman Bambu',
          description: 'Kerajinan dari bambu untuk properti Jathil dan perlengkapan pertunjukan, menunjukkan kearifan lokal dalam memanfaatkan alam.'
        },
        {
          name: 'Batik Ponorogo',
          description: 'Motif batik khas dengan ornamen Reog yang menjadi identitas budaya daerah.'
        }
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <UtensilsCrossed size={24} className="sm:size-8" />,
      title: 'Kuliner Khas',
      items: [
        {
          name: 'Sate Ponorogo',
          description: 'Sate ayam dengan bumbu kacang yang khas dan gurih, terkenal di seluruh Jawa Timur.'
        },
        {
          name: 'Nasi Pecel',
          description: 'Nasi dengan sayuran rebus dan bumbu pecel pedas yang menggugah selera.'
        },
        {
          name: 'Dawet Jabung',
          description: 'Minuman segar dari tepung beras dengan kuah santan dan gula merah.'
        }
      ],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <BookOpen size={24} className="sm:size-8" />,
      title: 'Filosofi & Kearifan',
      items: [
        {
          name: 'Nilai Kepahlawanan',
          description: 'Warok mengajarkan tentang keberanian, kejujuran, dan semangat juang tinggi dalam menghadapi kehidupan.'
        },
        {
          name: 'Harmoni Alam',
          description: 'Dadak Merak melambangkan keseimbangan antara manusia dan alam, dengan bulu merak sebagai simbol keindahan alam.'
        },
        {
          name: 'Gotong Royong',
          description: 'Pertunjukan Reog melibatkan banyak orang, mengajarkan nilai kerja sama dan solidaritas komunitas.'
        }
      ],
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <Layout fullScreenHero={true}>
      <div className="relative min-h-[120vh] flex items-center justify-center overflow-visible -mt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZXxlbnwxfHx8fDE3NjMxMDAxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080)',
            backgroundAttachment: 'fixed'
          }}
        >
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/85"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/50 via-transparent to-amber-900/30"></div>

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
        </div>

        <div className="relative z-10 text-center px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-red-950 px-4 sm:px-8 py-2 sm:py-4 rounded-full mb-6 sm:mb-8 shadow-lg sm:shadow-2xl animate-[slideDown_1s_ease-out] border-2 border-amber-400/50 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            <Sparkles size={18} className="sm:size-6 animate-[spin_4s_linear_infinite] relative z-10" />
            <span className="tracking-wide relative z-10 text-sm sm:text-base">Budaya & Sejarah</span>
            <Sparkles size={18} className="sm:size-6 animate-[spin_4s_linear_infinite_reverse] relative z-10" />
          </div>

          <div className="mb-6 sm:mb-8 animate-[slideUp_1s_ease-out_0.2s_both]">
            <h1 className="text-white mb-2 sm:mb-4 tracking-tight leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 mb-4 drop-shadow-2xl animate-[shimmer_3s_ease-in-out_infinite] relative text-2xl sm:text-4xl md:text-5xl font-bold">
                Budaya & Sejarah Ponorogo
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 to-red-500/20 blur-3xl -z-10"></div>
              </span>
            </h1>
          </div>

          <p className="text-amber-50/95 max-w-3xl mx-auto mb-8 leading-relaxed px-4 text-sm sm:text-base md:text-lg animate-[slideUp_1s_ease-out_0.4s_both] relative">
            <span className="relative inline-block">
              Jelajahi kekayaan budaya dan sejarah Ponorogo yang telah diakui UNESCO sebagai Warisan Budaya Tak Benda Manusia
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/5 via-red-500/5 to-amber-500/5 blur-2xl -z-10 rounded-full"></div>
            </span>
          </p>
        </div>
      </div>

      <div className="py-12 md:py-24 bg-gradient-to-br from-red-950 via-red-900 to-red-950 text-white relative overflow-hidden">
        <ContainerBackground index={3} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-500 text-red-950 px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4 shadow-lg font-semibold text-xs sm:text-sm">
              <Palette size={16} className="sm:size-5" />
              <span>Budaya & Sejarah</span>
            </div>
            <h2 className="text-amber-300 mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">Kekayaan Budaya Ponorogo</h2>
            <p className="text-amber-50/80 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base px-4">
              Ponorogo bukan hanya tentang Reog. Kota ini kaya dengan tradisi, kuliner, 
              kerajinan tangan, dan filosofi hidup yang telah diwariskan lintas generasi.
            </p>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-400 mx-auto mt-4 sm:mt-6 rounded-full"></div>
          </div>

          <div className="mb-8 md:mb-16 relative rounded-3xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1634871572365-8bc444e6faea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwZm9vZCUyMHNhdGF5fGVufDF8fHx8MTc2MzA0MzUwOHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Kuliner Ponorogo"
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 to-transparent flex items-center">
              <div className="px-8 sm:px-12 max-w-2xl">
                <h3 className="text-white mb-4 text-xl md:text-2xl font-bold">Warisan yang Hidup</h3>
                <p className="text-amber-50/90 leading-relaxed text-sm md:text-base">
                  Setiap aspek budaya Ponorogo adalah cerminan dari jiwa masyarakatnya yang 
                  menjunjung tinggi tradisi sambil terus berinovasi dan berkembang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1578500494198-246f612d03b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuYWwlMjBjcmFmdHN8ZW58MXx8fHwxNzYzMTAwMjQwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-12">
            {culturalAspects.map((aspect, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${aspect.color} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    {aspect.icon}
                  </div>
                  <div>
                    <h3 className="text-red-950 text-xl md:text-2xl font-bold">{aspect.title}</h3>
                    <div className={`w-20 h-1 bg-gradient-to-r ${aspect.color} rounded-full mt-2`}></div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {aspect.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="bg-gradient-to-br from-neutral-50 to-white p-6 rounded-xl border border-neutral-200 hover:border-red-300 transition-all group transform hover:scale-105"
                    >
                      <h4 className="text-red-950 mb-3 font-bold group-hover:text-red-700 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-neutral-600 leading-relaxed text-sm">
                        {item.description}
                      </p>
                      <div className={`w-12 h-1 bg-gradient-to-r ${aspect.color} rounded-full mt-4 group-hover:w-full transition-all duration-500`}></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5fGVufDF8fHx8MTc2MzEwMDI0MHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/98 via-white/95 to-white/98"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl p-6 md:p-8 border border-red-200 shadow-lg">
            <h3 className="text-red-950 mb-8 text-center text-2xl md:text-3xl font-bold">Garis Waktu Sejarah</h3>
            <div className="space-y-6">
              <div className="flex gap-4 items-start flex-col md:flex-row">
                <div className="flex-shrink-0 w-full md:w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white shadow-lg text-center font-semibold transform hover:scale-110 transition-transform">
                  <span>Abad 15</span>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
                  <h4 className="text-red-950 mb-2 font-bold">Asal Mula Reog</h4>
                  <p className="text-neutral-600 text-sm md:text-base">
                    Reog Ponorogo mulai berkembang sebagai bentuk perlawanan terhadap penjajahan 
                    dan kritik sosial terhadap penguasa melalui seni pertunjukan.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start flex-col md:flex-row">
                <div className="flex-shrink-0 w-full md:w-24 h-24 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl flex items-center justify-center text-white shadow-lg text-center font-semibold transform hover:scale-110 transition-transform">
                  <span>1960-an</span>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
                  <h4 className="text-red-950 mb-2 font-bold">Era Kemerdekaan</h4>
                  <p className="text-neutral-600 text-sm md:text-base">
                    Reog mulai diangkat sebagai kesenian daerah yang dilindungi dan dipromosikan 
                    oleh pemerintah sebagai identitas budaya Ponorogo.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start flex-col md:flex-row">
                <div className="flex-shrink-0 w-full md:w-24 h-24 bg-gradient-to-br from-red-800 to-red-900 rounded-xl flex items-center justify-center text-white shadow-lg text-center font-semibold transform hover:scale-110 transition-transform">
                  <span>2024</span>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
                  <h4 className="text-red-950 mb-2 font-bold">Warisan Dunia</h4>
                  <p className="text-neutral-600 text-sm md:text-base">
                    Reog Ponorogo terus dilestarikan dan dipromosikan ke kancah internasional 
                    sebagai warisan budaya Indonesia yang tak ternilai.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}