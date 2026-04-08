import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

const BASE_TITLE = 'Centre Alilham — Dr Ilham YASSINE';
const BASE_DESC =
  'Spécialiste en Gynécologie Obstétrique à El Kelâa des Sraghna. Suivi de grossesse, échographie 3D-4D, fertilité, chirurgie gynécologique.';
const BASE_URL = 'https://centrealilham.ma';

export default function SEO({ title, description, path = '' }: SEOProps) {
  const fullTitle = title ? `${title} | Centre Alilham` : BASE_TITLE;
  const fullDesc = description ?? BASE_DESC;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <link rel="canonical" href={`${BASE_URL}${path}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:url" content={`${BASE_URL}${path}`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_MA" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}
