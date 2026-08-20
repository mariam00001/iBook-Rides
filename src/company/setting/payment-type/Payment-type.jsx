import { useState } from 'react';
import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import profile from '../../../assets/Elipse 5.svg';
import word from '../../../assets/icons set.svg';
import night from '../../../assets/icons set (1).svg';
import { FaBars, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import './Payment-type.css';
import { MdArrowForwardIos } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';

const Payment = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Payment Type');
  const [paymentCaptureType, setPaymentCaptureType] = useState('Capture Payment Details Only');
  const [paymentCaptureStatus, setPaymentCaptureStatus] = useState('Capture Payment Details Only');
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [taxSearchTerm, setTaxSearchTerm] = useState('');
  const [taxPage, setTaxPage] = useState(1);
  const [taxEntriesPerPage] = useState(5);
  const [showMerchantModal, setShowMerchantModal] = useState(false);
  const [showChooseCountryModal, setShowChooseCountryModal] = useState(false);
  const [gratuitySearchTerm, setGratuitySearchTerm] = useState('');
  const [gratuityPage, setGratuityPage] = useState(1);
  const [gratuityEntriesPerPage] = useState(5);
  const [showAddGratuityModal, setShowAddGratuityModal] = useState(false);
  const [showCountryDeleteModal, setShowCountryDeleteModal] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState(null);

  const handleUpdate = () => {
    console.log('Updating payment settings:', {
      paymentCaptureType,
      paymentCaptureStatus,
      termsAndConditions
    });
    // Add update logic here
  };

  const handleCountryDelete = () => {
    if (countryToDelete) {
      console.log('Deleting country:', countryToDelete);
      // Add delete logic here (e.g., remove from array, API call, etc.)
      setShowCountryDeleteModal(false);
      setCountryToDelete(null);
    }
  };

  // Tax data
  const taxes = [
    {
      id: 1,
      name: 'PST',
      taxPercent: '15%',
      status: 'Active',
      created: '2024-01-01'
    },
    {
      id: 2,
      name: 'PST',
      taxPercent: '15%',
      status: 'Active',
      created: '2024-01-01'
    },
    {
      id: 3,
      name: 'PST',
      taxPercent: '15%',
      status: 'Active',
      created: '2024-01-01'
    },
    {
      id: 4,
      name: 'PST',
      taxPercent: '15%',
      status: 'Active',
      created: '2024-01-01'
    },
    {
      id: 5,
      name: 'PST',
      taxPercent: '15%',
      status: 'Active',
      created: '2024-01-01'
    }
  ];

  // Filter taxes by search term
  const searchFilteredTaxes = taxes.filter(tax =>
    tax.name.toLowerCase().includes(taxSearchTerm.toLowerCase())
  );

  // Pagination logic for taxes
  const taxTotalPages = Math.ceil(searchFilteredTaxes.length / taxEntriesPerPage);
  const indexOfLastTax = taxPage * taxEntriesPerPage;
  const indexOfFirstTax = indexOfLastTax - taxEntriesPerPage;
  const currentTaxes = searchFilteredTaxes.slice(indexOfFirstTax, indexOfLastTax);

  const handleTaxPageChange = (page) => {
    setTaxPage(page);
  };

  const handleTaxPrevious = () => {
    if (taxPage > 1) {
      setTaxPage(taxPage - 1);
    }
  };

  const handleTaxNext = () => {
    if (taxPage < taxTotalPages) {
      setTaxPage(taxPage + 1);
    }
  };

  // Gratuity data
  const gratuities = [
    {
      id: 1,
      defaultGratuity: '1',
      gpPercent: '15%',
      status: 'Active',
      showInFront: 'Yes'
    },
    {
      id: 2,
      defaultGratuity: '1',
      gpPercent: '15%',
      status: 'Active',
      showInFront: 'Yes'
    },
    {
      id: 3,
      defaultGratuity: '1',
      gpPercent: '15%',
      status: 'Active',
      showInFront: 'Yes'
    },
    {
      id: 4,
      defaultGratuity: '1',
      gpPercent: '15%',
      status: 'Active',
      showInFront: 'Yes'
    },
    {
      id: 5,
      defaultGratuity: '1',
      gpPercent: '15%',
      status: 'Active',
      showInFront: 'Yes'
    }
  ];

  // Filter gratuities by search term
  const searchFilteredGratuities = gratuities.filter(gratuity =>
    gratuity.defaultGratuity.toLowerCase().includes(gratuitySearchTerm.toLowerCase()) ||
    gratuity.gpPercent.toLowerCase().includes(gratuitySearchTerm.toLowerCase())
  );

  // Pagination logic for gratuities
  const gratuityTotalPages = Math.ceil(searchFilteredGratuities.length / gratuityEntriesPerPage);
  const indexOfLastGratuity = gratuityPage * gratuityEntriesPerPage;
  const indexOfFirstGratuity = indexOfLastGratuity - gratuityEntriesPerPage;
  const currentGratuities = searchFilteredGratuities.slice(indexOfFirstGratuity, indexOfLastGratuity);

  const handleGratuityPageChange = (page) => {
    setGratuityPage(page);
  };

  const handleGratuityPrevious = () => {
    if (gratuityPage > 1) {
      setGratuityPage(gratuityPage - 1);
    }
  };

  const handleGratuityNext = () => {
    if (gratuityPage < gratuityTotalPages) {
      setGratuityPage(gratuityPage + 1);
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
              <h2 className='dashboard-title'>Settings  <span className='span-payment ms-2'> Finance <MdArrowForwardIos /> Pay & Manage</span> </h2>
            </div>
            <div className="profile d-flex align-items-center justify-content-center">
              <img src={profile} alt="profile" className="profile-img me-3" />
              <img src={word} className="me-2" alt="word" />
              <img src={night} alt="night" />
            </div>
          </div>

          {/* Tabs and Merchant Settings Button */}
          <div className="payment-controls d-flex justify-content-end align-items-center mb-4">
            <div className="affiliate-tabs">
              <button
                className={`affiliate-tab ${activeTab === 'Payment Type' ? 'active' : ''}`}
                onClick={() => setActiveTab('Payment Type')}
              >
                Payment Type
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Manage Tax' ? 'active' : ''}`}
                onClick={() => setActiveTab('Manage Tax')}
              >
                Manage Tax
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Manage Gratuity' ? 'active' : ''}`}
                onClick={() => setActiveTab('Manage Gratuity')}
              >
                Manage Gratuity
              </button>
            </div>
          </div>

          {/* Main Content */}
          {activeTab === 'Payment Type' && (
            <div className="settings-form-container componey-bg">
              <div className="p-3 d-flex justify-content-between align-items-center">
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search Country Name..."
                  />
                </div>
                <button className="btn-add-booking" onClick={() => setShowMerchantModal(true)}>
                  <FaPlus className="me-2" />
                  Merchant Settings
                </button>
              </div>
              {/* Payment Capture Section */}
              <div className="payment-section mx-3">
                <h3 className="payment-section-title">
                  Require Credit Card Information and/or Payment for Booking
                </h3>
                <div className="payment-fields-row">
                  <div className="form-group">
                    <label className="payment-label">Payment Capture Type</label>
                    <select
                      className="payment-select"
                      value={paymentCaptureType}
                      onChange={(e) => setPaymentCaptureType(e.target.value)}
                    >
                      <option value="Capture Payment Details Only">Capture Payment Details Only</option>
                      <option value="Capture Full Payment">Capture Full Payment</option>
                      <option value="Capture Partial Payment">Capture Partial Payment</option>
                      <option value="No Payment Capture">No Payment Capture</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="payment-label">Payment Capture Status</label>
                    <select
                      className="payment-select"
                      value={paymentCaptureStatus}
                      onChange={(e) => setPaymentCaptureStatus(e.target.value)}
                    >
                      <option value="Capture Payment Details Only">Capture Payment Details Only</option>
                      <option value="Capture Full Payment">Capture Full Payment</option>
                      <option value="Capture Partial Payment">Capture Partial Payment</option>
                      <option value="No Payment Capture">No Payment Capture</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions Section */}
              <div className="mx-3 mt-4">
                <h3 className="payment-section-title">Terms & Conditions</h3>
                <div className="terms-textarea-wrapper">
                  <textarea
                    className="terms-textarea"
                    value={termsAndConditions}
                    onChange={(e) => setTermsAndConditions(e.target.value)}
                    placeholder="Enter the Terms and Conditions you will require clients to agree to when filling out the website form."
                    rows="8"
                  />
                </div>
              </div>

              {/* Update Button */}
              <div className="payment-footer d-flex justify-content-end mt-4">
                <button className="btn-add-booking" onClick={handleUpdate}>
                  <FaPlus className="me-2" />
                  Update
                </button>
              </div>
            </div>
          )}

          {/* Manage Tax Tab Content */}
          {activeTab === 'Manage Tax' && (
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
                      value={taxSearchTerm}
                      onChange={(e) => {
                        setTaxSearchTerm(e.target.value);
                        setTaxPage(1);
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button className="btn-add-booking" onClick={() => setShowChooseCountryModal(true)}>
                    <FaPlus className="me-2" />
                    choose country
                  </button>
                </div>
              </div>

              {/* Taxes Table */}
              <div className="container">
                <div className="customer-table-wrapper mt-2 border">
                  <table className="affiliate-table teams-table manage-font">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Tax%</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTaxes.map((tax) => (
                        <tr key={tax.id}>
                          <td>
                            <div className="customer-name">{tax.name}</div>
                          </td>
                          <td>
                            <span className="">
                              {tax.taxPercent}
                            </span>
                          </td>
                          <td>
                            <span className="status-available">
                              {tax.status}
                            </span>
                          </td>
                          <td className="customer-date">{tax.created}</td>
                          <td>
                            <div className="action-buttons d-flex justify-content-center">
                              <button className="btn-edit">
                                <AiOutlineEdit />
                              </button>
                              <button 
                                className="btn-delete"
                                onClick={() => {
                                  setCountryToDelete(tax);
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
                  Showing {indexOfFirstTax + 1} to {Math.min(indexOfLastTax, searchFilteredTaxes.length)} of {searchFilteredTaxes.length} results
                </span>
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={handleTaxPrevious}
                    disabled={taxPage === 1}
                  >
                    Previous
                  </button>
                  {Array.from({ length: taxTotalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`pagination-btn ${taxPage === page ? 'active' : ''}`}
                      onClick={() => handleTaxPageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="pagination-btn"
                    onClick={handleTaxNext}
                    disabled={taxPage === taxTotalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
              </div>
            </div>
          )}

          {/* Manage Gratuity Tab Content */}
          {activeTab === 'Manage Gratuity' && (
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
                        placeholder="Search..."
                        value={gratuitySearchTerm}
                        onChange={(e) => {
                          setGratuitySearchTerm(e.target.value);
                          setGratuityPage(1);
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="btn-add-booking" onClick={() => setShowAddGratuityModal(true)}>
                      <FaPlus className="me-2" />
                      Add Gratuity
                    </button>
                  </div>
                </div>

                {/* Gratuities Table */}
                <div className="container">
                  <div className="customer-table-wrapper mt-2 border">
                    <table className="affiliate-table teams-table manage-font">
                      <thead>
                        <tr>
                          <th>Default Gratuity</th>
                          <th>G.P %</th>
                          <th>Status</th>
                          <th>Show in Front</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentGratuities.map((gratuity) => (
                          <tr key={gratuity.id}>
                            <td>
                              <div className="customer-name">{gratuity.defaultGratuity}</div>
                            </td>
                            <td>
                              <span className="">
                                {gratuity.gpPercent}
                              </span>
                            </td>
                            <td>
                              <span className="status-available">
                                {gratuity.status}
                              </span>
                            </td>
                            <td className="customer-date">{gratuity.showInFront}</td>
                            <td>
                              <div className="action-buttons d-flex justify-content-center">
                                <button className="btn-edit">
                                  <AiOutlineEdit />
                                </button>
                                <button 
                                  className="btn-delete"
                                  onClick={() => {
                                    setCountryToDelete(gratuity);
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
                    Showing {indexOfFirstGratuity + 1} to {Math.min(indexOfLastGratuity, searchFilteredGratuities.length)} of {searchFilteredGratuities.length} results
                  </span>
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={handleGratuityPrevious}
                      disabled={gratuityPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: gratuityTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`pagination-btn ${gratuityPage === page ? 'active' : ''}`}
                        onClick={() => handleGratuityPageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="pagination-btn"
                      onClick={handleGratuityNext}
                      disabled={gratuityPage === gratuityTotalPages}
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

      {/* Merchant Settings Modal */}
      {showMerchantModal && (
        <div className="modal-overlay" onClick={() => setShowMerchantModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Merchant Account Settings</h3>
              <button className="modal-close" onClick={() => setShowMerchantModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row">
                <div className="form-group">
                  <label>Select Payment Gateway </label>
                  <select>
                    <option value="Active">Stripe</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Mode</label>
                  <select>
                    <option value="Active">Live</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowMerchantModal(false)}>
                <FaPlus className="me-2" />
                Add Merchant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Choose Country Modal */}
      {showChooseCountryModal && (
        <div className="modal-overlay" onClick={() => setShowChooseCountryModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add New Tax</h3>
              <button className="modal-close" onClick={() => setShowChooseCountryModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                    <label>Tax Name</label>
                    <input type="text" placeholder="tax name" />
                </div>
                <div className="form-group">
                    <label>Tax Percentage</label>
                    <input type="text" placeholder="Tax Percentage" />
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowChooseCountryModal(false)}>
                <FaPlus className="me-2" />
                Add Country
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Gratuity Modal */}
      {showAddGratuityModal && (
        <div className="modal-overlay" onClick={() => setShowAddGratuityModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Gratuity</h3>
              <button className="modal-close" onClick={() => setShowAddGratuityModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Gratuity Percentage</label>
                  <input type="text" placeholder="Gratuity Percentage*" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Select Default Flag</label>
                  <select>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Front Flag</label>
                  <select>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddGratuityModal(false)}>
                <FaPlus className="me-2" />
                Add Gratuity
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
                Are You Sure You Want Delete <br /> <span className="delete-customer-name">{countryToDelete?.name || countryToDelete?.defaultGratuity || countryToDelete?.gpPercent}</span> ?
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

export default Payment;
