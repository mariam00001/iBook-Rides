import { useState } from 'react';
import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import profile from '../../../assets/Elipse 5.svg';
import word from '../../../assets/icons set.svg';
import night from '../../../assets/icons set (1).svg';
import { FaBars, FaPlus, FaRegTrashAlt, FaSearch } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import '../../Custmors/Custmors.css';
import '../../../setting/payment-type/Payment-type.css';
import '../../Affilate/Affilate.css';
import './Addrates.css';
import { AiOutlineEdit } from 'react-icons/ai';

const Addrates = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Ons-Rates');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(8);
  const [showAddOnsRateModal, setShowAddOnsRateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rateToDelete, setRateToDelete] = useState(null);
  
  // Airport Master state
  const [airportSearchTerm, setAirportSearchTerm] = useState('');
  const [airportCurrentPage, setAirportCurrentPage] = useState(1);
  const [airportEntriesPerPage] = useState(8);
  const [showAddAirportModal, setShowAddAirportModal] = useState(false);
  const [airportToDelete, setAirportToDelete] = useState(null);
  
  // Stops state
  const [stopsSearchTerm, setStopsSearchTerm] = useState('');
  const [stopsCurrentPage, setStopsCurrentPage] = useState(1);
  const [stopsEntriesPerPage] = useState(8);
  const [showAddStopsModal, setShowAddStopsModal] = useState(false);
  const [stopToDelete, setStopToDelete] = useState(null);

  // Ons-Rates data
  const onsRates = [
    {
      id: 1,
      vehicleType: 'Sedan',
      amount: '10$',
      appliesTo: {
        name: 'Parking Fee',
        airport: 'JFK Airport, NY, USA',
        services: 'From Airport'
      },
      status: 'Active'
    },
    {
      id: 2,
      vehicleType: 'SUV',
      amount: '20$',
      appliesTo: {
        name: 'Parking Fee',
        airport: 'JFK Airport, NY, USA',
        services: 'From Airport'
      },
      status: 'Active'
    },
  ];

  // Airport Master data
  const airports = [
    {
      id: 1,
      airportAddress: 'JFK Airport (JFK), Queens, NY, USA',
      airportName: 'JFK Airport, NY, US',
      status: 'Active'
    },
    {
      id: 2,
      airportAddress: 'LAX Airport (LAX), Los Angeles, CA, USA',
      airportName: 'LAX Airport, CA, US',
      status: 'Active'
    },
    {
      id: 3,
      airportAddress: 'JFK Airport (JFK), Queens, NY, USA',
      airportName: 'JFK Airport, NY, US',
      status: 'Active'
    },
    {
      id: 4,
      airportAddress: 'LAX Airport (LAX), Los Angeles, CA, USA',
      airportName: 'LAX Airport, CA, US',
      status: 'Active'
    },
    {
      id: 5,
      airportAddress: 'JFK Airport (JFK), Queens, NY, USA',
      airportName: 'JFK Airport, NY, US',
      status: 'Active'
    },
    {
      id: 6,
      airportAddress: 'LAX Airport (LAX), Los Angeles, CA, USA',
      airportName: 'LAX Airport, CA, US',
      status: 'Active'
    },
    {
      id: 7,
      airportAddress: 'JFK Airport (JFK), Queens, NY, USA',
      airportName: 'JFK Airport, NY, US',
      status: 'Active'
    },
    {
      id: 8,
      airportAddress: 'LAX Airport (LAX), Los Angeles, CA, USA',
      airportName: 'LAX Airport, CA, US',
      status: 'Active'
    },
  ];

  // Stops data
  const stops = [
    {
      id: 1,
      vehicleType: 'Sedan',
      serviceName: 'Car Seat',
      pricePerStop: '10$'
    },
    {
      id: 2,
      vehicleType: 'SUV',
      serviceName: 'Meet & Greet',
      pricePerStop: '20$'
    },
    {
      id: 3,
      vehicleType: 'Sedan',
      serviceName: 'Car Seat',
      pricePerStop: '10$'
    },
    {
      id: 4,
      vehicleType: 'SUV',
      serviceName: 'Meet & Greet',
      pricePerStop: '20$'
    },
    {
      id: 5,
      vehicleType: 'Sedan',
      serviceName: 'Car Seat',
      pricePerStop: '10$'
    },
    {
      id: 6,
      vehicleType: 'SUV',
      serviceName: 'Meet & Greet',
      pricePerStop: '20$'
    },
    {
      id: 7,
      vehicleType: 'Sedan',
      serviceName: 'Car Seat',
      pricePerStop: '10$'
    },
    {
      id: 8,
      vehicleType: 'SUV',
      serviceName: 'Meet & Greet',
      pricePerStop: '20$'
    },
  ];

  // Filter ons rates by search term
  const searchFilteredRates = onsRates.filter(rate =>
    rate.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rate.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rate.appliesTo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rate.appliesTo.airport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter airports by search term
  const searchFilteredAirports = airports.filter(airport =>
    airport.airportAddress.toLowerCase().includes(airportSearchTerm.toLowerCase()) ||
    airport.airportName.toLowerCase().includes(airportSearchTerm.toLowerCase())
  );

  // Filter stops by search term
  const searchFilteredStops = stops.filter(stop =>
    stop.vehicleType.toLowerCase().includes(stopsSearchTerm.toLowerCase()) ||
    stop.serviceName.toLowerCase().includes(stopsSearchTerm.toLowerCase()) ||
    stop.pricePerStop.toLowerCase().includes(stopsSearchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(searchFilteredRates.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentRates = searchFilteredRates.slice(indexOfFirstEntry, indexOfLastEntry);

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

  const handleDeleteRate = () => {
    if (rateToDelete) {
      console.log('Deleting rate:', rateToDelete);
      setShowDeleteModal(false);
      setRateToDelete(null);
    }
  };

  // Airport Master pagination logic
  const airportTotalPages = Math.ceil(searchFilteredAirports.length / airportEntriesPerPage);
  const airportIndexOfLastEntry = airportCurrentPage * airportEntriesPerPage;
  const airportIndexOfFirstEntry = airportIndexOfLastEntry - airportEntriesPerPage;
  const currentAirports = searchFilteredAirports.slice(airportIndexOfFirstEntry, airportIndexOfLastEntry);

  const handleAirportPageChange = (page) => {
    setAirportCurrentPage(page);
  };

  const handleAirportPrevious = () => {
    if (airportCurrentPage > 1) {
      setAirportCurrentPage(airportCurrentPage - 1);
    }
  };

  const handleAirportNext = () => {
    if (airportCurrentPage < airportTotalPages) {
      setAirportCurrentPage(airportCurrentPage + 1);
    }
  };

  const handleDeleteAirport = () => {
    if (airportToDelete) {
      console.log('Deleting airport:', airportToDelete);
      setShowDeleteModal(false);
      setAirportToDelete(null);
    }
  };

  // Stops pagination logic
  const stopsTotalPages = Math.ceil(searchFilteredStops.length / stopsEntriesPerPage);
  const stopsIndexOfLastEntry = stopsCurrentPage * stopsEntriesPerPage;
  const stopsIndexOfFirstEntry = stopsIndexOfLastEntry - stopsEntriesPerPage;
  const currentStops = searchFilteredStops.slice(stopsIndexOfFirstEntry, stopsIndexOfLastEntry);

  const handleStopsPageChange = (page) => {
    setStopsCurrentPage(page);
  };

  const handleStopsPrevious = () => {
    if (stopsCurrentPage > 1) {
      setStopsCurrentPage(stopsCurrentPage - 1);
    }
  };

  const handleStopsNext = () => {
    if (stopsCurrentPage < stopsTotalPages) {
      setStopsCurrentPage(stopsCurrentPage + 1);
    }
  };

  const handleDeleteStop = () => {
    if (stopToDelete) {
      console.log('Deleting stop:', stopToDelete);
      setShowDeleteModal(false);
      setStopToDelete(null);
      setRateToDelete(null);
    }
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
              <h2 className='dashboard-title'>Settings  <span className='span-payment ms-2'> Add</span> </h2>
            </div>
            <div className="profile d-flex align-items-center justify-content-center">
              <img src={profile} alt="profile" className="profile-img me-3" />
              <img src={word} className="me-2" alt="word" />
              <img src={night} alt="night" />
            </div>
          </div>

          {/* Tabs */}
          <div className="payment-controls d-flex justify-content-end align-items-center mb-4">
            <div className="affiliate-tabs">
              <button
                className={`affiliate-tab ${activeTab === 'Ons-Rates' ? 'active' : ''}`}
                onClick={() => setActiveTab('Ons-Rates')}
              >
                Ons-Rates
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Airport Master' ? 'active' : ''}`}
                onClick={() => setActiveTab('Airport Master')}
              >
                Airport Master
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Stops' ? 'active' : ''}`}
                onClick={() => setActiveTab('Stops')}
              >
                Stops
              </button>
            </div>
          </div>

          {/* Ons-Rates Tab Content */}
          {activeTab === 'Ons-Rates' && (
            <div className="container-fluid">
              <div className="border">
                {/* Search and Add Button */}
                <div className="affiliate-controls-right d-flex justify-content-between gap-3 px-3 py-4">
                  <div className="d-flex align-items-center">
                    <div className="search-container">
                      <FaSearch className="search-icon" />
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search Country Name..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="btn-add-booking" onClick={() => setShowAddOnsRateModal(true)}>
                      <FaPlus className="me-2" />
                      Add Ons-Rate
                    </button>
                  </div>
                </div>

                {/* Ons-Rates Table */}
                <div className="container">
                  <div className="customer-table-wrapper mt-2 border">
                    <table className="affiliate-table teams-table manage-font">
                      <thead>
                        <tr>
                          <th className=''>Vehcile Type</th>
                          <th className='manage-font'>Amount</th>
                          <th className='manage-font'>Applies To</th>
                          <th className='manage-font'>Status</th>
                          <th className='manage-font'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRates.map((rate) => (
                          <tr key={rate.id}>
                            <td>
                              <div className="customer-name">{rate.vehicleType}</div>
                            </td>
                            <td>
                              <span className="">{rate.amount}</span>
                            </td>
                            <td>
                              <div className='text-start text-name d-flex flex-column align-items-start' style={{ margin: '0 auto', width: 'fit-content' }}>
                                <div><span>Name:</span> {rate.appliesTo.name}</div>
                                <div><span>Airport:</span> {rate.appliesTo.airport}</div>
                                <div><span>Services:</span> {rate.appliesTo.services}</div>
                              </div>
                            </td>
                            <td>
                              <span className="status-available">
                                {rate.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons d-flex justify-content-center">
                                <button className="btn-edit">
                                <AiOutlineEdit />
                                </button>
                                <button 
                                  className="btn-delete"
                                  onClick={() => {
                                    setRateToDelete(rate);
                                    setShowDeleteModal(true);
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
                    Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, searchFilteredRates.length)} of {searchFilteredRates.length} results
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
          )}

          {/* Airport Master Tab Content */}
          {activeTab === 'Airport Master' && (
            <div className="container-fluid">
              <div className="border">
                {/* Search and Add Button */}
                <div className="affiliate-controls-right d-flex justify-content-between gap-3 px-3 py-4">
                  <div className="d-flex align-items-center">
                    <div className="search-container">
                      <FaSearch className="search-icon" />
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search Country Name..."
                        value={airportSearchTerm}
                        onChange={(e) => {
                          setAirportSearchTerm(e.target.value);
                          setAirportCurrentPage(1);
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="btn-add-booking" onClick={() => setShowAddAirportModal(true)}>
                      <FaPlus className="me-2" />
                      Add Airport
                    </button>
                  </div>
                </div>

                {/* Airport Master Table */}
                <div className="container">
                  <div className="customer-table-wrapper mt-2 border">
                    <table className="affiliate-table teams-table manage-font">
                      <thead>
                        <tr>
                          <th>Airport Address</th>
                          <th><div className='margin-add'>Airport Name</div></th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentAirports.map((airport) => (
                          <tr key={airport.id}>
                            <td>
                              <div >{airport.airportAddress}</div>
                            </td>
                            <td>
                              <div className='margin-add'>{airport.airportName}</div>
                            </td>
                            <td>
                              <span className="status-available">
                                {airport.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons d-flex justify-content-center">
                                <button className="btn-edit">
                                  <MdOutlineRemoveRedEye />
                                </button>
                                <button 
                                  className="btn-delete"
                                  onClick={() => {
                                    setAirportToDelete(airport);
                                    setRateToDelete(airport);
                                    setShowDeleteModal(true);
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
                    Showing {airportIndexOfFirstEntry + 1} to {Math.min(airportIndexOfLastEntry, searchFilteredAirports.length)} of {searchFilteredAirports.length} results
                  </span>
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={handleAirportPrevious}
                      disabled={airportCurrentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: airportTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`pagination-btn ${airportCurrentPage === page ? 'active' : ''}`}
                        onClick={() => handleAirportPageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="pagination-btn"
                      onClick={handleAirportNext}
                      disabled={airportCurrentPage === airportTotalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stops Tab Content */}
          {activeTab === 'Stops' && (
            <div className="container-fluid">
              <div className="border">
                {/* Search and Add Button */}
                <div className="affiliate-controls-right d-flex justify-content-between gap-3 px-3 py-4">
                  <div className="d-flex align-items-center">
                    <div className="search-container">
                      <FaSearch className="search-icon" />
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search Country Name..."
                        value={stopsSearchTerm}
                        onChange={(e) => {
                          setStopsSearchTerm(e.target.value);
                          setStopsCurrentPage(1);
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="btn-add-booking" onClick={() => setShowAddStopsModal(true)}>
                      <FaPlus className="me-2" />
                      Add Stop
                    </button>
                  </div>
                </div>

                {/* Stops Table */}
                <div className="container">
                  <div className="customer-table-wrapper mt-2 border">
                    <table className="affiliate-table teams-table manage-font">
                      <thead>
                        <tr>
                          <th>Vehicle Type</th>
                          <th>Servies Name</th>
                          <th>Price Per Stop</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentStops.map((stop) => (
                          <tr key={stop.id}>
                            <td>
                              <div >{stop.vehicleType}</div>
                            </td>
                            <td>
                              <div >{stop.serviceName}</div>
                            </td>
                            <td>
                              <div >{stop.pricePerStop}</div>
                            </td>
                            <td>
                              <div className="action-buttons d-flex justify-content-center">
                                <button className="btn-edit">
                                  <MdOutlineRemoveRedEye />
                                </button>
                                <button 
                                  className="btn-delete"
                                  onClick={() => {
                                    setStopToDelete(stop);
                                    setRateToDelete(stop);
                                    setShowDeleteModal(true);
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
                    Showing {stopsIndexOfFirstEntry + 1} to {Math.min(stopsIndexOfLastEntry, searchFilteredStops.length)} of {searchFilteredStops.length} results
                  </span>
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={handleStopsPrevious}
                      disabled={stopsCurrentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: stopsTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`pagination-btn ${stopsCurrentPage === page ? 'active' : ''}`}
                        onClick={() => handleStopsPageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="pagination-btn"
                      onClick={handleStopsNext}
                      disabled={stopsCurrentPage === stopsTotalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Ons-Rate Modal */}
      {showAddOnsRateModal && (
        <div className="modal-overlay" onClick={() => setShowAddOnsRateModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Additional Ons-Rate</h3>
              <button className="modal-close" onClick={() => setShowAddOnsRateModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Rate Name</label>
                  <input type="text" placeholder="Add Name" />
                </div>
                <div className="form-group">
                  <label>Amount</label>
                  <input type="text" placeholder="Add Price" />
                </div>
                <div className="form-group">
                  <label>Select Vehicle Type</label>
                  <select>
                    <option value="">Select vehicle</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Services</label>
                  <select>
                    <option value="">Select Servies</option>
                    <option value="From Airport">From Airport</option>
                    <option value="To Airport">To Airport</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Airport</label>
                  <select>
                    <option value="">Select Airport</option>
                    <option value="JFK Airport, NY, USA">JFK Airport, NY, USA</option>
                    <option value="LAX Airport, CA, USA">LAX Airport, CA, USA</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddOnsRateModal(false)}>
                <FaPlus className="me-2" />
                Add Rates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Airport Modal */}
      {showAddAirportModal && (
        <div className="modal-overlay" onClick={() => setShowAddAirportModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Airport</h3>
              <button className="modal-close" onClick={() => setShowAddAirportModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Airport Name</label>
                  <input type="text" placeholder="Add Name" />
                </div>
                <div className="form-group">
                  <label>Airport Alias Name</label>
                  <input type="text" placeholder="Add price" />
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddAirportModal(false)}>
                <FaPlus className="me-2" />
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Stops Modal */}
      {showAddStopsModal && (
        <div className="modal-overlay" onClick={() => setShowAddStopsModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Stops</h3>
              <button className="modal-close" onClick={() => setShowAddStopsModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Select Vehicle</label>
                  <select>
                    <option value="">Select vehicle</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Servirs</label>
                  <select>
                    <option value="">Select Servies</option>
                    <option value="Car Seat">Car Seat</option>
                    <option value="Meet & Greet">Meet & Greet</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input type="text" placeholder="Add Price" />
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddStopsModal(false)}>
                <FaPlus className="me-2" />
                Add Stop
              </button>
            </div>
          </div>
    </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && rateToDelete && (
        <div className="modal-overlay" onClick={() => {
          setShowDeleteModal(false);
          setRateToDelete(null);
          setAirportToDelete(null);
          setStopToDelete(null);
        }}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-body">
              <p className="delete-modal-question">
                Are You Sure You Want Delete <br /> <span className="delete-customer-name">
                  {rateToDelete.vehicleType && rateToDelete.amount 
                    ? `${rateToDelete.vehicleType} - ${rateToDelete.amount}` 
                    : rateToDelete.airportName 
                    ? rateToDelete.airportName
                    : rateToDelete.vehicleType && rateToDelete.serviceName
                    ? `${rateToDelete.vehicleType} - ${rateToDelete.serviceName}`
                    : 'this item'}
                </span> ?
              </p>
              <div className="delete-modal-buttons">
                <button
                  className="btn-delete-confirm"
                  onClick={() => {
                    if (airportToDelete) {
                      handleDeleteAirport();
                    } else if (stopToDelete) {
                      handleDeleteStop();
                    } else {
                      handleDeleteRate();
                    }
                  }}
                >
                  <FaPlus className="delete-icon" />
                  Delete
                </button>
                <button
                  className="btn-delete-cancel"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setRateToDelete(null);
                    setAirportToDelete(null);
                    setStopToDelete(null);
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

export default Addrates;
