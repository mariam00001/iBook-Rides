import { useState } from 'react';
import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import profile from '../../../assets/Elipse 5.svg';
import word from '../../../assets/icons set.svg';
import night from '../../../assets/icons set (1).svg';
import { FaBars, FaSearch, FaRegCalendar, FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { LuUsersRound } from 'react-icons/lu';
import '../Revenu/Revenu.css';
import '../../Custmors/Custmors.css';
import './Payroll.css';

const Payroll = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeButton, setActiveButton] = useState('Payroll');
  const [assignee, setAssignee] = useState('Driver');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState(null);
  const [cardTransactionSearchTerm, setCardTransactionSearchTerm] = useState('');
  const [cardTransactionPage, setCardTransactionPage] = useState(1);
  const [cardTransactionEntriesPerPage, setCardTransactionEntriesPerPage] = useState(8);

  // Payroll data
  const payrollData = [
    {
      id: 1,
      driverName: 'Ahmed Ibrahem',
      mobile: '+937263542',
      email: 'ahmedibrahme6@gmail.com',
      payInAmount: '45$',
      payoutAmount: '45$'
    },
    {
      id: 2,
      driverName: 'Ahmed Ibrahem',
      mobile: '+937263542',
      email: 'ahmedibrahme6@gmail.com',
      payInAmount: '45$',
      payoutAmount: '45$'
    },
    {
      id: 3,
      driverName: 'Ahmed Ibrahem',
      mobile: '+937263542',
      email: 'ahmedibrahme6@gmail.com',
      payInAmount: '45$',
      payoutAmount: '45$'
    },
    {
      id: 4,
      driverName: 'Ahmed Ibrahem',
      mobile: '+937263542',
      email: 'ahmedibrahme6@gmail.com',
      payInAmount: '45$',
      payoutAmount: '45$'
    },
    {
      id: 5,
      driverName: 'Ahmed Ibrahem',
      mobile: '+937263542',
      email: 'ahmedibrahme6@gmail.com',
      payInAmount: '45$',
      payoutAmount: '45$'
    },
    {
      id: 6,
      driverName: 'Ahmed Ibrahem',
      mobile: '+937263542',
      email: 'ahmedibrahme6@gmail.com',
      payInAmount: '45$',
      payoutAmount: '45$'
    },
    {
      id: 7,
      driverName: 'Ahmed Ibrahem',
      mobile: '+937263542',
      email: 'ahmedibrahme6@gmail.com',
      payInAmount: '45$',
      payoutAmount: '45$'
    },
    {
      id: 8,
      driverName: 'Ahmed Ibrahem',
      mobile: '+937263542',
      email: 'ahmedibrahme6@gmail.com',
      payInAmount: '45$',
      payoutAmount: '45$'
    }
  ];

  // Card Transaction data
  const cardTransactionData = [
    {
      id: 1,
      bookingId: 'BK12345 - EGP 150',
      clientName: 'David Wislon',
      runDate: '2024-02-15',
      amount: '45$',
      date: '2024-02-15',
      totalAmountRefunded: '45$'
    },
    {
      id: 2,
      bookingId: 'BK12345 - EGP 150',
      clientName: 'David Wislon',
      runDate: '2024-02-15',
      amount: '45$',
      date: '2024-02-15',
      totalAmountRefunded: '45$'
    },
    {
      id: 3,
      bookingId: 'BK12345 - EGP 150',
      clientName: 'David Wislon',
      runDate: '2024-02-15',
      amount: '45$',
      date: '2024-02-15',
      totalAmountRefunded: '45$'
    },
    {
      id: 4,
      bookingId: 'BK12345 - EGP 150',
      clientName: 'David Wislon',
      runDate: '2024-02-15',
      amount: '45$',
      date: '2024-02-15',
      totalAmountRefunded: '45$'
    },
    {
      id: 5,
      bookingId: 'BK12345 - EGP 150',
      clientName: 'David Wislon',
      runDate: '2024-02-15',
      amount: '45$',
      date: '2024-02-15',
      totalAmountRefunded: '45$'
    },
    {
      id: 6,
      bookingId: 'BK12345 - EGP 150',
      clientName: 'David Wislon',
      runDate: '2024-02-15',
      amount: '45$',
      date: '2024-02-15',
      totalAmountRefunded: '45$'
    },
    {
      id: 7,
      bookingId: 'BK12345 - EGP 150',
      clientName: 'David Wislon',
      runDate: '2024-02-15',
      amount: '45$',
      date: '2024-02-15',
      totalAmountRefunded: '45$'
    },
    {
      id: 8,
      bookingId: 'BK12345 - EGP 150',
      clientName: 'David Wislon',
      runDate: '2024-02-15',
      amount: '45$',
      date: '2024-02-15',
      totalAmountRefunded: '45$'
    }
  ];

  const toggleTableCollapse = () => {
    setIsTableCollapsed(prev => !prev);
  };

  const handleSearch = () => {
    console.log('Searching with:', { fromDate, toDate, assignee });
  };

  const handleDeleteDriver = () => {
    if (driverToDelete) {
      console.log('Deleting driver:', driverToDelete);
      setShowDeleteModal(false);
      setDriverToDelete(null);
    }
  };

  // Filter payroll data by search term
  const searchFilteredPayroll = payrollData.filter(driver =>
    driver.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter card transaction data by search term
  const searchFilteredCardTransactions = cardTransactionData.filter(transaction =>
    transaction.bookingId.toLowerCase().includes(cardTransactionSearchTerm.toLowerCase()) ||
    transaction.clientName.toLowerCase().includes(cardTransactionSearchTerm.toLowerCase()) ||
    transaction.runDate.toLowerCase().includes(cardTransactionSearchTerm.toLowerCase())
  );

  // Pagination logic for Payroll
  const totalPages = Math.ceil(searchFilteredPayroll.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentPayroll = searchFilteredPayroll.slice(indexOfFirstEntry, indexOfLastEntry);

  // Pagination logic for Card Transaction
  const cardTransactionTotalPages = Math.ceil(searchFilteredCardTransactions.length / cardTransactionEntriesPerPage);
  const cardTransactionIndexOfLastEntry = cardTransactionPage * cardTransactionEntriesPerPage;
  const cardTransactionIndexOfFirstEntry = cardTransactionIndexOfLastEntry - cardTransactionEntriesPerPage;
  const currentCardTransactions = searchFilteredCardTransactions.slice(cardTransactionIndexOfFirstEntry, cardTransactionIndexOfLastEntry);

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

  const handleCardTransactionPageChange = (page) => {
    setCardTransactionPage(page);
  };

  const handleCardTransactionPrevious = () => {
    if (cardTransactionPage > 1) {
      setCardTransactionPage(cardTransactionPage - 1);
    }
  };

  const handleCardTransactionNext = () => {
    if (cardTransactionPage < cardTransactionTotalPages) {
      setCardTransactionPage(cardTransactionPage + 1);
    }
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content company">
        <div className="container-fluid p-4">
          {/* Header with Revenu Reports title and Profile */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <button 
                className="menu-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
              <h2 className='dashboard-title'>Revenu Reports</h2>
            </div>
            <div className="d-flex flex-column align-items-end">
              <div className="profile d-flex align-items-center justify-content-center mb-2">
                <img src={profile} alt="profile" className="profile-img me-3" />
                <img src={word} className="me-2" alt="word" />
                <img src={night} alt="night" />
              </div>
            
            </div>
          </div>
          <div className="revenue-tabs-section mb-4 d-flex justify-content-end align-items-center">
              <div className="affiliate-tabs   gap-2">
                <button
                  className={`affiliate-tab ${activeButton === 'Payroll' ? 'active' : ''}`}
                  onClick={() => setActiveButton('Payroll')}
                >
                  Payroll
                </button>
                <button
                  className={`affiliate-tab ${activeButton === 'Card Transaction' ? 'active' : ''}`}
                  onClick={() => setActiveButton('Card Transaction')}
                >
                  Card Transaction
                </button>
              </div>
              </div>
          {/* Filter Section */}
          <div className="revenue-filter-section border p-3 mb-4">
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label className="revenue-label">Choose Asignee</label>
                <div className="revenue-input-group">
                  <select
                    className="revenue-input"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                  >
                    <option value="Driver">Driver</option>
                    <option value="Customer">Customer</option>
                    <option value="Company">Company</option>
                  </select>
                  <span className="revenue-input-icon">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="col-md-3">
                <label className="revenue-label">From</label>
                <div className="revenue-input-group">
                  <input
                    type="text"
                    className="revenue-input"
                    placeholder="mm/dd/yyyy"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                  <span className="revenue-input-icon">
                    <FaRegCalendar size={16} />
                  </span>
                </div>
              </div>
              <div className="col-md-3">
                <label className="revenue-label">To</label>
                <div className="revenue-input-group">
                  <input
                    type="text"
                    className="revenue-input"
                    placeholder="mm/dd/yyyy"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                  <span className="revenue-input-icon">
                    <FaRegCalendar size={16} />
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center mt-3">
              <button className="btn-add-booking" onClick={handleSearch}>
                <FaSearch className="me-2" />
                Search
              </button>
            </div>
          </div>

          {/* Table Controls */}
          <div className="affiliate-controls-right d-flex justify-content-between gap-3 px-3 py-3 customer-border mb-2">
            <div className="entries-selector d-flex align-items-center gap-2">
              <span className="entries-label">Show</span>
              <select
                className="entries-select"
                value={activeButton === 'Payroll' ? entriesPerPage : cardTransactionEntriesPerPage}
                onChange={(e) => {
                  if (activeButton === 'Payroll') {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  } else {
                    setCardTransactionEntriesPerPage(Number(e.target.value));
                    setCardTransactionPage(1);
                  }
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
                  placeholder="Search feedback..."
                  value={activeButton === 'Payroll' ? searchTerm : cardTransactionSearchTerm}
                  onChange={(e) => {
                    if (activeButton === 'Payroll') {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    } else {
                      setCardTransactionSearchTerm(e.target.value);
                      setCardTransactionPage(1);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Conditional Table Rendering */}
          {activeButton === 'Payroll' ? (
            <>
              {/* Payroll Table */}
              <div className="customer-table-wrapper mt-2">
                <table className="affiliate-table">
                  <thead>
                    <tr>
                      <th>
                        <div className="th-content">
                          DRIVER NAME
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
                          MOBILE
                          <div className="sort-icons d-flex align-items-center clickable-sort"
                            onClick={toggleTableCollapse}
                            style={{ cursor: 'pointer' }}>
                            <RiArrowUpDownLine />
                          </div>
                        </div>
                      </th>
                      <th>EMAIL</th>
                      <th>PAY IN AMOUNT</th>
                      <th>PAYOUT AMOUNT</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody className={isTableCollapsed ? 'collapsed' : ''}>
                    {currentPayroll.map((driver) => (
                      <tr key={driver.id}>
                        <td>
                          <div className="customer-info">
                            <div className="customer-avatar">
                              <LuUsersRound className="customer-avatar-icon" />
                            </div>
                            <div className="customer-name">{driver.driverName}</div>
                          </div>
                        </td>
                        <td className="customer-phone">{driver.mobile}</td>
                        <td className="customer-email">{driver.email}</td>
                        <td className="customer-date">{driver.payInAmount}</td>
                        <td className="customer-date">{driver.payoutAmount}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-edit">
                              <MdOutlineRemoveRedEye />
                            </button>
                            <button 
                              className="btn-delete"
                              onClick={() => {
                                setDriverToDelete(driver);
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
                  Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, searchFilteredPayroll.length)} of {searchFilteredPayroll.length} results
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
            </>
          ) : (
            <>
              {/* Card Transaction Table */}
              <div className="customer-table-wrapper mt-2">
                <table className="affiliate-table">
                  <thead>
                    <tr>
                      <th>
                        <div className="th-content">
                          BOOKING ID
                          <div className="sort-icons d-flex align-items-center clickable-sort"
                            onClick={toggleTableCollapse}
                            style={{ cursor: 'pointer' }}>
                            <RiArrowUpDownLine />
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="th-content">
                          CLIENT NAME
                          <div className="sort-icons d-flex align-items-center clickable-sort"
                            onClick={toggleTableCollapse}
                            style={{ cursor: 'pointer' }}>
                            <RiArrowUpDownLine />
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="th-content">
                          RUN DATE
                          <div className="sort-icons d-flex align-items-center clickable-sort"
                            onClick={toggleTableCollapse}
                            style={{ cursor: 'pointer' }}>
                            <RiArrowUpDownLine />
                          </div>
                        </div>
                      </th>
                      <th>AMOUNT</th>
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
                      <th>
                        <div className="th-content">
                          TOTAL AMOUNT REFUNDED
                          <div className="sort-icons d-flex align-items-center clickable-sort"
                            onClick={toggleTableCollapse}
                            style={{ cursor: 'pointer' }}>
                            <RiArrowUpDownLine />
                          </div>
                        </div>
                      </th>
                      <th>VIEW</th>
                    </tr>
                  </thead>
                  <tbody className={isTableCollapsed ? 'collapsed' : ''}>
                    {currentCardTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{transaction.bookingId}</td>
                        <td>
                          <div className="customer-info">
                            <div className="customer-avatar">
                              <LuUsersRound className="customer-avatar-icon" />
                            </div>
                            <div className="customer-name">{transaction.clientName}</div>
                          </div>
                        </td>
                        <td className="customer-date">{transaction.runDate}</td>
                        <td className="customer-date">{transaction.amount}</td>
                        <td className="customer-date">{transaction.date}</td>
                        <td className="customer-date text-center">{transaction.totalAmountRefunded}</td>
                        <td>-----</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="pagination-container-2 p-3">
                <span className="pagination-info">
                  Showing {cardTransactionIndexOfFirstEntry + 1} to {Math.min(cardTransactionIndexOfLastEntry, searchFilteredCardTransactions.length)} of {searchFilteredCardTransactions.length} results
                </span>
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={handleCardTransactionPrevious}
                    disabled={cardTransactionPage === 1}
                  >
                    Previous
                  </button>
                  {Array.from({ length: cardTransactionTotalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`pagination-btn ${cardTransactionPage === page ? 'active' : ''}`}
                      onClick={() => handleCardTransactionPageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="pagination-btn"
                    onClick={handleCardTransactionNext}
                    disabled={cardTransactionPage === cardTransactionTotalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && driverToDelete && (
        <div className="modal-overlay" onClick={() => {
          setShowDeleteModal(false);
          setDriverToDelete(null);
        }}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-body">
              <p className="delete-modal-question">
                Are You Sure You Want Delete <br /> <span className="delete-customer-name">{driverToDelete.driverName}</span> ?
              </p>
              <div className="delete-modal-buttons">
                <button 
                  className="btn-delete-confirm"
                  onClick={handleDeleteDriver}
                >
                  <FaPlus className="delete-icon" />
                  Delete
                </button>
                <button 
                  className="btn-delete-cancel"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDriverToDelete(null);
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

export default Payroll;
