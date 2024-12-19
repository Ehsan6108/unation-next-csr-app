'use client'; // Enable client-side rendering for dynamic SEO
import React, { useEffect, useState } from 'react';
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
import { usePathname } from 'next/navigation';
import axios from 'axios';

// Load fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get current pathname
  const [seoData, setSeoData] = useState(null);
  const [seoStatus, setSeoStatus] = useState("loading");

  useEffect(() => {
    // Extract the slug from the pathname
    const slug = pathname?.split('/')[1]; // Assumes path is /<slug>

    if (slug && slug.includes('-')) {
      const [prefix, id] = slug.split('-');

      // Fetch SEO data using the ID
      const fetchSeoData = async () => {
        try {
          const response = await axios.get(`/api/orbweaver/events/${id}/`);
          setSeoData(response.data);
          setSeoStatus("fetched");
          console.log("layout jsx meta seo",response.data)
        } catch (error) {
          console.error("Error fetching SEO data:layout", error);
          setSeoStatus("not-fetched");
        }
      };

      fetchSeoData();
    } else {
      setSeoStatus("not-fetched");
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        {seoStatus === "fetched" && seoData ? (
          <>
            <title>{seoData.data.title || "Unation"}</title>
            <meta name="description" content={seoData.data.seo_meta} />
            <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
          <link rel="canonical" href={`/${seoData.data.slug}`} />
            <link rel="icon" href="https://www.unation.com/wp-content/themes/hello-theme-child-master/aws/img/apple-touch-icon-36x36.png" sizes="32x32" />
	<link rel="icon" href="https://www.unation.com/wp-content/themes/hello-theme-child-master/aws/img/apple-touch-icon.png" sizes="192x192" />
	<link rel="apple-touch-icon" href="https://www.unation.com/wp-content/themes/hello-theme-child-master/aws/img/apple-touch-icon.png" />
	<link rel="icon" href="https://qa.unation.com/wp-content/uploads/2021/11/apple-touch-icon-36x36.png" sizes="32x32" />
	<link rel="icon" href="https://qa.unation.com/wp-content/uploads/2021/11/apple-touch-icon.png" sizes="192x192" />
	<link rel="apple-touch-icon" href="https://qa.unation.com/wp-content/uploads/2021/11/apple-touch-icon.png" />
	<meta name="msapplication-TileImage" content="https://qa.unation.com/wp-content/uploads/2021/11/apple-touch-icon.png" />
            <meta name="keywords" content={seoData.data.keywords} />
            <meta property="og:title" content={seoData.data.title} />
            <meta property="og:description" content={seoData.data.seo_meta} />
            <meta property="og:url" content={`/${seoData.data.slug}`} />
            <meta property="og:image" content={seoData.data.thumbnail} />
            <meta name="twitter:title" content={seoData.data.title} />
            <meta name="twitter:description" content={seoData.data.seo_meta} />
            <meta name="twitter:image" content={seoData.data.thumbnail} />
          </>
        ) : (
          <>
            {/* Default metadata */}
            <title>Unation</title>
            <meta name="description" content="Default description" />
          </>
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
      </body>
    </html>
  );
}
