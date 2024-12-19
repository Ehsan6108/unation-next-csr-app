'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import EventComponent from '@/components/events/EventComponent';
import Footer from '@/components/layout/Footer';
import EventEnded from '@/components/layout/Notfound';
import '../../styles/components/events/Global.css';
import '../../styles/components/events/Umain.css';
import '../../styles/components/events/Header.css';
import '../../styles/components/events/Footer.css';
import '../../styles/components/events/EventComponent.css';

export default function Page() {
    const pathname = usePathname(); // Get the current pathname
    const [eventId, setEventId] = useState('');
    const [seoData, setSeoData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadExternalStyles = (href) => {
          return new Promise((resolve, reject) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
          });
        };
    
        const loadExternalScripts = async (src) => {
          return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        };
    
        const loadAssets = async () => {
          try {
            // Load CSS
            await loadExternalStyles("https://www.unation.com/wp-content/themes/hello-theme-child-master/aws/css/u-global.css?");
            await loadExternalStyles("https://www.unation.com/wp-content/themes/hello-theme-child-master/aws/css/u-main.css?");
            await loadExternalStyles("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap");
            await loadExternalStyles("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    
            // Load JS
            await loadExternalScripts("https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js");
            await loadExternalScripts("https://www.unation.com/wp-content/themes/hello-theme-child-master/aws/js/u-global.js");
    
            console.log("External scripts and styles loaded");
    
            // Initialize jQuery interactions
            jQuery(".category-dropdown .cstmcatefry_icon > ul > li").each(function () {
              jQuery(this).mouseenter(function () {
                jQuery(".category-dropdown .cstmcatefry_icon > ul > li").removeClass("active");
                jQuery(this).addClass("active");
              });
            });
          } catch (error) {
            console.error("Error loading external assets", error);
          }
        };
    
        loadAssets();
      }, []);

    useEffect(() => {
        const slug = window.location.href.split('-')[1]; // Extract ID from URL
        if (slug) {
            setEventId(slug);
            axios
                .get(`https://orbweaver2staging-udata.unation.com/api/events/${slug}/`)
                .then((response) => {
                    setSeoData(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    // console.error('Error fetching event data:', error);
                    setSeoData(null);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [pathname]);

    if (loading) {
        return (
            <>
                <Header />
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            {seoData ? (
                <>
                    <head>
            <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
              <link rel="icon" href="https://www.unation.com/wp-content/themes/hello-theme-child-master/aws/img/apple-touch-icon-36x36.png" sizes="32x32" />
              <link rel="icon" href="https://www.unation.com/wp-content/themes/hello-theme-child-master/aws/img/apple-touch-icon.png" sizes="192x192" />
              <link rel="apple-touch-icon" href="https://www.unation.com/wp-content/themes/hello-theme-child-master/aws/img/apple-touch-icon.png" />
              <link rel="icon" href="https://qa.unation.com/wp-content/uploads/2021/11/apple-touch-icon-36x36.png" sizes="32x32" />
              <link rel="icon" href="https://qa.unation.com/wp-content/uploads/2021/11/apple-touch-icon.png" sizes="192x192" />
              <link rel="apple-touch-icon" href="https://qa.unation.com/wp-content/uploads/2021/11/apple-touch-icon.png" />
              <meta name="msapplication-TileImage" content="https://qa.unation.com/wp-content/uploads/2021/11/apple-touch-icon.png" />
                <meta charSet="UTF-8" />
                <title>{seoData.data.title ? seoData.data.title : 'Unation'}</title>
                <meta name="description" content={seoData.data.seo_meta} />
                <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
                <link rel="canonical" href={'/'+seoData.data.slug} />
                <meta name="keywords" content={seoData.data.keywords} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="event" />
                <meta property="og:title" content={seoData.data.title} />
                <meta property="og:description" content={seoData.data.seo_meta} />
                <meta property="og:url" content={'/'+seoData.data.slug} />
                <meta property="og:site_name" content="UNATION" />
                <meta property="fb:app_id" content="609954230289640" />
                <meta property="og:image" content={seoData.data.thumbnail} />
                <meta property="og:image:secure_url" content={seoData.data.thumbnail} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seoData.data.title} />
                <meta name="twitter:description" content={seoData.data.seo_meta} />
                <meta name="twitter:site" content="@https://twitter.com/unation" />
            </head>
                    <EventComponent eventData={seoData} />
                </>
            ) : (
                <div className="event-not-found-box">
                    <EventEnded />
                </div>
            )}
            <Footer />
        </>
    );
}
