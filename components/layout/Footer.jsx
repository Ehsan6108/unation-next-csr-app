import Link from "next/link";

import '../../styles/components/events/Footer.css';

const Footer = () => {
    return (
        <footer className="un-footer fw">
      <div className="un-footer-top">
        <div className="container">
          <div className="un-footer-item">
            {/** Mobile Apps */}
            <div className="un-ft-widget">
              <h2 className="un-widget-title">Mobile Apps</h2>
              <ul className="un-ft-menu">
                <li>
                  <Link href="https://apps.apple.com/us/app/unation-events-near-me-buy-sell-tickets/id953269522" target="_blank">
                    iPhone app
                  </Link>
                </li>
                <li>
                  <Link href="https://play.google.com/store/apps/details?id=com.unation.app" target="_blank">
                    Android app
                  </Link>
                </li>
              </ul>
            </div>

            {/** About */}
            <div className="un-ft-widget">
              <h2 className="un-widget-title">About</h2>
              <ul className="un-ft-menu">
                <li>
                  <Link href="https://www.unation.com/about-us/" target="_blank">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="https://www.unation.com/careers/" target="_blank">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="https://www.unation.com/press-page/" target="_blank">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/blog/">Blog</Link>
                </li>
              </ul>
            </div>

            {/** Explore */}
            <div className="un-ft-widget">
              <h2 className="un-widget-title">Explore</h2>
              <ul className="un-ft-menu">
                <li>
                  <Link href="https://www.unation.com/activity/" target="_blank">
                    Activity
                  </Link>
                </li>
                <li>
                  <Link href="https://www.unation.com/attraction/" target="_blank">
                    Attraction
                  </Link>
                </li>
                <li>
                  <Link href="https://www.unation.com/business/" target="_blank">
                    Business
                  </Link>
                </li>
                <li>
                  <Link href="https://www.unation.com/events/" target="_blank">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/offer/">Offers</Link>
                </li>
              </ul>
            </div>

            {/** Promote */}
            <div className="un-ft-widget">
              <h2 className="un-widget-title">Promote</h2>
              <ul className="un-ft-menu">
                <li>
                  <Link href="https://www.unation.com/promote-with-us/" target="_blank">
                    Promote With Us
                  </Link>
                </li>
              </ul>
            </div>

            {/** City Partners */}
            <div className="un-ft-widget">
              <h2 className="un-widget-title">City Partners</h2>
              <ul className="un-ft-menu">
                <li>
                  <Link href="https://www.unation.com/city-partner/" target="_blank">
                    Become a City Partner
                  </Link>
                </li>
                <li>
                  <Link href="https://www.unation.com/ugc-program/" target="_blank">
                    Become a Content Creator
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="un-footer-bottom">
          <div className="un-bt-left">
            <p>© UNATION, INC. 2024 • v5.2.1</p>
          </div>
          <div className="un-bt-right">
            <ul className="un-bt-menu">
              <li>
                <Link href="https://www.unation.com/terms/" target="_blank">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="https://www.unation.com/privacy/" target="_blank">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="https://www.unation.com/faqs/" target="_blank">
                  FAQ’s
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    );
};

export default Footer;
