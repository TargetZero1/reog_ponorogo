import { Facebook, Twitter, MessageCircle, Link2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function ShareButtons({ 
  url, 
  title = 'Reog Ponorogo - Warisan Budaya UNESCO',
  description = 'Jelajahi keindahan budaya dan sejarah Reog Ponorogo',
  className = ''
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = `${title} - ${description}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent(shareText);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'whatsapp') => {
    const shareUrl = shareLinks[platform];
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-800">Bagikan halaman ini:</span>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => handleShare('facebook')}
          className="group flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          aria-label="Share on Facebook"
        >
          <Facebook size={18} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium">Facebook</span>
        </button>

        <button
          onClick={() => handleShare('twitter')}
          className="group flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          aria-label="Share on Twitter"
        >
          <Twitter size={18} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium">Twitter</span>
        </button>

        <button
          onClick={() => handleShare('whatsapp')}
          className="group flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium">WhatsApp</span>
        </button>

        <button
          onClick={handleCopy}
          className="group flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          aria-label="Copy link"
        >
          {copied ? (
            <>
              <Check size={18} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Tersalin!</span>
            </>
          ) : (
            <>
              <Copy size={18} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Salin Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

