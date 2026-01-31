import { useState, useEffect } from 'react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo (5) 1.svg';
import './Sidebar.css';
import { LuCalendarDays, LuCamera, LuLayoutDashboard, LuUsers, LuWallet } from 'react-icons/lu';
import { TbUserSquare } from 'react-icons/tb';
import { FiActivity, FiBarChart2, FiFileText, FiSettings } from 'react-icons/fi';
import { CiStar } from 'react-icons/ci';
import { RiUserAddLine } from 'react-icons/ri';
import { MdOutlineDirectionsCarFilled } from 'react-icons/md';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({
    settings: false,
    finance: false,
    revenue: false,
    'user-manage': false
  });

  const menuItems = [
    { path: '/home', icon: 'grid', label: 'Home' },
    { path: '/booking', icon: 'calendar', label: 'Booking' },
    { path: '/drivers', icon: 'driver', label: 'Drivers' },
    { path: '/affiliate', icon: 'affiliate', label: 'Affiliate' },
    { path: '/customers', icon: 'customers', label: 'Custmors' },
    { path: '/feedbacks', icon: 'star', label: 'Feedbacks' },
    { path: '/vehicles', icon: 'car', label: 'Vehciels' },
    { path: '/teams', icon: 'teams', label: 'Teams' },
    { path: '/invoices', icon: 'invoice', label: 'Invoices' },
    { path: '/mail-history', icon: 'mail', label: 'Mail History' },
  ];

  const dropdownItems = [
    { 
      key: 'user-manage', 
      icon: 'user-manage', 
      label: 'User Manage',
      position: null,
      subItems: [
        { path: '/user-manage/service', label: 'Service' },
        { path: '/user-manage/ratemanage', label: 'Rate Manage' },
        { path: '/user-manage/additional', label: 'Additional' },
        { path: '/user-manage/addrates', label: 'Add Rates' },   
      ]
    },
    { 
      key: 'settings', 
      icon: 'settings', 
      label: 'Settings',
      position: null, // Render at end
      subItems: [
        { path: '/settings/company', label: 'Company' },
        { path: '/settings/preview', label: 'Preview & Install' },
        { path: '/settings/payment-type', label: 'Payment Type' },
        { path: '/settings/discounts', label: 'Discounts' },
      ]
    },
    { 
      key: 'finance', 
      icon: 'finance', 
      label: 'Finance',
      position: null, // Render at end
      subItems: [
        { path: '/finance/transactions', label: 'Transactions' },
        { path: '/finance/reports', label: 'Reports' },
        { path: '/finance/payments', label: 'Payments' }
      ]
    },
    { 
      key: 'revenue', 
      icon: 'revenue', 
      label: 'Revenu',
      position: null, // Render at end
      subItems: [
        { path: '/revenue/revenue', label: 'revenue' },
        { path: '/revenue/payroll', label: 'Payroll' },
      ]
    },
    
  ];

  const toggleDropdown = (key, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setExpandedItems(prev => {
      const newState = {
        ...prev,
        [key]: !prev[key]
      };
      console.log(`Toggling ${key}:`, prev[key], '->', newState[key]);
      console.log('All dropdown states:', newState);
      return newState;
    });
  };

  const isActive = (path) => {
    if (path === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    if (path === '/booking') {
      return location.pathname === '/booking' || location.pathname === '/add-booking';
    }
    if (path === '/settings/company') {
      return location.pathname === '/settings/company';
    }
    if (path === '/settings/preview') {
      return location.pathname === '/settings/preview';
    }
    if (path === '/settings/payment-type') {
      return location.pathname === '/settings/payment-type';
    }
    if (path === '/settings/discounts') {
      return location.pathname === '/settings/discounts';
    }
    if (path === '/user-manage/service') {
      return location.pathname === '/user-manage/service';
    }
    if (path === '/user-manage/ratemanage') {
      return location.pathname === '/user-manage/ratemanage';
    }
    if (path === '/user-manage/additional') {
      return location.pathname === '/user-manage/additional';
    }
    if (path === '/user-manage/addrates') {
      return location.pathname === '/user-manage/addrates';
    }
    return location.pathname.startsWith(path);
  };

  const getIcon = (iconName) => {
    const icons = {
      grid: (
        <LuLayoutDashboard size={16} />
      ),
      calendar: (
        <LuCalendarDays size={16} />
      ),
      driver: (
        <TbUserSquare size={16} />
      ),
      affiliate: (
        <FiActivity size={16} />
      ),
      customers: (
        <LuUsers  size={16} />
      ),
      star: (
        <CiStar />
      ),
      'user-manage': (
        <RiUserAddLine size={16}  />
      ),
      car: (
        <MdOutlineDirectionsCarFilled size={16} />
      ),
      teams: (
        <TbUserSquare size={16} />
      ),
      invoice: (
        <FiFileText size={16} />
      ),
      mail: (
        <LuCamera size={16} />
      ),
      settings: (
        <FiSettings size={16} />
      ),
      finance: (
        <LuWallet size={16}/>
      ),
      revenue: (
        <FiBarChart2 size={16} />
      ),
    };
    return icons[iconName] || <span>{iconName}</span>;
  };

  // Auto-expand dropdown if any sub-item is active
  useEffect(() => {
    setExpandedItems(prev => {
      const newExpandedItems = { ...prev };
      dropdownItems.forEach(item => {
        const hasActiveSubItem = item.subItems.some(subItem => {
          if (subItem.path === '/home') {
            return location.pathname === '/' || location.pathname === '/home';
          }
          if (subItem.path === '/booking') {
            return location.pathname === '/booking' || location.pathname === '/add-booking';
          }
          if (subItem.path === '/settings/company') {
            return location.pathname === '/settings/company';
          }
          if (subItem.path === '/settings/preview') {
            return location.pathname === '/settings/preview';
          }
          if (subItem.path === '/settings/payment-type') {
            return location.pathname === '/settings/payment-type';
          }
          if (subItem.path === '/settings/discounts') {
            return location.pathname === '/settings/discounts';
          }
          if (subItem.path === '/user-manage/service') {
            return location.pathname === '/user-manage/service';
          }
          if (subItem.path === '/user-manage/ratemanage') {
            return location.pathname === '/user-manage/ratemanage';
          }
          if (subItem.path === '/user-manage/additional') {
            return location.pathname === '/user-manage/additional';
          }
          if (subItem.path === '/user-manage/addrates') {
            return location.pathname === '/user-manage/addrates';
          }
            return location.pathname.startsWith(subItem.path);
        });
        if (hasActiveSubItem) {
          newExpandedItems[item.key] = true;
        }
      });
      return newExpandedItems;
    });
  }, [location.pathname]);

  const handleLinkClick = () => {
    // Close sidebar on mobile/tablet when a link is clicked
    if (typeof onClose === 'function' && window.innerWidth <= 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile/tablet */}
      {isOpen !== undefined && (
        <div 
          className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
          onClick={onClose}
        />
      )}
      <div className={`sidebar ${isOpen !== undefined ? (isOpen ? 'open' : 'closed') : ''}`}>
        <div className="sidebar-header">
          <div className="logo-icon py-3 d-flex justify-content-center">
            <img src={logo} alt="IBOOK" />
          </div>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => {
            // Check if we need to insert a dropdown at this position
            const dropdownToInsert = dropdownItems.find(dd => dd.position === index);
            
            return (
              <React.Fragment key={item.path || `menu-${index}`}>
                <Link
                  to={item.path}
                  className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  <div className="sidebar-item-content">
                    <span className="sidebar-icon">{getIcon(item.icon)}</span>
                    <span className="sidebar-label">{item.label}</span>
                  </div>
                </Link>
                {dropdownToInsert && (() => {
                  const hasActiveSubItem = dropdownToInsert.subItems.some(subItem => isActive(subItem.path));
                  return (
                    <div key={dropdownToInsert.key} className="sidebar-dropdown">
                      <div
                        className={`sidebar-item ${expandedItems[dropdownToInsert.key] ? 'expanded' : ''} ${hasActiveSubItem ? 'active' : ''}`}
                        onClick={(e) => toggleDropdown(dropdownToInsert.key, e)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="sidebar-item-content">
                          <span className="sidebar-icon">{getIcon(dropdownToInsert.icon)}</span>
                          <span className="sidebar-label">{dropdownToInsert.label}</span>
                          <span className="dropdown-arrow">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </div>
                      </div>
                      {expandedItems[dropdownToInsert.key] && (
                        <div className="submenu-list">
                          {dropdownToInsert.subItems && dropdownToInsert.subItems.length > 0 ? (
                            dropdownToInsert.subItems.map((subItem) => (
                              <div key={subItem.path} className="submenu-item">
                                <Link
                                  to={subItem.path}
                                  className={`submenu-link ${isActive(subItem.path) ? 'active' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleLinkClick();
                                  }}
                                >
                                  {subItem.label}
                                </Link>
                              </div>
                            ))
                          ) : null}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </React.Fragment>
            );
          })}
        
        {dropdownItems.filter(item => item.position === null).map((item) => {
          const hasActiveSubItem = item.subItems.some(subItem => isActive(subItem.path));
          return (
          <div key={item.key} className="sidebar-dropdown">
            <div
              className={`sidebar-item ${expandedItems[item.key] ? 'expanded' : ''} ${hasActiveSubItem ? 'active' : ''}`}
              onClick={(e) => toggleDropdown(item.key, e)}
              style={{ cursor: 'pointer' }}
            >
              <div className="sidebar-item-content">
                <span className="sidebar-icon">{getIcon(item.icon)}</span>
                <span className="sidebar-label">{item.label}</span>
                <span className="dropdown-arrow">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
            {expandedItems[item.key] && (
              <div className="submenu-list">
                {item.subItems && item.subItems.length > 0 ? (
                  item.subItems.map((subItem) => (
                    <div key={subItem.path} className="submenu-item">
                      <Link
                        to={subItem.path}
                        className={`submenu-link ${isActive(subItem.path) ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLinkClick();
                        }}
                      >
                        {subItem.label}
                      </Link>
                    </div>
                  ))
                ) : null}
              </div>
            )}
          </div>
          );
        })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

