import Link from 'next/link';

export default function EventEnded() {
  return (
    <div className="main-container">
      <section className="u-block">
        <div className="u-block-in fw">
          <div className="empty-event-container">
            <div className="empty-event-image">
            <img src="https://assets.unation.com/wp-content/themes/hello-theme-child-master/aws/img/410-image.svg" alt="410" />
            </div>
            <div className="empty-event-content">
              <h3>Event ended</h3>
              <p>This is a past event, but here are more events to discover.</p>
              <Link href="/"  className="btn">
              Discover events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
