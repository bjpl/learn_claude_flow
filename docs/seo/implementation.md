# SEO Implementation Guide

## Overview

This document describes the comprehensive SEO implementation for the Learn Claude Flow documentation platform, including dynamic meta tags, OpenGraph support, Twitter Cards, structured data, and sitemap generation.

## Components

### 1. SEO Component (`src/components/seo/SEO.tsx`)

The main SEO component provides comprehensive meta tag support:

#### Features
- **Dynamic Meta Tags**: Title, description, keywords, author
- **OpenGraph Tags**: Full Facebook/social media support
- **Twitter Cards**: Summary with large image cards
- **Structured Data**: JSON-LD for rich search results
- **Robots Control**: Index/noindex, follow/nofollow
- **Canonical URLs**: Prevent duplicate content issues

#### Usage

```tsx
import { SEO } from '@/components/seo';

// Basic usage
<SEO
  title="Getting Started"
  description="Learn how to get started with Claude Flow"
  keywords={['tutorial', 'beginner', 'guide']}
/>

// Advanced usage with structured data
<SEO
  title="API Reference"
  type="article"
  publishedTime="2025-09-30T00:00:00Z"
  section="Documentation"
  tags={['api', 'reference', 'technical']}
  structuredData={{
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    // ... custom structured data
  }}
/>
```

### 2. Specialized SEO Components

#### DocumentSEO
For individual documentation pages with automatic structured data:

```tsx
import { DocumentSEO } from '@/components/seo';

<DocumentSEO
  documentTitle="Claude Flow Architecture"
  documentDescription="Comprehensive guide to Claude Flow system architecture"
  category="Architecture"
  tags={['system-design', 'architecture']}
  pageNumber={2}
  totalPages={10}
  lastModified={new Date('2025-09-30')}
  documentId="arch-001"
/>
```

Features:
- Automatic LearningResource structured data
- Page-specific meta tags
- Canonical URL management
- Course integration metadata

#### SearchSEO
For search results pages:

```tsx
import { SearchSEO } from '@/components/seo';

<SearchSEO query="swarm coordination" />
```

Features:
- Query-specific titles
- Automatic noindex for search results
- Canonical URL to main search page

#### CategorySEO
For category/section pages:

```tsx
import { CategorySEO } from '@/components/seo';

<CategorySEO
  category="Getting Started"
  description="Beginner tutorials and guides"
  documentCount={12}
/>
```

Features:
- CollectionPage structured data
- Document count integration
- Category-specific keywords

### 3. Sitemap Generation

#### Script: `scripts/generateSitemap.ts`

Automatically generates a complete sitemap from documentation metadata.

**Run:**
```bash
npx tsx scripts/generateSitemap.ts
```

**Features:**
- Loads documentation from `public/docs/documentation.json`
- Generates URLs for all documents, categories, and static pages
- Sets appropriate priority and change frequency
- Outputs to `public/sitemap.xml`

**Generated URLs:**
- Homepage (priority 1.0)
- Search page (priority 0.8)
- All documentation pages (priority 0.7)
- Category pages (priority 0.6)
- Settings page (priority 0.3)

#### Integration with Build Process

Add to `package.json`:
```json
{
  "scripts": {
    "build": "npm run extract-docs && npm run generate-sitemap && tsc && vite build",
    "generate-sitemap": "npx tsx scripts/generateSitemap.ts"
  }
}
```

### 4. Robots.txt

Location: `public/robots.txt`

**Features:**
- Allows all crawlers
- Disallows search result pages (prevents duplicate content)
- Disallows settings pages
- Specifies sitemap location
- Sets crawl-delay for respectful crawling
- Bot-specific rules for Google, Bing, DuckDuckGo

### 5. OpenGraph Image

Location: `public/og-image.png`

**Specifications:**
- Size: 1200x630px
- Format: PNG or JPEG
- Max size: 8MB
- Content: Branding + key visual + clear text

**TODO:** Replace placeholder with actual image

## Route Integration

### Document Viewer Route

```tsx
// src/views/DocumentViewerRoute.tsx
export default function DocumentViewerRoute() {
  const { documentId, pageNumber } = useParams();
  const document = useDocumentStore(state =>
    state.documents.find(d => d.id === documentId)
  );

  return (
    <>
      <DocumentSEO
        documentTitle={document.title}
        documentDescription={document.description}
        // ... other props
      />
      <DocumentViewer document={document} />
    </>
  );
}
```

### Search Route

```tsx
// src/views/SearchRoute.tsx
export default function SearchRoute() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  return (
    <>
      <SearchSEO query={query} />
      <AdvancedSearch initialQuery={query} />
    </>
  );
}
```

### Root Layout

```tsx
// src/layouts/RootLayout.tsx
export function RootLayout() {
  return (
    <>
      <SEO /> {/* Default SEO for all pages */}
      <Outlet />
    </>
  );
}
```

## Structured Data Examples

### Website

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Learn Claude Flow",
  "description": "Interactive documentation platform",
  "url": "https://learn-claude-flow.example.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://learn-claude-flow.example.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### LearningResource (Documentation)

```json
{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "Claude Flow Architecture",
  "description": "System design guide",
  "educationalLevel": "Intermediate",
  "learningResourceType": "Documentation",
  "inLanguage": "en",
  "isPartOf": {
    "@type": "Course",
    "name": "Claude Flow Documentation",
    "provider": {
      "@type": "Organization",
      "name": "Learn Claude Flow"
    }
  }
}
```

### CollectionPage (Category)

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Getting Started Documentation",
  "description": "Beginner guides and tutorials",
  "numberOfItems": 12,
  "isPartOf": {
    "@type": "WebSite",
    "name": "Learn Claude Flow"
  }
}
```

## Best Practices

### 1. Title Optimization
- Keep under 60 characters
- Include primary keyword
- Use consistent format: `{Page Title} | Learn Claude Flow`

### 2. Description Optimization
- Keep between 150-160 characters
- Include primary and secondary keywords
- Make it compelling for click-through

### 3. Keywords
- Use 5-10 relevant keywords
- Include both broad and specific terms
- Combine default keywords with page-specific ones

### 4. Canonical URLs
- Always specify canonical for paginated content
- Point to the first page of series
- Prevents duplicate content penalties

### 5. Structured Data
- Use specific types (LearningResource, TechArticle, etc.)
- Include all relevant properties
- Test with Google Rich Results Test

### 6. Images
- Always provide alt text
- Use appropriate OpenGraph images (1200x630)
- Optimize file sizes

## Testing

### 1. Meta Tags
Use browser dev tools or online checkers:
- [Meta Tags Checker](https://metatags.io/)
- Chrome DevTools > Elements > `<head>`

### 2. OpenGraph
Preview how your pages appear on social media:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 3. Structured Data
Validate JSON-LD markup:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### 4. Sitemap
Verify sitemap format:
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- Submit to Google Search Console

### 5. Mobile Optimization
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- Test responsive meta tags

## Performance Considerations

### 1. react-helmet-async
- Uses async rendering to avoid blocking
- Deduplicates tags automatically
- Server-side rendering ready

### 2. Code Splitting
- SEO components lazy loaded per route
- Minimal impact on initial bundle size

### 3. Caching
- Static meta tags cached by browsers
- Sitemap.xml served with long cache headers

## Monitoring

### 1. Search Console
- Monitor indexing status
- Track search performance
- Check for crawl errors
- Review structured data

### 2. Analytics
- Track organic traffic
- Monitor bounce rates
- Analyze search queries
- Track page performance

### 3. Regular Audits
- Monthly SEO audits
- Quarterly content reviews
- Update sitemap on content changes
- Review and update keywords

## Future Enhancements

1. **Multi-language Support**
   - hreflang tags
   - Language-specific meta tags
   - Translated structured data

2. **Enhanced Structured Data**
   - FAQ schema for Q&A sections
   - VideoObject for video content
   - BreadcrumbList navigation

3. **Social Media Integration**
   - Dynamic OG images per document
   - Twitter-specific cards
   - LinkedIn article optimization

4. **Performance Monitoring**
   - Core Web Vitals tracking
   - SEO score monitoring
   - Automated lighthouse audits

## Deployment Checklist

- [ ] Update SITE_URL in generateSitemap.ts
- [ ] Generate production sitemap
- [ ] Create og-image.png (1200x630)
- [ ] Verify robots.txt rules
- [ ] Test all meta tags in production
- [ ] Submit sitemap to search engines
- [ ] Set up Google Search Console
- [ ] Configure analytics tracking
- [ ] Test social media previews
- [ ] Validate all structured data

## Support

For SEO-related issues or questions:
- Review Google Search Console reports
- Check meta tag rendering in browser
- Validate structured data with Google tools
- Monitor search performance analytics
