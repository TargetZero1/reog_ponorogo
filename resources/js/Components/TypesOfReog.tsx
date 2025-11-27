import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

export function TypesOfReog() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const reogTypes = [
    {
      name: 'Dadak Merak',
      role: 'Pusat Pertunjukan',
      description: 'Topeng raksasa berbentuk kepala harimau dengan mahkota bulu merak yang menjulang tinggi. Beratnya mencapai 50-60 kg dan ditarikan dengan gigitan gigi.',
      details: 'Penari Dadak Merak harus memiliki kekuatan fisik yang luar biasa dan stamina tinggi. Mahkota bulu merak yang megah melambangkan keindahan alam dan kekuatan spiritual.',
      color: 'from-green-500 to-blue-500',
      image: 'https://images.unsplash.com/photo-1760133453014-c8df5dcc0007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdHJhZGl0aW9uYWwlMjBtYXNrfGVufDF8fHx8MTc2MzEwMDE1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Warok',
      role: 'Penari Utama',
      description: 'Penari pria yang mengenakan pakaian hitam dengan sabuk merah. Warok adalah sosok sakti dan dihormati, merupakan simbol kekuatan spiritual dan fisik.',
      details: 'Dalam tradisi Reog, Warok dianggap memiliki ilmu kanuragan dan kesaktian. Mereka adalah pelindung masyarakat dan guru spiritual yang dihormati.',
      color: 'from-red-600 to-black',
      image: 'https://images.unsplash.com/photo-1698824554771-293b5dcc42db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdHJhZGl0aW9uYWwlMjBkYW5jZSUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc2MzEwMDE1NXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Jathil',
      role: 'Penari Pendukung',
      description: 'Penari wanita yang mengenakan kostum berkuda-kuda dari anyaman bambu. Gerakan lincah dan gemulai mewakili pasukan berkuda dalam cerita.',
      details: 'Jathil menampilkan tarian yang energik dengan gerakan berkuda. Kostum mereka penuh warna dan hiasan yang indah, melambangkan keanggunan dan kelincahan.',
      color: 'from-pink-500 to-red-500',
      image: 'https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZXxlbnwxfHx8fDE3NjMxMDAxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Bujang Ganong',
      role: 'Tokoh Pelawak',
      description: 'Tokoh badut dengan topeng wajah merah yang lucu. Bertugas menghibur penonton dengan gerakan dan dialog yang jenaka sebagai penyeimbang suasana.',
      details: 'Bujang Ganong memberikan relief komedi di tengah pertunjukan yang intens. Improvisasi dan interaksi dengan penonton menjadi daya tarik khasnya.',
      color: 'from-orange-500 to-amber-500',
      image: 'https://images.unsplash.com/photo-1760133453014-c8df5dcc0007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdHJhZGl0aW9uYWwlMjBtYXNrfGVufDF8fHx8MTc2MzEwMDE1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Kelono Sewandono',
      role: 'Raja Protagonis',
      description: 'Prabu atau raja yang menjadi tokoh utama dalam cerita. Mengenakan mahkota dan pakaian kerajaan, mewakili keagungan dan kepemimpinan.',
      details: 'Sebagai karakter utama, Kelono Sewandono menampilkan gerakan yang anggun namun penuh wibawa, mencerminkan kepribadian seorang raja yang agung.',
      color: 'from-amber-600 to-amber-800',
      image: 'https://images.unsplash.com/photo-1698824554771-293b5dcc42db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdHJhZGl0aW9uYWwlMjBkYW5jZSUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc2MzEwMDE1NXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Barongan',
      role: 'Tokoh Mistis',
      description: 'Sosok harimau atau singa mistis dengan warna merah yang melambangkan penjaga spiritual. Gerakannya liar dan penuh energi.',
      details: 'Barongan dipercaya sebagai penjaga spiritual yang melindungi pertunjukan. Gerakan dinamis dan energetiknya menciptakan atmosfer mistis yang kuat.',
      color: 'from-red-700 to-red-950',
      image: 'https://images.unsplash.com/photo-1760133453014-c8df5dcc0007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdHJhZGl0aW9uYWwlMjBtYXNrfGVufDF8fHx8MTc2MzEwMDE1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16 relative">
        <div className="inline-block bg-amber-500 text-red-950 px-4 sm:px-6 py-2 rounded-full mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow font-semibold text-xs sm:text-sm">
          Karakter & Elemen
        </div>
        <h2 className="text-red-950 mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">Jenis-Jenis Karakter dalam Reog</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed px-4 text-sm sm:text-base">
          Setiap karakter dalam Reog Ponorogo memiliki peran dan makna filosofis yang mendalam. 
          Mari kenali tokoh-tokoh yang menyusun pertunjukan megah ini.
        </p>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-red-600 mx-auto mt-4 sm:mt-6 rounded-full"></div>
      </div>

      {/* Cards Grid with enhanced interactions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {reogTypes.map((type, index) => (
          <div 
            key={index}
            onMouseEnter={() => setExpandedCard(index)}
            onMouseLeave={() => setExpandedCard(null)}
            className="relative group"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 h-full flex flex-col">
              {/* Image */}
              <div className="relative h-48 sm:h-72 overflow-hidden">
                <ImageWithFallback
                  src={type.image}
                  alt={type.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${type.color} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>
                
                {/* Role Badge */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg transform group-hover:scale-110 transition-transform text-xs sm:text-sm">
                  <span className="text-red-950 font-semibold">{type.role}</span>
                </div>

                {/* Decorative element */}
                <div className={`absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br ${type.color} rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity`}></div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col relative">
                <h3 className="text-red-950 mb-3 group-hover:text-red-700 transition-colors">
                  {type.name}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-4 flex-1">
                  {type.description}
                </p>

                {/* Expandable details */}
                <div className={`overflow-hidden transition-all duration-500 ${expandedCard === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pt-4 border-t border-neutral-200">
                    <p className="text-neutral-600 text-sm leading-relaxed italic">
                      {type.details}
                    </p>
                  </div>
                </div>
                
                {/* Decorative line */}
                <div className={`h-1 bg-gradient-to-r ${type.color} mt-6 rounded-full transition-all duration-500 ${expandedCard === index ? 'w-full' : 'w-16'}`}></div>
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-amber-400 to-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110">
                <span className="text-white text-xs">+</span>
              </div>
            </div>

            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${type.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity -z-10`}></div>
          </div>
        ))}
      </div>

      {/* Bottom Info with enhanced design */}
      <div className="mt-20 bg-gradient-to-br from-red-950 via-red-800 to-red-950 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden group">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-amber-500 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-amber-600 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"></div>
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500 text-red-950 px-4 py-2 rounded-full mb-6 shadow-lg">
            <span>✨</span>
            <span>Harmoni Sempurna</span>
          </div>
          <h3 className="text-white mb-6">Bersatu dalam Keindahan</h3>
          <p className="text-amber-50/90 max-w-3xl mx-auto leading-relaxed text-lg">
            Keenam karakter ini bekerja bersama menciptakan narasi yang kuat dan penuh makna. 
            Dari kekuatan Warok, kelincahan Jathil, hingga kemegahan Dadak Merak, 
            semuanya menyatu dalam harmoni yang memukau dan menghipnotis setiap penonton.
          </p>
        </div>
      </div>
    </div>
  );
}
