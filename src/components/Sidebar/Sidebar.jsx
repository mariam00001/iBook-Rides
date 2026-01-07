import { useState } from 'react';
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
    revenue: false
  });

  const menuItems = [
    { path: '/home', icon: 'grid', label: 'Home' },
    { path: '/booking', icon: 'calendar', label: 'Booking' },
    { path: '/drivers', icon: 'driver', label: 'Drivers' },
    { path: '/affiliate', icon: 'affiliate', label: 'Affiliate' },
    { path: '/customers', icon: 'customers', label: 'Custmors' },
    { path: '/feedbacks', icon: 'star', label: 'Feedbacks' },
    { path: '/user-manage', icon: 'user-manage', label: 'User Manage' },
    { path: '/vehicles', icon: 'car', label: 'Vehciels' },
    { path: '/teams', icon: 'teams', label: 'Teams' },
    { path: '/invoices', icon: 'invoice', label: 'Invoices' },
    { path: '/mail-history', icon: 'mail', label: 'Mail History' },
  ];

  const dropdownItems = [
    { 
      key: 'settings', 
      icon: 'settings', 
      label: 'Settings',
      subItems: [
        { path: '/settings/suppliers', label: 'Suppliers' },
        { path: '/settings/suppliers-2', label: 'Suppliers' },
        { path: '/settings/suppliers-3', label: 'Suppliers' },
        { path: '/settings/suppliers-4', label: 'Suppliers' }
      ]
    },
    { 
      key: 'finance', 
      icon: 'finance', 
      label: 'Finance',
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
      subItems: [
        { path: '/revenue/overview', label: 'Overview' },
        { path: '/revenue/analytics', label: 'Analytics' },
        { path: '/revenue/forecast', label: 'Forecast' }
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
      console.log('Dropdown state:', newState);
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
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <div className="sidebar-item-content">
                <span className="sidebar-icon">{getIcon(item.icon)}</span>
                <span className="sidebar-label">{item.label}</span>
              </div>
            </Link>
          ))}
        
        {dropdownItems.map((item) => (
          <div key={item.key} className="sidebar-dropdown">
            <div
              className={`sidebar-item ${expandedItems[item.key] ? 'expanded' : ''}`}
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
              <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className="dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLinkClick();
                    }}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

