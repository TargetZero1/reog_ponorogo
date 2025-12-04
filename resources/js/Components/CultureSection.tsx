import { Palette, UtensilsCrossed, BookOpen, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CultureSection() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-amber-500 text-red-950 px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4 shadow-lg text-xs sm:text-sm">
          <Sparkles size={16} className="sm:size-5" />
          <span className="font-semibold">Kekayaan Budaya</span>
        </div>
        <h2 className="text-white mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">Budaya & Sejarah Ponorogo</h2>
        <p className="text-amber-50/80 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base px-4">
          Ponorogo bukan hanya tentang Reog. Kota ini kaya dengan tradisi, kuliner, 
          kerajinan tangan, dan filosofi hidup yang telah diwariskan lintas generasi.
        </p>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-400 mx-auto mt-4 sm:mt-6 rounded-full"></div>
      </div>

      {}
      <div className="mb-16 relative rounded-3xl overflow-hidden shadow-2xl">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1634871572365-8bc444e6faea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwZm9vZCUyMHNhdGF5fGVufDF8fHx8MTc2MzA0MzUwOHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Kuliner Ponorogo"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 to-transparent flex items-center">
          <div className="px-8 sm:px-12 max-w-2xl">
            <h3 className="text-white mb-4">Warisan yang Hidup</h3>
            <p className="text-amber-50/90 leading-relaxed">
              Setiap aspek budaya Ponorogo adalah cerminan dari jiwa masyarakatnya yang 
              menjunjung tinggi tradisi sambil terus berinovasi dan berkembang.
            </p>
          </div>
        </div>
      </div>

      {}
      <div className="space-y-12">
        {culturalAspects.map((aspect, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            {}
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-16 h-16 bg-gradient-to-br ${aspect.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                {aspect.icon}
              </div>
              <div>
                <h3 className="text-red-950">{aspect.title}</h3>
                <div className={`w-20 h-1 bg-gradient-to-r ${aspect.color} rounded-full mt-2`}></div>
              </div>
            </div>

            {}
            <div className="grid md:grid-cols-3 gap-6">
              {aspect.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex}
                  className="bg-gradient-to-br from-neutral-50 to-white p-6 rounded-xl border border-neutral-200 hover:border-red-300 transition-all group"
                >
                  <h4 className="text-red-950 mb-3 group-hover:text-red-700 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                  <div className={`w-12 h-1 bg-gradient-to-r ${aspect.color} rounded-full mt-4 group-hover:w-full transition-all duration-500`}></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {}
      <div className="mt-16 bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl p-8 border border-red-200">
        <h3 className="text-red-950 mb-8 text-center">Garis Waktu Sejarah</h3>
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-24 h-24 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <span>Abad 15</span>
            </div>
            <div className="flex-1 bg-white p-6 rounded-xl shadow">
              <h4 className="text-red-950 mb-2">Asal Mula Reog</h4>
              <p className="text-neutral-600">
                Reog Ponorogo mulai berkembang sebagai bentuk perlawanan terhadap penjajahan 
                dan kritik sosial terhadap penguasa melalui seni pertunjukan.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-24 h-24 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <span>1960-an</span>
            </div>
            <div className="flex-1 bg-white p-6 rounded-xl shadow">
              <h4 className="text-red-950 mb-2">Era Kemerdekaan</h4>
              <p className="text-neutral-600">
                Reog mulai diangkat sebagai kesenian daerah yang dilindungi dan dipromosikan 
                oleh pemerintah sebagai identitas budaya Ponorogo.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-24 h-24 bg-red-800 rounded-xl flex items-center justify-center text-white shadow-lg">
              <span>2024</span>
            </div>
            <div className="flex-1 bg-white p-6 rounded-xl shadow">
              <h4 className="text-red-950 mb-2">Warisan Dunia</h4>
              <p className="text-neutral-600">
                Reog Ponorogo terus dilestarikan dan dipromosikan ke kancah internasional 
                sebagai warisan budaya Indonesia yang tak ternilai.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
