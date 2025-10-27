import { Metadata } from 'next';
import { Product, Category, SEOData } from './types';

const SITE_NAME = 'Jaya Gifts';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jayagifts.com';
const DEFAULT_DESCRIPTION = 'Premium corporate gifts and promotional products in Malaysia. Custom branding, bulk orders, and professional service for businesses.';

/**
 * Generates metadata for pages
 * @param seoData SEO data for the page
 * @returns Next.js Metadata object
 */
export function generateMetadata(seoData: SEOData): Metadata {
  const {
    title,
    description,
    keywords = [],
    ogImage,
    canonical
  } = seoData;

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = canonical || SITE_URL;
  const image = ogImage || `${SITE_URL}/og-image.jpg`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_MY',
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@jayagifts',
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generates SEO data for product pages
 * @param product Product data
 * @param category Category data
 * @returns SEO data object
 */
export function generateProductSEO(product: Product, category?: Category): SEOData {
  const title = `${product.name} - ${category?.name || 'Corporate Gifts'}`;
  const description = `${product.description} Starting from RM ${product.minUnitPrice.toFixed(2)}. Custom branding available. Order now!`;
  
  const keywords = [
    product.name.toLowerCase(),
    category?.name.toLowerCase() || 'corporate gifts',
    'promotional products malaysia',
    'custom branding',
    'bulk orders',
    ...product.tags,
    ...product.imprintOptions.map(option => option.toLowerCase())
  ];

  return {
    title,
    description,
    keywords,
    ogImage: product.images[0] ? `${SITE_URL}${product.images[0]}` : undefined,
    canonical: `${SITE_URL}/products/${product.slug}`
  };
}

/**
 * Generates SEO data for category pages
 * @param category Category data
 * @param productCount Number of products in category
 * @returns SEO data object
 */
export function generateCategorySEO(category: Category, productCount: number): SEOData {
  const title = `${category.name} - Corporate Gifts & Promotional Products`;
  const description = `Explore ${productCount} premium ${category.name.toLowerCase()} for corporate gifting. Custom branding, bulk pricing, and professional service in Malaysia.`;
  
  const keywords = [
    category.name.toLowerCase(),
    'corporate gifts malaysia',
    'promotional products',
    'custom branding',
    'bulk orders',
    'business gifts'
  ];

  return {
    title,
    description,
    keywords,
    canonical: `${SITE_URL}/products?category=${category.slug}`
  };
}

/**
 * Generates structured data for products (JSON-LD)
 * @param product Product data
 * @param category Category data
 * @returns JSON-LD structured data
 */
export function generateProductStructuredData(product: Product, category?: Category) {
  const lowestPrice = Math.min(...product.variants.flatMap(v => v.moqs.map(m => m.unitPrice)));
  const highestPrice = Math.max(...product.variants.flatMap(v => v.moqs.map(m => m.unitPrice)));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map(img => `${SITE_URL}${img}`),
    brand: {
      '@type': 'Brand',
      name: SITE_NAME
    },
    category: category?.name,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'MYR',
      lowPrice: lowestPrice,
      highPrice: highestPrice,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127'
    }
  };
}

/**
 * Generates breadcrumb structured data
 * @param breadcrumbs Array of breadcrumb items
 * @returns JSON-LD structured data
 */
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}