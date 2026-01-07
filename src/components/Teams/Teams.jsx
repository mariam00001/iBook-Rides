import { useState } from 'react';
import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import profile from '../../assets/Elipse 5.svg';
import word from '../../assets/icons set.svg';
import night from '../../assets/icons set (1).svg';
import { FaSearch, FaEdit, FaTrash, FaRegTrashAlt, FaPlus, FaBars } from 'react-icons/fa';
import { LuUsersRound, LuUsers, LuUserRoundCog } from 'react-icons/lu';
import { TbWorld } from 'react-icons/tb';
import { SlLocationPin } from 'react-icons/sl';
import { FiActivity } from 'react-icons/fi';
import { MdOutlineRemoveRedEye, MdOutlineDescription } from 'react-icons/md';
import { RiArrowUpDownLine, RiBuildingLine, RiShieldLine, RiShieldUserLine, RiUserLine, RiDashboardLine } from 'react-icons/ri';
import './Teams.css';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoCheckmark } from 'react-icons/io5';

const Teams = () => {
    const [showAddAffiliateModal, setShowAddAffiliateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [activeTab, setActiveTab] = useState('User Management');
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isTableCollapsed, setIsTableCollapsed] = useState(false);
  

    const users = [
      {
        id: 1,
        userId: 'u001',
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@compan...',
        phone: '+20 100 123 4567',
        role: 'Administrator',
        status: 'Active',
        created: '2024-01-01'
      },
      {
        id: 2,
        userId: 'u001',
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@compan...',
        phone: '+20 100 123 4567',
        role: 'Administrator',
        status: 'Active',
        created: '2024-01-01'
      },
      {
        id: 3,
        userId: 'u001',
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@compan...',
        phone: '+20 100 123 4567',
        role: 'Administrator',
        status: 'Active',
        created: '2024-01-01'
      },
      {
        id: 4,
        userId: 'u001',
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@compan...',
        phone: '+20 100 123 4567',
        role: 'Administrator',
        status: 'Active',
        created: '2024-01-01'
      },
      {
        id: 5,
        userId: 'u001',
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@compan...',
        phone: '+20 100 123 4567',
        role: 'Administrator',
        status: 'Active',
        created: '2024-01-01'
      },
      {
        id: 6,
        userId: 'u001',
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@compan...',
        phone: '+20 100 123 4567',
        role: 'Administrator',
        status: 'Active',
        created: '2024-01-01'
      },
      {
        id: 7,
        userId: 'u001',
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@compan...',
        phone: '+20 100 123 4567',
        role: 'Administrator',
        status: 'Active',
        created: '2024-01-01'
      },
      {
        id: 8,
        userId: 'u001',
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@compan...',
        phone: '+20 100 123 4567',
        role: 'Administrator',
        status: 'Active',
        created: '2024-01-01'
      }
    ];

    const roles = [
      {
        id: 1,
        name: 'Administrator',
        description: 'Full system access with all permissions',
        usersCount: 3,
        permissions: '12/12',
        created: '2024-01-01'
      },
      {
        id: 2,
        name: 'Manager',
        description: 'Management level access with most permissions',
        usersCount: 3,
        permissions: '12/12',
        created: '2024-01-01'
      },
      {
        id: 3,
        name: 'Operator',
        description: 'Operational access for daily tasks',
        subRole: 'dispatcher',
        usersCount: 3,
        permissions: '12/12',
        created: '2024-01-01'
      },
      {
        id: 4,
        name: 'Support Agent',
        description: 'Customer support focused permissions',
        usersCount: 3,
        permissions: '12/12',
        created: '2024-01-01'
      }
    ];

    const permissions = [
      { id: 1, name: 'Dashboard', description: 'View main dashboard and analytics' },
      { id: 2, name: 'Dashboard', description: 'View main dashboard and analytics' },
      { id: 3, name: 'Dashboard', description: 'View main dashboard and analytics' },
      { id: 4, name: 'Dashboard', description: 'View main dashboard and analytics' },
      { id: 5, name: 'Dashboard', description: 'View main dashboard and analytics' },
      { id: 6, name: 'Dashboard', description: 'View main dashboard and analytics' },
      { id: 7, name: 'Dashboard', description: 'View main dashboard and analytics' },
      { id: 8, name: 'Dashboard', description: 'View main dashboard and analytics' },
      { id: 9, name: 'Dashboard', description: 'View main dashboard and analytics' },
      { id: 10, name: 'Dashboard', description: 'View main dashboard and analytics' },
      { id: 11, name: 'Dashboard', description: 'View main dashboard and analytics' },
      { id: 12, name: 'Dashboard', description: 'View main dashboard and analytics' }
    ];

    const togglePermission = (permissionId) => {
      setSelectedPermissions(prev => 
        prev.includes(permissionId)
          ? prev.filter(id => id !== permissionId)
          : [...prev, permissionId]
      );
    };

    // Filter users based on active tab
    const filteredUsers = users.filter(user => {
      // For now, all users are shown regardless of tab
      return true;
    });

    // Filter by search term for users
    const searchFilteredUsers = filteredUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter roles by search term
    const searchFilteredRoles = roles.filter(role =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic for users
    const totalPages = Math.ceil(searchFilteredUsers.length / entriesPerPage);
    const indexOfLastUser = currentPage * entriesPerPage;
    const indexOfFirstUser = indexOfLastUser - entriesPerPage;
    const currentUsers = searchFilteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const handleDelete = () => {
      if (customerToDelete) {
        // Handle delete logic here
        console.log('Deleting:', customerToDelete);
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
                <h2 className='dashboard-title'>Teams</h2>
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
                <h4>Total Users</h4>
                <div className="d-flex justify-content-between align-items-center ">
                  <h3>8</h3>
                  <div className="icon-book">
                  <LuUsersRound size={24} />
                    
                  </div>
                </div>
                <p className="mb-0">+3 This month</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="summary-card">
                <h4>Active Roles</h4>
                <div className="d-flex justify-content-between align-items-center ">
                  <h3>6</h3>
                  <div className="icon-book">
                  <MdOutlineDescription size={24} />
                  </div>
                </div>
                <p className="mb-0">+12% from last month</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-5 mb-md-0">
              <div className="summary-card">
                <h4>Pending Users</h4>
                <div className="d-flex justify-content-between align-items-center">
                  <h3>5</h3>
                  <div className="icon-book">
                  <LuUsersRound size={24} />
                  </div>
                </div>
                <p className="mb-0">Waiting Approval</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-md-0">
              <div className="summary-card">
                <h4>Permissions</h4>
                <div className="d-flex justify-content-between align-items-center ">
                  <h3>23</h3>
                  <div className="icon-book">
                  <IoCheckmark size={24} />
                  </div>
                </div>
                <p className="mb-0">System Modules</p>
              </div>
            </div>
          </div>
  
            {/* Tabs and Controls */}
             <div className="border">
             <div className="teams-controls ">
                <div className="container">
                <div className=" row  border-bottom-teams  ">
                 <div className={`col-md-6 d-flex justify-content-center align-items-center px-0  team-tab-container ${activeTab === 'User Management' ? 'active' : ''} `}>

                   
                 <button
                   className="team-tab"
                   onClick={() => {
                     setActiveTab('User Management');
                     setCurrentPage(1);
                     setSearchTerm('');
                   }}
                 >
                   <LuUserRoundCog />
                   User Management
                 </button>
                 </div>
                 <div className={`col-md-6 d-flex justify-content-center align-items-center ${activeTab === 'Role Management' ? 'active' : ''}`}>
                      
                 <button
                   className="team-tab"
                   onClick={() => {
                     setActiveTab('Role Management');
                     setCurrentPage(1);
                     setSearchTerm('');
                   }}
                 >
                   <RiShieldUserLine />
                   Role Management
                 </button>
                 </div>
               
               </div>
                </div>
               
          
            </div>
            <div className="affiliate-controls-right d-flex justify-content-between  gap-3 px-3 py-4  ">
            <div className="d-flex align-items-center">
              <h4 className="mb-0 font-customer">{activeTab === 'User Management' ? 'Users' : 'Roles & Permissions'}</h4>
            </div>
                <div className="d-flex align-items-center gap-3">
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder={activeTab === 'User Management' ? 'Search feedback...' : 'Search permission...'}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <button className="btn-add-booking"  onClick={() => setShowAddAffiliateModal(true)}>
                  {activeTab === 'User Management' ? '+ Add User' : '+ Add Role'}
                </button>
                </div>
            </div>
  
            {/* Conditional Content Based on Active Tab */}
            {activeTab === 'User Management' ? (
              <>
                {/* Users Table */}
                <div className="container">
                <div className="customer-table-wrapper mt-2 border">
                  <table className="affiliate-table teams-table">
                    <thead>
                      <tr>
                        <th>User Information</th>
                        <th>Contact Details</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className={isTableCollapsed ? 'collapsed' : ''}>
                      {currentUsers.map((user) => {
                        return (
                          <tr key={user.id}>
                            <td>
                              <div className="customer-info">
                                <div className="teams-avatar">
                                <RiUserLine />
                                </div>
                                <div>
                                  <div className="customer-name">{user.name}</div>
                                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>ID: {user.userId}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div className='customer-email'>{user.email}</div>
                                <div className='customer-phone' style={{ marginTop: '4px' }}>{user.phone}</div>
                              </div>
                            </td>
                            <td>
                              <span className="role-badge">
                                {user.role}
                              </span>
                            </td>
                            <td>
                              <span className="status-available " >
                                {user.status}
                              </span>
                            </td>
                            <td className='customer-date'>{user.created}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-edit">
                                <AiOutlineEdit />
                                </button>
                                <button 
                                  className="btn-delete"
                                  onClick={() => {
                                    setCustomerToDelete(user);
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
                </div>
               
        
                {/* Pagination */}
                <div className="pagination-container-2 p-3">
                  <span className="pagination-info">
                    Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, searchFilteredUsers.length)} of {searchFilteredUsers.length} results
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
                {/* Roles Grid */}
                <div className="container">
                <div className="row pt-1 g-3">
                  {searchFilteredRoles.map((role) => (
                    <div key={role.id} className="col-md-6">
                      <div className="role-card ">
                        {/* Role Header */}
                        <div className="role-header pt-2">
                          <div className="role-header-content">
                            <div className="role-icon-wrapper">
                              <RiShieldUserLine className="role-icon" />
                            </div>
                            <div>
                              <h4 className="role-name">
                                {role.name}
                              </h4>
                              <p className="role-description">
                                {role.description}
                              </p>
                              {role.subRole && (
                                <p className="role-subrole">
                                  {role.subRole}
                                </p>
                              )}
                            </div>
                          </div>
                          <button className="role-view-btn">
                            <MdOutlineRemoveRedEye />
                          </button>
                        </div>

                        {/* Role Details */}
                        <div className="role-details">
                          <div className="role-detail-item d-flex justify-content-between ">
                            <span className="role-detail-label">
                              Users with this role:
                            </span>
                            <span className="role-users-badge">
                              {role.usersCount}
                            </span>
                          </div>
                          <div className="role-detail-item d-flex justify-content-between">
                            <span className="role-detail-label">
                              Permissions:
                            </span>
                            <span className="role-permissions-badge">
                              {role.permissions}
                            </span>
                          </div>
                          <div className="role-detail-item d-flex justify-content-between">
                            <span className="role-detail-label">
                              Created:
                            </span>
                            <span className="role-created-date">
                              {role.created}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="role-actions">
                          <button className="btn-edit-role">
                            <AiOutlineEdit />
                            Edit Role
                          </button>
                          <button 
                            className="btn-delete-role"
                            onClick={() => {
                              setCustomerToDelete(role);
                              setShowDeleteModal(true);
                            }}
                          >
                            <FaRegTrashAlt />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </>
            )}
            </div>
          </div>
        </div>
           {/* Add New User/Role Modal */}
           {showAddAffiliateModal && (
          <div className="modal-overlay" onClick={() => {
            setShowAddAffiliateModal(false);
            setSelectedPermissions([]);
          }}>
            <div className={`${activeTab === 'Role Management' ? 'modal-content-3' : 'modal-content-2'} pt-3`} onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">{activeTab === 'User Management' ? 'Add New User' : 'Create New Role'}</h3>
                <button className="modal-close" onClick={() => {
                  setShowAddAffiliateModal(false);
                  setSelectedPermissions([]);
                }}>×</button>
              </div>
            
              {activeTab === 'User Management' ? (
                <div className="modal-body pt-0">
                  <p className='personal-name'>Personal informations</p>
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
                  <div className="">
                    <p className='personal-name pt-3 pb-2'>Role Assignment</p>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Assign Role</label>
                        <input type="tel" placeholder="Administrative" />
                      </div>
                      <div className="form-group">
                        <label>Status</label>
                        <input type="text" placeholder="Active" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="modal-body pt-0">
                  <p className='personal-name'>Role Information</p>
                  <div className="form-group pt-2">
                    <label>Role Name *</label>
                    <input type="text" placeholder="Enter role name (e.g., Content Manager)" />
                  </div>
                  
                  <p className='personal-name pt-3 pb-2'>Description</p>
                  <div className="form-group">
                    <textarea 
                      className="form-control" 
                      rows="3" 
                      placeholder="Describe the role and its responsibilities"
                      style={{ resize: 'none' }}
                    ></textarea>
                  </div>
                  
                  <p className='personal-name pt-3 pb-2'>Permissions ({selectedPermissions.length}/12 selected)</p>
                  <div className="permissions-grid">
                    {permissions.map((permission) => (
                      <div 
                        key={permission.id}
                        className={`permission-card ${selectedPermissions.includes(permission.id) ? 'selected' : ''}`}
                        onClick={() => togglePermission(permission.id)}
                      >
                        <div className="permission-icon-wrapper">
                          <RiDashboardLine className="permission-icon" />
                        </div>
                        <div className="permission-content">
                          <h5 className="permission-name">{permission.name}</h5>
                          <p className="permission-description">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="modal-footer-2">
                <button className="btn-add-booking">
                  {activeTab === 'User Management' ? '+ Add User' : '+ Add Role'}
                </button>
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
                  Are You Sure You Want Delete <br /> <span className="delete-customer-name">{customerToDelete?.name || customerToDelete?.customerName || customerToDelete?.role}</span> ?
                </p>
                <div className="delete-modal-buttons">
                  <button 
                    className="btn-delete-confirm"
                    onClick={handleDelete}
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

export default Teams
