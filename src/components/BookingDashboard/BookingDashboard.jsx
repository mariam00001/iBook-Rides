import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import bookIcon from '../../assets/icon set (5).svg';
import clockIcon from '../../assets/icon set (6).svg';
import caricon from '../../assets/icon set (7).svg';
import userIcon from '../../assets/icon set (8).svg';
import profile from '../../assets/Elipse 5.svg';
import word from '../../assets/icons set.svg';
import night from '../../assets/icons set (1).svg';
import arrowLeft from '../../assets/Container (1).svg';
import bookingClockIcon from '../../assets/Container (2).svg';
import confirmIcon from '../../assets/icon set (9).svg';
import rejectIcon from '../../assets/Vector (52).svg';
import { FaSearch, FaBars} from 'react-icons/fa';
import './BookingDashboard.css';

const BookingDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unassignedTrips, setUnassignedTrips] = useState([
    { id: 'R-1045', priority: 'High', client: 'Client Name', vehicle: 'Luxury SUV', pickup: 'Forestville, California, 95436', dropoff: 'Morrow, Georgia, 30260', time: '3:30H' },
    { id: 'R-1046', priority: 'Medium', client: 'Sarah Johnson', vehicle: 'Sedan', pickup: 'Downtown, San Francisco, CA', dropoff: 'Airport, Oakland, CA', time: '1:15H' },
    { id: 'R-1047', priority: 'Low', client: 'Michael Brown', vehicle: 'Van', pickup: 'Location A', dropoff: 'Location B', time: '0:45H' },
    { id: 'R-1045', priority: 'High', client: 'Client Name', vehicle: 'Luxury SUV', pickup: 'Forestville, California, 95436', dropoff: 'Morrow, Georgia, 30260', time: '3:30H' },
    { id: 'R-1046', priority: 'Medium', client: 'Sarah Johnson', vehicle: 'Sedan', pickup: 'Downtown, San Francisco, CA', dropoff: 'Airport, Oakland, CA', time: '1:15H' },
    { id: 'R-1047', priority: 'Low', client: 'Michael Brown', vehicle: 'Van', pickup: 'Location A', dropoff: 'Location B', time: '0:45H' },
  ]);

  const drivers = [
    { id: 'JS1', name: 'Jane Smith', initials: 'JS', status: 'Busy' },
    { id: 'JS2', name: 'Jane Smith', initials: 'JS', status: 'Busy' },
    { id: 'MJ', name: 'Mike Johnson', initials: 'MJ', status: 'Available' },
    { id: 'SW', name: 'Sarah Wilson', initials: 'SW', status: 'Offline' },
  ];

  const [scheduleData, setScheduleData] = useState({
    'JS1-09:00': { id: 'R-1040', client: 'Sarah Johnson', time: '1:30H', pickup: 'Downtown, San Francisco', dropoff: 'Airport, Oakland, CA' },
    'JS2-10:00': { id: 'R-1041', client: 'Emily Davis', time: '1:15H', pickup: 'Business District, LA', dropoff: 'Hotel, Beverly Hills' },
    'MJ-11:00': { id: 'R-1042', client: 'Robert Wilson', time: '0:45H', pickup: 'Downtown, Chicago', dropoff: 'Train Station, Union' },
    'MJ-12:00': { id: 'R-1050', client: 'John Doe', time: '2:00H', pickup: 'City Center, New York', dropoff: 'Airport, JFK' },
  });

  const [draggedTrip, setDraggedTrip] = useState(null);

  const [showAllBookings, setShowAllBookings] = useState(false);

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

  const getPriorityClass = (priority) => {
    const classes = {
      High: 'priority-high',
      Medium: 'priority-medium',
      Low: 'priority-low'
    };
    return classes[priority] || 'priority-low';
  };

  const getStatusClass = (status) => {
    const classes = {
      Busy: 'status-busy',
      Available: 'status-available',
      Offline: 'status-offline'
    };
    return classes[status] || '';
  };

  const handleDragStart = (e, trip, isFromSchedule = false, scheduleKey = null) => {
    setDraggedTrip({ ...trip, isFromSchedule, scheduleKey });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, driverId, timeSlot) => {
    e.preventDefault();
    if (draggedTrip) {
      if (draggedTrip.isFromSchedule) {
        // Moving from schedule back to unassigned
        const tripToMove = {
          id: draggedTrip.id,
          priority: 'Medium',
          client: draggedTrip.client,
          vehicle: 'Sedan',
          pickup: draggedTrip.pickup,
          dropoff: draggedTrip.dropoff,
          time: draggedTrip.time
        };
        setUnassignedTrips(prev => [...prev, tripToMove]);
        setScheduleData(prev => {
          const newData = { ...prev };
          delete newData[draggedTrip.scheduleKey];
          return newData;
        });
      } else {
        // Moving from unassigned to schedule
        const key = `${driverId}-${timeSlot}`;
        setScheduleData(prev => ({
          ...prev,
          [key]: {
            id: draggedTrip.id,
            client: draggedTrip.client,
            time: draggedTrip.time,
            pickup: draggedTrip.pickup,
            dropoff: draggedTrip.dropoff,
          }
        }));
        setUnassignedTrips(prev => prev.filter(trip => trip.id !== draggedTrip.id));
      }
      setDraggedTrip(null);
    }
  };

  const handleDropToUnassigned = (e) => {
    e.preventDefault();
    if (draggedTrip && draggedTrip.isFromSchedule) {
      const tripToMove = {
        id: draggedTrip.id,
        priority: 'Medium',
        client: draggedTrip.client,
        vehicle: 'Sedan',
        pickup: draggedTrip.pickup,
        dropoff: draggedTrip.dropoff,
        time: draggedTrip.time
      };
      setUnassignedTrips(prev => [...prev, tripToMove]);
      setScheduleData(prev => {
        const newData = { ...prev };
        delete newData[draggedTrip.scheduleKey];
        return newData;
      });
      setDraggedTrip(null);
    }
  };

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <div className="container-fluid p-4">
          {/* Header with Booking title and Profile */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <button 
                className="menu-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
              <h2 className='booking-title'>Booking</h2>
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
                <h4>Today's Rides</h4>
                <div className="d-flex justify-content-between align-items-center py-1">
                  <h3>8</h3>
                  <div className="icon-book">
                    <img src={bookIcon} alt="" />
                  </div>
                </div>
                <p className="mb-0">3 Active , 2 Pendings</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="summary-card">
                <h4>Pending Requests</h4>
                <div className="d-flex justify-content-between align-items-center py-1">
                  <h3>12</h3>
                  <div className="icon-book">
                    <img src={clockIcon} alt="" />
                  </div>
                </div>
                <p className="mb-0 color-book">Awaiting Assignments</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-5 mb-md-0">
              <div className="summary-card">
                <h4>Active Rides</h4>
                <div className="d-flex justify-content-between align-items-center py-1">
                  <h3>5</h3>
                  <div className="icon-book">
                    <img src={caricon} alt="" />
                  </div>
                </div>
                <p className="mb-0">Currently in Process</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-md-0">
              <div className="summary-card">
                <h4>Completed</h4>
                <div className="d-flex justify-content-between align-items-center py-1">
                  <h3>23</h3>
                  <div className="icon-book">
                    <img src={userIcon} alt="" />
                  </div>
                </div>
                <p className="mb-0 color-book-2">Successfully Finished</p>
              </div>
            </div>
          </div>

        <div className="row gx-3 dashboard-layout">
            <div className="col-md-3 mb-5 mb-lg-0">
                {/* Left Panel */}
          <div className="left-panel">
            {/* Unassigned Trips Section */}
            <div className="unassigned-section">
              <div className="unassigned-header-sticky">
                <h5 className="section-title ">Unassigned Trips</h5>
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input type="text" className="search-input" placeholder="Search Trip" />
                </div>
              </div>
              <div 
                className="unassigned-trips-scroll"
                onDragOver={handleDragOver}
                onDrop={handleDropToUnassigned}
              >
                {unassignedTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="trip-card draggable"
                    draggable
                    onDragStart={(e) => handleDragStart(e, trip, false)}
                  >
                    <div className="trip-header">
                      <div className="">
                      <span className="trip-id me-2">{trip.id}</span>
                      <span className={`priority-badge ${getPriorityClass(trip.priority)}`}>{trip.priority}</span>
                      </div>
                      <span className="trip-duration">{trip.time}</span>
                    </div>
                    <div className="trip-content">
                      <p className="trip-client">{trip.client}</p>
                      <p className="trip-vehicle">{trip.vehicle}</p>
                      <div className="trip-locations">
                        <span className="location-pickup"><div className="circle-green"></div> {trip.pickup}</span>
                        <span className="location-dropoff"><div className="circle-red"></div> {trip.dropoff}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

            </div>
        <div className="col-md-9">
            {/* Main Driver Schedule Area */}
            <div className="driver-schedule-area">
            <div className="schedule-header">
              <div className="header-left">  
                <h2 className="schedule-title">Driver Schedule</h2>
              </div>
              <div className="header-right justify-content-between">
                <div className="d-flex align-items-center gap-2">
              <button className="nav-arrow"><img src={arrowLeft} alt="arrowLeft" /></button>
                <div className="schedule-date">Thursday, October 9, 2025</div>
                </div>
            
                <div className=" d-flex align-items-center gap-2">
                <div className="header-search">
                  <FaSearch className="search-icon" />
                  <input type="text" className="search-input" placeholder="Search Driver/Trips" />
                </div>
                <button 
                  className="btn-add-booking"
                  onClick={() => navigate('/add-booking')}
                >
                  + Add Booking
                </button>
                </div>
              
              </div>
            </div>

            <div className="schedule-grid-container">
              <div className="schedule-grid">
                {/* Header Row with Red Background */}
                <div className="schedule-header-row">
                  {/* Time column header */}
                  <div className="time-column-header">Time</div>
                  
                  {/* Driver headers */}
                  {drivers.map((driver) => (
                    <div key={driver.id} className="driver-header">
                      <div className="d-flex align-items-center gap-2">
                        <div className="driver-avatar">{driver.initials}</div>
                        <div className="driver-name">{driver.name}</div>
                      </div>
                      <span className={`status-tag ${getStatusClass(driver.status)}`}>{driver.status}</span>
                    </div>
                  ))}
                </div>

                {/* Time slots and schedule cells */}
                {timeSlots.map((time) => (
                  <React.Fragment key={time}>
                    <div className="time-slot">{time}</div>
                    {drivers.map((driver) => {
                      const key = `${driver.id}-${time}`;
                      const trip = scheduleData[key];
                      return (
                        <div
                          key={key}
                          className="schedule-cell"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, driver.id, time)}
                        >
                          {trip && (
                            <div 
                              className="assigned-trip draggable"
                              draggable
                              onDragStart={(e) => handleDragStart(e, trip, true, key)}
                            >
                              <div className="trip-id-small">{trip.id}</div>
                              <div className="trip-client-small">{trip.client}</div>
                              <div className="trip-time-small">{trip.time}</div>
                              <div className="trip-locations-small">
                                <span className="location-pickup-small"> <div className="circle-green"></div> {trip.pickup}</span>
                                <span className="location-dropoff-small"> <div className="circle-red"></div> {trip.dropoff}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        
        </div>
        </div>

        {/* Confirm Bookings Section */}
        <div className="container-fluid p-4">
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

        </div>

      
      </div>
    </div>
  );
};

export default BookingDashboard;

