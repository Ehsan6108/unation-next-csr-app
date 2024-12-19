import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Slider from "react-slick";
import '../../styles/components/events/Global.css';
import '../../styles/components/events/Umain.css';
import '../../styles/components/events/EventComponent.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EventComponent = ({ eventData }) => {

  const [currentUrl, setCurrentUrl] = useState('');
  const [apiData, setApiData] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventThumbnail, setEventThumbnail] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventTicketURL, setEventTicketURL] = useState('');
  const [eventdetailurl, setEventDetailUrl] = useState('');
  const [eventAgeRistriction, setEventAgeRistriction] = useState('');
  const [eventPartnerName, setEventPartnerName] = useState('');
  const [eventPartnerLogo, setEventPartnerLogo] = useState('');
  const [eventTicketPrice, setEventTicketPrice] = useState('');
  const [eventTicketMinPrice, setEventTicketMinPrice] = useState('');
  const [eventTicketMaxPrice, setEventTicketMaxPrice] = useState('');
  const [eventVirtual, setEventVirtual] = useState('');
  const [fullAddress, setfullAddress] = useState('');
  const [addressPlace, setAddressPlace] = useState('');
  const [addressArea, setAddressArea] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventLoadChecker, setEventLoadChecker] = useState('no');
  const [eventCheckRecursive, setEventCheckRecursive] = useState(0);

  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [eventsData, setEventsData] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      setCurrentUrl(url);
    }
  }, []);

  const handleSaveTogglePopup = () => {
    setIsSaveOpen(!isSaveOpen);
  }
  const handleShareTogglePopup = () => {
    setIsShareOpen(!isShareOpen);
  }

  const handleOptionTogglePopup = () => {
    setIsOptionOpen(!isOptionOpen);
    console.log("option open");
  }

  const [isCopied, setIsCopied] = useState(false); // State to track copy status

  const handleCopy = () => {
    const urlToCopy = currentUrl;

    // Use the Clipboard API to copy the URL to the clipboard
    navigator.clipboard.writeText(urlToCopy).then(() => {
      setIsCopied(true);

      // Reset the "Copied!" state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    }).catch((error) => {
      console.error("Failed to copy: ", error);
    });

  }

  useEffect(() => {
    if (eventData && eventData !== '') {
      // Make the request only if eventId is not empty
      setApiData(eventData);
    }
  }, [eventData]); // Trigger the effect when eventId changes

  useEffect(() => {
    if (apiData !== null) {
      setEventTitle(apiData.data.title);
      setEventThumbnail(apiData.data.thumbnail);
      setEventDescription(apiData.data.unation_decription);
      setEventTicketURL(apiData.data.ticket_url);
      setEventDetailUrl(apiData.data.event_detail_url);
      setEventAgeRistriction(apiData.data.age_restriction);
      setEventPartnerName(apiData.data.partner.name);
      setEventPartnerLogo(apiData.data.partner.logo);
      setEventTicketPrice(apiData.data.ticket_price);
      setEventTicketMinPrice(apiData.data.ticket_min_price);
      setEventTicketMaxPrice(apiData.data.ticket_max_price);
      setfullAddress(apiData.data.full_address);
      setAddressArea(apiData.data.address_event.address.label);
      setAddressPlace(apiData.data.address_event.address.name);
      setEventVirtual(apiData.data.virtual);
      setEventStartDate(apiData.data.start_date);
      setEventEndDate(apiData.data.end_date);

      if (apiData.data.is_recurring_event === 1) {
        setEventCheckRecursive(1);

        // Parse the event data
        const events = apiData.data.recursive_events.map((event) => {
          const dateObj = new Date(event.start_date);
          return {
            ...event,
            year: dateObj.getFullYear(),
            monthIndex: dateObj.getMonth(), // 0 for Jan, 1 for Feb, etc.
          };
        });

        // Sort events by year and month
        const sortedEvents = events.sort((a, b) => {
          if (a.year === b.year) {
            return a.monthIndex - b.monthIndex;
          }
          return a.year - b.year;
        });

        setEventsData(sortedEvents);

        // Extract unique months in sorted order
        const sortedMonths = [...new Set(sortedEvents.map((event) => event.month_name))];
        setAvailableMonths(sortedMonths);
      } else {
        setEventCheckRecursive(0);
      }


      console.log("data fetched", apiData.data);
    }

  }, [apiData]);

  const formatDateTime = (startDate, endDate) => {
    const optionsDate = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };

    const start = new Date(startDate);
    const end = new Date(endDate);

    const formattedStartDate = start.toLocaleDateString('en-US', optionsDate);
    const formattedStartTime = start.toLocaleTimeString('en-US', optionsTime);

    const formattedEndDate = end.toLocaleDateString('en-US', optionsDate);
    const formattedEndTime = end.toLocaleTimeString('en-US', optionsTime);

    return {
      formattedStartDate,
      formattedStartTime,
      formattedEndDate,
      formattedEndTime,
    };
  };

  const { formattedStartDate, formattedStartTime, formattedEndDate, formattedEndTime } = formatDateTime(
    eventStartDate,
    eventEndDate
  );



  const wordLimit = 20;

  // Split the description into an array of words
  const descriptionWords = eventDescription.split(" ");
  const isLongDescription = descriptionWords.length > wordLimit;

  // State to track whether the full description is shown
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Truncate the description to 100 words
  const truncatedDescription = descriptionWords.slice(0, wordLimit).join(" ") + (isLongDescription ? "..." : "");

  // Toggle the description visibility
  const handleReadMoreClick = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  // Function to handle tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderEvents = () => {
    let filteredEvents = [];

    if (activeTab === 'all') {
      filteredEvents = eventsData;
    } else {
      filteredEvents = eventsData.filter((event) => event.month_name === activeTab);
    }

    // Sort events by date
    const sortedEvents = [...filteredEvents].sort((a, b) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);
      return dateA - dateB; // Ascending order
    });

    return sortedEvents.map((event) => (
      <div
        key={event.event_id}
        className={`upcoming-event-month-${event.month_name}-${event.start_date.split(' ')[1]}-${event.start_date.split(' ')[2]} border-section flex justify-content-between`}
      >
        <div className="events-date flex">
          <h5>
            <img 
            src="https://qa.unation.com/wp-content/themes/hello-theme-child-master/aws/img/events-cal-ic.svg"
            alt="Event Calendar Icon"
            loading="lazy"
            />
            <span>{event.start_date}</span>
          </h5>
          <h5>
            <img
            src="https://qa.unation.com/wp-content/themes/hello-theme-child-master/aws/img/events-time-ic.svg" alt="Event Time Icon" loading="lazy"
            
            />
            <span>{event.start_time}</span>
          </h5>
        </div>
        <div className="get-ticket-btn">
          <Link href={event.url} target="_blank" rel="noopener noreferrer">
          <img src="https://qa.unation.com/wp-content/themes/hello-theme-child-master/aws/img/get-ticket-black-ic.svg" alt="Get Tickets Icon" loading="lazy" />
            Get tickets
          </Link>
        </div>
      </div>
    ));
  };


  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 12,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <>
      {apiData != null ? (
        <div className="main-container">
          <section className="u-block events-title-with-image">
            <div className="u-block-in fw">
              <div className="breadcrumb">
                <ul className="breadcrumb-list flex">
                  <li><Link href="#">Florida</Link></li>
                  <li><Link href="#">Tampa Bay</Link></li>
                  <li>Tampa Bay</li>
                </ul>
              </div>
              <div className="events-title-with-image-container flex">
                <div className="events-main-image">
                  {eventThumbnail != "" ? (
                    <Image
                      src={eventThumbnail}
                      alt="Event Thumbnail"
                      width={400}
                      height={200}
                      loading="lazy"
                    />
                  ) : ('')}

                </div>
                <div className="event-main-content">
                  <h1>{eventTitle != "" ? eventTitle : ''}</h1>
                  <div className="save-share-option">
                    <button className="save-btn-plain" onClick={handleSaveTogglePopup}>
                      <img
                      src="https://www.unation.com/wp-content/themes/hello-theme-child-master/aws/img/save-plain-ic.svg"
                      alt="Save"
                      loading="lazy"
                       />
                    </button>
                    <button className="share-btn-plain" onClick={handleShareTogglePopup}>
                      <img
                      src="https://www.unation.com/wp-content/themes/hello-theme-child-master/aws/img/share-plain-ic.svg"
                      alt="Share"
                      loading="lazy"
                       />
                    </button>
                    <div className="option-block" onClick={handleOptionTogglePopup}>
                      <button className="add-option">
                        <img
                          src="https://www.unation.com/wp-content/themes/hello-theme-child-master/aws/img/vertical-dots-ic.svg"
                          alt="Options"
                          loading="lazy"
                        />
                      </button>
                      {isOptionOpen && (
                        <div className="option-content" style={{ display: 'block' }}>
                          <Link href="#">Add to calendar</Link>
                          <Link href={eventdetailurl} target="_blank" rel="noopener noreferrer">Get directions</Link>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="event-main-content-inn">
                    <div className="event-info-item multy-date date-time-item">
                      <h5>{formattedStartDate === formattedEndDate
                        ? formattedEndDate
                        : `${formattedStartDate} - ${formattedEndDate}`}{' '} </h5>
                      <h6>{formattedStartTime} - {formattedEndTime}</h6>
                      {eventCheckRecursive === 1 ? (
                      <div className="multiple-dates mobile">
                        <p>
                          <a href="#upcoming-dates" className="multiple-date-btn">
                            <span>Multiple dates</span>
                          </a>
                        </p>
                      </div>
                      ) : ('')}
                    </div>
                    <div className="event-info-item multy-date date-item flex">
                      <h6>
                        {formattedStartDate === formattedEndDate
                          ? formattedEndDate
                          : `${formattedStartDate} - ${formattedEndDate}`}{" "}
                        <span>
                          {formattedStartTime} - {formattedEndTime}
                        </span>
                      </h6>
                      {eventCheckRecursive === 1 ? (
                      <div className="multiple-dates">
                        <p>
                          <a href="#upcoming-dates" className="multiple-date-btn">
                            <span>Multiple dates</span>
                          </a>
                        </p>
                      </div>
                      ) : ('')}
                    </div>
                    <div className="event-info-item location-item flex">
                      <h5>{addressPlace}</h5>
                      <h6>{addressArea}</h6>
                    </div>
                    <div className="back-share-get-tickets2 flex">
                      <div className="get-tickets-btn-wrap2 flex">
                        <div className="event-info-price-wrap2">
                          <div className="event-info-item free-item flex">
                            <h6>
                              {eventTicketPrice ? `$${eventTicketPrice}` :
                                eventTicketMaxPrice === 0 || eventTicketMaxPrice === null ?
                                  eventTicketMinPrice === 0 || eventTicketMinPrice === null ?
                                    "Free" :
                                    `$${eventTicketMinPrice}` :
                                  `Free - $${eventTicketMaxPrice}`}
                            </h6>
                          </div>
                        </div>
                        <a
                          href={eventTicketURL}
                          className="get-tickets-btn"
                          target="_blank"
                          rel="sponsored"
                        >
                          <span>
                            <img
                              src="https://assets.unation.com/wp-content/plugins/orbweaver-event-view/img/get-ticket-ic.svg"
                              alt="Get Tickets"
                              loading="lazy"
                            />
                            Get tickets
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Event Description */}
          <section className="u-block events-information">
            <div className="u-block-in fw">
              <div className="events-information-container">
                <div className="events-information-block">
                  <div className="u-block-heading-with-all-btn flex">
                    <div className="u-block-heading">
                      <h2>Description</h2>
                    </div>
                    <div className="see-all-btn">
                      <Link href={eventdetailurl}>
                        <span className="btn-txt">See website</span>
                        <span>
                        <img
                            src="https://assets.unation.com/wp-content/plugins/orbweaver-event-view/img/see-all-btn-arrow.svg"
                            alt="See All"
                            loading="lazy"
                        />
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="events-description">
                    <div className="events-description-content2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: showFullDescription ? eventDescription : truncatedDescription,
                        }}
                      />
                    </div>

                    {eventDescription?.length > 200 && (
                      <button className="readmore-btn2" onClick={handleReadMoreClick}>
                        <span className="btn-txt">{showFullDescription ? "Read less" : "Read more"}</span>
                      </button>
                    )}
                    {eventAgeRistriction && (
                      <ul className="cat-list">
                        <li>
                          <Link href="#">{eventAgeRistriction}</Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>

                {eventCheckRecursive === 1 ? (
                  <div className="upcoming-dates" id="upcoming-dates">
                  <div className="u-block-heading-with-all-btn">
                    <div className="u-block-heading">
                      <h2>Upcoming dates</h2>
                    </div>
                  </div>
                  <div className="container">
      {/* Month Slider */}
      <div className="tab-slider--nav">
        <Slider {...sliderSettings}>
          <div
            className={`tab-slider--trigger ${activeTab === "all" ? "active" : ""}`}
            onClick={() => handleTabClick("all")}
          >
            <span>ALL</span>
          </div>
          {availableMonths.map((month) => (
            <div
              key={month}
              className={`tab-slider--trigger ${activeTab === month ? "active" : ""}`}
              onClick={() => handleTabClick(month)}
            >
              <span>{month.slice(0, 3)}</span>
            </div>
          ))}
        </Slider>
      </div>

      {/* Event Content */}
      <div className="tab-slider--container">
        <div className="tab-slider--body">
          <div className="upcoming-dates-section">{renderEvents()}</div>
        </div>
      </div>
    </div>
                </div>
                ) : ('')}
                <div className="events-information-block">
                  <div className="u-block-heading-with-all-btn flex">
                    <div className="u-block-heading">
                      <h2>Created by</h2>
                    </div>
                  </div>
                  <div className="author-created-wrap">
                    <div className="author-img-name flex">
                      <div className="author-img">
                        <img loading="lazy" src={eventPartnerLogo != "" ? eventPartnerLogo : ''} style={{ maxWidth: "150px" }} />
                      </div>
                      <h6 className="author-name"> <a href="#">{eventPartnerName} </a></h6>
                    </div>
                  </div>
                </div>

                <div className="note-section u-block">
                <div className="border-bottom-top">
                  <p>Note: This event may contain affiliate links curated by our local city teams, therefore,
                    UNATION may collect a share of sales or other compensation for all purchases made.
                  </p>
                </div>
              </div>
              </div>
            </div>
          </section>
        </div>
      ) : (<></>)}


      {isSaveOpen && (
        <div className="un-save-popup open">
          <div className="un-save-popup-box">
            <span className="close-btn" onClick={handleSaveTogglePopup}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.865 1.13497C12.6851 0.955 12.3933 0.955023 12.2134 1.13497L6.99999 6.34835L1.78664 1.13499C1.60668 0.955028 1.31493 0.955028 1.13497 1.13499C0.955009 1.31494 0.955011 1.60668 1.13497 1.78665L6.34832 7L1.13498 12.2133C0.955032 12.3933 0.955025 12.6851 1.13498 12.865C1.31494 13.045 1.6067 13.045 1.78665 12.865L6.99999 7.65167L12.2133 12.865C12.3933 13.045 12.6851 13.045 12.865 12.865C13.045 12.6851 13.045 12.3933 12.865 12.2134L7.65166 7L12.865 1.78662C13.045 1.60668 13.045 1.31493 12.865 1.13497Z"
                  fill="#141515"
                  stroke="#141515"
                  strokeWidth="0.5"
                ></path>
              </svg>
            </span>
            <div className="un-save-popup-box-inn">
              <h4>VIPs Only 🤷‍♀️</h4>
              <p>Just kidding! (sorta)</p>
              <p>Curate your favorite guides, events, deals, and more with our new <span>Collections</span> feature, available exclusively on the UNATION mobile app.</p>
              <div className="un-store-btn flex">
                <Link href="https://apps.apple.com/us/app/unation-find-events-near-you/id953269522" className="m-apple" target="_blank" rel="noopener noreferrer">
                  <Image src="https://assets-qa.unation.com/wp-content/themes/hello-theme-child-master/aws/img/apple-store-btn.png" alt="Apple Store" width={120} height={40} loading="lazy" />
                </Link>
                <Link href="https://play.google.com/store/apps/details?id=com.unation.app&hl=en_IN&gl=US" className="m-android" target="_blank" rel="noopener noreferrer">
                  <Image src="https://assets-qa.unation.com/wp-content/themes/hello-theme-child-master/aws/img/google-play-btn.png" alt="Google Play" width={120} height={40} loading="lazy" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {isShareOpen && (
        <div className="un-social-share" style={{ display: 'flex' }}>
          <div className="popup-dialog">
            <div className="popup-content">
              <div className="popup-body">
                <div className="popup-header">
                  <span>Share</span>
                  <Image
                    className="close-icon"
                    src="https://assets-qa.unation.com/wp-content/themes/hello-theme-child-master/tribe-events/images/modal-close.svg"
                    alt="Close"
                    width={24} // Example width, adjust accordingly
                    height={24} // Example height, adjust accordingly
                    onClick={handleShareTogglePopup}
                    loading="lazy"
                  />
                </div>

                {/* Facebook Share */}
                <div className="popup-share-item">
                  <Link target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} className="share-btn" rel="noopener noreferrer">
                    <span className="item-inner">
                      <Image
                        src="https://assets-qa.unation.com/wp-content/themes/hello-theme-child-master/tribe-events/images/facebook.svg"
                        alt="Facebook"
                        width={24}
                        height={24}
                        loading="lazy"
                      />
                      <span className="item-text">Facebook</span>
                    </span>
                    <Image
                      src="https://assets-qa.unation.com/wp-content/themes/hello-theme-child-master/tribe-events/images/right-caret-gray.svg"
                      alt=""
                      className="pointer"
                      width={8}
                      height={8}
                      loading="lazy"
                    />
                  </Link>
                </div>

                {/* Twitter Share */}
                <div className="popup-share-item">
                  <Link target="_blank" href={`https://twitter.com/share?url=${currentUrl}`} className="share-btn" rel="noopener noreferrer">
                    <span className="item-inner">
                      <Image
                        src="https://assets-qa.unation.com/wp-content/themes/hello-theme-child-master/tribe-events/images/twitter.svg"
                        alt="Twitter"
                        width={24}
                        height={24}
                        loading="lazy"
                      />
                      <span className="item-text">Twitter</span>
                    </span>
                    <Image
                      src="https://assets-qa.unation.com/wp-content/themes/hello-theme-child-master/tribe-events/images/right-caret-gray.svg"
                      alt=""
                      className="pointer"
                      width={8}
                      height={8}
                      loading="lazy"
                    />
                  </Link>
                </div>

                {/* LinkedIn Share */}
                <div className="popup-share-item">
                  <Link target="_blank" href={`https://www.linkedin.com/shareArticle?url=${currentUrl}`} className="share-btn" rel="noopener noreferrer">
                    <span className="item-inner">
                      <Image
                        src="https://assets-qa.unation.com/wp-content/themes/hello-theme-child-master/tribe-events/images/linkedin.svg"
                        alt="LinkedIn"
                        width={24}
                        height={24}
                        loading="lazy"
                      />
                      <span className="item-text">LinkedIn</span>
                    </span>
                    <Image
                      src="https://assets-qa.unation.com/wp-content/themes/hello-theme-child-master/tribe-events/images/right-caret-gray.svg"
                      alt=""
                      className="pointer"
                      width={8}
                      height={8}
                      loading="lazy"
                    />
                  </Link>
                </div>

                {/* Copy Link */}
                <div className="popup-share-item copy-txt-container">
                  <Link href="#" className="share-btn">
                    <span className="item-inner">
                      <Image
                        src="https://assets-qa.unation.com/wp-content/themes/hello-theme-child-master/tribe-events/images/icon-copy.svg"
                        alt="Copy Link"
                        width={24}
                        height={24}
                        loading="lazy"
                      />
                      <span
                        className="item-text copyLink"
                        data-href={currentUrl}
                        onClick={handleCopy}
                        style={{ cursor: 'pointer' }}
                      >
                        {isCopied ? 'Copied' : 'Copy Link'}
                      </span>
                    </span>
                    <Image
                      src="https://assets-qa.unation.com/wp-content/themes/hello-theme-child-master/tribe-events/images/right-caret-gray.svg"
                      alt=""
                      className="pointer"
                      width={8}
                      height={8}
                      loading="lazy"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventComponent;
