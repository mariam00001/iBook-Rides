import { useState } from 'react';
import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import profile from '../../../assets/Elipse 5.svg';
import word from '../../../assets/icons set.svg';
import night from '../../../assets/icons set (1).svg';
import { FaBars, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { MdArrowForwardIos } from 'react-icons/md';

const Discount = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Custmors');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(8);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [discountToDelete, setDiscountToDelete] = useState(null);
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);
  const [showAddDiscountModal, setShowAddDiscountModal] = useState(false);

  // Discounts data
  const discounts = [
    {
      id: 1,
      discountType: 'David Wislon',
      promoCode: 'CAR2026',
      discount: '15%',
      description: '147 Birch Rd, San Antonio, TX 78201',
      expDate: '2024-02-15',
      status: 'Active',
      automatic: 'yes'
    },
    {
      id: 2,
      discountType: 'David Wislon',
      promoCode: 'CAR2026',
      discount: '15%',
      description: '147 Birch Rd, San Antonio, TX 78201',
      expDate: '2024-02-15',
      status: 'Active',
      automatic: 'Now'
    },
    {
      id: 3,
      discountType: 'David Wislon',
      promoCode: 'CAR2026',
      discount: '15%',
      description: '147 Birch Rd, San Antonio, TX 78201',
      expDate: '2024-02-15',
      status: 'Active',
      automatic: 'yes'
    },
    {
      id: 4,
      discountType: 'David Wislon',
      promoCode: 'CAR2026',
      discount: '15%',
      description: '147 Birch Rd, San Antonio, TX 78201',
      expDate: '2024-02-15',
      status: 'Active',
      automatic: 'Now'
    },
    {
      id: 5,
      discountType: 'David Wislon',
      promoCode: 'CAR2026',
      discount: '15%',
      description: '147 Birch Rd, San Antonio, TX 78201',
      expDate: '2024-02-15',
      status: 'Active',
      automatic: 'yes'
    },
    {
      id: 6,
      discountType: 'David Wislon',
      promoCode: 'CAR2026',
      discount: '15%',
      description: '147 Birch Rd, San Antonio, TX 78201',
      expDate: '2024-02-15',
      status: 'Active',
      automatic: 'Now'
    },
    {
      id: 7,
      discountType: 'David Wislon',
      promoCode: 'CAR2026',
      discount: '15%',
      description: '147 Birch Rd, San Antonio, TX 78201',
      expDate: '2024-02-15',
      status: 'Active',
      automatic: 'yes'
    },
    {
      id: 8,
      discountType: 'David Wislon',
      promoCode: 'CAR2026',
      discount: '15%',
      description: '147 Birch Rd, San Antonio, TX 78201',
      expDate: '2024-02-15',
      status: 'Active',
      automatic: 'Now'
    }
  ];

  // Filter discounts by search term
  const searchFilteredDiscounts = discounts.filter(discount =>
    discount.discountType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.promoCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(searchFilteredDiscounts.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentDiscounts = searchFilteredDiscounts.slice(indexOfFirstEntry, indexOfLastEntry);

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

  const handleDeleteDiscount = () => {
    if (discountToDelete) {
      console.log('Deleting discount:', discountToDelete);
      setShowDeleteModal(false);
      setDiscountToDelete(null);
    }
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content company">
        <div className="container-fluid p-4">
          {/* Header with Settings Finance title and Profile */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <button 
                className="menu-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
              <h2 className='dashboard-title'>Settings <span className='span-payment ms-2'>Finance <MdArrowForwardIos /></span></h2>
            </div>
            <div className="profile d-flex align-items-center justify-content-center">
              <img src={profile} alt="profile" className="profile-img me-3" />
              <img src={word} className="me-2" alt="word" />
              <img src={night} alt="night" />
            </div>
          </div>

          {/* Tabs and Controls */}
          <div className=" py-4 d-flex justify-content-end">
            <div className="affiliate-tabs">
              <button
                className={`affiliate-tab ${activeTab === 'Custmors' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('Custmors');
                  setCurrentPage(1);
                }}
              >
                Custmors
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Corporate' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('Corporate');
                  setCurrentPage(1);
                }}
              >
                Corporate
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Guest' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('Guest');
                  setCurrentPage(1);
                }}
              >
                Guest
              </button>
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
                  placeholder="Search affiliates..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="">
              <button className="btn-add-booking" onClick={() => setShowAddDiscountModal(true)}>
                <FaPlus className="me-2" />
                Add Discount
              </button>
            </div>
            </div>
          </div>

          {/* Discounts Table */}
          <div className="customer-table-wrapper mt-2">
            <table className="affiliate-table">
              <thead>
                <tr>
                  <th>
                    <div className="th-content">
                      DISCOUNT TYPE
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
                      PROMO CODE
                      <div className="sort-icons d-flex align-items-center clickable-sort"
                        onClick={toggleTableCollapse}
                        style={{ cursor: 'pointer' }}>
                        <RiArrowUpDownLine />
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      DISCOUNT
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
                  <th>
                    <div className="th-content">
                      EXP DATE
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
                  <th>AUTOMATIC</th>
                </tr>
              </thead>
              <tbody className={isTableCollapsed ? 'collapsed' : ''}>
                {currentDiscounts.map((discount) => (
                  <tr key={discount.id}>
                    <td>
                      <div className="customer-name">{discount.discountType}</div>
                    </td>
                    <td className="customer-date">{discount.promoCode}</td>
                    <td className="customer-date">{discount.discount}</td>
                    <td className="customer-address">{discount.description}</td>
                    <td className="customer-date">{discount.expDate}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="status-available">
                          {discount.status}
                        </span>
                      
                      </div>
                    </td>
                    <td>  <div className="action-buttons">
                          <button className="btn-edit">
                            <AiOutlineEdit />
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => {
                              setDiscountToDelete(discount);
                              setShowDeleteModal(true);
                            }}
                          >
                            <FaRegTrashAlt />
                          </button>
                        </div></td>
                    <td >
                    <div className="d-flex align-items-center gap-2">
                        <span className="status-available">
                        {discount.automatic}
                        </span>
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
              Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, searchFilteredDiscounts.length)} of {searchFilteredDiscounts.length} results
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
      {showDeleteModal && discountToDelete && (
        <div className="modal-overlay" onClick={() => {
          setShowDeleteModal(false);
          setDiscountToDelete(null);
        }}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-body">
              <p className="delete-modal-question">
                Are You Sure You Want Delete <br /> <span className="delete-customer-name">{discountToDelete.discountType}</span> ?
              </p>
              <div className="delete-modal-buttons">
                <button 
                  className="btn-delete-confirm"
                  onClick={handleDeleteDiscount}
                >
                  <FaPlus className="delete-icon" />
                  Delete
                </button>
                <button 
                  className="btn-delete-cancel"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDiscountToDelete(null);
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

      {/* Add Discount Modal */}
      {showAddDiscountModal && (
        <div className="modal-overlay" onClick={() => setShowAddDiscountModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Discount</h3>
              <button className="modal-close" onClick={() => setShowAddDiscountModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Discount Type</label>
                  <select>
                    <option value="Fixed Discount">Fixed Discount</option>
                    <option value="Percentage Discount">Percentage Discount</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Coupon Use</label>
                  <select>
                    <option value="Single">Single</option>
                    <option value="Multiple">Multiple</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Promo Code</label>
                  <input type="text" placeholder="promo code" />
                </div>
                <div className="form-group">
                  <label>Expire Date</label>
                  <input type="text" placeholder="expire date" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" placeholder="description*" />
                </div>
                <div className="form-group">
                  <label>Percentage</label>
                  <input type="text" placeholder="percentage*" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expire Date</label>
                  <input type="text" placeholder="description*" />
                </div>
                <div className="form-group">
                  <label>Allowed TO Use Coupon</label>
                  <div className="d-flex justify-content-between align-items-center gap-2 mt-2">
                    <label className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                      <input type="checkbox" />
                      <span>Custmors</span>
                    </label>
                    <label className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                      <input type="checkbox" />
                      <span>Guests</span>
                    </label>
                    <label className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                      <input type="checkbox" />
                      <span>Cooperates</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddDiscountModal(false)}>
                <FaPlus className="me-2" />
                Add Discount
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discount;
