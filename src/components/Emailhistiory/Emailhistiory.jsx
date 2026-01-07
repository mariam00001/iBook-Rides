import { useState } from 'react';
import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import profile from '../../assets/Elipse 5.svg';
import word from '../../assets/icons set.svg';
import night from '../../assets/icons set (1).svg';
import { FaRegTrashAlt, FaEnvelope, FaRegCalendar, FaSearch, FaBars } from 'react-icons/fa';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoCheckmark } from 'react-icons/io5';
import { HiX } from 'react-icons/hi';
import './Emailhistiory.css';
import { AiOutlineMail } from 'react-icons/ai';

const Emailhistiory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [isTableCollapsed, setIsTableCollapsed] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [status, setStatus] = useState('All Status');
    const [searchTerm, setSearchTerm] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const emails = [
      {
        id: 1,
        subject: 'Booking Confirmation - Trip #12345',
        tripId: '#12345',
        recipient: 'John Doe',
        recipientEmail: 'john.doe@email.com',
        sender: 'Sarah Wilson',
        senderEmail: 'sarah.wilson@email.com',
        status: 'Delivered',
        dateTime: '2024-01-15 10:30 AM'
      },
      {
        id: 2,
        subject: 'Booking Confirmation - Trip #12345',
        tripId: '#12345',
        recipient: 'John Doe',
        recipientEmail: 'john.doe@email.com',
        sender: 'Sarah Wilson',
        senderEmail: 'sarah.wilson@email.com',
        status: 'Opened',
        dateTime: '2024-01-15 10:30 AM'
      },
      {
        id: 3,
        subject: 'Booking Confirmation - Trip #12345',
        tripId: '#12345',
        recipient: 'John Doe',
        recipientEmail: 'john.doe@email.com',
        sender: 'Sarah Wilson',
        senderEmail: 'sarah.wilson@email.com',
        status: 'Sent',
        dateTime: '2024-01-15 10:30 AM'
      },
      {
        id: 4,
        subject: 'Booking Confirmation - Trip #12345',
        tripId: '#12345',
        recipient: 'John Doe',
        recipientEmail: 'john.doe@email.com',
        sender: 'Sarah Wilson',
        senderEmail: 'sarah.wilson@email.com',
        status: 'Failed',
        dateTime: '2024-01-15 10:30 AM'
      },
      {
        id: 5,
        subject: 'Booking Confirmation - Trip #12345',
        tripId: '#12345',
        recipient: 'John Doe',
        recipientEmail: 'john.doe@email.com',
        sender: 'Sarah Wilson',
        senderEmail: 'sarah.wilson@email.com',
        status: 'Sent',
        dateTime: '2024-01-15 10:30 AM'
      },
      {
        id: 6,
        subject: 'Booking Confirmation - Trip #12345',
        tripId: '#12345',
        recipient: 'John Doe',
        recipientEmail: 'john.doe@email.com',
        sender: 'Sarah Wilson',
        senderEmail: 'sarah.wilson@email.com',
        status: 'Failed',
        dateTime: '2024-01-15 10:30 AM'
      },
      {
        id: 7,
        subject: 'Booking Confirmation - Trip #12345',
        tripId: '#12345',
        recipient: 'John Doe',
        recipientEmail: 'john.doe@email.com',
        sender: 'Sarah Wilson',
        senderEmail: 'sarah.wilson@email.com',
        status: 'Delivered',
        dateTime: '2024-01-15 10:30 AM'
      }
    ];

    // Pagination logic
    const totalPages = Math.ceil(emails.length / entriesPerPage);
    const indexOfLastEmail = currentPage * entriesPerPage;
    const indexOfFirstEmail = indexOfLastEmail - entriesPerPage;
    const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);

    const getStatusBadgeClass = (status) => {
      switch(status) {
        case 'Delivered':
          return 'status-delivered';
        case 'Opened':
          return 'status-opened';
        case 'Sent':
          return 'status-sent';
        case 'Failed':
          return 'status-failed';
        default:
          return '';
      }
    };

    const getStatusIcon = (status) => {
      switch(status) {
        case 'Delivered':
          return <IoCheckmark />;
        case 'Opened':
          return <MdOutlineRemoveRedEye />;
        case 'Sent':
          return <FaEnvelope />;
        case 'Failed':
          return <HiX />;
        default:
          return null;
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
            {/* Header with title and Profile */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center gap-3">
                <button 
                  className="menu-toggle-btn"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  aria-label="Toggle menu"
                >
                  <FaBars />
                </button>
                <h2 className='dashboard-title'>Email Histiory</h2>
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
                  <label className="form-label">Search Emails</label>
                  <div className="input-group-custom">
                    <FaSearch className="search-icon-left" />
                    <input
                      type="text"
                      className="form-control-custom search-input-custom"
                      placeholder="Search by subject, recipient..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Date Range</label>
                  <div className="row">
                    <div className="col-md-6">
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
                    <div className="col-md-6">   <div className="input-group-custom">
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
                  </div></div>
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
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Email Type</label>
                  <div className="input-group-custom">
                    <select
                      className="form-control-custom"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option>All Types</option>
                      <option>Paid</option>
                      <option>Pending</option>
                      <option>Overdue</option>
                    </select>
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

            {/* Email Table */}
            <div className="border">
            <div className="email-table-wrapper">
              <div className="d-flex justify-content-between align-items-center p-4 customer-border">
                <h3 className="email-list-title">Email Communications</h3>
                <div className="entries-selector d-flex align-items-center gap-2">
                  <span className="entries-label">Show</span>
                  <input
                    type="number"
                    className="entries-input"
                    value={entriesPerPage}
                    onChange={(e) => {
                      setEntriesPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    min="1"
                  />
                  <span className="entries-label">entries</span>
                </div>
              </div>
              <table className="email-table">
                <thead>
                  <tr>
                    <th>
                      <div className="th-content">
                        SUBJECT
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                          <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        RECIPIENT
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                          <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>SENDER</th>
                    <th>STATUS</th>
                    <th>
                      <div className="th-content">
                        DATE & TIME
                        <div className="sort-icons d-flex align-items-center clickable-sort"
                          onClick={toggleTableCollapse}
                          style={{ cursor: 'pointer' }}>
                          <RiArrowUpDownLine />
                        </div>
                      </div>
                    </th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody className={isTableCollapsed ? 'collapsed' : ''}>
                  {currentEmails.map((email) => {
                    return (
                      <tr key={email.id}>
                        <td>
                          <div className="email-subject-cell">
                            <div className="email-icon-wrapper">
                              <AiOutlineMail className="email-icon" />
                            </div>
                            <div className="email-subject-content">
                              <div className="email-subject-main">{email.subject}</div>
                              <div className="email-subject-sub">Trip: {email.tripId}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="email-recipient-cell">
                            <div className="email-name">{email.recipient}</div>
                            <div className="email-email">{email.recipientEmail}</div>
                          </div>
                        </td>
                        <td>
                          <div className="email-sender-cell">
                            <div className="email-name">{email.sender}</div>
                            <div className="email-email">{email.senderEmail}</div>
                          </div>
                        </td>
                        <td>
                          <span className={`email-status-badge ${getStatusBadgeClass(email.status)}`}>
                            {getStatusIcon(email.status)}
                            {email.status}
                          </span>
                        </td>
                        <td className="email-datetime">{email.dateTime}</td>
                        <td>
                          <div className="email-actions">
                            <button className="btn-edit">
                              <MdOutlineRemoveRedEye />
                            </button>
                            <button className="btn-delete">
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
                Showing {indexOfFirstEmail + 1} to {Math.min(indexOfLastEmail, emails.length)} of {emails.length} entries
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
export default Emailhistiory
