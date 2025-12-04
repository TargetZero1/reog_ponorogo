import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { useTranslations } from '@/utils/translations';

export function TypesOfReog() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { locale } = useTranslations();

  const reogTypes =
    locale === 'en'
      ? [
          {
            name: 'Dadak Merak',
            role: 'Centerpiece Performer',
            description:
              'A towering tiger mask crowned with peacock feathers weighing up to 60 kg, carried with jaw strength.',
            details:
              'Dadak Merak dancers embody power and grace; the peacock crown symbolizes natures splendor and spiritual energy.',
            color: 'from-green-500 to-blue-500',
            image:
              'https://images.unsplash.com/photo-1760133453014-c8df5dcc0007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
          {
            name: 'Warok',
            role: 'Guardians',
            description:
              'Respected figures in black attire representing mystical strength, leadership, and protection.',
            details:
              'Warok are cultural mentors believed to possess supernatural abilities, safeguarding the troupe and community.',
            color: 'from-red-600 to-black',
            image:
              'https://images.unsplash.com/photo-1698824554771-293b5dcc42db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
          {
            name: 'Jathil',
            role: 'Horse Dancers',
            description:
              'Agile dancers with bamboo horse props portraying the cavalry with lively, elegant moves.',
            details:
              'Their vibrant costumes and dynamic choreography highlight the bravery and finesse of Ponorogos youth.',
            color: 'from-pink-500 to-red-500',
            image:
              'https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
          {
            name: 'Bujang Ganong',
            role: 'Comic Relief',
            description:
              'A witty trickster in a red mask who improvises jokes and interacts directly with the audience.',
            details:
              'He lightens the mood, keeping the performance engaging with humor and spontaneous antics.',
            color: 'from-orange-500 to-amber-500',
            image:
              'https://images.unsplash.com/photo-1760133453014-c8df5dcc0007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
          {
            name: 'Kelono Sewandono',
            role: 'Protagonist King',
            description:
              'The regal hero seeking love, symbolizing wisdom, charisma, and noble leadership.',
            details:
              'His movements blend tenderness and authority, portraying the dignity of a legendary monarch.',
            color: 'from-amber-600 to-amber-800',
            image:
              'https://images.unsplash.com/photo-1698824554771-293b5dcc42db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
          {
            name: 'Barongan',
            role: 'Mystical Guardian',
            description:
              'A fiery lion or tiger spirit believed to shield the performance with ferocious energy.',
            details:
              'Barongans wild choreography amplifies the mystical aura and spiritual protection of Reog Ponorogo.',
            color: 'from-red-700 to-red-950',
            image:
              'https://images.unsplash.com/photo-1760133453014-c8df5dcc0007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
        ]
      : [
          {
            name: 'Dadak Merak',
            role: 'Pusat Pertunjukan',
            description:
              'Topeng harimau raksasa dengan mahkota bulu merak seberat 50-60 kg yang ditopang dengan kekuatan rahang.',
            details:
              'Penari Dadak Merak melambangkan ketangguhan dan kemegahan alam Ponorogo.',
            color: 'from-green-500 to-blue-500',
            image:
              'https://images.unsplash.com/photo-1760133453014-c8df5dcc0007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
          {
            name: 'Warok',
            role: 'Penari Utama',
            description:
              'Sosok sakti berpakaian hitam yang dihormati sebagai penjaga budaya dan spiritual.',
            details:
              'Warok dipercaya memiliki kesaktian dan menjadi pelindung paguyuban.',
            color: 'from-red-600 to-black',
            image:
              'https://images.unsplash.com/photo-1698824554771-293b5dcc42db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
          {
            name: 'Jathil',
            role: 'Penari Pendukung',
            description:
              'Penari berkostum kuda-kudaan anyaman bambu yang menggambarkan pasukan berkuda.',
            details:
              'Gerakannya lincah dan energik, menampilkan keanggunan sekaligus keberanian.',
            color: 'from-pink-500 to-red-500',
            image:
              'https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
          {
            name: 'Bujang Ganong',
            role: 'Tokoh Pelawak',
            description:
              'Tokoh jenaka bertopeng merah yang menghibur penonton dengan improvisasi lucu.',
            details:
              'Memberi jeda komedi dan menghidupkan suasana dengan interaksi spontan.',
            color: 'from-orange-500 to-amber-500',
            image:
              'https://images.unsplash.com/photo-1760133453014-c8df5dcc0007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
          {
            name: 'Kelono Sewandono',
            role: 'Raja Protagonis',
            description:
              'Prabu utama yang berwibawa, mengenakan mahkota dan busana kerajaan.',
            details:
              'Gerakannya memadukan kelembutan dan ketegasan, mencerminkan kharisma pemimpin.',
            color: 'from-amber-600 to-amber-800',
            image:
              'https://images.unsplash.com/photo-1698824554771-293b5dcc42db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
          {
            name: 'Barongan',
            role: 'Tokoh Mistis',
            description:
              'Singa atau harimau merah yang dipercaya menjaga jalannya pertunjukan.',
            details:
              'Gerakannya liar dan penuh energi, menghadirkan suasana mistis nan kuat.',
            color: 'from-red-700 to-red-950',
            image:
              'https://images.unsplash.com/photo-1760133453014-c8df5dcc0007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          },
        ];

  const sectionCopy =
    locale === 'en'
      ? {
          badge: 'Characters & Elements',
          title: 'Iconic Roles in Reog Ponorogo',
          description:
            'Each character carries deep symbolismfrom the fearless Warok to the majestic Dadak Merakcreating a powerful cultural narrative.',
          harmonyTag: 'Perfect Harmony',
          harmonyTitle: 'United in Grandeur',
          harmonyText:
            'These six characters weave a dramatic experience filled with heroism, humor, and mysticism. Their synergy makes every Reog performance unforgettable.',
        }
      : {
          badge: 'Karakter & Elemen',
          title: 'Jenis Karakter dalam Reog',
          description:
            'Setiap tokoh membawa makna filosofis, dari Warok yang sakti hingga kemegahan Dadak Merak, membentuk kisah budaya yang utuh.',
          harmonyTag: 'Harmoni Sempurna',
          harmonyTitle: 'Bersatu dalam Keindahan',
          harmonyText:
            'Enam karakter ini memadukan kepahlawanan, humor, dan nuansa mistis, menjadikan pertunjukan Reog selalu berkesan.',
        };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {}
      <div className="absolute top-20 left-10 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

      {}
      <div className="text-center mb-12 sm:mb-16 relative">
        <div className="inline-block bg-amber-500 text-red-950 px-4 sm:px-6 py-2 rounded-full mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow font-semibold text-xs sm:text-sm">
          {sectionCopy.badge}
        </div>
        <h2 className="text-red-950 mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">{sectionCopy.title}</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed px-4 text-sm sm:text-base">
          {sectionCopy.description}
        </p>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-red-600 mx-auto mt-4 sm:mt-6 rounded-full"></div>
      </div>

      {}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {reogTypes.map((type, index) => (
          <div 
            key={index}
            onMouseEnter={() => setExpandedCard(index)}
            onMouseLeave={() => setExpandedCard(null)}
            className="relative group"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 h-full flex flex-col">
              {}
              <div className="relative h-48 sm:h-72 overflow-hidden">
                <ImageWithFallback
                  src={type.image}
                  alt={type.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${type.color} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}
                ></div>
                
                {}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg transform group-hover:scale-110 transition-transform text-xs sm:text-sm">
                  <span className="text-red-950 font-semibold">{type.role}</span>
                </div>

                {}
                <div
                  className={`absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br ${type.color} rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity`}
                ></div>
              </div>

              {}
              <div className="p-6 flex-1 flex flex-col relative">
                <h3 className="text-red-950 mb-3 group-hover:text-red-700 transition-colors">
                  {type.name}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-4 flex-1">
                  {type.description}
                </p>

                {}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    expandedCard === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-4 border-t border-neutral-200">
                    <p className="text-neutral-600 text-sm leading-relaxed italic">
                      {type.details}
                    </p>
                  </div>
                </div>
                
                {}
                <div
                  className={`h-1 bg-gradient-to-r ${type.color} mt-6 rounded-full transition-all duration-500 ${
                    expandedCard === index ? 'w-full' : 'w-16'
                  }`}
                ></div>
              </div>

              {}
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-amber-400 to-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110">
                <span className="text-white text-xs">+</span>
              </div>
            </div>

            {}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${type.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity -z-10`}
            ></div>
          </div>
        ))}
      </div>

      {}
      <div className="mt-20 bg-gradient-to-br from-red-950 via-red-800 to-red-950 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden group">
        {}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-amber-500 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-amber-600 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"></div>
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500 text-red-950 px-4 py-2 rounded-full mb-6 shadow-lg">
            <span></span>
            <span>{sectionCopy.harmonyTag}</span>
          </div>
          <h3 className="text-white mb-6">{sectionCopy.harmonyTitle}</h3>
          <p className="text-amber-50/90 max-w-3xl mx-auto leading-relaxed text-lg">
            {sectionCopy.harmonyText}
          </p>
        </div>
      </div>
    </div>
  );
}
