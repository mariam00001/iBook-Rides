import { useState } from 'react';
import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import profile from '../../../assets/Elipse 5.svg';
import word from '../../../assets/icons set.svg';
import night from '../../../assets/icons set (1).svg';
import { FaSearch, FaRegCalendar, FaBars } from 'react-icons/fa';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import './Invoicing.css';

const Invoicing = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [status, setStatus] = useState('All Status');
    const [isTableCollapsed, setIsTableCollapsed] = useState(false);
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [invoiceStatuses, setInvoiceStatuses] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const invoices = [
      {
        id: 1,
        bookingId: 'BK001',
        client: 'John Smith',
        invoiceDate: '2024-01-15',
        invoiceNo: 'INV-2024-001',
        invoiceAmount: '$450.00',
        invoiceStatus: true,
        bookingStatus: 'Completed'
      },
      {
        id: 2,
        bookingId: 'BK001',
        client: 'John Smith',
        invoiceDate: '2024-01-15',
        invoiceNo: 'INV-2024-001',
        invoiceAmount: '$450.00',
        invoiceStatus: true,
        bookingStatus: 'Completed'
      },
      {
        id: 3,
        bookingId: 'BK001',
        client: 'John Smith',
        invoiceDate: '2024-01-15',
        invoiceNo: 'INV-2024-001',
        invoiceAmount: '$450.00',
        invoiceStatus: true,
        bookingStatus: 'Completed'
      },
      {
        id: 4,
        bookingId: 'BK001',
        client: 'John Smith',
        invoiceDate: '2024-01-15',
        invoiceNo: 'INV-2024-001',
        invoiceAmount: '$450.00',
        invoiceStatus: true,
        bookingStatus: 'Completed'
      },
      {
        id: 5,
        bookingId: 'BK001',
        client: 'John Smith',
        invoiceDate: '2024-01-15',
        invoiceNo: 'INV-2024-001',
        invoiceAmount: '$450.00',
        invoiceStatus: true,
        bookingStatus: 'Completed'
      },
      {
        id: 6,
        bookingId: 'BK001',
        client: 'John Smith',
        invoiceDate: '2024-01-15',
        invoiceNo: 'INV-2024-001',
        invoiceAmount: '$450.00',
        invoiceStatus: true,
        bookingStatus: 'Completed'
      },
      {
        id: 7,
        bookingId: 'BK001',
        client: 'John Smith',
        invoiceDate: '2024-01-15',
        invoiceNo: 'INV-2024-001',
        invoiceAmount: '$450.00',
        invoiceStatus: true,
        bookingStatus: 'Completed'
      }
    ];

    // Filter by search term and other filters
    const searchFilteredInvoices = invoices.filter(invoice => {
      const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Pagination logic
    const totalPages = Math.ceil(searchFilteredInvoices.length / entriesPerPage);
    const indexOfLastInvoice = currentPage * entriesPerPage;
    const indexOfFirstInvoice = indexOfLastInvoice - entriesPerPage;
    const currentInvoices = searchFilteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

    const handleSelectInvoice = (invoiceId) => {
      setSelectedInvoices(prev => 
        prev.includes(invoiceId) 
          ? prev.filter(id => id !== invoiceId)
          : [...prev, invoiceId]
      );
    };

    const handleSelectAll = () => {
      if (selectedInvoices.length === currentInvoices.length) {
        setSelectedInvoices([]);
      } else {
        setSelectedInvoices(currentInvoices.map(inv => inv.id));
      }
    };

    const toggleInvoiceStatus = (invoiceId) => {
      setInvoiceStatuses(prev => ({
        ...prev,
        [invoiceId]: !prev[invoiceId]
      }));
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
                <h2 className='dashboard-title'>Invoicing</h2>
              </div>
              <div className="profile d-flex align-items-center justify-content-center">
                <img src={profile} alt="profile" className="profile-img me-3" />
                <img src={word} className="me-2" alt="word" />
                <img src={night} alt="night" />
              </div>
            </div>
            {/* Filter/Search Form */}
            <div className="invoice-filter-form mb-4 border">
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">From Date</label>
                  <div className="input-group-custom">
                    <input
                      type="text"
                      className="form-control-custom"
                      placeholder="mm/dd/yyyy"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                    <span className="input-icon">
                      <FaRegCalendar size={16} />
                    </span>
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label">To Date</label>
                  <div className="input-group-custom">
                    <input
                      type="text"
                      className="form-control-custom"
                      placeholder="mm/dd/yyyy"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                    <span className="input-icon">
                      <FaRegCalendar size={16} />
                    </span>
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Status</label>
                  <div className="input-group-custom">
                    <select
                      className="form-control-custom"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option>All Status</option>
                      <option>Paid</option>
                      <option>Pending</option>
                      <option>Overdue</option>
                    </select>
                    <span className="input-icon">
                      <RiArrowUpDownLine size={16} />
                    </span>
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Search</label>
                  <div className="input-group-custom">
                    <FaSearch className="search-icon-left" />
                    <input
                      type="text"
                      className="form-control-custom search-input-custom"
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button className="btn-add-booking">
                  <FaSearch className="me-2" />
                  Search
                </button>
              </div>
            </div>

            {/* Invoice List Table */}
            <div className="border">
            <div className="invoice-table-wrapper">
              <div className="d-flex justify-content-between align-items-center mb-3 p-4 customer-border">
                <h3 className="invoice-list-title">Invoice List</h3>
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
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span className="entries-label">entries</span>
                </div>
              </div>
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectedInvoices.length === currentInvoices.length && currentInvoices.length > 0}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>
                      <div className="th-content">
                        Booking ID
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                          <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        Client
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                          <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        Invoice Date
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                          <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        Invoice No.
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                          <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        Invoice Amount
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                          <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        Invoice Status
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                          <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        Booking Status
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                          <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className={isTableCollapsed ? 'collapsed' : ''}>
                  {currentInvoices.map((invoice) => {
                    const isActive = invoiceStatuses[invoice.id] !== undefined 
                      ? invoiceStatuses[invoice.id] 
                      : invoice.invoiceStatus;
                    return (
                      <tr key={invoice.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedInvoices.includes(invoice.id)}
                            onChange={() => handleSelectInvoice(invoice.id)}
                          />
                        </td>
                        <td>
                          <span className="booking-id-link">{invoice.bookingId}</span>
                        </td>
                        <td>{invoice.client}</td>
                        <td>{invoice.invoiceDate}</td>
                        <td>{invoice.invoiceNo}</td>
                        <td>{invoice.invoiceAmount}</td>
                        <td>
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={isActive}
                              onChange={() => toggleInvoiceStatus(invoice.id)}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </td>
                        <td>
                          <span className="booking-status-badge">{invoice.bookingStatus}</span>
                        </td>
                        <td>
                          <button className="btn-edit-invoice">
                            <AiOutlineEdit />
                          </button>
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
                Showing {indexOfFirstInvoice + 1} to {Math.min(indexOfLastInvoice, searchFilteredInvoices.length)} of {searchFilteredInvoices.length} entries
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
      </div>
    );
  }
export default Invoicing
