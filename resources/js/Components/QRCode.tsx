import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
import { useState, useRef } from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  title?: string;
  showDownload?: boolean;
  className?: string;
}

export function QRCode({ 
  value, 
  size = 200, 
  title = 'QR Code',
  showDownload = true,
  className = ''
}: QRCodeProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!qrRef.current) return;
    
    setDownloading(true);
    try {
      const svg = qrRef.current.querySelector('svg');
      if (!svg) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, size, size);
          ctx.drawImage(img, 0, 0);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `qrcode-${Date.now()}.png`;
              link.click();
              URL.revokeObjectURL(url);
            }
            setDownloading(false);
          });
        }
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    } catch (error) {
      console.error('Failed to download QR code:', error);
      setDownloading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div 
        ref={qrRef}
        className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200"
      >
        <QRCodeSVG
          value={value}
          size={size}
          level="H"
          includeMargin={true}
          fgColor="#000000"
          bgColor="#ffffff"
        />
      </div>
      {title && (
        <p className="text-sm font-medium text-gray-700 text-center max-w-[200px]">
          {title}
        </p>
      )}
      {showDownload && (
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
        >
          <Download size={16} />
          {downloading ? 'Mengunduh...' : 'Unduh QR Code'}
        </button>
      )}
    </div>
  );
}

