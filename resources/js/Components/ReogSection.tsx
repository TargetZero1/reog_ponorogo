import { History, Award, Users, Theater } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

export function ReogSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: <History size={24} />,
      title: 'Sejarah Panjang',
      description: 'Berakar dari abad ke-15, penuh makna filosofis dan spiritual',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: <Award size={24} />,
      title: 'Warisan Dunia',
      description: 'Diakui UNESCO sebagai warisan budaya tak benda',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: <Users size={24} />,
      title: 'Komunitas Kuat',
      description: 'Dilestarikan oleh paguyuban dan seniman di seluruh Indonesia',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: <Theater size={24} />,
      title: 'Pertunjukan Megah',
      description: 'Topeng Dadak Merak dengan berat 50-60 kg yang memukau',
      color: 'from-red-600 to-red-800'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Decorative background elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>

      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16 relative">
        <div className="inline-block bg-red-950 text-amber-400 px-4 sm:px-6 py-2 rounded-full mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow font-semibold text-xs sm:text-sm">
          Daya Tarik Utama
        </div>
        <h2 className="text-red-950 mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">Apa Itu Reog Ponorogo?</h2>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-red-600 mx-auto rounded-full mt-4"></div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-16 sm:mb-20 relative">
        {/* Image */}
        <div className="relative group">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZXxlbnwxfHx8fDE3NjMxMDAxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Reog Ponorogo"
              className="w-full h-64 sm:h-80 md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          {/* Decorative corners with animation */}
          <div className="absolute -top-4 -right-4 w-32 h-32 border-4 border-amber-500 rounded-tr-3xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-red-600 rounded-bl-3xl group-hover:scale-110 transition-transform duration-500"></div>
          
          {/* Floating badge */}
          <div className="absolute top-6 left-6 bg-amber-500 text-red-950 px-4 py-2 rounded-full shadow-xl animate-[float_3s_ease-in-out_infinite]">
            <span>Warisan UNESCO</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 sm:space-y-6">
          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong className="text-red-950">Reog Ponorogo</strong> adalah seni pertunjukan tradisional yang berasal dari Ponorogo, Jawa Timur. 
              Pertunjukan ini terkenal dengan <strong>topeng Dadak Merak</strong> yang besar dan megah, 
              yang dikenakan oleh penari dengan kekuatan luar biasa.
            </p>
            
            <p className="text-neutral-700 leading-relaxed">
              Reog menggambarkan legenda <strong>Prabu Kelono Sewandono</strong> yang mencari cinta 
              Dewi Ragil Kuning dari Kediri. Dalam perjalanannya, ia ditemani oleh pasukan Warok 
              dan Jathil yang gagah berani.
            </p>

            <p className="text-neutral-700 leading-relaxed">
              Setiap gerakan dalam Reog Ponorogo memiliki makna filosofis yang dalam, 
              mencerminkan nilai-nilai kepahlawanan, kejujuran, dan semangat juang 
              yang tinggi dari masyarakat Ponorogo.
            </p>

            <div className="bg-gradient-to-r from-amber-50 to-red-50 border-l-4 border-red-600 p-6 rounded-r-2xl shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-red-100/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-red-950 italic relative z-10 leading-relaxed">
                "Reog Ponorogo bukan sekadar tarian, tetapi representasi jiwa dan identitas 
                masyarakat Ponorogo yang berani, kuat, dan penuh kehormatan."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid with enhanced interactions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {features.map((feature, index) => (
          <div 
            key={index}
            onMouseEnter={() => setHoveredFeature(index)}
            onMouseLeave={() => setHoveredFeature(null)}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-red-50 to-amber-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 border border-red-100 hover:border-amber-400 relative overflow-hidden h-full transform hover:-translate-y-2">
              {/* Animated background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg relative z-10`}>
                {feature.icon}
              </div>
              <h3 className="text-red-950 mb-3 relative z-10 group-hover:text-red-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-neutral-600 relative z-10 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Progress bar animation */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} transition-all duration-500 ${hoveredFeature === index ? 'w-full' : 'w-0'}`}></div>
            </div>
            
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity -z-10`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
