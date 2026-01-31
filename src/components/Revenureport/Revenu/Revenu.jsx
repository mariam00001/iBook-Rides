import { useState } from 'react';
import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import profile from '../../../assets/Elipse 5.svg';
import word from '../../../assets/icons set.svg';
import night from '../../../assets/icons set (1).svg';
import { FaBars, FaSearch, FaRegCalendar } from 'react-icons/fa';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Revenu.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Revenu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Vehciles');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filterValue, setFilterValue] = useState('Sedan');
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);

  // Revenue table data for Vehicles/Custmors
  const revenueData = [
    {
      id: 1,
      vehicleName: 'Sedan',
      charges: '0.0',
      gratuity: '0.0',
      tax: '0.0',
      discount: '0.0',
      total: '0.0'
    },
    {
      id: 2,
      vehicleName: 'Sedan',
      charges: '0.0',
      gratuity: '0.0',
      tax: '0.0',
      discount: '0.0',
      total: '0.0'
    }
  ];

  // Revenue table data for Drivers
  const driversRevenueData = [
    {
      id: 1,
      trips: '0.0',
      gratuity: '0.0',
      invoiced: '0.0',
      tax: '0.0',
      notInvoiced: '0.0',
      nonePaidRuns: '0.0'
    },
    {
      id: 2,
      trips: '0.0',
      gratuity: '0.0',
      invoiced: '0.0',
      tax: '0.0',
      notInvoiced: '0.0',
      nonePaidRuns: '0.0'
    },
    {
      id: 3,
      trips: '0.0',
      gratuity: '0.0',
      invoiced: '0.0',
      tax: '0.0',
      notInvoiced: '0.0',
      nonePaidRuns: '0.0'
    }
  ];

  const toggleTableCollapse = () => {
    setIsTableCollapsed(prev => !prev);
  };

  const handleSearch = () => {
    console.log('Searching with:', { fromDate, toDate, filterValue });
  };

  // Chart data for Vehicles (months)
  const chartDataVehicles = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Revenue',
        data: [2.5, 1.5, 6.2, 3.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5],
        backgroundColor: '#000E33',
        borderRadius: 4,
        barThickness: 34,
      },
    ],
  };

  // Chart data for Driver/Custmors (days of week)
  const chartDataDays = {
    labels: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Revenue',
        data: [2.5, 1.5, 6, 4, 4.5, 4.5, 4.5],
        backgroundColor: '#000E33',
        borderRadius: 4,
        barThickness: 34,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 8,
        ticks: {
          stepSize: 2,
          callback: function(value) {
            return value + 'K';
          },
          font: {
            family: 'Poppins',
            size: 12,
          },
          color: '#6B7280',
        },
        grid: {
          color: '#E5E7EB',
        },
      },
      x: {
        ticks: {
          font: {
            family: 'Poppins',
            size: 10,
          },
          color: '#6B7280',
        },
        grid: {
          display: false,
        },
      },
    },
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
            <div className="profile d-flex align-items-center justify-content-center">
              <img src={profile} alt="profile" className="profile-img me-3" />
              <img src={word} className="me-2" alt="word" />
              <img src={night} alt="night" />
            </div>
          </div>

          {/* Filter Section */}
          <div className="revenue-filter-section border p-3 mb-4">
            <div className="row g-3 align-items-end">
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
              <div className="col-md-3">
                <label className="revenue-label">Filters</label>
                <div className="revenue-input-group">
                  <select
                    className="revenue-input"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                  </select>
                  <span className="revenue-input-icon">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
             
            </div>
            <div className=" d-flex justify-content-end align-items-center">
                <button className="btn-add-booking " onClick={handleSearch}>
                  <FaSearch className="me-2" />
                  Search
                </button>
              </div>
          </div>

          {/* Navigation Tabs */}
          <div className="revenue-tabs-section mb-4 d-flex justify-content-end align-items-center">
            <div className="affiliate-tabs">
              <button
                className={`affiliate-tab ${activeTab === 'Vehciles' ? 'active' : ''}`}
                onClick={() => setActiveTab('Vehciles')}
              >
                Vehciles
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Drivers' ? 'active' : ''}`}
                onClick={() => setActiveTab('Drivers')}
              >
                Drivers
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Custmors' ? 'active' : ''}`}
                onClick={() => setActiveTab('Custmors')}
              >
                Custmors
              </button>
            </div>
          </div>

           {/* Chart and Table Section */}
           <div className="revenue-content-section border p-4">
             {activeTab === 'Custmors' ? (
               <>
                 {/* Two Charts Side by Side for Custmors */}
                 <div className="row mb-4">
                   <div className="col-md-6">
                     <div className="revenue-chart-section">
                       <h3 className="revenue-chart-title">Revenu by Driver</h3>
                       <div className="revenue-chart-wrapper">
                         <Bar data={chartDataDays} options={chartOptions} />
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="revenue-chart-section">
                       <h3 className="revenue-chart-title">Revenu by Vehciles</h3>
                       <div className="revenue-chart-wrapper">
                         <Bar data={chartDataDays} options={chartOptions} />
                       </div>
                     </div>
                   </div>
                 </div>
                 {/* Revenue Table for Custmors */}
                 <div className="revenue-table-section">
                   <table className="affiliate-table">
                     <thead>
                       <tr>
                         <th>
                           <div className="th-content">
                             Vehicle Name
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
                             CHARGES
                             <div className="sort-icons d-flex align-items-center clickable-sort"
                               onClick={toggleTableCollapse}
                               style={{ cursor: 'pointer' }}>
                               <RiArrowUpDownLine />
                             </div>
                           </div>
                         </th>
                         <th>gRUTITY</th>
                         <th>tax</th>
                         <th>Discount</th>
                         <th>Total</th>
                       </tr>
                     </thead>
                     <tbody className={isTableCollapsed ? 'collapsed' : ''}>
                       {revenueData.map((row) => (
                         <tr key={row.id}>
                           <td className="customer-date pb-5 pt-5">{row.vehicleName}</td>
                           <td className="customer-date pb-5 pt-5">{row.charges}</td>
                           <td className="customer-date pb-5 pt-5">{row.gratuity}</td>
                           <td className="customer-date pb-5 pt-5">{row.tax}</td>
                           <td className="customer-date pb-5 pt-5">{row.discount}</td>
                           <td className="customer-date pb-5 pt-5">{row.total}</td>
                         </tr>
                       ))}
                       <tr className="revenue-total-row">
                         <td className="customer-date pb-5 pt-5">TOTAL</td>
                         <td className="customer-date pb-5 pt-5">0.0</td>
                         <td className="customer-date pb-5 pt-5">0.0</td>
                         <td className="customer-date pb-5 pt-5">0.0</td>
                         <td className="customer-date pb-5 pt-5">0.0</td>
                         <td className="customer-date pb-5 pt-5">0.0</td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </>
             ) : (
               <>
                 {/* Single Chart for Vehicles/Drivers */}
                 <div className="revenue-chart-section mb-4">
                   <h3 className="revenue-chart-title">Revenu by Vehicles</h3>
                   <div className="revenue-chart-wrapper">
                     <Bar data={chartDataVehicles} options={chartOptions} />
                   </div>
                 </div>

                 {/* Revenue Table - Different for Drivers vs Vehicles */}
                 {activeTab === 'Drivers' ? (
                   <div className="revenue-table-section">
                     <table className="affiliate-table">
                       <thead>
                         <tr>
                           <th>
                             <div className="th-content">
                               TRIPS
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
                               GRATUITY
                               <div className="sort-icons d-flex align-items-center clickable-sort"
                                 onClick={toggleTableCollapse}
                                 style={{ cursor: 'pointer' }}>
                                 <RiArrowUpDownLine />
                               </div>
                             </div>
                           </th>
                           <th>INVOICED</th>
                           <th>TAX</th>
                           <th>NOT INVOICED</th>
                           <th>NONE PAID RUNS</th>
                         </tr>
                       </thead>
                       <tbody className={isTableCollapsed ? 'collapsed' : ''}>
                         {driversRevenueData.map((row) => (
                           <tr key={row.id}>
                             <td className="customer-date pb-5 pt-5">{row.trips}</td>
                             <td className="customer-date pb-5 pt-5">{row.gratuity}</td>
                             <td className="customer-date pb-5 pt-5">{row.invoiced}</td>
                             <td className="customer-date pb-5 pt-5">{row.tax}</td>
                             <td className="customer-date pb-5 pt-5">{row.notInvoiced}</td>
                             <td className="customer-date pb-5 pt-5">{row.nonePaidRuns}</td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 ) : (
                   <div className="revenue-table-section">
                     <table className="affiliate-table">
                       <thead>
                         <tr>
                           <th>
                             <div className="th-content">
                               Vehicle Name
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
                               CHARGES
                               <div className="sort-icons d-flex align-items-center clickable-sort"
                                 onClick={toggleTableCollapse}
                                 style={{ cursor: 'pointer' }}>
                                 <RiArrowUpDownLine />
                               </div>
                             </div>
                           </th>
                           <th>gRUTITY</th>
                           <th>tax</th>
                           <th>Discount</th>
                           <th>Total</th>
                         </tr>
                       </thead>
                       <tbody className={isTableCollapsed ? 'collapsed' : ''}>
                         {revenueData.map((row) => (
                           <tr key={row.id}>
                             <td className="customer-date pb-5 pt-5">{row.vehicleName}</td>
                             <td className="customer-date pb-5 pt-5">{row.charges}</td>
                             <td className="customer-date pb-5 pt-5">{row.gratuity}</td>
                             <td className="customer-date pb-5 pt-5">{row.tax}</td>
                             <td className="customer-date pb-5 pt-5">{row.discount}</td>
                             <td className="customer-date pb-5 pt-5">{row.total}</td>
                           </tr>
                         ))}
                         <tr className="revenue-total-row">
                           <td className="customer-date pb-5 pt-5">TOTAL</td>
                           <td className="customer-date pb-5 pt-5">0.0</td>
                           <td className="customer-date pb-5 pt-5">0.0</td>
                           <td className="customer-date pb-5 pt-5">0.0</td>
                           <td className="customer-date pb-5 pt-5">0.0</td>
                           <td className="customer-date pb-5 pt-5">0.0</td>
                         </tr>
                       </tbody>
                     </table>
                   </div>
                 )}
               </>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Revenu;
