export function ContainerBackground({ index }: { index: number }) {
  const variants = [
    {
      bgGradient: 'bg-gradient-to-br from-amber-50 via-amber-50 to-white',
      svgPattern: 'waves',
      patternColor: '#d97706',
      patternOpacity: 0.06,
    },
    {
      bgGradient: 'bg-gradient-to-b from-white via-amber-50 to-white',
      svgPattern: 'dots',
      patternColor: '#d97706',
      patternOpacity: 0.05,
    },
    {
      bgGradient: 'bg-gradient-to-br from-white via-amber-50 to-amber-100',
      svgPattern: 'lines',
      patternColor: '#d97706',
      patternOpacity: 0.06,
    },
    {
      bgGradient: 'bg-gradient-to-br from-red-950 via-red-900 to-red-950',
      svgPattern: 'waves',
      patternColor: '#fcd34d',
      patternOpacity: 0.1,
    },
    {
      bgGradient: 'bg-gradient-to-b from-white via-amber-50 to-white',
      svgPattern: 'dots',
      patternColor: '#d97706',
      patternOpacity: 0.05,
    },
    {
      bgGradient: 'bg-gradient-to-br from-white via-amber-50 to-white',
      svgPattern: 'lines',
      patternColor: '#d97706',
      patternOpacity: 0.06,
    },
    {
      bgGradient: 'bg-gradient-to-b from-red-950 via-red-900 to-red-950',
      svgPattern: 'waves',
      patternColor: '#fcd34d',
      patternOpacity: 0.1,
    },
  ];

  const variant = variants[index] || variants[0];

  return (
    <div className={`absolute inset-0 -z-10 pointer-events-none ${variant.bgGradient} overflow-hidden`}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {variant.svgPattern === 'waves' && (
            <linearGradient id={`waveGrad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={variant.patternColor} stopOpacity={variant.patternOpacity * 1.5} />
              <stop offset="50%" stopColor={variant.patternColor} stopOpacity={variant.patternOpacity * 2} />
              <stop offset="100%" stopColor={variant.patternColor} stopOpacity={variant.patternOpacity} />
            </linearGradient>
          )}
          {variant.svgPattern === 'dots' && (
            <pattern id={`dots-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="8" r="2" fill={variant.patternColor} opacity={variant.patternOpacity} />
            </pattern>
          )}
          {variant.svgPattern === 'lines' && (
            <pattern id={`lines-${index}`} width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 60 L60 0" stroke={variant.patternColor} strokeWidth="0.8" opacity={variant.patternOpacity} />
            </pattern>
          )}
        </defs>

        {variant.svgPattern === 'waves' && (
          <g>
            <path d="M-200,150 Q0,120 200,150 T600,150 T1000,150 T1400,150 T1800,150" stroke={`url(#waveGrad-${index})`} strokeWidth="2" fill="none" />
            <path d="M-200,300 Q0,330 200,300 T600,300 T1000,300 T1400,300 T1800,300" stroke={`url(#waveGrad-${index})`} strokeWidth="1.5" fill="none" opacity="0.7" />
            <path d="M-200,450 Q0,420 200,450 T600,450 T1000,450 T1400,450 T1800,450" stroke={`url(#waveGrad-${index})`} strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M-200,600 Q0,630 200,600 T600,600 T1000,600 T1400,600 T1800,600" stroke={`url(#waveGrad-${index})`} strokeWidth="1.5" fill="none" opacity="0.6" />
          </g>
        )}
        {variant.svgPattern === 'dots' && (
          <rect width="1440" height="800" fill={`url(#dots-${index})`} />
        )}
        {variant.svgPattern === 'lines' && (
          <rect width="1440" height="800" fill={`url(#lines-${index})`} />
        )}
      </svg>
    </div>
  );
}
