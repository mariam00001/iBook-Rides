import { useState } from 'react';
import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import profile from '../../../../assets/Elipse 5.svg';
import word from '../../../../assets/icons set.svg';
import night from '../../../../assets/icons set (1).svg';
import { FaBars, FaPlus, FaRegTrashAlt, FaSearch } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import '../../Custmors/Custmors.css';
import '../../../setting/payment-type/Payment-type.css';
import '../../Affilate/Affilate.css';
import './Ratemanage.css';

const Ratemanage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Distance Rate');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({ 1: true }); // Sedan expanded by default
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rateToDelete, setRateToDelete] = useState(null);

  // Distance Rate states
  const [distanceCategoriesSearchTerm, setDistanceCategoriesSearchTerm] = useState('');
  const [distanceCategoriesCurrentPage, setDistanceCategoriesCurrentPage] = useState(1);
  const [distanceCategoriesEntriesPerPage] = useState(5);
  const [distanceRatesSearchTerm, setDistanceRatesSearchTerm] = useState('');
  const [distanceRatesCurrentPage, setDistanceRatesCurrentPage] = useState(1);
  const [distanceRatesEntriesPerPage] = useState(5);
  const [showAddDistanceModal, setShowAddDistanceModal] = useState(false);
  const [showDeleteDistanceModal, setShowDeleteDistanceModal] = useState(false);
  const [distanceRateToDelete, setDistanceRateToDelete] = useState(null);

  // Hourly Rate states
  const [hourlyCategoriesSearchTerm, setHourlyCategoriesSearchTerm] = useState('');
  const [hourlyCategoriesCurrentPage, setHourlyCategoriesCurrentPage] = useState(1);
  const [hourlyCategoriesEntriesPerPage] = useState(5);
  const [hourlyRatesSearchTerm, setHourlyRatesSearchTerm] = useState('');
  const [hourlyRatesCurrentPage, setHourlyRatesCurrentPage] = useState(1);
  const [hourlyRatesEntriesPerPage] = useState(5);
  const [showAddServicesModal, setShowAddServicesModal] = useState(false);
  const [showDeleteHourlyRateModal, setShowDeleteHourlyRateModal] = useState(false);
  const [hourlyRateToDelete, setHourlyRateToDelete] = useState(null);

  // Peak Hours states
  const [peakHoursSearchTerm, setPeakHoursSearchTerm] = useState('');
  const [peakHoursCurrentPage, setPeakHoursCurrentPage] = useState(1);
  const [peakHoursEntriesPerPage] = useState(8);
  const [showAddPeakHoursModal, setShowAddPeakHoursModal] = useState(false);
  const [showDeletePeakHoursModal, setShowDeletePeakHoursModal] = useState(false);
  const [peakHoursToDelete, setPeakHoursToDelete] = useState(null);
  const [isPeakHoursTableCollapsed, setIsPeakHoursTableCollapsed] = useState(false);

  // Zone to Zone states
  const [zoneToZoneCategoriesSearchTerm, setZoneToZoneCategoriesSearchTerm] = useState('');
  const [zoneToZoneCategoriesCurrentPage, setZoneToZoneCategoriesCurrentPage] = useState(1);
  const [zoneToZoneCategoriesEntriesPerPage] = useState(5);
  const [zoneToZoneRatesSearchTerm, setZoneToZoneRatesSearchTerm] = useState('');
  const [zoneToZoneRatesCurrentPage, setZoneToZoneRatesCurrentPage] = useState(1);
  const [zoneToZoneRatesEntriesPerPage] = useState(5);
  const [showAddZoneToZoneModal, setShowAddZoneToZoneModal] = useState(false);
  const [showDeleteZoneToZoneModal, setShowDeleteZoneToZoneModal] = useState(false);
  const [zoneToZoneRateToDelete, setZoneToZoneRateToDelete] = useState(null);

  // Categories data (old, keeping for backward compatibility)
  const categories = [
    {
      id: 1,
      sl: 1,
      category: 'Sedan',
      rates: [
        {
          id: 1,
          service: 'To Airport',
          fromDistance: '0',
          toDistance: '15',
          cost: '56',
          costPerDistance: '2'
        },
        {
          id: 2,
          service: 'To Airport',
          fromDistance: '0',
          toDistance: '15',
          cost: '56',
          costPerDistance: '2'
        }
      ]
    },
    {
      id: 2,
      sl: 2,
      category: 'SUV',
      rates: [
        {
          id: 1,
          service: 'To Airport',
          fromDistance: '0',
          toDistance: '15',
          cost: '56',
          costPerDistance: '2'
        }
      ]
    }
  ];

  // Distance Rate Categories data
  const distanceCategories = [
    {
      id: 1,
      sl: 1,
      category: 'Sedan'
    },
    {
      id: 2,
      sl: 2,
      category: 'SUV'
    }
  ];

  // Distance Rates data
  const distanceRates = [
    {
      id: 1,
      number: 1,
      service: 'To Airport',
      fromDistance: '0',
      toDistance: '15',
      cost: '56',
      costPerDistance: '2'
    },
    {
      id: 2,
      number: 1,
      service: 'To Airport',
      fromDistance: '0',
      toDistance: '15',
      cost: '56',
      costPerDistance: '2'
    }
  ];

  // Hourly Rate Categories data
  const hourlyCategories = [
    {
      id: 1,
      sl: 1,
      category: 'Sedan'
    },
    {
      id: 2,
      sl: 2,
      category: 'SUV'
    }
  ];

  // Hourly Rates data
  const hourlyRates = [
    {
      id: 1,
      number: 1,
      service: 'Hourly',
      fromHours: '1',
      toHours: '75',
      hourlyRate: '2'
    },
    {
      id: 2,
      number: 1,
      service: 'Hourly',
      fromHours: '1',
      toHours: '75',
      hourlyRate: '2'
    }
  ];

  // Peak Hours data
  const peakHours = [
    {
      id: 1,
      serviceName: 'To Airport',
      serviceType: 'To Airport',
      calculationType: 'Distance Based',
      onlineVisible: 'YES',
      ordering: '1',
      description: '---',
      status: 'ACTIVE'
    },
    {
      id: 2,
      serviceName: 'From Airport',
      serviceType: 'From Airport',
      calculationType: 'Distance Based',
      onlineVisible: 'YES',
      ordering: '2',
      description: '---',
      status: 'ACTIVE'
    },
    {
      id: 3,
      serviceName: 'Point To Point',
      serviceType: 'Point To Point',
      calculationType: 'Distance Based',
      onlineVisible: 'YES',
      ordering: '3',
      description: '---',
      status: 'ACTIVE'
    },
    {
      id: 4,
      serviceName: 'Hourly',
      serviceType: 'Hourly',
      calculationType: 'Distance Based',
      onlineVisible: 'YES',
      ordering: '4',
      description: '---',
      status: 'ACTIVE'
    },
    {
      id: 5,
      serviceName: 'Zone To Zone',
      serviceType: 'Zone To Zone',
      calculationType: 'Flat Rate',
      onlineVisible: 'YES',
      ordering: '5',
      description: '---',
      status: 'ACTIVE'
    }
  ];

  // Zone to Zone Categories data
  const zoneToZoneCategories = [
    {
      id: 1,
      sl: 1,
      category: 'Sedan'
    },
    {
      id: 2,
      sl: 2,
      category: 'SUV'
    }
  ];

  // Zone to Zone Rates data
  const zoneToZoneRates = [
    {
      id: 1,
      number: 1,
      service: 'Zone To Zone',
      fromHours: '1',
      toHours: '75',
      hourlyRate: '2'
    },
    {
      id: 2,
      number: 1,
      service: 'Zone To Zone',
      fromHours: '1',
      toHours: '75',
      hourlyRate: '2'
    }
  ];

  // Filter categories by search term
  const searchFilteredCategories = categories.filter(category =>
    category.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleDeleteRate = () => {
    if (rateToDelete) {
      console.log('Deleting rate:', rateToDelete);
      setShowDeleteModal(false);
      setRateToDelete(null);
    }
  };

  // Filter distance categories by search term
  const searchFilteredDistanceCategories = distanceCategories.filter(category =>
    category.category.toLowerCase().includes(distanceCategoriesSearchTerm.toLowerCase())
  );

  // Filter distance rates by search term
  const searchFilteredDistanceRates = distanceRates.filter(rate =>
    rate.service.toLowerCase().includes(distanceRatesSearchTerm.toLowerCase()) ||
    rate.fromDistance.toLowerCase().includes(distanceRatesSearchTerm.toLowerCase()) ||
    rate.toDistance.toLowerCase().includes(distanceRatesSearchTerm.toLowerCase()) ||
    rate.cost.toLowerCase().includes(distanceRatesSearchTerm.toLowerCase()) ||
    rate.costPerDistance.toLowerCase().includes(distanceRatesSearchTerm.toLowerCase())
  );

  // Distance Categories pagination logic
  const distanceCategoriesTotalPages = Math.ceil(searchFilteredDistanceCategories.length / distanceCategoriesEntriesPerPage);
  const distanceCategoriesIndexOfLastEntry = distanceCategoriesCurrentPage * distanceCategoriesEntriesPerPage;
  const distanceCategoriesIndexOfFirstEntry = distanceCategoriesIndexOfLastEntry - distanceCategoriesEntriesPerPage;
  const currentDistanceCategories = searchFilteredDistanceCategories.slice(distanceCategoriesIndexOfFirstEntry, distanceCategoriesIndexOfLastEntry);

  const handleDistanceCategoriesPageChange = (page) => {
    setDistanceCategoriesCurrentPage(page);
  };

  const handleDistanceCategoriesPrevious = () => {
    if (distanceCategoriesCurrentPage > 1) {
      setDistanceCategoriesCurrentPage(distanceCategoriesCurrentPage - 1);
    }
  };

  const handleDistanceCategoriesNext = () => {
    if (distanceCategoriesCurrentPage < distanceCategoriesTotalPages) {
      setDistanceCategoriesCurrentPage(distanceCategoriesCurrentPage + 1);
    }
  };

  // Distance Rates pagination logic
  const distanceRatesTotalPages = Math.ceil(searchFilteredDistanceRates.length / distanceRatesEntriesPerPage);
  const distanceRatesIndexOfLastEntry = distanceRatesCurrentPage * distanceRatesEntriesPerPage;
  const distanceRatesIndexOfFirstEntry = distanceRatesIndexOfLastEntry - distanceRatesEntriesPerPage;
  const currentDistanceRates = searchFilteredDistanceRates.slice(distanceRatesIndexOfFirstEntry, distanceRatesIndexOfLastEntry);

  const handleDistanceRatesPageChange = (page) => {
    setDistanceRatesCurrentPage(page);
  };

  const handleDistanceRatesPrevious = () => {
    if (distanceRatesCurrentPage > 1) {
      setDistanceRatesCurrentPage(distanceRatesCurrentPage - 1);
    }
  };

  const handleDistanceRatesNext = () => {
    if (distanceRatesCurrentPage < distanceRatesTotalPages) {
      setDistanceRatesCurrentPage(distanceRatesCurrentPage + 1);
    }
  };

  const handleDeleteDistanceRate = () => {
    if (distanceRateToDelete) {
      console.log('Deleting distance rate:', distanceRateToDelete);
      setShowDeleteDistanceModal(false);
      setDistanceRateToDelete(null);
    }
  };

  // Filter hourly categories by search term
  const searchFilteredHourlyCategories = hourlyCategories.filter(category =>
    category.category.toLowerCase().includes(hourlyCategoriesSearchTerm.toLowerCase())
  );

  // Filter hourly rates by search term
  const searchFilteredHourlyRates = hourlyRates.filter(rate =>
    rate.service.toLowerCase().includes(hourlyRatesSearchTerm.toLowerCase()) ||
    rate.fromHours.toLowerCase().includes(hourlyRatesSearchTerm.toLowerCase()) ||
    rate.toHours.toLowerCase().includes(hourlyRatesSearchTerm.toLowerCase()) ||
    rate.hourlyRate.toLowerCase().includes(hourlyRatesSearchTerm.toLowerCase())
  );

  // Hourly Categories pagination logic
  const hourlyCategoriesTotalPages = Math.ceil(searchFilteredHourlyCategories.length / hourlyCategoriesEntriesPerPage);
  const hourlyCategoriesIndexOfLastEntry = hourlyCategoriesCurrentPage * hourlyCategoriesEntriesPerPage;
  const hourlyCategoriesIndexOfFirstEntry = hourlyCategoriesIndexOfLastEntry - hourlyCategoriesEntriesPerPage;
  const currentHourlyCategories = searchFilteredHourlyCategories.slice(hourlyCategoriesIndexOfFirstEntry, hourlyCategoriesIndexOfLastEntry);

  const handleHourlyCategoriesPageChange = (page) => {
    setHourlyCategoriesCurrentPage(page);
  };

  const handleHourlyCategoriesPrevious = () => {
    if (hourlyCategoriesCurrentPage > 1) {
      setHourlyCategoriesCurrentPage(hourlyCategoriesCurrentPage - 1);
    }
  };

  const handleHourlyCategoriesNext = () => {
    if (hourlyCategoriesCurrentPage < hourlyCategoriesTotalPages) {
      setHourlyCategoriesCurrentPage(hourlyCategoriesCurrentPage + 1);
    }
  };

  // Hourly Rates pagination logic
  const hourlyRatesTotalPages = Math.ceil(searchFilteredHourlyRates.length / hourlyRatesEntriesPerPage);
  const hourlyRatesIndexOfLastEntry = hourlyRatesCurrentPage * hourlyRatesEntriesPerPage;
  const hourlyRatesIndexOfFirstEntry = hourlyRatesIndexOfLastEntry - hourlyRatesEntriesPerPage;
  const currentHourlyRates = searchFilteredHourlyRates.slice(hourlyRatesIndexOfFirstEntry, hourlyRatesIndexOfLastEntry);

  const handleHourlyRatesPageChange = (page) => {
    setHourlyRatesCurrentPage(page);
  };

  const handleHourlyRatesPrevious = () => {
    if (hourlyRatesCurrentPage > 1) {
      setHourlyRatesCurrentPage(hourlyRatesCurrentPage - 1);
    }
  };

  const handleHourlyRatesNext = () => {
    if (hourlyRatesCurrentPage < hourlyRatesTotalPages) {
      setHourlyRatesCurrentPage(hourlyRatesCurrentPage + 1);
    }
  };

  const handleDeleteHourlyRate = () => {
    if (hourlyRateToDelete) {
      console.log('Deleting hourly rate:', hourlyRateToDelete);
      setShowDeleteHourlyRateModal(false);
      setHourlyRateToDelete(null);
    }
  };

  // Filter peak hours by search term
  const searchFilteredPeakHours = peakHours.filter(peakHour =>
    peakHour.serviceName.toLowerCase().includes(peakHoursSearchTerm.toLowerCase()) ||
    peakHour.serviceType.toLowerCase().includes(peakHoursSearchTerm.toLowerCase()) ||
    peakHour.description.toLowerCase().includes(peakHoursSearchTerm.toLowerCase())
  );

  // Peak Hours pagination logic
  const peakHoursTotalPages = Math.ceil(searchFilteredPeakHours.length / peakHoursEntriesPerPage);
  const peakHoursIndexOfLastEntry = peakHoursCurrentPage * peakHoursEntriesPerPage;
  const peakHoursIndexOfFirstEntry = peakHoursIndexOfLastEntry - peakHoursEntriesPerPage;
  const currentPeakHours = searchFilteredPeakHours.slice(peakHoursIndexOfFirstEntry, peakHoursIndexOfLastEntry);

  const handlePeakHoursPageChange = (page) => {
    setPeakHoursCurrentPage(page);
  };

  const handlePeakHoursPrevious = () => {
    if (peakHoursCurrentPage > 1) {
      setPeakHoursCurrentPage(peakHoursCurrentPage - 1);
    }
  };

  const handlePeakHoursNext = () => {
    if (peakHoursCurrentPage < peakHoursTotalPages) {
      setPeakHoursCurrentPage(peakHoursCurrentPage + 1);
    }
  };

  const togglePeakHoursTableCollapse = () => {
    setIsPeakHoursTableCollapsed(prev => !prev);
  };

  const handleDeletePeakHours = () => {
    if (peakHoursToDelete) {
      console.log('Deleting peak hours:', peakHoursToDelete);
      setShowDeletePeakHoursModal(false);
      setPeakHoursToDelete(null);
    }
  };

  // Filter zone to zone categories by search term
  const searchFilteredZoneToZoneCategories = zoneToZoneCategories.filter(category =>
    category.category.toLowerCase().includes(zoneToZoneCategoriesSearchTerm.toLowerCase())
  );

  // Filter zone to zone rates by search term
  const searchFilteredZoneToZoneRates = zoneToZoneRates.filter(rate =>
    rate.service.toLowerCase().includes(zoneToZoneRatesSearchTerm.toLowerCase()) ||
    rate.fromHours.toLowerCase().includes(zoneToZoneRatesSearchTerm.toLowerCase()) ||
    rate.toHours.toLowerCase().includes(zoneToZoneRatesSearchTerm.toLowerCase()) ||
    rate.hourlyRate.toLowerCase().includes(zoneToZoneRatesSearchTerm.toLowerCase())
  );

  // Zone to Zone Categories pagination logic
  const zoneToZoneCategoriesTotalPages = Math.ceil(searchFilteredZoneToZoneCategories.length / zoneToZoneCategoriesEntriesPerPage);
  const zoneToZoneCategoriesIndexOfLastEntry = zoneToZoneCategoriesCurrentPage * zoneToZoneCategoriesEntriesPerPage;
  const zoneToZoneCategoriesIndexOfFirstEntry = zoneToZoneCategoriesIndexOfLastEntry - zoneToZoneCategoriesEntriesPerPage;
  const currentZoneToZoneCategories = searchFilteredZoneToZoneCategories.slice(zoneToZoneCategoriesIndexOfFirstEntry, zoneToZoneCategoriesIndexOfLastEntry);

  const handleZoneToZoneCategoriesPageChange = (page) => {
    setZoneToZoneCategoriesCurrentPage(page);
  };

  const handleZoneToZoneCategoriesPrevious = () => {
    if (zoneToZoneCategoriesCurrentPage > 1) {
      setZoneToZoneCategoriesCurrentPage(zoneToZoneCategoriesCurrentPage - 1);
    }
  };

  const handleZoneToZoneCategoriesNext = () => {
    if (zoneToZoneCategoriesCurrentPage < zoneToZoneCategoriesTotalPages) {
      setZoneToZoneCategoriesCurrentPage(zoneToZoneCategoriesCurrentPage + 1);
    }
  };

  // Zone to Zone Rates pagination logic
  const zoneToZoneRatesTotalPages = Math.ceil(searchFilteredZoneToZoneRates.length / zoneToZoneRatesEntriesPerPage);
  const zoneToZoneRatesIndexOfLastEntry = zoneToZoneRatesCurrentPage * zoneToZoneRatesEntriesPerPage;
  const zoneToZoneRatesIndexOfFirstEntry = zoneToZoneRatesIndexOfLastEntry - zoneToZoneRatesEntriesPerPage;
  const currentZoneToZoneRates = searchFilteredZoneToZoneRates.slice(zoneToZoneRatesIndexOfFirstEntry, zoneToZoneRatesIndexOfLastEntry);

  const handleZoneToZoneRatesPageChange = (page) => {
    setZoneToZoneRatesCurrentPage(page);
  };

  const handleZoneToZoneRatesPrevious = () => {
    if (zoneToZoneRatesCurrentPage > 1) {
      setZoneToZoneRatesCurrentPage(zoneToZoneRatesCurrentPage - 1);
    }
  };

  const handleZoneToZoneRatesNext = () => {
    if (zoneToZoneRatesCurrentPage < zoneToZoneRatesTotalPages) {
      setZoneToZoneRatesCurrentPage(zoneToZoneRatesCurrentPage + 1);
    }
  };

  const handleDeleteZoneToZoneRate = () => {
    if (zoneToZoneRateToDelete) {
      console.log('Deleting zone to zone rate:', zoneToZoneRateToDelete);
      setShowDeleteZoneToZoneModal(false);
      setZoneToZoneRateToDelete(null);
    }
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content company">
        <div className="container-fluid p-4">
          {/* Header with Manage Rates title and Profile */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <button 
                className="menu-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
              <h2 className='dashboard-title'>Manage Rates</h2>
            </div>
            <div className="profile d-flex align-items-center justify-content-center">
              <img src={profile} alt="profile" className="profile-img me-3" />
              <img src={word} className="me-2" alt="word" />
              <img src={night} alt="night" />
            </div>
          </div>

          {/* Tabs */}
          <div className="py-4 d-flex justify-content-end">
            <div className="affiliate-tabs">
              <button
                className={`affiliate-tab ${activeTab === 'Distance Rate' ? 'active' : ''}`}
                onClick={() => setActiveTab('Distance Rate')}
              >
                Distance Rate
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Hourly Rate' ? 'active' : ''}`}
                onClick={() => setActiveTab('Hourly Rate')}
              >
                Hourly Rate
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Zone to Zone' ? 'active' : ''}`}
                onClick={() => setActiveTab('Zone to Zone')}
              >
                Zone to Zone
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Peak Hours' ? 'active' : ''}`}
                onClick={() => setActiveTab('Peak Hours')}
              >
                Peak Hours
              </button>
            </div>
          </div>

          {/* Distance Rate Tab Content */}
          {activeTab === 'Distance Rate' && (
            <div className="container-fluid">
              <div className="border">
              {/* Search and Add Button */}
              <div className="affiliate-controls-right d-flex justify-content-between gap-3 px-3 py-4 mb-4">
                <div className="d-flex align-items-center">
                  <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search affiliates..."
                      value={distanceCategoriesSearchTerm}
                      onChange={(e) => {
                        setDistanceCategoriesSearchTerm(e.target.value);
                        setDistanceCategoriesCurrentPage(1);
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button className="btn-add-booking" onClick={() => setShowAddDistanceModal(true)}>
                    <FaPlus className="me-2" />
                    Add Servies
                  </button>
                </div>
              </div>

              {/* Categories Table */}
              <div className="border mb-4">
                <div className="customer-table-wrapper mt-2">
                  <table className="affiliate-table teams-table manage-font">
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Category</th>
                        <th>View</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentDistanceCategories.map((category) => (
                        <tr key={category.id}>
                          <td>
                            <div >{category.sl}</div>
                          </td>
                          <td>
                            <div >{category.category}</div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center" style={{ color: '#3B82F6', cursor: 'pointer' }}>
                              <MdOutlineRemoveRedEye className="me-2" />
                              <span>VIEW</span>
                            </div>
                          </td>
                          <td>
                            <button className="btn-rate-manage" style={{ padding: '8px 16px', fontSize: '14px' }}>
                              Set Rate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination for Categories */}
                <div className="pagination-container-2 p-3">
                  <span className="pagination-info">
                    Showing {distanceCategoriesIndexOfFirstEntry + 1} to {Math.min(distanceCategoriesIndexOfLastEntry, searchFilteredDistanceCategories.length)} of {searchFilteredDistanceCategories.length} results
                  </span>
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={handleDistanceCategoriesPrevious}
                      disabled={distanceCategoriesCurrentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: distanceCategoriesTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`pagination-btn ${distanceCategoriesCurrentPage === page ? 'active' : ''}`}
                        onClick={() => handleDistanceCategoriesPageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="pagination-btn"
                      onClick={handleDistanceCategoriesNext}
                      disabled={distanceCategoriesCurrentPage === distanceCategoriesTotalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Distance Rates Table */}
              <div className="">
                <div className="customer-table-wrapper mt-2">
                  <table className="affiliate-table manage-ng">
                    <thead>
                      <tr>
                        <th>
                          <div className="th-content">
                            NUMBER
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            Servirs
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            From Distance
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            To Distance
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            COST
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            COST PER DISTANCE
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentDistanceRates.map((rate) => (
                        <tr key={rate.id}>
                          <td>
                            <div className="customer-name">{rate.number}</div>
                          </td>
                          <td className="customer-name">{rate.service}</td>
                          <td className="customer-date">{rate.fromDistance}</td>
                          <td className="customer-date">{rate.toDistance}</td>
                          <td className="customer-date">{rate.cost}</td>
                          <td className="customer-date">{rate.costPerDistance}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-edit">
                                <MdOutlineRemoveRedEye />
                              </button>
                              <button 
                                className="btn-delete"
                                onClick={() => {
                                  setDistanceRateToDelete(rate);
                                  setShowDeleteDistanceModal(true);
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

                {/* Pagination for Distance Rates */}
                <div className="pagination-container-2 p-3">
                  <span className="pagination-info">
                    Showing {distanceRatesIndexOfFirstEntry + 1} to {Math.min(distanceRatesIndexOfLastEntry, searchFilteredDistanceRates.length)} of {searchFilteredDistanceRates.length} results
                  </span>
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={handleDistanceRatesPrevious}
                      disabled={distanceRatesCurrentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: distanceRatesTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`pagination-btn ${distanceRatesCurrentPage === page ? 'active' : ''}`}
                        onClick={() => handleDistanceRatesPageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="pagination-btn"
                      onClick={handleDistanceRatesNext}
                      disabled={distanceRatesCurrentPage === distanceRatesTotalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}

          {/* Hourly Rate Tab Content */}
          {activeTab === 'Hourly Rate' && (
            <div className="container-fluid">
              {/* Search and Add Button */}
              <div className="border">
              <div className="affiliate-controls-right d-flex justify-content-between gap-3 px-3 py-4 mb-4">
                <div className="d-flex align-items-center">
                  <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search affiliates..."
                      value={hourlyCategoriesSearchTerm}
                      onChange={(e) => {
                        setHourlyCategoriesSearchTerm(e.target.value);
                        setHourlyCategoriesCurrentPage(1);
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button className="btn-add-booking" onClick={() => setShowAddServicesModal(true)}>
                    <FaPlus className="me-2" />
                    Add Servies
                  </button>
                </div>
              </div>

              {/* Categories Table */}
              <div className="border mb-4">
                <div className="customer-table-wrapper mt-2">
                  <table className="affiliate-table teams-table manage-font">
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Category</th>
                        <th>View</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentHourlyCategories.map((category) => (
                        <tr key={category.id}>
                          <td>
                            <div >{category.sl}</div>
                          </td>
                          <td>
                            <div >{category.category}</div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center" style={{ color: '#3B82F6', cursor: 'pointer' }}>
                              <MdOutlineRemoveRedEye className="me-2" />
                              <span>VIEW</span>
                            </div>
                          </td>
                          <td>
                            <button className="btn-rate-manage" style={{ padding: '8px 16px', fontSize: '14px' }}>
                              Set Rate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination for Categories */}
                <div className="pagination-container-2 p-3">
                  <span className="pagination-info">
                    Showing {hourlyCategoriesIndexOfFirstEntry + 1} to {Math.min(hourlyCategoriesIndexOfLastEntry, searchFilteredHourlyCategories.length)} of {searchFilteredHourlyCategories.length} results
                  </span>
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={handleHourlyCategoriesPrevious}
                      disabled={hourlyCategoriesCurrentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: hourlyCategoriesTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`pagination-btn ${hourlyCategoriesCurrentPage === page ? 'active' : ''}`}
                        onClick={() => handleHourlyCategoriesPageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="pagination-btn"
                      onClick={handleHourlyCategoriesNext}
                      disabled={hourlyCategoriesCurrentPage === hourlyCategoriesTotalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Hourly Rates Table */}
              <div className="">
                <div className="customer-table-wrapper mt-2">
                  <table className="affiliate-table manage-ng">
                    <thead>
                      <tr>
                        <th>
                          <div className="th-content">
                            NUMBER
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            Servirs
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            From (HOURS)
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            FROM (HOURS)
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            HOURLY RATE
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentHourlyRates.map((rate) => (
                        <tr key={rate.id}>
                          <td>
                            <div className="customer-name">{rate.number}</div>
                          </td>
                          <td className="customer-name">{rate.service}</td>
                          <td className="customer-date">{rate.fromHours}</td>
                          <td className="customer-date">{rate.toHours}</td>
                          <td className="customer-date">{rate.hourlyRate}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-edit">
                                <MdOutlineRemoveRedEye />
                              </button>
                              <button 
                                className="btn-delete"
                                onClick={() => {
                                  setHourlyRateToDelete(rate);
                                  setShowDeleteHourlyRateModal(true);
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

                {/* Pagination for Hourly Rates */}
                <div className="pagination-container-2 p-3">
                  <span className="pagination-info">
                    Showing {hourlyRatesIndexOfFirstEntry + 1} to {Math.min(hourlyRatesIndexOfLastEntry, searchFilteredHourlyRates.length)} of {searchFilteredHourlyRates.length} results
                  </span>
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={handleHourlyRatesPrevious}
                      disabled={hourlyRatesCurrentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: hourlyRatesTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`pagination-btn ${hourlyRatesCurrentPage === page ? 'active' : ''}`}
                        onClick={() => handleHourlyRatesPageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="pagination-btn"
                      onClick={handleHourlyRatesNext}
                      disabled={hourlyRatesCurrentPage === hourlyRatesTotalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}

          {/* Zone to Zone Tab Content */}
          {activeTab === 'Zone to Zone' && (
            <div className="container-fluid">
              <div className="border">
              {/* Search and Add Button */}
              <div className="affiliate-controls-right d-flex justify-content-between gap-3 px-3 py-4 mb-4">
                <div className="d-flex align-items-center">
                  <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search affiliates..."
                      value={zoneToZoneCategoriesSearchTerm}
                      onChange={(e) => {
                        setZoneToZoneCategoriesSearchTerm(e.target.value);
                        setZoneToZoneCategoriesCurrentPage(1);
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button className="btn-add-booking" onClick={() => setShowAddZoneToZoneModal(true)}>
                    <FaPlus className="me-2" />
                    Add Servies
                  </button>
                </div>
              </div>

              {/* Categories Table */}
              <div className="border mb-4">
                <div className="customer-table-wrapper mt-2">
                  <table className="affiliate-table teams-table manage-font">
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Category</th>
                        <th>View</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentZoneToZoneCategories.map((category) => (
                        <tr key={category.id}>
                          <td>
                            <div >{category.sl}</div>
                          </td>
                          <td>
                            <div >{category.category}</div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center" style={{ color: '#3B82F6', cursor: 'pointer' }}>
                              <MdOutlineRemoveRedEye className="me-2" />
                              <span>VIEW</span>
                            </div>
                          </td>
                          <td>
                            <button className="btn-rate-manage" style={{ padding: '8px 16px', fontSize: '14px' }}>
                              Set Rate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination for Categories */}
                <div className="pagination-container-2 p-3">
                  <span className="pagination-info">
                    Showing {zoneToZoneCategoriesIndexOfFirstEntry + 1} to {Math.min(zoneToZoneCategoriesIndexOfLastEntry, searchFilteredZoneToZoneCategories.length)} of {searchFilteredZoneToZoneCategories.length} results
                  </span>
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={handleZoneToZoneCategoriesPrevious}
                      disabled={zoneToZoneCategoriesCurrentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: zoneToZoneCategoriesTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`pagination-btn ${zoneToZoneCategoriesCurrentPage === page ? 'active' : ''}`}
                        onClick={() => handleZoneToZoneCategoriesPageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="pagination-btn"
                      onClick={handleZoneToZoneCategoriesNext}
                      disabled={zoneToZoneCategoriesCurrentPage === zoneToZoneCategoriesTotalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Zone to Zone Rates Table */}
              <div className="">
                <div className="customer-table-wrapper mt-2">
                  <table className="affiliate-table manage-ng">
                    <thead>
                      <tr>
                        <th>
                          <div className="th-content">
                            NUMBER
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            Servirs
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            From (HOURS)
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            FROM (HOURS)
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            HOURLY RATE
                            <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentZoneToZoneRates.map((rate) => (
                        <tr key={rate.id}>
                          <td>
                            <div className="customer-name">{rate.number}</div>
                          </td>
                          <td className="customer-name">{rate.service}</td>
                          <td className="customer-date">{rate.fromHours}</td>
                          <td className="customer-date">{rate.toHours}</td>
                          <td className="customer-date">{rate.hourlyRate}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-edit">
                                <MdOutlineRemoveRedEye />
                              </button>
                              <button 
                                className="btn-delete"
                                onClick={() => {
                                  setZoneToZoneRateToDelete(rate);
                                  setShowDeleteZoneToZoneModal(true);
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

                {/* Pagination for Zone to Zone Rates */}
                <div className="pagination-container-2 p-3">
                  <span className="pagination-info">
                    Showing {zoneToZoneRatesIndexOfFirstEntry + 1} to {Math.min(zoneToZoneRatesIndexOfLastEntry, searchFilteredZoneToZoneRates.length)} of {searchFilteredZoneToZoneRates.length} results
                  </span>
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={handleZoneToZoneRatesPrevious}
                      disabled={zoneToZoneRatesCurrentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: zoneToZoneRatesTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`pagination-btn ${zoneToZoneRatesCurrentPage === page ? 'active' : ''}`}
                        onClick={() => handleZoneToZoneRatesPageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="pagination-btn"
                      onClick={handleZoneToZoneRatesNext}
                      disabled={zoneToZoneRatesCurrentPage === zoneToZoneRatesTotalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}

          {/* Peak Hours Tab Content */}
          {activeTab === 'Peak Hours' && (
            <div className="container-fluid">
              {/* Search Bar */}
              <div className="border">
                <div className="gap-3 px-3 py-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="search-container">
                      <FaSearch className="search-icon" />
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search Services..."
                        value={peakHoursSearchTerm}
                        onChange={(e) => {
                          setPeakHoursSearchTerm(e.target.value);
                          setPeakHoursCurrentPage(1);
                        }}
                      />
                    </div>
                    <div className="">
                      <button className="btn-add-booking" onClick={() => setShowAddPeakHoursModal(true)}>
                        <FaPlus className="me-2" />
                        Add Servies
                      </button>
                    </div>
                  </div>
                </div>

                {/* Peak Hours Table */}
                <div className="customer-table-wrapper mt-2">
                  <table className="affiliate-table">
                    <thead>
                      <tr>
                        <th>
                          <div className="th-content">
                            SERVIES NAME
                            <div 
                              className="sort-icons d-flex align-items-center clickable-sort"
                              onClick={togglePeakHoursTableCollapse}
                              style={{ cursor: 'pointer' }}
                            >
                              <RiArrowUpDownLine className={isPeakHoursTableCollapsed ? 'collapsed' : ''} />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            SERVIES TYPE
                            <div className="sort-icons d-flex align-items-center clickable-sort"
                              onClick={togglePeakHoursTableCollapse}
                              style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            CALCULATION TYPE
                            <div className="sort-icons d-flex align-items-center clickable-sort"
                              onClick={togglePeakHoursTableCollapse}
                              style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            ONLINE VISIBLE
                            <div className="sort-icons d-flex align-items-center clickable-sort"
                              onClick={togglePeakHoursTableCollapse}
                              style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            ORDERING
                            <div className="sort-icons d-flex align-items-center clickable-sort"
                              onClick={togglePeakHoursTableCollapse}
                              style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            DESCRIPTION
                            <div className="sort-icons d-flex align-items-center clickable-sort"
                              onClick={togglePeakHoursTableCollapse}
                              style={{ cursor: 'pointer' }}>
                              <RiArrowUpDownLine />
                            </div>
                          </div>
                        </th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className={isPeakHoursTableCollapsed ? 'collapsed' : ''}>
                      {currentPeakHours.map((peakHour) => (
                        <tr key={peakHour.id}>
                          <td>
                            <div className="customer-name">{peakHour.serviceName}</div>
                          </td>
                          <td className="customer-date">{peakHour.serviceType}</td>
                          <td className="customer-date">{peakHour.calculationType}</td>
                          <td className="customer-date">{peakHour.onlineVisible}</td>
                          <td className="customer-date">{peakHour.ordering}</td>
                          <td className="customer-address">{peakHour.description}</td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <span className="status-available">
                                {peakHour.status}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-edit">
                                <AiOutlineEdit />
                              </button>
                              <button 
                                className="btn-delete"
                                onClick={() => {
                                  setPeakHoursToDelete(peakHour);
                                  setShowDeletePeakHoursModal(true);
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
                    Showing {peakHoursIndexOfFirstEntry + 1} to {Math.min(peakHoursIndexOfLastEntry, searchFilteredPeakHours.length)} of {searchFilteredPeakHours.length} results
                  </span>
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={handlePeakHoursPrevious}
                      disabled={peakHoursCurrentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: peakHoursTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`pagination-btn ${peakHoursCurrentPage === page ? 'active' : ''}`}
                        onClick={() => handlePeakHoursPageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="pagination-btn"
                      onClick={handlePeakHoursNext}
                      disabled={peakHoursCurrentPage === peakHoursTotalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && rateToDelete && (
        <div className="modal-overlay" onClick={() => {
          setShowDeleteModal(false);
          setRateToDelete(null);
        }}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-body">
              <p className="delete-modal-question">
                Are You Sure You Want Delete <br /> <span className="delete-customer-name">{rateToDelete.service} - {rateToDelete.categoryName}</span> ?
              </p>
              <div className="delete-modal-buttons">
                <button 
                  className="btn-delete-confirm"
                  onClick={handleDeleteRate}
                >
                  <FaPlus className="delete-icon" />
                  Delete
                </button>
                <button 
                  className="btn-delete-cancel"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setRateToDelete(null);
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

      {/* Hourly Settings Modal */}
      {showAddServicesModal && (
        <div className="modal-overlay" onClick={() => setShowAddServicesModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Hourly Settings</h3>
              <button className="modal-close" onClick={() => setShowAddServicesModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Select Booking Type</label>
                  <select>
                    <option value="">Select Type</option>
                    <option value="To Airport">To Airport</option>
                    <option value="From Airport">From Airport</option>
                    <option value="Point To Point">Point To Point</option>
                    <option value="Hourly">Hourly</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>From (Hours)</label>
                  <input type="text" placeholder="Form Distance uni" />
                </div>
                <div className="form-group">
                  <label>To (Hours)</label>
                  <input type="text" placeholder="Diistance Unit" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Hourly Rate</label>
                  <input type="text" placeholder="Cost Per Distance" />
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddServicesModal(false)}>
                <FaPlus className="me-2" />
                Add Hour
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal for Hourly Rate */}
      {showDeleteHourlyRateModal && hourlyRateToDelete && (
        <div className="modal-overlay" onClick={() => {
          setShowDeleteHourlyRateModal(false);
          setHourlyRateToDelete(null);
        }}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-body">
              <p className="delete-modal-question">
                Are You Sure You Want Delete <br /> <span className="delete-customer-name">{hourlyRateToDelete.service}</span> ?
              </p>
              <div className="delete-modal-buttons">
                <button
                  className="btn-delete-confirm"
                  onClick={handleDeleteHourlyRate}
                >
                  <FaPlus className="delete-icon" />
                  Delete
                </button>
                <button
                  className="btn-delete-cancel"
                  onClick={() => {
                    setShowDeleteHourlyRateModal(false);
                    setHourlyRateToDelete(null);
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

      {/* Add Peak Hours Modal */}
      {showAddPeakHoursModal && (
        <div className="modal-overlay" onClick={() => setShowAddPeakHoursModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Servies</h3>
              <button className="modal-close" onClick={() => setShowAddPeakHoursModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Type</label>
                  <select>
                    <option value="">Select Type</option>
                    <option value="To Airport">To Airport</option>
                    <option value="From Airport">From Airport</option>
                    <option value="Point To Point">Point To Point</option>
                    <option value="Hourly">Hourly</option>
                    <option value="Zone To Zone">Zone To Zone</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Online Visible Flag...</label>
                  <select>
                    <option value="">online Visible Flag</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Service Type Name</label>
                  <input type="text" placeholder="promo code" />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" placeholder="expire date" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ordering</label>
                  <input type="text" placeholder="description*" />
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddPeakHoursModal(false)}>
                <FaPlus className="me-2" />
                Add Servies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal for Peak Hours */}
      {showDeletePeakHoursModal && peakHoursToDelete && (
        <div className="modal-overlay" onClick={() => {
          setShowDeletePeakHoursModal(false);
          setPeakHoursToDelete(null);
        }}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-body">
              <p className="delete-modal-question">
                Are You Sure You Want Delete <br /> <span className="delete-customer-name">{peakHoursToDelete.serviceName}</span> ?
              </p>
              <div className="delete-modal-buttons">
                <button
                  className="btn-delete-confirm"
                  onClick={handleDeletePeakHours}
                >
                  <FaPlus className="delete-icon" />
                  Delete
                </button>
                <button
                  className="btn-delete-cancel"
                  onClick={() => {
                    setShowDeletePeakHoursModal(false);
                    setPeakHoursToDelete(null);
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

      {/* Zone Settings Modal */}
      {showAddZoneToZoneModal && (
        <div className="modal-overlay" onClick={() => setShowAddZoneToZoneModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Zone Settings</h3>
              <button className="modal-close" onClick={() => setShowAddZoneToZoneModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Select Booking Type</label>
                  <select>
                    <option value="">Select Type</option>
                    <option value="To Airport">To Airport</option>
                    <option value="From Airport">From Airport</option>
                    <option value="Zone To Zone">Zone To Zone</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>From Zone</label>
                  <input type="text" placeholder="Form Distance uni" />
                </div>
                <div className="form-group">
                  <label>To Zone</label>
                  <input type="text" placeholder="Diistance Unit" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Cost</label>
                  <input type="text" placeholder="Cost Per Distance" />
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddZoneToZoneModal(false)}>
                <FaPlus className="me-2" />
                Add Zone
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal for Zone to Zone */}
      {showDeleteZoneToZoneModal && zoneToZoneRateToDelete && (
        <div className="modal-overlay" onClick={() => {
          setShowDeleteZoneToZoneModal(false);
          setZoneToZoneRateToDelete(null);
        }}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-body">
              <p className="delete-modal-question">
                Are You Sure You Want Delete <br /> <span className="delete-customer-name">{zoneToZoneRateToDelete.service}</span> ?
              </p>
              <div className="delete-modal-buttons">
                <button
                  className="btn-delete-confirm"
                  onClick={handleDeleteZoneToZoneRate}
                >
                  <FaPlus className="delete-icon" />
                  Delete
                </button>
                <button
                  className="btn-delete-cancel"
                  onClick={() => {
                    setShowDeleteZoneToZoneModal(false);
                    setZoneToZoneRateToDelete(null);
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

      {/* Distance Settings Modal */}
      {showAddDistanceModal && (
        <div className="modal-overlay" onClick={() => setShowAddDistanceModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Distance Settings</h3>
              <button className="modal-close" onClick={() => setShowAddDistanceModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Select Booking Type</label>
                  <select>
                    <option value="">Select Type</option>
                    <option value="To Airport">To Airport</option>
                    <option value="From Airport">From Airport</option>
                    <option value="Point To Point">Point To Point</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>From Distance Unit</label>
                  <input type="text" placeholder="Form Distance uni" />
                </div>
                <div className="form-group">
                  <label>To Diistance Unit</label>
                  <input type="text" placeholder="Diistance Unit" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Cost</label>
                  <input type="text" placeholder="Cost" />
                </div>
                <div className="form-group">
                  <label>Cost Per Distance</label>
                  <input type="text" placeholder="Cost Per Distance" />
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddDistanceModal(false)}>
                <FaPlus className="me-2" />
                Add Distance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal for Distance Rate */}
      {showDeleteDistanceModal && distanceRateToDelete && (
        <div className="modal-overlay" onClick={() => {
          setShowDeleteDistanceModal(false);
          setDistanceRateToDelete(null);
        }}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-body">
              <p className="delete-modal-question">
                Are You Sure You Want Delete <br /> <span className="delete-customer-name">{distanceRateToDelete.service}</span> ?
              </p>
              <div className="delete-modal-buttons">
                <button
                  className="btn-delete-confirm"
                  onClick={handleDeleteDistanceRate}
                >
                  <FaPlus className="delete-icon" />
                  Delete
                </button>
                <button
                  className="btn-delete-cancel"
                  onClick={() => {
                    setShowDeleteDistanceModal(false);
                    setDistanceRateToDelete(null);
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

export default Ratemanage;
