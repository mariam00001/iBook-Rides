import { useState } from 'react';
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import profile from '../../../assets/Elipse 5.svg';
import word from '../../../assets/icons set.svg';
import night from '../../../assets/icons set (1).svg';
import profile1 from '../../../assets/cf3885ec994c9a3e89f14af2ac45fc5b6aaa9671.jpg';
import profile2 from '../../../assets/d6b2edc366996e71916f11b2aac129cd2ce1da4c.jpg';
import profile3 from '../../../assets/f8243f49cc583efadaf657d7af7c40b2eb644c8b.jpg';
import avatar from '../../../assets/Role Options.svg';
import { FaSearch, FaStar, FaEye, FaPhone, FaBars } from 'react-icons/fa';
import { FaMapPin, FaCalendar, FaUser } from 'react-icons/fa';
import { MdOutlineDirectionsCar } from 'react-icons/md';
import { MdOutlineLocalPhone, MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiCalendarEventLine } from 'react-icons/ri';
import './Drivers.css';

const Drivers = () => {
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [showAssignTripModal, setShowAssignTripModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const driversPerPage = 6;

  const drivers = [
    {
      id: 1,
      name: 'John Smith',
      avatar: profile1,
      status: 'Available',
      rating: 4.8,
      lastTrip: 'Jan 15, 2024',
      totalTrips: 245,
      upcomingTrips: ['Jan 20, 2024', 'Jan 22, 2024']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: profile2,
      status: 'Available',
      rating: 4.9,
      lastTrip: 'Jan 14, 2024',
      totalTrips: 312,
      upcomingTrips: ['Jan 18, 2024', 'Jan 21, 2024']
    },
    {
      id: 3,
      name: 'Michael Brown',
      avatar: profile3,
      status: 'Available',
      rating: 4.7,
      lastTrip: 'Jan 13, 2024',
      totalTrips: 189,
      upcomingTrips: ['Jan 19, 2024', 'Jan 21, 2024']
    },
    {
      id: 4,
      name: 'Emily Davis',
      avatar: profile1,
      status: 'Available',
      rating: 4.9,
      lastTrip: 'Jan 16, 2024',
      totalTrips: 278,
      upcomingTrips: ['Jan 20, 2024', 'Jan 23, 2024']
    },
    {
      id: 5,
      name: 'David Wilson',
      avatar: profile2,
      status: 'Available',
      rating: 4.6,
      lastTrip: 'Jan 12, 2024',
      totalTrips: 156,
      upcomingTrips: ['Jan 17, 2024', 'Jan 21, 2024']
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      avatar: profile3,
      status: 'Available',
      rating: 4.8,
      lastTrip: 'Jan 15, 2024',
      totalTrips: 201,
      upcomingTrips: ['Jan 18, 2024', 'Jan 21, 2024']
    },
    {
      id: 7,
      name: 'Robert Taylor',
      avatar: profile1,
      status: 'Available',
      rating: 4.9,
      lastTrip: 'Jan 16, 2024',
      totalTrips: 298,
      upcomingTrips: ['Jan 19, 2024', 'Jan 22, 2024']
    },
    {
      id: 8,
      name: 'Jennifer Martinez',
      avatar: profile2,
      status: 'Available',
      rating: 4.7,
      lastTrip: 'Jan 14, 2024',
      totalTrips: 234,
      upcomingTrips: ['Jan 20, 2024', 'Jan 25, 2024']
    },
    {
      id: 9,
      name: 'William Lee',
      avatar: profile3,
      status: 'Available',
      rating: 4.8,
      lastTrip: 'Jan 17, 2024',
      totalTrips: 267,
      upcomingTrips: ['Jan 21, 2024', 'Jan 24, 2024']
    },
    {
      id: 10,
      name: 'Amanda White',
      avatar: profile1,
      status: 'Available',
      rating: 4.9,
      lastTrip: 'Jan 15, 2024',
      totalTrips: 312,
      upcomingTrips: ['Jan 18, 2024', 'Jan 23, 2024']
    },
    {
      id: 11,
      name: 'Christopher Harris',
      avatar: profile2,
      status: 'Available',
      rating: 4.6,
      lastTrip: 'Jan 13, 2024',
      totalTrips: 189,
      upcomingTrips: ['Jan 19, 2024', 'Jan 26, 2024']
    },
    {
      id: 12,
      name: 'Jessica Clark',
      avatar: profile3,
      status: 'Available',
      rating: 4.8,
      lastTrip: 'Jan 16, 2024',
      totalTrips: 256,
      upcomingTrips: ['Jan 20, 2024', 'Jan 22, 2024']
    },
    {
      id: 13,
      name: 'Daniel Lewis',
      avatar: profile1,
      status: 'Available',
      rating: 4.7,
      lastTrip: 'Jan 14, 2024',
      totalTrips: 223,
      upcomingTrips: ['Jan 21, 2024', 'Jan 27, 2024']
    },
    {
      id: 14,
      name: 'Michelle Walker',
      avatar: profile2,
      status: 'Available',
      rating: 4.9,
      lastTrip: 'Jan 17, 2024',
      totalTrips: 289,
      upcomingTrips: ['Jan 19, 2024', 'Jan 23, 2024']
    },
    {
      id: 15,
      name: 'Matthew Hall',
      avatar: profile3,
      status: 'Available',
      rating: 4.8,
      lastTrip: 'Jan 15, 2024',
      totalTrips: 275,
      upcomingTrips: ['Jan 18, 2024', 'Jan 25, 2024']
    },
    {
      id: 16,
      name: 'Nicole Allen',
      avatar: profile1,
      status: 'Available',
      rating: 4.7,
      lastTrip: 'Jan 16, 2024',
      totalTrips: 241,
      upcomingTrips: ['Jan 20, 2024', 'Jan 24, 2024']
    },
    {
      id: 17,
      name: 'Andrew Young',
      avatar: profile2,
      status: 'Available',
      rating: 4.9,
      lastTrip: 'Jan 13, 2024',
      totalTrips: 304,
      upcomingTrips: ['Jan 19, 2024', 'Jan 28, 2024']
    },
    {
      id: 18,
      name: 'Stephanie King',
      avatar: profile3,
      status: 'Available',
      rating: 4.8,
      lastTrip: 'Jan 14, 2024',
      totalTrips: 262,
      upcomingTrips: ['Jan 21, 2024', 'Jan 22, 2024']
    }
  ];

  const trips = [
    {
      id: 1,
      name: 'Sarah Chen',
      type: 'Business Meeting',
      route: 'Office Complex → Conference Center',
      date: 'Dec 4, 2024 - 3:15 PM',
      status: 'Active',
      iconType: 'car'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      type: 'Business Meeting',
      route: 'Office Complex → Conference Center',
      date: 'Dec 4, 2024 - 3:15 PM',
      status: 'Active',
      iconType: 'car'
    },
    {
      id: 3,
      name: 'David Rodriguez',
      type: 'Business Meeting',
      route: 'Office Complex → Conference Center',
      date: 'Dec 4, 2024 - 2:30 PM',
      status: 'Active',
      iconType: 'car'
    }
  ];

  const handleAssignTrip = (driver) => {
    setSelectedDriver(driver);
    setShowAssignTripModal(true);
  };

  // Pagination logic
  const totalPages = Math.ceil(drivers.length / driversPerPage);
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = drivers.slice(indexOfFirstDriver, indexOfLastDriver);

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

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <div className="container-fluid p-4">
          {/* Header with Drivers title and Profile */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <button 
                className="menu-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
              <h2 className='dashboard-title'>Drivers</h2>
            </div>
            <div className="profile d-flex align-items-center justify-content-center">
              <img src={profile} alt="profile" className="profile-img me-3" />
              <img src={word} className="me-2" alt="word" />
              <img src={night} alt="night" />
            </div>
          </div>

          {/* Controls */}
          <div className="drivers-controls d-flex justify-content-between align-items-center mb-4 mt-2">
           
                <h2 className='drivers-title'>Available Drivers (6)</h2>
                <div className="d-flex align-items-center gap-3">
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input type="text" className="search-input" placeholder="Search" />
              </div>
              <label className='sort-by-label'>Sort by:</label>
              <select className="sort-select">
                <option>Rating</option>
                <option>Name</option>
                <option>Total Trips</option>
              </select>
              <button 
              className="btn-add-booking"
              onClick={() => setShowAddDriverModal(true)}
            >
              + Add Drivers
             </button>
                </div>
           
          </div>

          {/* Driver Cards Grid */}
          <div className="drivers-grid">
            {currentDrivers.map((driver) => (
              <div key={driver.id} className="driver-card">
                <div className="d-flex align-items-center">
                <div className="driver-card-header">
                  <img src={driver.avatar} alt={driver.name} className="driver-avatar-2 me-2" />
                  <div className="driver-info">
                    <h4 className="driver-name-2 mb-2">{driver.name}</h4>
                    <div className="status-rating-container">
                      <span className={`status-badge status-available`}>{driver.status}</span>
                      <div className="driver-rating">
                        <FaStar className="star-icon" />
                        <span>{driver.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
            
               
                <div className="driver-details mt-2">
                  <div className="detail-item d-flex justify-content-between align-items-center">
                    <span className="detail-label">Last Trip:</span>
                    <span className="detail-value">{driver.lastTrip}</span>
                  </div>
                  <div className="detail-item d-flex justify-content-between align-items-center">
                    <span className="detail-label">Total Trips:</span>
                    <span className="detail-value">{driver.totalTrips}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Upcoming Trips:</span>
                    <div className="upcoming-trips mt-2">
                      {driver.upcomingTrips.map((trip, index) => (
                        <span key={index} className="trip-date"><RiCalendarEventLine />{trip}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="driver-actions">
                  <button 
                    className="btn-add-booking w-100"
                    onClick={() => handleAssignTrip(driver)}
                  >
                    Assign Trip
                  </button>
                  <div className="action-icons ms-2">
                    <MdOutlineRemoveRedEye className="action-icon" />
                    <MdOutlineLocalPhone className="action-icon" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination-container">
            <span className="pagination-info">
              Showing {indexOfFirstDriver + 1} to {Math.min(indexOfLastDriver, drivers.length)} of {drivers.length} results
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

      {/* Add New Driver Modal */}
      {showAddDriverModal && (
        <div className="modal-overlay" onClick={() => setShowAddDriverModal(false)}>
          <div className="modal-content pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add New Driver</h3>
              <button className="modal-close" onClick={() => setShowAddDriverModal(false)}>×</button>
            </div>
            <div className="modal-body pb-0">
              <div className="profile-upload-section">
                <div className="profile-upload-placeholder">
                 <img src={avatar} alt="avatar" />
                </div>
                <button className="btn-add-img ms-2">+ Add Img</button>
              </div>
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>First Name*</label>
                  <input type="text" placeholder="EX, Eslam" />
                </div>
                <div className="form-group">
                  <label>Last Name*</label>
                  <input type="text" placeholder="EXI Ahmed" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address*</label>
                  <input type="email" placeholder="Exes********@gmail.com" />
                </div>
                <div className="form-group">
                  <label>Phone Number*</label>
                  <input type="tel" placeholder="EX: 012xxxxxxxxx3" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" placeholder="Ex:4 mohamed ezz, Cairo" />
                </div>
                <div className="form-group">
                  <label>Licence Expire</label>
                  <input type="text" placeholder="EX: 4/12/2026" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Licence ID</label>
                  <input type="text" placeholder="Ex: 234567845346346" />
                </div>
                <div className="form-group">
                  <label>Comments</label>
                  <textarea placeholder=""></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-add-booking ">+ Add User</button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Trips Modal */}
      {showAssignTripModal && (
        <div className="modal-overlay" onClick={() => setShowAssignTripModal(false)}>
          <div className="modal-content " onClick={(e) => e.stopPropagation()}>
            <div className="px-4 pt-4  content-assign-trip">
              <div>
                <h4 className="all-rides-title">All Rides</h4>
                <p className="select-trip-text">Select Trip to Assign</p>
              </div>
              <button className="modal-close" onClick={() => setShowAssignTripModal(false)}>×</button>
            </div>
            <div className="modal-body trip-content">
              <div className={`mt-3 px-3`}>
                {trips.map((trip, index) => (
                  <div key={trip.id} className={`confirm-booking-card ${index > 0 ? 'booking-separator' : ''}`}>
                    <div className="booking-content">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <div className={`booking-icon-wrapper ${trip.status === 'Active' ? 'icon-status-active' : trip.status === 'Assigned' ? 'icon-status-assigned' : 'icon-status-pending'}`}>
                            {trip.iconType === 'car' ? (
                              <MdOutlineDirectionsCar className="booking-status-icon" />
                            ) : (
                              <FaUser className="booking-status-icon" />
                            )}
                          </div>
                          <div className="">
                            <h4 className="booking-name-2 mb-1">{trip.name}</h4>
                            <p className="booking-type">{trip.type}</p>
                          </div>
                        </div>
                        <div className="booking-actions">
                          <input type="radio" name="selectedTrip" />
                        </div>
                      </div>
                      <div className="booking-details">
                        <div className="booking-route mt-2">
                          <span>📍{trip.route}</span>
                        </div>
                        <div className="booking-date">
                          <span>🕐 {trip.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-add-booking">+ Assign Trip</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drivers;

