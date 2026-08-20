import { useState } from 'react';
import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import profile from '../../../assets/Elipse 5.svg';
import word from '../../../assets/icons set.svg';
import night from '../../../assets/icons set (1).svg';
import { FaSearch, FaEdit, FaTrash, FaRegTrashAlt, FaPlus, FaBars } from 'react-icons/fa';
import { LuUsersRound, LuUsers } from 'react-icons/lu';
import { TbWorld } from 'react-icons/tb';
import { SlLocationPin } from 'react-icons/sl';
import { FiActivity } from 'react-icons/fi';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiArrowUpDownLine, RiBuildingLine } from 'react-icons/ri';
import './Custmors.css';
import { AiOutlineEdit } from 'react-icons/ai';
const Custmors = () => {
    const [showAddAffiliateModal, setShowAddAffiliateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [activeTab, setActiveTab] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');
    const [isTableCollapsed, setIsTableCollapsed] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const [customerStatuses, setCustomerStatuses] = useState({});

    const customers = [
      {
        id: 1,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 2,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 3,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 4,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 5,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 6,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 7,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 8,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 9,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 10,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 11,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 12,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 13,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 14,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 15,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 16,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      },
      {
        id: 17,
        name: 'David Wislon',
        email: 'david.wilson@email.com',
        phone: '+4325678 909',
        address: '147 Birch Rd, San Antonio, TX 78201',
        date: '2024-02 -15',
        status: true
      }
    ];
  
    // Filter customers based on active tab
    const filteredCustomers = customers.filter(customer => {
      if (activeTab === 'Global') return customer.status === true;
      if (activeTab === 'Local') return customer.status === false;
      return true;
    });

    // Filter by search term
    const searchFilteredCustomers = filteredCustomers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(searchFilteredCustomers.length / entriesPerPage);
    const indexOfLastCustomer = currentPage * entriesPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - entriesPerPage;
    const currentCustomers = searchFilteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const toggleCustomerStatus = (customerId) => {
      setCustomerStatuses(prev => ({
        ...prev,
        [customerId]: !prev[customerId]
      }));
    };

    const handleDeleteCustomer = () => {
      if (customerToDelete) {
        // Handle delete logic here
        console.log('Deleting customer:', customerToDelete);
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
                <h2 className='dashboard-title'>Custmors</h2>
              </div>
              <div className="profile d-flex align-items-center justify-content-center">
                <img src={profile} alt="profile" className="profile-img me-3" />
                <img src={word} className="me-2" alt="word" />
                <img src={night} alt="night" />
              </div>
            </div>

  
            {/* Tabs and Controls */}
            <div className="">
            <div className="affiliate-controls py-4 ">
              <div className="affiliate-tabs">
                <button
                  className={`affiliate-tab ${activeTab === 'All' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('All');
                    setCurrentPage(1);
                  }}
                >
                  Companies
                </button>
                <button
                  className={`affiliate-tab ${activeTab === 'Global' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('Global');
                    setCurrentPage(1);
                  }}
                >
                  Individuals
                </button>
                <button
                  className={`affiliate-tab ${activeTab === 'Local' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('Local');
                    setCurrentPage(1);
                  }}
                >
                  archived 
                </button>
              </div>
              <div className="d-md-flex align-items-center gap-3">
              <button className="btn-add-booking cv mb-2 mb-md-0">
                  + Download CSV
                </button>
               
                <button className="btn-add-booking"  onClick={() => setShowAddAffiliateModal(true)}>
                  + Add  User
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
  
            {/* customer Table */}
            <div className="customer-table-wrapper mt-2">
              <table className="affiliate-table">
                <thead>
                  <tr>
                    <th>
                      <div className="th-content">
                      Name
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
                      email
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                        <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                      phone
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                        <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                      Address
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                        <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                      Date
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                        <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                      Status
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                        <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>Edit</th>
                   
                  </tr>
                </thead>
                <tbody className={isTableCollapsed ? 'collapsed' : ''}>
                  {currentCustomers.map((customer) => {
                    const isActive = customerStatuses[customer.id] !== undefined 
                      ? customerStatuses[customer.id] 
                      : customer.status;
                    return (
                      <tr key={customer.id}>
                        <td>
                          <div className="customer-info">
                            <div className="customer-avatar">
                              <LuUsersRound className="customer-avatar-icon" />
                            </div>
                            <div className="customer-name">{customer.name}</div>
                          </div>
                        </td>
                        <td className='customer-email'>{customer.email}</td>
                        <td className='customer-phone'>{customer.phone}</td>
                        <td className='customer-address'>{customer.address}</td>
                        <td className='customer-date'>{customer.date}</td>
                        <td>
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={isActive}
                              onChange={() => toggleCustomerStatus(customer.id)}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-edit">
                            <AiOutlineEdit />
                            </button>
                            <button 
                              className="btn-delete"
                              onClick={() => {
                                setCustomerToDelete(customer);
                                setShowDeleteModal(true);
                              }}
                            >
                            <FaRegTrashAlt />
                            </button>
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
                Showing {indexOfFirstCustomer + 1} to {Math.min(indexOfLastCustomer, searchFilteredCustomers.length)} of {searchFilteredCustomers.length} results
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
                <h3 className="modal-title">Add New User</h3>
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
                    <label>landline*</label>
                    <input type="tel" placeholder="025649871" />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Ex:4 mohamed ezz, Cairo" />
                  </div>
                </div>
              </div>
              <div className="modal-footer-2">
                <button className="btn-add-booking ">+ Add Affiliate</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && customerToDelete && (
          <div className="modal-overlay" onClick={() => {
            setShowDeleteModal(false);
            setCustomerToDelete(null);
          }}>
            <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="delete-modal-body">
                <p className="delete-modal-question">
                  Are You Sure You Want Delete <br /> <span className="delete-customer-name">{customerToDelete.name}</span> ?
                </p>
                <div className="delete-modal-buttons">
                  <button 
                    className="btn-delete-confirm"
                    onClick={handleDeleteCustomer}
                  >
                    <FaPlus className="delete-icon" />
                    Delete
                  </button>
                  <button 
                    className="btn-delete-cancel"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setCustomerToDelete(null);
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
  }
  
  export default Custmors
