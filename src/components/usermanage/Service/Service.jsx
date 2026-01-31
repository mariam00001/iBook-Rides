import { useState } from 'react';
import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import profile from '../../../assets/Elipse 5.svg';
import word from '../../../assets/icons set.svg';
import night from '../../../assets/icons set (1).svg';
import { FaBars, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiArrowUpDownLine } from 'react-icons/ri';

const Service = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(8);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);

  // Services data
  const services = [
    {
      id: 1,
      serviceName: 'To Airport',
      serviceType: 'To Airport',
      calculationType: 'Distance Based',
      onlineVisible: 'YES',
      ordering: '1',
      description: '---',
      status: 'ACTIVE'
    },
    {
      id: 2,
      serviceName: 'From Airport',
      serviceType: 'From Airport',
      calculationType: 'Distance Based',
      onlineVisible: 'YES',
      ordering: '2',
      description: '---',
      status: 'ACTIVE'
    },
    {
      id: 3,
      serviceName: 'Point To Point',
      serviceType: 'Point To Point',
      calculationType: 'Distance Based',
      onlineVisible: 'YES',
      ordering: '3',
      description: '---',
      status: 'ACTIVE'
    },
    {
      id: 4,
      serviceName: 'Hourly',
      serviceType: 'Hourly',
      calculationType: 'Distance Based',
      onlineVisible: 'YES',
      ordering: '4',
      description: '---',
      status: 'ACTIVE'
    },
    {
      id: 5,
      serviceName: 'Zone To Zone',
      serviceType: 'Zone To Zone',
      calculationType: 'Flat Rate',
      onlineVisible: 'YES',
      ordering: '5',
      description: '---',
      status: 'ACTIVE'
    }
  ];

  // Filter services by search term
  const searchFilteredServices = services.filter(service =>
    service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(searchFilteredServices.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentServices = searchFilteredServices.slice(indexOfFirstEntry, indexOfLastEntry);

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

  const handleDeleteService = () => {
    if (serviceToDelete) {
      console.log('Deleting service:', serviceToDelete);
      setShowDeleteModal(false);
      setServiceToDelete(null);
    }
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content company">
        <div className="container-fluid p-4">
          {/* Header with Manage services title and Profile */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <button 
                className="menu-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
              <h2 className='dashboard-title'>Manage services</h2>
            </div>
            <div className="profile d-flex align-items-center justify-content-center">
              <img src={profile} alt="profile" className="profile-img me-3" />
              <img src={word} className="me-2" alt="word" />
              <img src={night} alt="night" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="border">
          <div className=" gap-3 px-3 py-3 ">
            <div className="d-flex align-items-center justify-content-between">
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search Services..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="">
              <button className="btn-add-booking" onClick={() => setShowAddServiceModal(true)}>
                <FaPlus className="me-2" />
                Add Servies
              </button>
            </div>
            </div>
          </div>

          {/* Services Table */}
          <div className="customer-table-wrapper mt-2">
            <table className="affiliate-table">
              <thead>
                <tr>
                  <th>
                    <div className="th-content">
                      SERVIES NAME
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
                      SERVIES TYPE
                      <div className="sort-icons d-flex align-items-center clickable-sort"
                        onClick={toggleTableCollapse}
                        style={{ cursor: 'pointer' }}>
                        <RiArrowUpDownLine />
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      CALCULATION TYPE
                      <div className="sort-icons d-flex align-items-center clickable-sort"
                        onClick={toggleTableCollapse}
                        style={{ cursor: 'pointer' }}>
                        <RiArrowUpDownLine />
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      ONLINE VISIBLE
                      <div className="sort-icons d-flex align-items-center clickable-sort"
                        onClick={toggleTableCollapse}
                        style={{ cursor: 'pointer' }}>
                        <RiArrowUpDownLine />
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      ORDERING
                      <div className="sort-icons d-flex align-items-center clickable-sort"
                        onClick={toggleTableCollapse}
                        style={{ cursor: 'pointer' }}>
                        <RiArrowUpDownLine />
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      DESCRIPTION
                      <div className="sort-icons d-flex align-items-center clickable-sort"
                        onClick={toggleTableCollapse}
                        style={{ cursor: 'pointer' }}>
                        <RiArrowUpDownLine />
                      </div>
                    </div>
                  </th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody className={isTableCollapsed ? 'collapsed' : ''}>
                {currentServices.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <div className="customer-name">{service.serviceName}</div>
                    </td>
                    <td className="customer-date">{service.serviceType}</td>
                    <td className="customer-date">{service.calculationType}</td>
                    <td className="customer-date">{service.onlineVisible}</td>
                    <td className="customer-date">{service.ordering}</td>
                    <td className="customer-address">{service.description}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="status-available">
                          {service.status}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-edit">
                          <AiOutlineEdit />
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={() => {
                            setServiceToDelete(service);
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

          {/* Pagination */}
          <div className="pagination-container-2 p-3">
            <span className="pagination-info">
              Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, searchFilteredServices.length)} of {searchFilteredServices.length} results
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && serviceToDelete && (
        <div className="modal-overlay" onClick={() => {
          setShowDeleteModal(false);
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
                    setShowDeleteModal(false);
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

      {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="modal-overlay" onClick={() => setShowAddServiceModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Servies</h3>
              <button className="modal-close" onClick={() => setShowAddServiceModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Type</label>
                  <select>
                    <option value="">Select Type</option>
                    <option value="To Airport">To Airport</option>
                    <option value="From Airport">From Airport</option>
                    <option value="Point To Point">Point To Point</option>
                    <option value="Hourly">Hourly</option>
                    <option value="Zone To Zone">Zone To Zone</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Online Visible Flag...</label>
                  <select>
                    <option value="">online Visible Flag</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Service Type Name</label>
                  <input type="text" placeholder="promo code" />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" placeholder="expire date" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ordering</label>
                  <input type="text" placeholder="description*" />
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddServiceModal(false)}>
                <FaPlus className="me-2" />
                Add Servies
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
