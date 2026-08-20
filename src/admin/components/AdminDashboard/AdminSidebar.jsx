import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo (5) 1.svg';
import '../../../company/components/Sidebar/Sidebar.css';
import { LuLayoutDashboard, LuUsers, LuPackage, LuWallet } from 'react-icons/lu';
import { FiSettings } from 'react-icons/fi';

const menuItems = [
  { path: '/admin', icon: 'overview', label: 'Overview', end: true },
  { path: '/admin/users', icon: 'users', label: 'Users' },
  { path: '/admin/packages', icon: 'packages', label: 'Packages' },
  { path: '/admin/transactions', icon: 'transactions', label: 'Transactions' },
  { path: '/admin/settings', icon: 'settings', label: 'Settings' },
];

function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();

  const isActive = (path, end) => {
    if (end) {
      return location.pathname === '/admin' || location.pathname === '/admin/overview';
    }
    return location.pathname.startsWith(path);
  };

  const getIcon = (iconName) => {
    const icons = {
      overview: <LuLayoutDashboard size={16} />,
      users: <LuUsers size={16} />,
      packages: <LuPackage size={16} />,
      transactions: <LuWallet size={16} />,
      settings: <FiSettings size={16} />,
    };
    return icons[iconName];
  };

  const handleLinkClick = () => {
    if (typeof onClose === 'function' && window.innerWidth <= 1024) {
      onClose();
    }
  };

  return (
    <>
      {isOpen !== undefined && (
        <div
          className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        className={`sidebar ${isOpen !== undefined ? (isOpen ? 'open' : 'closed') : ''}`}
        data-testid="admin-sidebar"
      >
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
              className={`sidebar-item ${isActive(item.path, item.end) ? 'active' : ''}`}
              data-testid={`admin-nav-${item.label.toLowerCase()}`}
              onClick={handleLinkClick}
            >
              <div className="sidebar-item-content">
                <span className="sidebar-icon">{getIcon(item.icon)}</span>
                <span className="sidebar-label">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default AdminSidebar;
