import { Head } from '@inertiajs/react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = 'Reog Ponorogo - Warisan Budaya UNESCO 2025',
  description = 'Sistem Informasi Warisan Budaya UNESCO Reog Ponorogo 2025. Jelajahi keindahan budaya, sejarah, dan pertunjukan Reog Ponorogo yang telah diakui sebagai Warisan Budaya Takbenda UNESCO.',
  keywords = 'Reog Ponorogo, UNESCO, Warisan Budaya, Indonesia, Tarian Tradisional, Budaya Jawa, Ponorogo',
  image = '/images/reog-ponorogo-og.jpg',
  url = '',
  type = 'website',
}: SEOProps) {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Reog Ponorogo" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Indonesian" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Reog Ponorogo" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Additional */}
      <link rel="canonical" href={fullUrl} />
    </Head>
  );
}

