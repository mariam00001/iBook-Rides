import { useState, useRef, useEffect } from 'react';
import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import profile from '../../assets/Elipse 5.svg';
import word from '../../assets/icons set.svg';
import night from '../../assets/icons set (1).svg';
import { 
  FaBars, 
  FaPlus, 
  FaExclamationCircle,
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaAlignLeft, 
  FaAlignCenter, 
  FaAlignRight, 
  FaAlignJustify,
  FaListUl,
  FaListOl,
  FaCog,
  FaSave,
  FaSearch,
  FaRegTrashAlt
} from 'react-icons/fa';
import './Company.css';
import { HiUpload } from 'react-icons/hi';
import { MdErrorOutline } from 'react-icons/md';
import { CiSettings } from 'react-icons/ci';
import { AiOutlineEdit } from 'react-icons/ai';
import { TbWorld } from 'react-icons/tb';

const Company = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Site'); // Site, Email, or Preferennce
  const [activeView, setActiveView] = useState('Company'); // Company or Country
  const [countryPage, setCountryPage] = useState(1);
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [countryEntriesPerPage, setCountryEntriesPerPage] = useState(5);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showCountryDeleteModal, setShowCountryDeleteModal] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState(null);
  
  // File upload refs
  const companyLogoRef = useRef(null);
  const siteLogoRef = useRef(null);
  
  // File state
  const [companyLogo, setCompanyLogo] = useState(null);
  const [siteLogo, setSiteLogo] = useState(null);
  
  // Preview URLs
  const [companyLogoPreview, setCompanyLogoPreview] = useState(null);
  const [siteLogoPreview, setSiteLogoPreview] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    companyName: 'sara',
    address: 'sara',
    state: 'sara',
    zipCode: '111111',
    fax: '',
    landLine: '',
    currency: 'EUR',
    distanceType: 'Kilometers',
    businessTaxNumber: '',
    siteUrl: '',
    city: 'sara',
    country: 'Egypt',
    phone: '11111111',
    companyEmail: 'sara@gmail.com',
    timezone: '(GMT+02:00) Cairo',
    dateFormat: 'mm/dd/yyyy',
    currencySymbol: '€',
    businessTaxNumber2: '€'
  });

  // Email settings state
  const [emailSettings, setEmailSettings] = useState({
    emailId: '',
    password: '',
    smtpServer: 'smtp.gmail.com',
    port: '587',
    sslEncryption: 'No',
    quoteEmail: '',
    confirmationEmail: ''
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuthentication: true,
    pushNotifications: false,
    desktopNotifications: true,
    soundAlerts: false,
    autoSave: true,
    darkMode: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailSettingsChange = (e) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTestEmail = () => {
    console.log('Testing email settings:', emailSettings);
    // Add test email logic here
  };

  const handlePreferenceToggle = (preference) => {
    setPreferences(prev => ({
      ...prev,
      [preference]: !prev[preference]
    }));
  };

  const handleSavePreferences = () => {
    console.log('Saving preferences:', preferences);
    // Add save preferences logic here
  };

  // Countries data
  const countries = [
    {
      id: 1,
      countryCode: 'US',
      name: 'United States',
      status: 'Active',
      created: '2024-01-01'
    },
    {
      id: 2,
      countryCode: 'US',
      name: 'United States',
      status: 'Active',
      created: '2024-01-01'
    },
    {
      id: 3,
      countryCode: 'US',
      name: 'United States',
      status: 'Active',
      created: '2024-01-01'
    },
    {
      id: 4,
      countryCode: 'US',
      name: 'United States',
      status: 'Active',
      created: '2024-01-01'
    },
    {
      id: 5,
      countryCode: 'US',
      name: 'United States',
      status: 'Active',
      created: '2024-01-01'
    }
  ];

  // Filter countries by search term
  const searchFilteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearchTerm.toLowerCase()) ||
    country.countryCode.toLowerCase().includes(countrySearchTerm.toLowerCase())
  );

  // Pagination logic for countries
  const countryTotalPages = Math.ceil(searchFilteredCountries.length / countryEntriesPerPage);
  const indexOfLastCountry = countryPage * countryEntriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countryEntriesPerPage;
  const currentCountries = searchFilteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const handleCountryPageChange = (page) => {
    setCountryPage(page);
  };

  const handleCountryPrevious = () => {
    if (countryPage > 1) {
      setCountryPage(countryPage - 1);
    }
  };

  const handleCountryNext = () => {
    if (countryPage < countryTotalPages) {
      setCountryPage(countryPage + 1);
    }
  };

  const handleCountryDelete = () => {
    if (countryToDelete) {
      console.log('Deleting country:', countryToDelete);
      setShowCountryDeleteModal(false);
      setCountryToDelete(null);
    }
  };

  const handleFileChange = (e, logoType) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      
      if (logoType === 'company') {
        // Clean up previous preview URL
        if (companyLogoPreview) {
          URL.revokeObjectURL(companyLogoPreview);
        }
        setCompanyLogo(file);
        setCompanyLogoPreview(previewUrl);
      } else if (logoType === 'site') {
        // Clean up previous preview URL
        if (siteLogoPreview) {
          URL.revokeObjectURL(siteLogoPreview);
        }
        setSiteLogo(file);
        setSiteLogoPreview(previewUrl);
      }
    }
  };

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (companyLogoPreview) {
        URL.revokeObjectURL(companyLogoPreview);
      }
      if (siteLogoPreview) {
        URL.revokeObjectURL(siteLogoPreview);
      }
    };
  }, [companyLogoPreview, siteLogoPreview]);

  const handleFileButtonClick = (logoType) => {
    if (logoType === 'company') {
      companyLogoRef.current?.click();
    } else if (logoType === 'site') {
      siteLogoRef.current?.click();
    }
  };

  const handleUpdate = () => {
    console.log('Updating settings:', formData);
    console.log('Company Logo:', companyLogo);
    console.log('Site Logo:', siteLogo);
    // Handle update logic here
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

          {/* Company/Country Toggle Buttons */}
          <div className="affiliate-controls affiliate-controls-2 ps-0 mb-4 justify-content-end d-flex">
              <div className="affiliate-tabs">
                <button
                  className={`affiliate-tab ${activeView === 'Company' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveView('Company');
                  }}
                >
                  Company
                </button>
                <button
                  className={`affiliate-tab ${activeView === 'Country' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveView('Country');
                    setActiveTab('Site'); // Reset tab when switching to Country
                  }}
                >
                  Country
                </button>
              </div>
            </div>
          <div className="settings-form-container componey-bg">
          {activeView === 'Company' && (
            <div className="affiliate-controls affiliate-controls-2 ps-0 mb-4">
              <div className="affiliate-tabs">
                <button
                  className={`affiliate-tab ${activeTab === 'Site' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('Site');
                  }}
                >
                  Site
                </button>
                <button
                  className={`affiliate-tab ${activeTab === 'Email' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('Email');
                  }}
                >
                  Email
                </button>
                <button
                  className={`affiliate-tab ${activeTab === 'Preferennce' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('Preferennce');
                  }}
                >
                  Preferennce
                </button>
              </div>
            </div>
          )}

          {/* Settings Form */}
          {activeView === 'Company' && activeTab === 'Site' && (
            <div className='container-fluid' >
              <div className="row gx-5">
                {/* Left Column */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Company Name<span className="required">*</span></label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address<span className="required">*</span></label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>State<span className="required">*</span></label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Zip/Postal Code<span className="required">*</span></label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Fax</label>
                    <input
                      type="text"
                      name="fax"
                      value={formData.fax}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Land Line</label>
                    <input
                      type="text"
                      name="landLine"
                      value={formData.landLine}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Select Currency<span className="required">*</span></label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                    >
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                      <option value="EGP">EGP</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Select Distance Type<span className="required">*</span></label>
                    <select
                      name="distanceType"
                      value={formData.distanceType}
                      onChange={handleInputChange}
                    >
                      <option value="Kilometers">Kilometers</option>
                      <option value="Miles">Miles</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Business Tax Number<span className="required">*</span></label>
                    <input
                      type="text"
                      name="businessTaxNumber"
                      value={formData.businessTaxNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company Logo</label>
                    <div className="file-upload">
                      <input
                        type="file"
                        ref={companyLogoRef}
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e, 'company')}
                      />
                      <button 
                        type="button" 
                        className="btn-choose-file"
                        onClick={() => handleFileButtonClick('company')}
                      >
                        <HiUpload />Choose File
                      </button>
                      <span className="file-name">
                        {companyLogo ? companyLogo.name : 'favicon.ico'}
                      </span>
                    </div>
                    {companyLogoPreview && (
                      <div className="logo-preview">
                        <img 
                          src={companyLogoPreview} 
                          alt="Company logo preview" 
                          className="preview-image"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Site URL<span className="required">*</span></label>
                    <input
                      type="text"
                      name="siteUrl"
                      value={formData.siteUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>City<span className="required">*</span></label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Select Country<span className="required">*</span></label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="Egypt">Egypt</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Phone<span className="required">*</span></label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company Email<span className="required">*</span></label>
                    <input
                      type="email"
                      name="companyEmail"
                      value={formData.companyEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Select Timezone<span className="required">*</span></label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                    >
                      <option value="(GMT+02:00) Cairo">(GMT+02:00) Cairo</option>
                      <option value="(GMT+00:00) London">(GMT+00:00) London</option>
                      <option value="(GMT-05:00) New York">(GMT-05:00) New York</option>
                      <option value="(GMT+01:00) Berlin">(GMT+01:00) Berlin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Select Date Format<span className="required">*</span></label>
                    <select
                      name="dateFormat"
                      value={formData.dateFormat}
                      onChange={handleInputChange}
                    >
                      <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                      <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                      <option value="yyyy-mm-dd">yyyy-mm-dd</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Currency Symbol<span className="required">*</span></label>
                    <input
                      type="text"
                      name="currencySymbol"
                      value={formData.currencySymbol}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>business tax number<span className="required">*</span></label>
                    <input
                      type="text"
                      name="businessTaxNumber2"
                      value={formData.businessTaxNumber2}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Site Logo</label>
                    <div className="file-upload">
                      <input
                        type="file"
                        ref={siteLogoRef}
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e, 'site')}
                      />
                      <button 
                        type="button" 
                        className="btn-choose-file"
                        onClick={() => handleFileButtonClick('site')}
                      >
                        <HiUpload />Choose File
                      </button>
                      <span className="file-name">
                        {siteLogo ? siteLogo.name : 'Site logo'}
                      </span>
                    </div>
                    {siteLogoPreview && (
                      <div className="logo-preview">
                        <img 
                          src={siteLogoPreview} 
                          alt="Site logo preview" 
                          className="preview-image"
                        />
                      </div>
                    )}
                  </div>
                </div>
                     {/* Update Button */}
          <div className="settings-footer d-flex justify-content-end mt-4">
            <button className="btn-add-booking" onClick={handleUpdate}>
              <FaPlus className="me-2" />
              Update
            </button>
          </div>
              </div>
            </div>
          )}

          {/* Email Tab Content */}
          {activeView === 'Company' && activeTab === 'Email' && (
            <div className="container-fluid">
              {/* Warning Banner */}
              <div className="email-warning-banner ">
                <MdErrorOutline className="warning-icon" />
                <div className="warning-content">
                  <h4>Email Configuration Required</h4>
                  <p>
                    Help: You need to setup your company's email server as soon as possible to send any application with your customers. 
                    Contact to do so will result in all communication being sent from the Readdy.com domain, rather than your company's official email address.
                  </p>
                </div>
              </div>

              {/* SMTP Server Configuration */}
              <div className="email-section border p-3 ">
                <h3 className="section-title">SMTP Server Configuration</h3>
                <div className="row gx-5">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email ID<span className="required">*</span></label>
                      <input
                        type="email"
                        name="emailId"
                        value={emailSettings.emailId}
                        onChange={handleEmailSettingsChange}
                        placeholder="your-email@company.com"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Password / App Password<span className="required">*</span></label>
                      <input
                        type="password"
                        name="password"
                        value={emailSettings.password}
                        onChange={handleEmailSettingsChange}
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>SMTP Server<span className="required">*</span></label>
                      <input
                        type="text"
                        name="smtpServer"
                        value={emailSettings.smtpServer}
                        onChange={handleEmailSettingsChange}
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Port<span className="required">*</span></label>
                      <input
                        type="text"
                        name="port"
                        value={emailSettings.port}
                        onChange={handleEmailSettingsChange}
                        placeholder="587"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Secure mail service uses SSL encryption<span className="required">*</span></label>
                      <select
                        name="sslEncryption"
                        value={emailSettings.sslEncryption}
                        onChange={handleEmailSettingsChange}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>&nbsp;</label>
                      <div className="test-email-wrapper">
                        <button 
                          type="button" 
                          className="btn-test-email"
                          onClick={handleTestEmail}
                        >
                          Test Email Setting
                        </button>
                        <span className="test-email-text">Click to verify connection</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Content Settings */}
              <div className="email-section border p-3">
                <h3 className="section-title">Email Content Settings</h3>
                
                {/* Quote Email */}

                <div className="row">
                  <div className="col-md-6">
                  <div className="email-template-section">
                  <h4 className="template-title">1. Quote Email</h4>
                  <div className="rich-text-editor">
                    <div className="editor-toolbar">
                      <button type="button" className="toolbar-btn" title="Bold">
                        <FaBold />
                      </button>
                      <button type="button" className="toolbar-btn" title="Italic">
                        <FaItalic />
                      </button>
                      <button type="button" className="toolbar-btn" title="Underline">
                        <FaUnderline />
                      </button>
                      <div className="toolbar-divider"></div>
                      <button type="button" className="toolbar-btn" title="Align Left">
                        <FaAlignLeft />
                      </button>
                      <button type="button" className="toolbar-btn" title="Align Center">
                        <FaAlignCenter />
                      </button>
                      <button type="button" className="toolbar-btn" title="Align Right">
                        <FaAlignRight />
                      </button>
                      <button type="button" className="toolbar-btn" title="Justify">
                        <FaAlignJustify />
                      </button>
                      <div className="toolbar-divider"></div>
                      <button type="button" className="toolbar-btn" title="Bullet List">
                        <FaListUl />
                      </button>
                      <button type="button" className="toolbar-btn" title="Numbered List">
                        <FaListOl />
                      </button>
                    </div>
                    <textarea
                      className="editor-content"
                      name="quoteEmail"
                      value={emailSettings.quoteEmail}
                      onChange={handleEmailSettingsChange}
                      placeholder="Enter your cancellation email template..."
                      rows="8"
                    />
                  </div>
                </div>
                  </div>
                  <div className="col-md-6">
    {/* Confirmation Email */}
    <div className="email-template-section">
                  <h4 className="template-title">2. Confirmation Email</h4>
                  <div className="rich-text-editor">
                    <div className="editor-toolbar">
                      <button type="button" className="toolbar-btn" title="Bold">
                        <FaBold />
                      </button>
                      <button type="button" className="toolbar-btn" title="Italic">
                        <FaItalic />
                      </button>
                      <button type="button" className="toolbar-btn" title="Underline">
                        <FaUnderline />
                      </button>
                      <div className="toolbar-divider"></div>
                      <button type="button" className="toolbar-btn" title="Align Left">
                        <FaAlignLeft />
                      </button>
                      <button type="button" className="toolbar-btn" title="Align Center">
                        <FaAlignCenter />
                      </button>
                      <button type="button" className="toolbar-btn" title="Align Right">
                        <FaAlignRight />
                      </button>
                      <button type="button" className="toolbar-btn" title="Justify">
                        <FaAlignJustify />
                      </button>
                      <div className="toolbar-divider"></div>
                      <button type="button" className="toolbar-btn" title="Bullet List">
                        <FaListUl />
                      </button>
                      <button type="button" className="toolbar-btn" title="Numbered List">
                        <FaListOl />
                      </button>
                    </div>
                    <textarea
                      className="editor-content"
                      name="confirmationEmail"
                      value={emailSettings.confirmationEmail}
                      onChange={handleEmailSettingsChange}
                      placeholder="Enter your cancellation email template..."
                      rows="8"
                    />
                  </div>
                </div>
                  </div>
                </div>
               

            
              </div>
            </div>
          )}

          {/* Preference Tab Content */}
          {activeView === 'Company' && activeTab === 'Preferennce' && (
            <div className="preferences-container p-3">
              {/* System Preferences Banner */}
              <div className="preferences-warning-banner  ">
                <CiSettings className="preferences-warning-icon" />
                <div className="preferences-warning-content">
                  <h4>System Preferences</h4>
                  <p>
                  Customize your system behavior and appearance settings
                  </p>
                </div>
              </div>

              {/* Additional Settings */}
              <div className="preferences-settings ps-2">
                <h3 className="preferences-settings-title pt-4">Additional Settings</h3>
                
                <div className="preferences-list">
                  {/* Email Notifications */}
                  <div className="preferences-item">
                    <div className="preferences-item-content">
                      <h4 className="preferences-item-title">Email Notifications</h4>
                      <p className="preferences-item-description">Receive email updates about your account.</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={preferences.emailNotifications}
                        onChange={() => handlePreferenceToggle('emailNotifications')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  {/* SMS Notifications */}
                  <div className="preferences-item">
                    <div className="preferences-item-content">
                      <h4 className="preferences-item-title">SMS Notifications</h4>
                      <p className="preferences-item-description">Receive SMS alerts for important updates.</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={preferences.smsNotifications}
                        onChange={() => handlePreferenceToggle('smsNotifications')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="preferences-item">
                    <div className="preferences-item-content">
                      <h4 className="preferences-item-title">Two-Factor Authentication</h4>
                      <p className="preferences-item-description">Add an extra layer of security to your account.</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={preferences.twoFactorAuthentication}
                        onChange={() => handlePreferenceToggle('twoFactorAuthentication')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  {/* Push Notifications */}
                  <div className="preferences-item">
                    <div className="preferences-item-content">
                      <h4 className="preferences-item-title">Push Notifications</h4>
                      <p className="preferences-item-description">Receive push notifications on your device.</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={preferences.pushNotifications}
                        onChange={() => handlePreferenceToggle('pushNotifications')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  {/* Desktop Notifications */}
                  <div className="preferences-item">
                    <div className="preferences-item-content">
                      <h4 className="preferences-item-title">Desktop Notifications</h4>
                      <p className="preferences-item-description">Show notifications on your desktop.</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={preferences.desktopNotifications}
                        onChange={() => handlePreferenceToggle('desktopNotifications')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  {/* Sound Alerts */}
                  <div className="preferences-item">
                    <div className="preferences-item-content">
                      <h4 className="preferences-item-title">Sound Alerts</h4>
                      <p className="preferences-item-description">Play sound when receiving notifications.</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={preferences.soundAlerts}
                        onChange={() => handlePreferenceToggle('soundAlerts')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  {/* Auto Save */}
                  <div className="preferences-item">
                    <div className="preferences-item-content">
                      <h4 className="preferences-item-title">Auto Save</h4>
                      <p className="preferences-item-description">Automatically save your work periodically.</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={preferences.autoSave}
                        onChange={() => handlePreferenceToggle('autoSave')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  {/* Dark Mode */}
                  <div className="preferences-item">
                    <div className="preferences-item-content">
                      <h4 className="preferences-item-title">Dark Mode</h4>
                      <p className="preferences-item-description">Switch to dark theme for better viewing in low light.</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={preferences.darkMode}
                        onChange={() => handlePreferenceToggle('darkMode')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Save Preferences Button */}
              <div className="preferences-footer">
                <button className="btn-save-preferences" onClick={handleSavePreferences}>
                  <FaSave className="me-2" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Country View */}
          {activeView === 'Country' && (
            <div className="container-fluid">
              {/* Search and Add Button */}
              <div className="affiliate-controls-right d-flex justify-content-between gap-3 px-3 py-4">
                <div className="d-flex align-items-center">
                  <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search Country Name..."
                      value={countrySearchTerm}
                      onChange={(e) => {
                        setCountrySearchTerm(e.target.value);
                        setCountryPage(1);
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button className="btn-add-booking" onClick={() => setShowCountryModal(true)}>
                    + Add Country
                  </button>
                </div>
              </div>

              {/* Countries Table */}
              <div className="container">
                <div className="customer-table-wrapper mt-2 border">
                  <table className="affiliate-table teams-table">
                    <thead>
                      <tr>
                        <th>Country Name</th>
                        <th>Country short code</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCountries.map((country) => (
                        <tr key={country.id}>
                          <td>
                            <div className="customer-info">
                              <div className="teams-avatar icon-company-bord">
                                <TbWorld />
                              </div>
                              <div className="customer-name">{country.name}</div>
                            </div>
                          </td>
                          <td>
                            <span className="countryCode">
                              {country.countryCode}
                            </span>
                          </td>
                          <td>
                            <span className="status-available">
                              {country.status}
                            </span>
                          </td>
                          <td className="customer-date">{country.created}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-edit">
                                <AiOutlineEdit />
                              </button>
                              <button
                                className="btn-delete"
                                onClick={() => {
                                  setCountryToDelete(country);
                                  setShowCountryDeleteModal(true);
                                }}
                              >
                                <FaRegTrashAlt />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="pagination-container-2 p-3">
                <span className="pagination-info">
                  Showing {indexOfFirstCountry + 1} to {Math.min(indexOfLastCountry, searchFilteredCountries.length)} of {searchFilteredCountries.length} results
                </span>
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={handleCountryPrevious}
                    disabled={countryPage === 1}
                  >
                    Previous
                  </button>
                  {Array.from({ length: countryTotalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`pagination-btn ${countryPage === page ? 'active' : ''}`}
                      onClick={() => handleCountryPageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="pagination-btn"
                    onClick={handleCountryNext}
                    disabled={countryPage === countryTotalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

     
          </div>
        </div>
      </div>

      {/* Add Country Modal */}
      {showCountryModal && (
        <div className="modal-overlay" onClick={() => setShowCountryModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add New Country</h3>
              <button className="modal-close" onClick={() => setShowCountryModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Choose Country</label>
                  <select>
                    <option value="">Select Country</option>
                    <option value="United States">United States</option>
                    <option value="Egypt">Egypt</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="Spain">Spain</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="India">India</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Russia">Russia</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowCountryModal(false)}>
                + Add Country
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Country Confirmation Modal */}
      {showCountryDeleteModal && countryToDelete && (
        <div className="modal-overlay" onClick={() => {
          setShowCountryDeleteModal(false);
          setCountryToDelete(null);
        }}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-body">
              <p className="delete-modal-question">
                Are You Sure You Want Delete <br /> <span className="delete-customer-name">{countryToDelete?.name}</span> ?
              </p>
              <div className="delete-modal-buttons">
                <button
                  className="btn-delete-confirm"
                  onClick={handleCountryDelete}
                >
                  <FaPlus className="delete-icon" />
                  Delete
                </button>
                <button
                  className="btn-delete-cancel"
                  onClick={() => {
                    setShowCountryDeleteModal(false);
                    setCountryToDelete(null);
                  }}
                >
                  <FaPlus className="cancel-icon" />
                  Cancle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Company;

