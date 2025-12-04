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
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <span className="text-sm font-medium text-gray-700 mr-2">Bagikan:</span>
      
      <button
        onClick={() => handleShare('facebook')}
        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        aria-label="Share on Facebook"
      >
        <Facebook size={16} />
        <span className="hidden sm:inline">Facebook</span>
      </button>

      <button
        onClick={() => handleShare('twitter')}
        className="flex items-center gap-2 px-3 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium"
        aria-label="Share on Twitter"
      >
        <Twitter size={16} />
        <span className="hidden sm:inline">Twitter</span>
      </button>

      <button
        onClick={() => handleShare('whatsapp')}
        className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle size={16} />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
        aria-label="Copy link"
      >
        {copied ? (
          <>
            <Check size={16} />
            <span className="hidden sm:inline">Tersalin!</span>
          </>
        ) : (
          <>
            <Copy size={16} />
            <span className="hidden sm:inline">Salin Link</span>
          </>
        )}
      </button>
    </div>
  );
}

