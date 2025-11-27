import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang Reog', href: '#reog' },
    { label: 'Jenis Reog', href: '#jenis-reog' },
    { label: 'Budaya & Sejarah', href: '#budaya' },
    { label: 'Tempat Wisata', href: '#wisata' }
  ];

  const contacts = [
    { icon: <Phone size={16} className="sm:size-4.5" />, text: '+62 352 461234', href: 'tel:+62352461234' },
    { icon: <Mail size={16} className="sm:size-4.5" />, text: 'info@reogponorogo.com', href: 'mailto:info@reogponorogo.com' },
    { icon: <MapPin size={16} className="sm:size-4.5" />, text: 'Jl. Reog No. 1, Ponorogo, Jawa Timur', href: '#' }
  ];

  const socialMedia = [
    { icon: <Facebook size={18} className="sm:size-5" />, href: '#', label: 'Facebook' },
    { icon: <Instagram size={18} className="sm:size-5" />, href: '#', label: 'Instagram' },
    { icon: <Youtube size={18} className="sm:size-5" />, href: '#', label: 'YouTube' },
    { icon: <Twitter size={18} className="sm:size-5" />, href: '#', label: 'Twitter' }
  ];

  return (
    <footer className="bg-gradient-to-br from-red-950 via-red-900 to-red-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-red-950 text-lg sm:text-xl">🦚</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-white text-sm sm:text-base font-semibold">Reog Ponorogo</h3>
                <p className="text-amber-400 text-xs sm:text-sm">Warisan Budaya Indonesia</p>
              </div>
            </div>
            <p className="text-amber-50/80 mb-4 sm:mb-6 leading-relaxed max-w-md text-xs sm:text-sm">
              Portal resmi informasi dan promosi Reog Ponorogo. 
              Melestarikan dan memperkenalkan kesenian tradisional Indonesia ke seluruh dunia.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-2 sm:gap-3">
              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 sm:w-10 h-8 sm:h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:text-red-950 group"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-amber-400 mb-3 sm:mb-4 text-sm sm:text-base font-semibold">Navigasi Cepat</h4>
            <ul className="space-y-1 sm:space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-amber-50/80 hover:text-amber-300 transition-colors inline-flex items-center gap-2 group text-xs sm:text-sm"
                  >
                    <span className="w-0 h-0.5 bg-amber-400 group-hover:w-4 transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-amber-400 mb-3 sm:mb-4 text-sm sm:text-base font-semibold">Hubungi Kami</h4>
            <ul className="space-y-2 sm:space-y-3">
              {contacts.map((contact, index) => (
                <li key={index}>
                  <a
                    href={contact.href}
                    className="text-amber-50/80 hover:text-amber-300 transition-colors flex items-start gap-2 sm:gap-3 group"
                  >
                    <span className="text-amber-400 mt-0.5 sm:mt-1 group-hover:scale-110 transition-transform flex-shrink-0">
                      {contact.icon}
                    </span>
                    <span className="text-xs sm:text-sm">{contact.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Inquiry Form Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-2xl">
            <h4 className="text-amber-400 mb-4">Booking & Pertanyaan</h4>
            <p className="text-amber-50/80 mb-4 text-sm">
              Ingin menyaksikan pertunjukan Reog atau memiliki pertanyaan? Hubungi kami!
            </p>
            <form className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <textarea
                placeholder="Pesan Anda"
                rows={3}
                className="sm:col-span-2 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              ></textarea>
              <button
                type="submit"
                className="sm:col-span-2 bg-gradient-to-r from-amber-500 to-amber-600 text-red-950 py-3 rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-amber-50/60">
          <p>
            © 2024 Reog Ponorogo. Dikembangkan untuk Tugas Akhir. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-300 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-amber-300 transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>

      {/* Decorative Bottom */}
      <div className="h-2 bg-gradient-to-r from-amber-600 via-red-600 to-amber-600"></div>
    </footer>
  );
}
