import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaBars } from 'react-icons/fa';
import { LuUsers, LuWallet, LuPackage, LuCrown, LuCircleDollarSign } from 'react-icons/lu';
import { FiPlus, FiFileText, FiDownload } from 'react-icons/fi';
import AdminSidebar from './AdminSidebar';
import profile from '../../assets/Elipse 5.svg';
import word from '../../assets/icons set.svg';
import night from '../../assets/icons set (1).svg';
import '../Dashboard/Dashboard.css';
import './AdminDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
  Tooltip,
  Legend
);

const PAGE_TITLES = {
  '/admin': 'Overview',
  '/admin/users': 'Users',
  '/admin/packages': 'Packages',
  '/admin/transactions': 'Transactions',
  '/admin/settings': 'Settings',
};

const PERIODS = ['1M', '3M', '6M', '12M'];
const POINTS_PER_WEEK = 12;
const WEEK_LABELS = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

function buildWavyGrowthSeries() {
  const labels = [];
  const data = [];

  WEEK_LABELS.forEach((week, weekIndex) => {
    for (let i = 0; i < POINTS_PER_WEEK; i += 1) {
      const isWeekLabel = i === POINTS_PER_WEEK - 1;
      labels.push(isWeekLabel ? week : '');

      const progress = weekIndex + i / POINTS_PER_WEEK;
      const trend = 940 - progress * 42;
      const scallop = Math.sin(i * 1.35) * 22;
      const ripple = Math.sin((weekIndex * POINTS_PER_WEEK + i) * 0.65) * 8;
      data.push(Math.round(trend + scallop + ripple));
    }
  });

  return { labels, data };
}

function AdminOverviewPage() {
  const [period, setPeriod] = useState('1M');
  const wavySeries = buildWavyGrowthSeries();

  const lineData = {
    labels: wavySeries.labels,
    datasets: [
      {
        label: 'Subscriptions',
        data: wavySeries.data,
        borderColor: '#0c4a6e',
        backgroundColor: 'rgba(186, 212, 255, 0.55)',
        fill: true,
        tension: 0,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1000,
        ticks: {
          stepSize: 200,
          callback: (value) => (value === 1000 ? '1k$' : `${value}$`),
          font: { family: 'Poppins', size: 11 },
          color: '#9ca3af',
        },
        grid: { color: '#e5e7eb', drawBorder: false },
        border: { display: false },
      },
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          font: { family: 'Poppins', size: 11 },
          color: '#9ca3af',
          callback: (_, index) => wavySeries.labels[index] || '',
        },
        grid: {
          display: true,
          color: (ctx) => {
            const label = wavySeries.labels[ctx.index];
            return label ? '#e5e7eb' : 'transparent';
          },
          drawOnChartArea: true,
        },
        border: { display: false },
      },
    },
  };

  const pieData = {
    labels: ['Basic Plan', 'Premium Plan', 'Enterprise Plan'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ['#2563eb', '#000e33', '#a8c8f0'],
        borderWidth: 3,
        borderColor: '#ffffff',
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
    },
  };

  const legendItems = [
    { label: 'Basic Plan', amount: '$380,450', pct: '45%', color: '#2563eb' },
    { label: 'Premium Plan', amount: '$296,650', pct: '35%', color: '#000e33' },
    { label: 'Enterprise Plan', amount: '$170,190', pct: '20%', color: '#a8c8f0' },
  ];

  return (
    <div data-testid="admin-overview">
      <div className="admin-quick-actions-panel summary-card" data-testid="admin-quick-actions">
        <h2 className="admin-quick-actions-title">Quick Actions</h2>
        <div className="admin-quick-actions-grid">
          <button type="button" className="admin-quick-card dark" data-testid="quick-add-plan">
            <div className="admin-quick-card-inner">
              <div className="admin-quick-icon">
                <FiPlus size={20} />
              </div>
              <div className="admin-quick-text">
                <h3>Add New Plan</h3>
                <p>Create a new subscription plan</p>
              </div>
            </div>
          </button>
          <button type="button" className="admin-quick-card mid" data-testid="quick-transactions">
            <div className="admin-quick-card-inner">
              <div className="admin-quick-icon">
                <FiFileText size={20} />
              </div>
              <div className="admin-quick-text">
                <h3>View Transactions</h3>
                <p>Review all payment transactions</p>
              </div>
            </div>
          </button>
          <button type="button" className="admin-quick-card light" data-testid="quick-export">
            <div className="admin-quick-card-inner">
              <div className="admin-quick-icon">
                <FiDownload size={20} />
              </div>
              <div className="admin-quick-text">
                <h3>Export Report</h3>
                <p>Download analytics report</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-4 mb-4 mb-lg-0">
          <div className="summary-card admin-stat-card" data-testid="stat-users">
            <div className="admin-stat-head">
              <div className="icon-book">
                <LuUsers size={22} color="#000E33" />
              </div>
              <span className="admin-growth-badge">+12.5%</span>
            </div>
            <h4>Total Users</h4>
            <h3>15,847</h3>
            <ul className="admin-stat-breakdown">
              <li>
                <span>Active Users</span>
                <span>12,340</span>
              </li>
              <li>
                <span>Inactive Users</span>
                <span>2,507</span>
              </li>
              <li>
                <span>Trial Users</span>
                <span>1,000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-lg-4 mb-4 mb-lg-0">
          <div className="summary-card admin-stat-card" data-testid="stat-revenue">
            <div className="admin-stat-head">
              <div className="icon-book">
                <LuCircleDollarSign size={22} color="#000E33" />
              </div>
              <span className="admin-growth-badge">+18.2%</span>
            </div>
            <h4>Total Revenue</h4>
            <h3>$847,290</h3>
            <ul className="admin-stat-breakdown">
              <li>
                <span>This Month</span>
                <span>$125,430</span>
              </li>
              <li>
                <span>Last Month</span>
                <span>$106,200</span>
              </li>
              <li>
                <span>Growth</span>
                <span>18.2%</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="summary-card admin-stat-card" data-testid="stat-subscriptions">
            <div className="admin-stat-head">
              <div className="icon-book">
                <LuCrown size={22} color="#000E33" />
              </div>
              <span className="admin-growth-badge">+8.7%</span>
            </div>
            <h4>Subscriptions by Plan</h4>
            <h3>8,945</h3>
            <ul className="admin-stat-breakdown">
              <li>
                <span>Basic Plan</span>
                <span>4,023</span>
              </li>
              <li>
                <span>Premium Plan</span>
                <span>3,124</span>
              </li>
              <li>
                <span>Enterprise Plan</span>
                <span>1,906</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-7 mb-4 mb-xl-0">
          <div className="summary-card admin-chart-card" data-testid="chart-growth">
            <div className="admin-chart-header">
              <h2 className="admin-chart-title">Subscription Growth</h2>
              <div className="admin-period-tabs">
                {PERIODS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`admin-period-tab ${period === p ? 'active' : ''}`}
                    data-testid={`period-${p}`}
                    onClick={() => setPeriod(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="admin-chart-wrap">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>

        <div className="col-xl-5">
          <div className="summary-card admin-chart-card" data-testid="chart-revenue-breakdown">
            <div className="admin-chart-header">
              <h2 className="admin-chart-title">Revenue Breakdown</h2>
            </div>
            <div className="admin-pie-stack">
              <div className="admin-pie-chart-wrap">
                <Pie data={pieData} options={pieOptions} />
              </div>
              <div className="admin-pie-legend">
                {legendItems.map((item) => (
                  <div key={item.label} className="admin-pie-legend-item">
                    <div className="admin-pie-legend-left">
                      <span className="admin-pie-dot" style={{ background: item.color }} />
                      <span className="admin-pie-plan-name">{item.label}</span>
                    </div>
                    <div className="admin-pie-legend-right">
                      <div className="admin-pie-amount">{item.amount}</div>
                      <div className="admin-pie-pct">{item.pct}</div>
                    </div>
                  </div>
                ))}
                <div className="admin-pie-total">
                  <span className="admin-pie-total-label">Total Revenue</span>
                  <div className="admin-pie-legend-right">
                    <div className="admin-pie-total-amount">$170,190</div>
                    <div className="admin-pie-pct">20%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminPlaceholderPage({ title }) {
  return (
    <div data-testid={`admin-page-${title.toLowerCase()}`}>
      <div className="admin-placeholder-page">
        <p>{title} section — content coming soon.</p>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] || 'Overview';

  return (
    <div className="app-container" data-testid="admin-shell">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content admin-main-surface">
        <div className="container-fluid p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                className="menu-toggle-btn"
                data-testid="admin-menu-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
              <h2 className="dashboard-title">{pageTitle}</h2>
            </div>
            <div
              className="profile d-flex align-items-center justify-content-center"
              data-testid="admin-profile-pill"
            >
              <img src={profile} alt="profile" className="profile-img me-3" />
              <img src={word} className="me-2" alt="language" />
              <img src={night} alt="theme" />
            </div>
          </div>

          <Routes>
            <Route index element={<AdminOverviewPage />} />
            <Route path="users" element={<AdminPlaceholderPage title="Users" />} />
            <Route path="packages" element={<AdminPlaceholderPage title="Packages" />} />
            <Route path="transactions" element={<AdminPlaceholderPage title="Transactions" />} />
            <Route path="settings" element={<AdminPlaceholderPage title="Settings" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
