import { useState } from 'react';
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import profile from '../../assets/Elipse 5.svg';
import profile1 from '../../assets/cf3885ec994c9a3e89f14af2ac45fc5b6aaa9671.jpg';
import profile2 from '../../assets/d6b2edc366996e71916f11b2aac129cd2ce1da4c.jpg';
import profile3 from '../../assets/f8243f49cc583efadaf657d7af7c40b2eb644c8b.jpg';
import word from '../../assets/icons set.svg';
import night from '../../assets/icons set (1).svg';
import bookIcon from '../../assets/icon set (5).svg';
import dollarIcon from '../../assets/icon set (10).svg';
import bookingClockIcon from '../../assets/Container (2).svg';
import confirmIcon from '../../assets/icon set (9).svg';
import rejectIcon from '../../assets/Vector (52).svg';
import { FaStar, FaBars } from 'react-icons/fa';
import { FaMapPin, FaClock } from 'react-icons/fa';
import { MdOutlineDirectionsCar } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import './Dashboard.css';
import { RiUserLine } from 'react-icons/ri';

const Dashboard = () => {
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [showAllDrivers, setShowAllDrivers] = useState(false);
  const [showAllRides, setShowAllRides] = useState(false);
  const [rideFilter, setRideFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Requests');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const confirmBookings = [
    {
      id: 1,
      name: 'Marcus Johnson',
      type: 'Airport Transfer',
      route: 'Downtown Hotel → JFK Airport',
      date: 'Dec 4, 2024 - 2:30 PM'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      type: 'Airport Transfer',
      route: 'Downtown Hotel → JFK Airport',
      date: 'Dec 4, 2024 - 2:30 PM'
    },
    {
      id: 3,
      name: 'Sarah Williams',
      type: 'City Tour',
      route: 'Central Station → Museum District',
      date: 'Dec 5, 2024 - 10:00 AM'
    },
    {
      id: 4,
      name: 'David Brown',
      type: 'Business Meeting',
      route: 'Airport → Downtown Office',
      date: 'Dec 5, 2024 - 3:15 PM'
    },
    {
      id: 5,
      name: 'Emily Davis',
      type: 'Airport Transfer',
      route: 'Hotel Grand → LAX Airport',
      date: 'Dec 6, 2024 - 8:00 AM'
    },
    {
      id: 6,
      name: 'Michael Chen',
      type: 'Shopping Trip',
      route: 'Residential Area → Shopping Mall',
      date: 'Dec 6, 2024 - 1:45 PM'
    }
  ];

  // Always show all bookings, but limit visible height when not expanded
  const displayedBookings = confirmBookings;

  const availableDrivers = [
    {
      id: 1,
      name: 'James Wilson',
      vehicle: 'BMW 7 Series',
      vehicleType: 'Luxury',
      status: 'Available',
      rating: 4.9,
      avatar: profile1
    },
    {
      id: 2,
      name: 'Maria Garcia',
      vehicle: 'Audi A8',
      vehicleType: 'Executive',
      status: 'Busy',
      rating: 4.8,
      avatar: profile2
    },
    {
      id: 3,
      name: 'Robert Thompson',
      vehicle: 'Lexus LS',
      vehicleType: 'Premium',
      status: 'Available',
      rating: 4.7,
      avatar: profile3
    },
    {
      id: 4,
      name: 'John Doe',
      vehicle: 'Mercedes S-Class',
      vehicleType: 'Luxury',
      status: 'Available',
      rating: 4.9,
      avatar: profile1
    },
    {
      id: 5,
      name: 'Jane Smith',
      vehicle: 'Tesla Model S',
      vehicleType: 'Premium',
      status: 'Busy',
      rating: 4.6,
      avatar: profile2
    },
    {
      id: 6,
      name: 'Michael Brown',
      vehicle: 'Bentley Continental',
      vehicleType: 'Luxury',
      status: 'Available',
      rating: 5.0,
      avatar: profile3
    }
  ];

  const allRides = [
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
      type: 'Executive Meeting',
      route: 'Office Complex → Conference Center',
      date: 'Dec 4, 2024 - 2:30 PM',
      status: 'Assigned',
      iconType: 'person'
    },
    {
      id: 4,
      name: 'Emily Watson',
      type: 'Airport Transfer',
      route: 'Downtown Hotel → JFK Airport',
      date: 'Dec 4, 2024 - 4:00 PM',
      status: 'Pending',
      iconType: 'car'
    },
    {
      id: 5,
      name: 'Michael Johnson',
      type: 'City Tour',
      route: 'Central Station → Museum District',
      date: 'Dec 4, 2024 - 5:30 PM',
      status: 'Pending',
      iconType: 'person'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      type: 'Shopping Trip',
      route: 'Residential Area → Shopping Mall',
      date: 'Dec 4, 2024 - 6:00 PM',
      status: 'Pending',
      iconType: 'car'
    }
  ];

  const displayedDrivers = availableDrivers;
  const displayedRides = rideFilter === 'All' 
    ? allRides 
    : allRides.filter(ride => ride.status === rideFilter);
  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <div className="container-fluid p-4">
          {/* Header with Dashboard title and Profile */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <button 
                className="menu-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
              <h2 className='dashboard-title'>Dashboard</h2>
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
                <h4>Total Bookings</h4>
                <div className="d-flex justify-content-between align-items-center py-1">
                  <h3>247</h3>
                  <div className="icon-book">
                    <img src={bookIcon} alt="" />
                  </div>
                </div>
                <p className="mb-0">+12% from last month</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="summary-card">
                <h4>Total Revenue</h4>
                <div className="d-flex justify-content-between align-items-center py-1">
                  <h3>$89,420</h3>
                  <div className="icon-book">
                    <img src={dollarIcon} alt="dollarIcon" />
                  </div>
                </div>
                <p className="mb-0 ">+12% from last month</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-5 mb-md-0">
              <div className="summary-card">
                <h4>Available Cars</h4>
                <div className="d-flex justify-content-between align-items-center py-1">
                  <h3>18</h3>
                  <div className="icon-book">
                    <img src={dollarIcon} alt="dollarIcon" />
                  </div>
                </div>
                <p className="mb-0 color-book-2">Out of 25 total Cars</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-md-0">
              <div className="summary-card">
                <h4>Available Drivers</h4>
                <div className="d-flex justify-content-between align-items-center py-1">
                  <h3>12</h3>
                  <div className="icon-book">
                    <img src={dollarIcon} alt="dollarIcon" />
                  </div>
                </div>
                <p className="mb-0 color-book-2">Available of 25 driver</p>
              </div>
            </div>
          </div>

          {/* Tab Buttons */}
          <div className="d-flex justify-content-end border-bottom">
          <div className="tab-buttons-wrapper p-1 ">
            <button 
              className={`tab-button ${activeTab === 'Requests' ? 'active' : ''}`}
              onClick={() => setActiveTab('Requests')}
            >
              Requests
            </button>
            <button 
              className={`tab-button ${activeTab === 'Calendar' ? 'active' : ''}`}
              onClick={() => setActiveTab('Calendar')}
            >
              Calendar
            </button>
          </div>
          </div>

            {/* Confirm Bookings Section */}
        <div className="container-fluid px-0 pb-4">
          <div className="confirm-bookings-wrapper">
            <div className="confirm-bookings-header">
              <div>
                <h3 className="confirm-bookings-title">Confirm Bookings</h3>
                <p className="confirm-bookings-hint">Drag to assign to rides</p>
              </div>
              <a 
                href="#" 
                className="view-all-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowAllBookings(!showAllBookings);
                }}
              >
                {showAllBookings ? 'Show Less' : 'View All'}
              </a>
            </div>
            
            <div className={`confirm-bookings-list px-3 ${showAllBookings ? 'show-all' : ''}`}>
              {displayedBookings.map((booking, index) => (
                <div key={booking.id} className={`confirm-booking-card ${index > 0 ? 'booking-separator' : ''}`}>
                  <div className="booking-content">
                    <div className="d-flex align-items-center gap-2">
                      <div className="booking-icon-wrapper ">
                        <img src={bookingClockIcon} alt="clockIcon" />
                        
                      </div>
                      <div className="">
                      <h4 className="booking-name mb-1">{booking.name}</h4>
                        <p className="booking-type">{booking.type}</p>
                        </div>
                        </div>
                    <div className="booking-details">
            
                      <div className="booking-route mt-2">
                        <span>📍{booking.route}</span>
                      </div>
                      <div className="booking-date">
                        <span>🕐 {booking.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="booking-actions">
                    <button className="btn-confirm-booking">
                      <img src={confirmIcon} alt="confirmIcon" />
                    </button>
                    <button className="btn-reject-booking">
                      <img src={rejectIcon} alt="rejectIcon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

          {/* Available Drivers and All Rides Section */}
          <div className="dashboard-sections-wrapper">
            {/* Available Drivers Section */}
            <div className="drivers-section">
              <div className="section-header">
                <div>
                  <h3 className="section-title">Available Drivers</h3>
                  <p className="section-hint">Drag to assign to rides</p>
                </div>
                <a 
                  href="#" 
                  className="view-all-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAllDrivers(!showAllDrivers);
                  }}
                >
                  {showAllDrivers ? 'Show Less' : 'View All'}
                </a>
              </div>
              
              <div className={`drivers-list ${showAllDrivers ? 'show-all' : ''}`}>
                {displayedDrivers.map((driver, index) => (
                  <div key={driver.id} className={`driver-card ${index > 0 ? 'driver-separator' : ''}`}>
                    <div className="driver-content">
                      <div className="d-flex align-items-center gap-3">
                        <div className="driver-avatar-wrapper">
                          <img src={driver.avatar} alt={driver.name} className="driver-avatar-img" />
                        </div>
                        <div className="driver-info">
                          <h4 className="driver-name">{driver.name}</h4>
                          <p className="driver-vehicle">{driver.vehicle} • {driver.vehicleType}</p>
                          <div className="d-flex align-items-center gap-2">
                            <span className={`status-badge ${driver.status === 'Available' ? 'status-available' : 'status-busy'}`}>
                              {driver.status}
                            </span>
                            <div className="rating-wrapper">
                              <FaStar className="star-icon" />
                              <span className="rating-text">{driver.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Rides Section */}
            <div className="rides-section">
              <div className="section-header">
                <div>
                  <h3 className="section-title">All Rides</h3>
                  <p className="section-hint">Drop drivers on pending trips</p>
                </div>
                <div className="filter-buttons">
                  <button 
                    className={`filter-btn ${rideFilter === 'All' ? 'active-all' : ''}`}
                    onClick={() => setRideFilter('All')}
                  >
                    All
                  </button>
                  <button 
                    className={`filter-btn ${rideFilter === 'Pending' ? 'active-pending' : ''}`}
                    onClick={() => setRideFilter('Pending')}
                  >
                    Pending
                  </button>
                </div>
              </div>
              
              <div className={`confirm-bookings-list  px-3 ${showAllRides ? 'show-all' : ''}`}>
                {displayedRides.map((ride, index) => (
                  <div key={ride.id} className={`confirm-booking-card ${index > 0 ? 'booking-separator' : ''}`}>
                    <div className="booking-content">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                        <div className={`booking-icon-wrapper ${ride.status === 'Active' ? 'icon-status-active' : ride.status === 'Assigned' ? 'icon-status-assigned' : 'icon-status-pending'}`}>
                          {ride.iconType === 'car' ? (
                            <MdOutlineDirectionsCar className="booking-status-icon" />
                          ) : (
                            <RiUserLine className="booking-status-icon" />
                          )}
                        </div>
                        <div className="">
                          <h4 className="booking-name-2 mb-1">{ride.name}</h4>
                          <p className="booking-type">{ride.type}</p>
                        </div>
                        </div> 
                        <div className="booking-actions">
                      <span className={`ride-status-badge ${ride.status === 'Active' ? 'status-active' : ride.status === 'Assigned' ? 'status-assigned' : 'status-pending'}`}>
                        {ride.status}
                      </span>
                    </div>
                    
                      </div>
                      <div className="booking-details">
                        <div className="booking-route mt-2">
                          <span>📍{ride.route}</span>
                        </div>
                        <div className="booking-date">
                          <span>🕐 {ride.date}</span>
                        </div>
                      </div>
                    </div>
                 
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

