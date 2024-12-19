import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Header from '../../components/layout/Header';
import EventComponent from '@/components/events/EventComponent';
import Footer from '../../components/layout/Footer';
import '../../styles/components/events/Global.css';
import '../../styles/components/events/Header.css';
import '../../styles/components/events/EventComponent.css';
import '../../styles/components/events/Footer.css';
import '../../styles/components/events/Umain.css';

const EventPage = () => {

    const router = useRouter();
    const { id } = router.query; 
    const [eventId, setEventId] = useState('');
    const [seoData, setSeoData] = useState('not-fetched');
    const [seoDataStatus, setSeoDataStatus] = useState('Unation');
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = () => resolve();
          script.onerror = (err) => reject(err);
          document.body.appendChild(script);
        });
      };
    
      useEffect(() => {
        // Load scripts dynamically
        const loadExternalScripts = async () => {
          try {
            // Load jQuery
            await loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js');
            console.log('jQuery loaded');
    
            // Load global script
            await loadScript('https://www.unation.com/wp-content/themes/hello-theme-child-master/aws/js/u-global.js');
            console.log('Global script loaded');
          } catch (error) {
            console.error('Error loading external scripts', error);
          }
        };
    
        loadExternalScripts();
      }, []);

      useEffect(() => {

        if(id !== ''){
          if (id && typeof id === "string" && id.includes("-")) { 
            const numberPart = id.split('-')[1];
            setEventId(numberPart);
            console.log("Extracted Number:", numberPart); 
        }
        }

      }, [id]);

      const endpoint = `/api/orbweaver/events/${eventId}/`;
  useEffect(() => {
    if (eventId && eventId !== '') {
      // Make the request only if eventId is not empty
      axios
        .get(endpoint)
        .then((response) => {
            setSeoData(response.data);
            setSeoDataStatus('fetched');
            console.log("seo data", response.data);
        })
        .catch((error) => {
            setSeoData('not-fetched');
            console.log("seo error data");
        });
    }
  }, [eventId]);

    return (
        <>
        {seoDataStatus === "fetched" ? (
        <>
            <Head>
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
            </Head>
            <Header />
            <EventComponent eventData={seoData}  />
            <Footer />
            </>
      ) : (
        seoDataStatus === "not-fetched" ? (
          <div className='event-not-found-box'>
        <Header />
        <h1>Page Not Found</h1>
        <Footer />
        </div>
        ) : ('')
      ) }
        </>
    );
};

export default EventPage;
