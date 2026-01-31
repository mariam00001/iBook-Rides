import { useState } from 'react';
import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import profile from '../../assets/Elipse 5.svg';
import word from '../../assets/icons set.svg';
import night from '../../assets/icons set (1).svg';
import { FaBars } from 'react-icons/fa';
import { MdInfoOutline, MdContentCopy } from 'react-icons/md';
import './Preview.css';

const Preview = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookingFormUrl, setBookingFormUrl] = useState('');
  
  const withLogoUrl = 'https://ibookrides.com/manage/reservation/MTA2OC1jb2lwYW55X2lk';
  const withoutLogoUrl = 'https://ibookrides.com/manage/reservation/MTA2OC1jb2lwYW55X2lk';
  const embedCode = `<div id="iframeContainer" style="margin: 20px;"><script type="text/javascript" src="https://ibookrides.com/manage/assets/js/ibook-resizer.parent.js"></script><iframe id="ibookiframe" scrolling="no" width="100%" style="border: 0.5px outset #ddd" src="https://ibookrides.com/manage/reservation/MTA2OC1jb21wYW55X2lk?em=1"></iframe><script type='text/javascript'>(function () { var po = document.createElement('script'); po.type = "text/javascript"; po.async = true; po.src = "https://ibookrides.com/manage/assets/js/ibookridesem.js?v1"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s);})();</script></div>`;

  const handleSaveUrl = () => {
    console.log('Saving URL:', bookingFormUrl);
    // Add save logic here
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      // You can add a toast notification here
      console.log(`${type} copied to clipboard`);
    });
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content company">
        <div className="container-fluid p-4">
          {/* Header with Settings title and Profile */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <button 
                className="menu-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
              <h2 className='dashboard-title'>Settings</h2>
            </div>
            <div className="profile d-flex align-items-center justify-content-center">
              <img src={profile} alt="profile" className="profile-img me-3" />
              <img src={word} className="me-2" alt="word" />
              <img src={night} alt="night" />
            </div>
          </div>

          {/* Booking Form URL Setup Section */}
          <div className=" ">
            <div className="booking-url-setup-section">
              <div className="d-flex align-items-center gap-2 mb-2">
              <MdInfoOutline className="info-icon" />
                <h3 className="section-heading mb-0">Booking Form URL Setup</h3>
              
              </div>
              <p className="section-description">
                Enter the URL of the page where you want to embed the booking form.
              </p>
              <div className="url-input-group">
                <input
                  type="text"
                  className="url-input"
                  value={bookingFormUrl}
                  onChange={(e) => setBookingFormUrl(e.target.value)}
                  placeholder="https://yourwebsite.com/booking"
                />
                <button className="btn-add-booking" onClick={handleSaveUrl}>
                  Save URL
                </button>
              </div>
            </div>

            {/* With and Without Company Logo Sections - Side by Side */}
            <div className="booking-url-sections-row mt-4">
              {/* With Company Logo Section */}
              <div className="booking-url-section-half">
                <h4 className="url-section-title">With Company Logo</h4>
                <div className="url-display-wrapper">
                  <textarea
                    className="url-display"
                    value={withLogoUrl}
                    readOnly
                    rows="2"
                  />
                  <div className="copy-button-wrapper">
                    <button 
                      className="btn-copy-url"
                      onClick={() => handleCopy(withLogoUrl, 'URL with logo')}
                    >
                      <MdContentCopy className="copy-icon" />
                      Copy URL
                    </button>
                  </div>
                </div>
              </div>

              {/* Without Company Logo Section */}
              <div className="booking-url-section-half">
                <h4 className="url-section-title">Without Company Logo</h4>
                <div className="url-display-wrapper">
                  <textarea
                    className="url-display"
                    value={withoutLogoUrl}
                    readOnly
                    rows="2"
                  />
                  <div className="copy-button-wrapper">
                    <button 
                      className="btn-copy-url"
                      onClick={() => handleCopy(withoutLogoUrl, 'URL without logo')}
                    >
                      <MdContentCopy className="copy-icon" />
                      Copy URL
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form Embed Code Section */}
            <div className="booking-url-section mt-5">
              <h4 className="url-section-title">Booking Form Embed Code</h4>
              <div className="url-display-wrapper">
                <textarea
                  className="url-display"
                  value={embedCode}
                  readOnly
                  rows="6"
                />
                <div className="copy-button-wrapper">
                  <button 
                    className="btn-copy-url"
                    onClick={() => handleCopy(embedCode, 'Embed code')}
                  >
                    <MdContentCopy className="copy-icon" />
                    Copy Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
