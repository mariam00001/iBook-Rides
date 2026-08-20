import { useState } from 'react';
import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import profile from '../../../../assets/Elipse 5.svg';
import word from '../../../../assets/icons set.svg';
import night from '../../../../assets/icons set (1).svg';
import { FaBars, FaPlus, FaRegTrashAlt, FaSearch } from 'react-icons/fa';
import { MdArrowForwardIos } from 'react-icons/md';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiArrowUpDownLine } from 'react-icons/ri';
import '../../Custmors/Custmors.css';
import '../../../setting/payment-type/Payment-type.css';
import '../../Affilate/Affilate.css';

const Additional = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Charges');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(5);
  const [showAddChargesModal, setShowAddChargesModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chargeToDelete, setChargeToDelete] = useState(null);
  
  // Services state
  const [servicesSearchTerm, setServicesSearchTerm] = useState('');
  const [servicesCurrentPage, setServicesCurrentPage] = useState(1);
  const [servicesEntriesPerPage] = useState(8);
  const [showAddServicesModal, setShowAddServicesModal] = useState(false);
  const [showDeleteServiceModal, setShowDeleteServiceModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  // Charges data
  const charges = [
    {
      id: 1,
      extraName: '1',
      price: '0.0',
      status: 'ACTIVE'
    },
    {
      id: 2,
      extraName: '1',
      price: '0.0',
      status: 'ACTIVE'
    },
  ];

  // Services data
  const services = [
    {
      id: 1,
      vehicleType: 'SUV',
      serviceName: 'Car Seat',
      functionTime: 'Drop Down',
      basePrice: '10',
      quantity: '2024-02-15',
      status: 'ACTIVE'
    },
    {
      id: 2,
      vehicleType: 'SEDAN',
      serviceName: 'meeet & Greet',
      functionTime: 'Radio',
      basePrice: '10',
      quantity: '2024-02-15',
      status: 'ACTIVE'
    },
    {
      id: 3,
      vehicleType: 'SUV',
      serviceName: 'Car Seat',
      functionTime: 'Drop Down',
      basePrice: '10',
      quantity: '2024-02-15',
      status: 'ACTIVE'
    },
    {
      id: 4,
      vehicleType: 'SEDAN',
      serviceName: 'meeet & Greet',
      functionTime: 'Radio',
      basePrice: '10',
      quantity: '2024-02-15',
      status: 'ACTIVE'
    },
    {
      id: 5,
      vehicleType: 'SUV',
      serviceName: 'Car Seat',
      functionTime: 'Drop Down',
      basePrice: '10',
      quantity: '2024-02-15',
      status: 'ACTIVE'
    },
    {
      id: 6,
      vehicleType: 'SEDAN',
      serviceName: 'meeet & Greet',
      functionTime: 'Radio',
      basePrice: '10',
      quantity: '2024-02-15',
      status: 'ACTIVE'
    },
    {
      id: 7,
      vehicleType: 'SUV',
      serviceName: 'Car Seat',
      functionTime: 'Drop Down',
      basePrice: '10',
      quantity: '2024-02-15',
      status: 'ACTIVE'
    },
    {
      id: 8,
      vehicleType: 'SEDAN',
      serviceName: 'meeet & Greet',
      functionTime: 'Radio',
      basePrice: '10',
      quantity: '2024-02-15',
      status: 'ACTIVE'
    },
  ];

  // Filter charges by search term
  const searchFilteredCharges = charges.filter(charge =>
    charge.extraName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    charge.price.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter services by search term
  const searchFilteredServices = services.filter(service =>
    service.vehicleType.toLowerCase().includes(servicesSearchTerm.toLowerCase()) ||
    service.serviceName.toLowerCase().includes(servicesSearchTerm.toLowerCase()) ||
    service.functionTime.toLowerCase().includes(servicesSearchTerm.toLowerCase()) ||
    service.basePrice.toLowerCase().includes(servicesSearchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(searchFilteredCharges.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentCharges = searchFilteredCharges.slice(indexOfFirstEntry, indexOfLastEntry);

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

  const handleDeleteCharge = () => {
    if (chargeToDelete) {
      console.log('Deleting charge:', chargeToDelete);
      setShowDeleteModal(false);
      setChargeToDelete(null);
    }
  };

  // Services pagination logic
  const servicesTotalPages = Math.ceil(searchFilteredServices.length / servicesEntriesPerPage);
  const servicesIndexOfLastEntry = servicesCurrentPage * servicesEntriesPerPage;
  const servicesIndexOfFirstEntry = servicesIndexOfLastEntry - servicesEntriesPerPage;
  const currentServices = searchFilteredServices.slice(servicesIndexOfFirstEntry, servicesIndexOfLastEntry);

  const handleServicesPageChange = (page) => {
    setServicesCurrentPage(page);
  };

  const handleServicesPrevious = () => {
    if (servicesCurrentPage > 1) {
      setServicesCurrentPage(servicesCurrentPage - 1);
    }
  };

  const handleServicesNext = () => {
    if (servicesCurrentPage < servicesTotalPages) {
      setServicesCurrentPage(servicesCurrentPage + 1);
    }
  };

  const handleDeleteService = () => {
    if (serviceToDelete) {
      console.log('Deleting service:', serviceToDelete);
      setShowDeleteServiceModal(false);
      setServiceToDelete(null);
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
              <h2 className='dashboard-title'>Settings  <span className='span-payment ms-2'> Additional</span> </h2>
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
                className={`affiliate-tab ${activeTab === 'Servies' ? 'active' : ''}`}
                onClick={() => setActiveTab('Servies')}
              >
                Servies
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Charges' ? 'active' : ''}`}
                onClick={() => setActiveTab('Charges')}
              >
                Charges
              </button>
            </div>
          </div>

          {/* Charges Tab Content */}
          {activeTab === 'Charges' && (
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
                        placeholder="Search affiliates..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="btn-add-booking" onClick={() => setShowAddChargesModal(true)}>
                      <FaPlus className="me-2" />
                      Add Charges
                    </button>
                  </div>
                </div>

                {/* Charges Table */}
                <div className="container">
                  <div className="customer-table-wrapper mt-2 border">
                    <table className="affiliate-table teams-table">
                      <thead>
                        <tr>
                          <th>Extra Name</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentCharges.map((charge) => (
                          <tr key={charge.id}>
                            <td>
                              <div className="customer-name">{charge.extraName}</div>
                            </td>
                            <td>
                              <span className="">
                                {charge.price}
                              </span>
                            </td>
                            <td>
                              <span className="status-available">
                                {charge.status}
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
                                    setChargeToDelete(charge);
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
                    Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, searchFilteredCharges.length)} of {searchFilteredCharges.length} results
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

          {/* Servies Tab Content */}
          {activeTab === 'Servies' && (
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
                        placeholder="Search affiliates..."
                        value={servicesSearchTerm}
                        onChange={(e) => {
                          setServicesSearchTerm(e.target.value);
                          setServicesCurrentPage(1);
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="btn-add-booking" onClick={() => setShowAddServicesModal(true)}>
                      <FaPlus className="me-2" />
                      Add Servies
                    </button>
                  </div>
                </div>

                {/* Services Table */}
                <div className="customer-table-wrapper mt-2">
                  <table className="affiliate-table">
                    <thead>
                      <tr>
                        <th>
                          <div className="th-content">
                            VEHCILE TYPE
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            SERVIES NAME
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            FUNCTION TIME
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            BASE PRICE
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            QUANTITY
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            STATUS
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentServices.map((service) => (
                        <tr key={service.id}>
                          <td>
                            <div className="customer-name" style={{ fontWeight: 'bold' }}>{service.vehicleType}</div>
                          </td>
                          <td className="customer-name">{service.serviceName}</td>
                          <td className="customer-date">{service.functionTime}</td>
                          <td className="customer-date">{service.basePrice}</td>
                          <td className="customer-date">{service.quantity}</td>
                          <td>
                            <span className="status-available">
                              {service.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-edit">
                                <MdOutlineRemoveRedEye />
                              </button>
                              <button 
                                className="btn-delete"
                                onClick={() => {
                                  setServiceToDelete(service);
                                  setShowDeleteServiceModal(true);
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

                {/* Pagination */}
                <div className="pagination-container-2 p-3">
                  <span className="pagination-info">
                    Showing {servicesIndexOfFirstEntry + 1} to {Math.min(servicesIndexOfLastEntry, searchFilteredServices.length)} of {searchFilteredServices.length} results
                  </span>
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={handleServicesPrevious}
                      disabled={servicesCurrentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: servicesTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`pagination-btn ${servicesCurrentPage === page ? 'active' : ''}`}
                        onClick={() => handleServicesPageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="pagination-btn"
                      onClick={handleServicesNext}
                      disabled={servicesCurrentPage === servicesTotalPages}
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

      {/* Add Charges Modal */}
      {showAddChargesModal && (
        <div className="modal-overlay" onClick={() => setShowAddChargesModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Additional Charges </h3>
              <button className="modal-close" onClick={() => setShowAddChargesModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>EAdditional Charges Name</label>
                  <input type="text" placeholder="Add Name" />
                </div>
                <div className="form-group">
                  <label>Additional Charges Price</label>
                  <input type="text" placeholder="Add Price" />
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddChargesModal(false)}>
                <FaPlus className="me-2" />
                Add Charges
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal for Charges */}
      {showDeleteModal && chargeToDelete && (
        <div className="modal-overlay" onClick={() => {
          setShowDeleteModal(false);
          setChargeToDelete(null);
        }}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-body">
              <p className="delete-modal-question">
                Are You Sure You Want Delete <br /> <span className="delete-customer-name">{chargeToDelete.extraName}</span> ?
              </p>
              <div className="delete-modal-buttons">
                <button
                  className="btn-delete-confirm"
                  onClick={handleDeleteCharge}
                >
                  <FaPlus className="delete-icon" />
                  Delete
                </button>
                <button
                  className="btn-delete-cancel"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setChargeToDelete(null);
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

      {/* Add Services Modal */}
      {showAddServicesModal && (
        <div className="modal-overlay" onClick={() => setShowAddServicesModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Additional Servies</h3>
              <button className="modal-close" onClick={() => setShowAddServicesModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Select Vehicle</label>
                  <div style={{ position: 'relative' }}>
                    <select 
                      style={{
                        width: '100%',
                        padding: '13.52px 40px 13.52px 23px',
                        background: '#F9FAFB',
                        border: '1.36px solid #D1D5DB',
                        borderRadius: '10.86px',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: '400',
                        color: '#6B7280',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none'
                      }}
                    >
                      <option value="">Select vehicle</option>
                      <option value="SUV">SUV</option>
                      <option value="SEDAN">SEDAN</option>
                    </select>
                    <span style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: '#9CA3AF'
                    }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Select Type</label>
                  <div style={{ position: 'relative' }}>
                    <select 
                      style={{
                        width: '100%',
                        padding: '13.52px 40px 13.52px 23px',
                        background: '#F9FAFB',
                        border: '1.36px solid #D1D5DB',
                        borderRadius: '10.86px',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: '400',
                        color: '#6B7280',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none'
                      }}
                    >
                      <option value="">Select Type</option>
                      <option value="Drop Down">Drop Down</option>
                      <option value="Radio">Radio</option>
                    </select>
                    <span style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: '#9CA3AF'
                    }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Servies Name</label>
                  <input type="text" placeholder="Add Name" />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input type="text" placeholder="Add Price" />
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddServicesModal(false)}>
                <FaPlus className="me-2" />
                Add Servies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal for Services */}
      {showDeleteServiceModal && serviceToDelete && (
        <div className="modal-overlay" onClick={() => {
          setShowDeleteServiceModal(false);
          setServiceToDelete(null);
        }}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-body">
              <p className="delete-modal-question">
                Are You Sure You Want Delete <br /> <span className="delete-customer-name">{serviceToDelete.serviceName}</span> ?
              </p>
              <div className="delete-modal-buttons">
                <button
                  className="btn-delete-confirm"
                  onClick={handleDeleteService}
                >
                  <FaPlus className="delete-icon" />
                  Delete
                </button>
                <button
                  className="btn-delete-cancel"
                  onClick={() => {
                    setShowDeleteServiceModal(false);
                    setServiceToDelete(null);
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

export default Additional;
