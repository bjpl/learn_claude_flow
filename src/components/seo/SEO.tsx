/**
 * SEO Component
 * Provides comprehensive meta tags, OpenGraph, Twitter Cards, and structured data
 */

import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'book' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: object;
}

const DEFAULT_SEO = {
  title: 'Learn Claude Flow - Interactive Documentation and Learning Platform',
  description: 'Master Claude Flow with our interactive documentation viewer. Search, bookmark, and explore comprehensive guides, API references, and best practices for AI-powered development workflows.',
  keywords: [
    'Claude Flow',
    'AI development',
    'documentation',
    'learning platform',
    'interactive docs',
    'API reference',
    'development workflow',
    'AI agents',
    'automation',
    'SPARC methodology',
  ],
  author: 'Claude Flow Team',
  image: '/og-image.png',
  url: 'https://learn-claude-flow.example.com',
  type: 'website' as const,
};

export function SEO({
  title,
  description = DEFAULT_SEO.description,
  keywords = DEFAULT_SEO.keywords,
  author = DEFAULT_SEO.author,
  image = DEFAULT_SEO.image,
  url = DEFAULT_SEO.url,
  type = DEFAULT_SEO.type,
  publishedTime,
  modifiedTime,
  section,
  tags,
  canonical,
  noindex = false,
  nofollow = false,
  structuredData,
}: SEOProps) {
  // Construct full title
  const fullTitle = title
    ? `${title} | Learn Claude Flow`
    : DEFAULT_SEO.title;

  // Construct full URL for image
  const fullImageUrl = image.startsWith('http')
    ? image
    : `${url}${image}`;

  // Construct canonical URL
  const canonicalUrl = canonical || url;

  // Robots meta content
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
  ].join(', ');

  // Default structured data for website
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Learn Claude Flow',
    description: DEFAULT_SEO.description,
    url: DEFAULT_SEO.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${DEFAULT_SEO.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Generate structured data for documentation
  const documentStructuredData = type === 'article' ? {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title || fullTitle,
    description: description,
    image: fullImageUrl,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Learn Claude Flow',
      logo: {
        '@type': 'ImageObject',
        url: `${url}/logo.png`,
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    articleSection: section,
    keywords: keywords.join(', '),
  } : null;

  // Use provided structured data or defaults
  const finalStructuredData = structuredData || documentStructuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={title || 'Learn Claude Flow'} />
      <meta property="og:site_name" content="Learn Claude Flow" />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific Open Graph tags */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title || 'Learn Claude Flow'} />
      <meta name="twitter:creator" content="@ClaudeFlow" />
      <meta name="twitter:site" content="@ClaudeFlow" />

      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Learn Claude Flow" />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
}

/**
 * Document-specific SEO component
 */
export interface DocumentSEOProps {
  documentTitle: string;
  documentDescription: string;
  category?: string;
  tags?: string[];
  pageNumber?: number;
  totalPages?: number;
  lastModified?: Date;
  documentId: string;
}

export function DocumentSEO({
  documentTitle,
  documentDescription,
  category,
  tags = [],
  pageNumber,
  totalPages,
  lastModified,
  documentId,
}: DocumentSEOProps) {
  const baseUrl = DEFAULT_SEO.url;
  const documentUrl = `${baseUrl}/doc/${documentId}${pageNumber ? `/page/${pageNumber}` : ''}`;

  const title = pageNumber
    ? `${documentTitle} - Page ${pageNumber}/${totalPages}`
    : documentTitle;

  const description = pageNumber
    ? `${documentDescription} (Page ${pageNumber} of ${totalPages})`
    : documentDescription;

  const keywords = [
    ...DEFAULT_SEO.keywords,
    ...(category ? [category] : []),
    ...tags,
  ];

  return (
    <SEO
      title={title}
      description={description}
      keywords={keywords}
      url={documentUrl}
      type="article"
      section={category}
      tags={tags}
      publishedTime={lastModified?.toISOString()}
      modifiedTime={lastModified?.toISOString()}
      canonical={`${baseUrl}/doc/${documentId}`}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        '@id': documentUrl,
        name: documentTitle,
        description: documentDescription,
        educationalLevel: 'Intermediate',
        learningResourceType: 'Documentation',
        inLanguage: 'en',
        url: documentUrl,
        isPartOf: {
          '@type': 'Course',
          name: 'Claude Flow Documentation',
          description: 'Comprehensive guide to Claude Flow development',
          provider: {
            '@type': 'Organization',
            name: 'Learn Claude Flow',
          },
        },
        keywords: keywords.join(', '),
        dateModified: lastModified?.toISOString(),
      }}
    />
  );
}

/**
 * Search page SEO component
 */
export function SearchSEO({ query }: { query?: string }) {
  const baseUrl = DEFAULT_SEO.url;
  const searchUrl = query
    ? `${baseUrl}/search?q=${encodeURIComponent(query)}`
    : `${baseUrl}/search`;

  const title = query
    ? `Search results for "${query}"`
    : 'Search Documentation';

  const description = query
    ? `Find documentation and guides related to "${query}" in Learn Claude Flow`
    : 'Search through comprehensive Claude Flow documentation, guides, and API references';

  return (
    <SEO
      title={title}
      description={description}
      url={searchUrl}
      noindex={!!query} // Don't index individual search result pages
      canonical={`${baseUrl}/search`}
    />
  );
}

/**
 * Category/Section SEO component
 */
export function CategorySEO({
  category,
  description,
  documentCount
}: {
  category: string;
  description?: string;
  documentCount?: number;
}) {
  const baseUrl = DEFAULT_SEO.url;
  const categoryUrl = `${baseUrl}/category/${encodeURIComponent(category.toLowerCase())}`;

  const fullDescription = description ||
    `Browse ${documentCount || ''} documents in ${category} category. Learn about ${category.toLowerCase()} with comprehensive guides and tutorials.`;

  return (
    <SEO
      title={`${category} Documentation`}
      description={fullDescription}
      url={categoryUrl}
      keywords={[...DEFAULT_SEO.keywords, category, `${category} guide`, `${category} tutorial`]}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${category} Documentation`,
        description: fullDescription,
        url: categoryUrl,
        numberOfItems: documentCount,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Learn Claude Flow',
          url: baseUrl,
        },
      }}
    />
  );
}
