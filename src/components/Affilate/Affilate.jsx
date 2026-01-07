import { useState } from 'react';
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import profile from '../../assets/Elipse 5.svg';
import word from '../../assets/icons set.svg';
import night from '../../assets/icons set (1).svg';
import { FaSearch, FaEye, FaUsers, FaGlobe, FaMapPin, FaChartLine, FaBuilding, FaBars } from 'react-icons/fa';
import './Affilate.css';
import { LuUsersRound } from 'react-icons/lu';
import { TbWorld } from 'react-icons/tb';
import { SlLocationPin } from 'react-icons/sl';
import { FiActivity } from 'react-icons/fi';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';
import { RiArrowUpDownLine, RiBuildingLine } from 'react-icons/ri';
import avatar from '../../assets/Role Options.svg';

const Affilate = () => {
  const [showAddAffiliateModal, setShowAddAffiliateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const affiliates = [
    {
      id: 1,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 2,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 3,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 4,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 5,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 6,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 7,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 8,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 9,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 10,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 11,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 12,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 13,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 14,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 15,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 16,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    },
    {
      id: 17,
      companyName: 'Fly Limousine',
      email: 'info@flylimousine.ca',
      website: 'flylimousine.ca',
      contactPerson: 'Farhan Khan',
      phone: '6474998136',
      country: 'Canada',
      city: 'Vaughan',
      type: 'Global'
    }
  ];

  // Filter affiliates based on active tab
  const filteredAffiliates = affiliates.filter(affiliate => {
    if (activeTab === 'Global') return affiliate.type === 'Global';
    if (activeTab === 'Local') return affiliate.type === 'Local';
    return true;
  });

  // Filter by search term
  const searchFilteredAffiliates = filteredAffiliates.filter(affiliate =>
    affiliate.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    affiliate.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(searchFilteredAffiliates.length / entriesPerPage);
  const indexOfLastAffiliate = currentPage * entriesPerPage;
  const indexOfFirstAffiliate = indexOfLastAffiliate - entriesPerPage;
  const currentAffiliates = searchFilteredAffiliates.slice(indexOfFirstAffiliate, indexOfLastAffiliate);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toggleTableCollapse = () => {
    setIsTableCollapsed(prev => !prev);
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <div className="container-fluid p-4">
          {/* Header with Affiliate title and Profile */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <button 
                className="menu-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
              <h2 className='dashboard-title'>Affiliate</h2>
            </div>
            <div className="profile d-flex align-items-center justify-content-center">
              <img src={profile} alt="profile" className="profile-img me-3" />
              <img src={word} className="me-2" alt="word" />
              <img src={night} alt="night" />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="row mb-4">
            <div className="col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="summary-card">
                <h4>Total Affiliates</h4>
                <div className="d-flex justify-content-between align-items-center ">
                  <h3>8</h3>
                  <div className="icon-book">
                  <LuUsersRound size={20} />
                    
                  </div>
                </div>
                <p className="mb-0">+12% from last month</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="summary-card">
                <h4>Global Affiliates</h4>
                <div className="d-flex justify-content-between align-items-center ">
                  <h3>12</h3>
                  <div className="icon-book">
                  <TbWorld size={20} />
                  </div>
                </div>
                <p className="mb-0">+12% from last month</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-5 mb-md-0">
              <div className="summary-card">
                <h4>Local Affiliates</h4>
                <div className="d-flex justify-content-between align-items-center">
                  <h3>5</h3>
                  <div className="icon-book">
                  <SlLocationPin size={20} />
                  </div>
                </div>
                <p className="mb-0">+12% from last month</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-md-0">
              <div className="summary-card">
                <h4>Active Affiliates</h4>
                <div className="d-flex justify-content-between align-items-center ">
                  <h3>23</h3>
                  <div className="icon-book">
                  <FiActivity size={20} />
                  </div>
                </div>
                <p className="mb-0 color-book-2">+12% from last month</p>
              </div>
            </div>
          </div>

          {/* Tabs and Controls */}
          <div className="border">
          <div className="affiliate-controls py-4 mb-4">
            <div className="affiliate-tabs">
              <button
                className={`affiliate-tab ${activeTab === 'All' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('All');
                  setCurrentPage(1);
                }}
              >
                All Affiliates
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Global' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('Global');
                  setCurrentPage(1);
                }}
              >
                Global Affiliates
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Local' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('Local');
                  setCurrentPage(1);
                }}
              >
                Local Affiliates
              </button>
            </div>
            <div className="">
             
              <button className="btn-add-booking"  onClick={() => setShowAddAffiliateModal(true)}>
                + Add Affiliate
              </button>
            </div>
          </div>
          <div className="affiliate-controls-right d-flex justify-content-between  gap-3 px-3 pb-4 ">
          <div className="entries-selector d-flex align-items-center gap-2">
                <span className="entries-label">Show</span>
                <select
                  className="entries-select"
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={8}>8</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="entries-label">entries</span>
              </div>
              <div className="d-flex align-items-center gap-2">
              <a href="#" className="details-link">
                        <MdOutlineRemoveRedEye className="details-icon" />
                        SHOW
                      </a>
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search affiliates..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              </div>
          </div>

          {/* Affiliates Table */}
          <div className="affiliate-table-wrapper">
            <table className="affiliate-table">
              <thead>
                <tr>
                  <th>
                    <div className="th-content">
                      COMPANY INFO
                      <div 
                        className="sort-icons d-flex align-items-center clickable-sort"
                        onClick={toggleTableCollapse}
                        style={{ cursor: 'pointer' }}
                      >
                        <RiArrowUpDownLine className={isTableCollapsed ? 'collapsed' : ''} />
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      WEBSITE
                      <div className="sort-icons d-flex align-items-center clickable-sort"
                        onClick={toggleTableCollapse}
                        style={{ cursor: 'pointer' }}>
                      <RiArrowUpDownLine />
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      CONTACT PERSON
                      <div className="sort-icons d-flex align-items-center clickable-sort"
                        onClick={toggleTableCollapse}
                        style={{ cursor: 'pointer' }}>
                      <RiArrowUpDownLine />
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      PHONE
                      <div className="sort-icons d-flex align-items-center clickable-sort"
                        onClick={toggleTableCollapse}
                        style={{ cursor: 'pointer' }}>
                      <RiArrowUpDownLine />
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      COUNTRY
                      <div className="sort-icons d-flex align-items-center clickable-sort"
                        onClick={toggleTableCollapse}
                        style={{ cursor: 'pointer' }}>
                      <RiArrowUpDownLine />
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      CITY
                      <div className="sort-icons d-flex align-items-center clickable-sort"
                        onClick={toggleTableCollapse}
                        style={{ cursor: 'pointer' }}>
                      <RiArrowUpDownLine />
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      TYPE
                      <div className="sort-icons d-flex align-items-center clickable-sort"
                        onClick={toggleTableCollapse}
                        style={{ cursor: 'pointer' }}>
                      <RiArrowUpDownLine />
                      </div>
                    </div>
                  </th>
                  <th>DETAILS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody className={isTableCollapsed ? 'collapsed' : ''}>
                {currentAffiliates.map((affiliate) => (
                  <tr key={affiliate.id}>
                    <td>
                      <div className="company-info">
                        <div className="icon-company">
                        <RiBuildingLine className="company-icon" />
                        </div>
                        <div>
                          <div className="company-name">{affiliate.companyName}</div>
                          <div className="company-email">{affiliate.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className='font-affiliate'>{affiliate.website}</td>
                    <td className='font-affiliate'>{affiliate.contactPerson}</td>
                    <td className='font-affiliate'>{affiliate.phone}</td>
                    <td className='font-affiliate'>{affiliate.country}</td>
                    <td className='font-affiliate'>{affiliate.city}</td>
                    <td>
                      <span className={`type-badge ${affiliate.type === 'Global' ? 'type-global' : 'type-local'}`}>
                        {affiliate.type}
                      </span>
                    </td>
                    <td>
                      <a href="#" className="details-link">
                        <MdOutlineRemoveRedEye className="details-icon" />
                        SHOW
                      </a>
                    </td>
                    <td>
                      <button className="btn-add-booking btn-send-request">Send Request</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-container-2 p-3">
            <span className="pagination-info">
              Showing {indexOfFirstAffiliate + 1} to {Math.min(indexOfLastAffiliate, searchFilteredAffiliates.length)} of {searchFilteredAffiliates.length} results
            </span>
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="pagination-btn"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
         {/* Add New Affiliate Modal */}
         {showAddAffiliateModal && (
        <div className="modal-overlay" onClick={() => setShowAddAffiliateModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add New Affiliate</h3>
              <button className="modal-close" onClick={() => setShowAddAffiliateModal(false)}>×</button>
            </div>
            <div className="modal-body">
            <div className="form-group ">
                  <label>Company Name*</label>
                  <input type="text" placeholder="EX: Fly Limousine" />
                </div>
              <div className="form-row pt-2">
               
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="EX, Eslam" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="EXl Ahmed" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Ex:es*************@gmail.com" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="EX: 012xxxxxxxxx3" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>FAX</label>
                  <input type="text" placeholder="Ex:es*************@gmail.com" />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" placeholder="Ex:4 mohamed ezz, Cairo" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Website link</label>
                  <input type="text" placeholder="Ex:es*************@gmail.com" />
                </div>
                <div className="form-group">
                  <label>Affiliate Type</label>
                  <select>
                    <option value="">Local</option>
                    <option value="Global">Global</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking ">+ Add Affiliate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Affilate;

