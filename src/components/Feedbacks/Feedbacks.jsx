import { useState } from 'react';
import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import profile from '../../assets/Elipse 5.svg';
import word from '../../assets/icons set.svg';
import night from '../../assets/icons set (1).svg';
import { FaSearch, FaEdit, FaTrash, FaRegTrashAlt, FaPlus, FaRegStar, FaStar, FaBars } from 'react-icons/fa';
import { LuUsersRound, LuUsers, LuUserRound } from 'react-icons/lu';
import { TbWorld } from 'react-icons/tb';
import { SlLocationPin } from 'react-icons/sl';
import { FiActivity } from 'react-icons/fi';
import { MdOutlineChat, MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiArrowUpDownLine, RiBuildingLine, RiUserLine } from 'react-icons/ri';
import './Feedbacks.css';
import { AiOutlineEdit } from 'react-icons/ai';
import { GoClock } from 'react-icons/go';
import { IoCheckmark } from 'react-icons/io5';

const Feedbacks = () => {
    const [showAddAffiliateModal, setShowAddAffiliateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [activeTab, setActiveTab] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');
    const [isTableCollapsed, setIsTableCollapsed] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const bookings = [
      {
        id: 1,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 2,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 3,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 4,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 5,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 6,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 7,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 8,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 9,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 10,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 11,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 12,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 13,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 14,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 15,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 16,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      },
      {
        id: 17,
        bookingDetails: 'BK12345 - EGP 150',
        customerName: 'David Wislon',
        driver: 'Mohamed Ali',
        stars: 4,
        date: '2024-02-15',
        tripInfo: 'Cairo Airport → Downtown Hotel',
        duration: '45min',
        price: '45$'
      }
    ];
  
    // Filter bookings based on active tab
    const filteredBookings = bookings.filter(booking => {
      // For now, all bookings are shown regardless of tab
      return true;
    });

    // Filter by search term
    const searchFilteredBookings = filteredBookings.filter(booking =>
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tripInfo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(searchFilteredBookings.length / entriesPerPage);
    const indexOfLastBooking = currentPage * entriesPerPage;
    const indexOfFirstBooking = indexOfLastBooking - entriesPerPage;
    const currentBookings = searchFilteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const handleDeleteBooking = () => {
      if (customerToDelete) {
        // Handle delete logic here
        console.log('Deleting booking:', customerToDelete);
        setShowDeleteModal(false);
        setCustomerToDelete(null);
      }
    };
  
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
                <h2 className='dashboard-title'>Feedbacks</h2>
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
                <h4>Avarage Rating</h4>
                <div className="d-flex justify-content-between align-items-center ">
                  <h3>3.8</h3>
                  <div className="icon-book">
                  <FaRegStar size={24} />
                    
                  </div>
                </div>
                <p className="mb-0 color-book-2">out of 5</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="summary-card">
                <h4>Total Reviews</h4>
                <div className="d-flex justify-content-between align-items-center ">
                  <h3>12</h3>
                  <div className="icon-book">
                  <MdOutlineChat size={24} />
                  </div>
                </div>
                <p className="mb-0">+12% from last month</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-5 mb-md-0">
              <div className="summary-card">
                <h4>Pending Responses</h4>
                <div className="d-flex justify-content-between align-items-center">
                  <h3>5</h3>
                  <div className="icon-book">
                  <GoClock size={24} />
                  </div>
                </div>
                <p className="mb-0">Required </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-md-0">
              <div className="summary-card">
                <h4>Response Rate</h4>
                <div className="d-flex justify-content-between align-items-center ">
                  <h3>25%</h3>
                  <div className="icon-book">
                  <IoCheckmark size={24} />
                  </div>
                </div>
                <p className="mb-0 color-book-2">+12% from last month</p>
              </div>
            </div>
          </div>
            {/* Tabs and Controls */}
            <div className="">
            <div className="affiliate-controls d-flex justify-content-end py-4 ">
              <div className="affiliate-tabs">
                <button
                  className={`affiliate-tab ${activeTab === 'All' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('All');
                    setCurrentPage(1);
                  }}
                >
                  Custmors
                </button>
                <button
                  className={`affiliate-tab ${activeTab === 'Global' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('Global');
                    setCurrentPage(1);
                  }}
                >
                  Drivers
                </button>
              </div>
            </div>
            <div className="affiliate-controls-right d-flex justify-content-between  gap-3 px-3 py-3 customer-border ">
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
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                </div>
            </div>
  
            {/* Booking Table */}
            <div className="feedback-table-wrapper mt-2">
              <table className="feedback-table">
                <thead>
                  <tr>
                    <th>
                      <div className="th-content">
                        BOOKING DETAILS
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
                        CUSTMOR NAME
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                          <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        DRIVERS
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                          <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>STARS</th>
                    <th>
                      <div className="th-content">
                        DATE
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                          <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>TRIP INFO</th>
                    <th>DURATION/PRICE</th>
                  </tr>
                </thead>
                <tbody className={isTableCollapsed ? 'collapsed' : ''}>
                  {currentBookings.map((booking) => {
                    return (
                      <tr key={booking.id}>
                        <td className="booking-details-cell">{booking.bookingDetails}</td>
                        <td>
                          <div className="feedback-info">
                            <div className="feedback-avatar">
                              <LuUserRound className="feedback-avatar-icon" />
                            </div>
                            <div className="feedback-name">{booking.customerName}</div>
                          </div>
                        </td>
                        <td className="driver-name">{booking.driver}</td>
                        <td>
                          <div className="stars-rating">
                            {[...Array(5)].map((_, index) => (
                              index < booking.stars ? (
                                <FaStar key={index} className="star-filled" />
                              ) : (
                                <FaRegStar key={index} className="star-outline" />
                              )
                            ))}
                          </div>
                        </td>
                        <td className="">{booking.date}</td>
                        <td className="trip-info">{booking.tripInfo}</td>
                        <td>
                          <div className="duration-price">
                            <span className="duration">{booking.duration}</span>
                            <span className="price">{booking.price}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
  
            {/* Pagination */}
            <div className="pagination-container-2 p-3">
              <span className="pagination-info">
                Showing {indexOfFirstBooking + 1} to {Math.min(indexOfLastBooking, searchFilteredBookings.length)} of {searchFilteredBookings.length} results
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
      </div>
    );
  }

export default Feedbacks
