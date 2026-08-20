import { useState, useRef } from 'react';
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import profile from '../../../assets/Elipse 5.svg';
import word from '../../../assets/icons set.svg';
import night from '../../../assets/icons set (1).svg';
import carImage1 from '../../../assets/car (1).jpg';
import carImage2 from '../../../assets/car (2).jpg';
import { FaBars, FaPlus, FaRegTrashAlt, FaCheck } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { HiUpload } from 'react-icons/hi';
import './Vehicles.css';

const Vehicles = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Vehicles');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(7);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  
  // Categories state
  const [categoriesSearchTerm, setCategoriesSearchTerm] = useState('');
  const [categoriesCurrentPage, setCategoriesCurrentPage] = useState(1);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const categoryImageInputRef = useRef(null);
  
  // Features state
  const [featuresSearchTerm, setFeaturesSearchTerm] = useState('');
  const [featuresCurrentPage, setFeaturesCurrentPage] = useState(1);
  const [showAddFeatureModal, setShowAddFeatureModal] = useState(false);
  
  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null); // 'vehicle', 'category', or 'feature'

  // Vehicles data
  const vehicles = [
    {
      id: 1,
      name: 'Lexues',
      category: 'SUV',
      fuelType: 'Petrol',
      ownership: 'Owned',
      status: 'Delivered'
    },
    {
      id: 2,
      name: 'Lexues',
      category: 'SUV',
      fuelType: 'Petrol',
      ownership: 'Owned',
      status: 'Delivered'
    },
    {
      id: 3,
      name: 'Lexues',
      category: 'SUV',
      fuelType: 'Petrol',
      ownership: 'Owned',
      status: 'Delivered'
    },
  ];

  // Categories data
  const categories = [
    {
      id: 1,
      image: carImage1,
      passenger: 2,
      luggage: 3,
      vehicleCategory: 'SUV',
      status: 'Delivered'
    },
    {
      id: 2,
      image: carImage2,
      passenger: 3,
      luggage: 4,
      vehicleCategory: 'SEDAN',
      status: 'Delivered'
    },
    {
      id: 3,
      image: carImage1,
      passenger: 4,
      luggage: 2,
      vehicleCategory: 'HATCHBACK',
      status: 'Delivered'
    },
    {
      id: 4,
      image: carImage2,
      passenger: 5,
      luggage: 3,
      vehicleCategory: 'SEDAN',
      status: 'Delivered'
    },
    {
      id: 5,
      image: carImage1,
      passenger: 7,
      luggage: 5,
      vehicleCategory: 'SUV',
      status: 'Delivered'
    },
    {
      id: 6,
      image: carImage2,
      passenger: 4,
      luggage: 2,
      vehicleCategory: 'HATCHBACK',
      status: 'Delivered'
    },
    {
      id: 7,
      image: carImage1,
      passenger: 5,
      luggage: 4,
      vehicleCategory: 'SEDAN',
      status: 'Delivered'
    },
  ];

  // Features data
  const features = [
    {
      id: 1,
      name: 'GPS Navigation',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Bluetooth Connectivity',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Air Conditioning',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Leather Seats',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Sunroof',
      status: 'Active'
    },
    {
      id: 6,
      name: 'Backup Camera',
      status: 'Active'
    },
    {
      id: 7,
      name: 'Parking Sensors',
      status: 'Active'
    },
  ];

  // Filter vehicles by search term
  const searchFilteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.fuelType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter categories by search term
  const searchFilteredCategories = categories.filter(category =>
    category.vehicleCategory.toLowerCase().includes(categoriesSearchTerm.toLowerCase())
  );

  // Filter features by search term
  const searchFilteredFeatures = features.filter(feature =>
    feature.name.toLowerCase().includes(featuresSearchTerm.toLowerCase())
  );

  // Pagination logic for vehicles
  const totalPages = Math.ceil(searchFilteredVehicles.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentVehicles = searchFilteredVehicles.slice(indexOfFirstEntry, indexOfLastEntry);

  // Pagination logic for categories
  const categoriesTotalPages = Math.ceil(searchFilteredCategories.length / entriesPerPage);
  const categoriesIndexOfLastEntry = categoriesCurrentPage * entriesPerPage;
  const categoriesIndexOfFirstEntry = categoriesIndexOfLastEntry - entriesPerPage;
  const currentCategories = searchFilteredCategories.slice(categoriesIndexOfFirstEntry, categoriesIndexOfLastEntry);

  // Pagination logic for features
  const featuresTotalPages = Math.ceil(searchFilteredFeatures.length / entriesPerPage);
  const featuresIndexOfLastEntry = featuresCurrentPage * entriesPerPage;
  const featuresIndexOfFirstEntry = featuresIndexOfLastEntry - entriesPerPage;
  const currentFeatures = searchFilteredFeatures.slice(featuresIndexOfFirstEntry, featuresIndexOfLastEntry);

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

  // Categories pagination handlers
  const handleCategoriesPageChange = (page) => {
    setCategoriesCurrentPage(page);
  };

  const handleCategoriesPrevious = () => {
    if (categoriesCurrentPage > 1) {
      setCategoriesCurrentPage(categoriesCurrentPage - 1);
    }
  };

  const handleCategoriesNext = () => {
    if (categoriesCurrentPage < categoriesTotalPages) {
      setCategoriesCurrentPage(categoriesCurrentPage + 1);
    }
  };

  // Features pagination handlers
  const handleFeaturesPageChange = (page) => {
    setFeaturesCurrentPage(page);
  };

  const handleFeaturesPrevious = () => {
    if (featuresCurrentPage > 1) {
      setFeaturesCurrentPage(featuresCurrentPage - 1);
    }
  };

  const handleFeaturesNext = () => {
    if (featuresCurrentPage < featuresTotalPages) {
      setFeaturesCurrentPage(featuresCurrentPage + 1);
    }
  };

  // Delete handlers
  const handleDelete = () => {
    if (itemToDelete) {
      console.log('Deleting', deleteType, ':', itemToDelete);
      // Here you would typically call an API to delete the item
      setShowDeleteModal(false);
      setItemToDelete(null);
      setDeleteType(null);
    }
  };

  const handleDeleteClick = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content company">
        <div className="container-fluid p-4">
          {/* Header with Vehicles title and Profile */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <button 
                className="menu-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
              <h2 className='dashboard-title'>Vehicles</h2>
            </div>
            <div className="profile d-flex align-items-center justify-content-center">
              <img src={profile} alt="profile" className="profile-img me-3" />
              <img src={word} className="me-2" alt="word" />
              <img src={night} alt="night" />
            </div>
          </div>

          {/* Tabs and Add Vehicle Button */}
          <div className="payment-controls d-flex justify-content-end align-items-center mb-4">
            <div className="affiliate-tabs">
              <button
                className={`affiliate-tab ${activeTab === 'Vehicles' ? 'active' : ''}`}
                onClick={() => setActiveTab('Vehicles')}
              >
                Vehicles
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Categories' ? 'active' : ''}`}
                onClick={() => setActiveTab('Categories')}
              >
                Categories
              </button>
              <button
                className={`affiliate-tab ${activeTab === 'Features' ? 'active' : ''}`}
                onClick={() => setActiveTab('Features')}
              >
                Features
              </button>
            </div>
        
          </div>

          {/* Main Content */}
          {activeTab === 'Vehicles' && (
            <div className="vehicles-content-wrapper">
              {/* Search Bar */}
              <div className="vehicles-search-section d-flex justify-content-between align-items-center">
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search feedback..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <button className="btn-add-booking" onClick={() => setShowAddVehicleModal(true)}>
              <FaPlus className="me-2" />
              Add Vehicle
            </button>
              </div>

              {/* Vehicles Table */}
              <div className="vehicles-table-wrapper">
                <table className="affiliate-table vch-font">
                  <thead>
                    <tr>
                      <th>
                        <div className="th-content">
                          Name
                          <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                            <RiArrowUpDownLine />
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="th-content">
                          Category
                          <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                            <RiArrowUpDownLine />
                          </div>
                        </div>
                      </th>
                      <th>FUEL TYPE</th>
                      <th>Ownership</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentVehicles.map((vehicle) => (
                      <tr key={vehicle.id} >
                        <td>
                          <div className="vehicle-name margin-right">{vehicle.name}</div>
                        </td>
                        <td>
                          <span className='span-category'>
                            {vehicle.category}
                          </span>
                        </td>
                        <td className="customer-date span-category">{vehicle.fuelType}</td>
                        <td className="customer-date span-category">{vehicle.ownership}</td>
                        <td>
                          <span className="vehicles-status-badge">
                            <FaCheck />
                            {vehicle.status}
                          </span>
                        </td>
                        <td>
                          <div className="vehicles-action-buttons">
                            <button className="vehicles-btn-view">
                              <MdOutlineRemoveRedEye />
                            </button>
                            <button 
                              className="vehicles-btn-delete"
                              onClick={() => handleDeleteClick(vehicle, 'vehicle')}
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
              <div className="vehicles-pagination-wrapper pagination-container-2">
                <span className="pagination-info">
                  Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, searchFilteredVehicles.length)} of {searchFilteredVehicles.length} entries
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
          )}

          {/* Categories Tab Content */}
          {activeTab === 'Categories' && (
            <div className="vehicles-content-wrapper">
              {/* Search Bar */}
              <div className="vehicles-search-section d-flex justify-content-between align-items-center">
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search feedback..."
                    value={categoriesSearchTerm}
                    onChange={(e) => {
                      setCategoriesSearchTerm(e.target.value);
                      setCategoriesCurrentPage(1);
                    }}
                  />
                </div>
                <button className="btn-add-booking" onClick={() => setShowAddCategoryModal(true)}>
                  <FaPlus className="me-2" />
                  Add Vehcile
                </button>
              </div>

              {/* Categories Table */}
              <div className="vehicles-table-wrapper">
                <table className="affiliate-table vch-font">
                  <thead>
                    <tr>
                      <th>
                        <div className="th-content">
                          Name
                          <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                            <RiArrowUpDownLine />
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="th-content">
                          PASSENGER
                          <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                            <RiArrowUpDownLine />
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="th-content">
                          IAGGUGE
                          <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                            <RiArrowUpDownLine />
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="th-content">
                          VEHCILE CATEGORY
                          <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                            <RiArrowUpDownLine />
                          </div>
                        </div>
                      </th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCategories.map((category) => (
                      <tr key={category.id}>
                        <td>
                          <img 
                            src={category.image} 
                            alt="car"
                          />
                        </td>
                        <td>
                          <span>{category.passenger}</span>
                        </td>
                        <td>
                          <span>{category.luggage}</span>
                        </td>
                        <td>
                          <span>{category.vehicleCategory}</span>
                        </td>
                        <td>
                          <span className="vehicles-status-badge">
                            <FaCheck />
                            {category.status}
                          </span>
                        </td>
                        <td>
                          <div className="vehicles-action-buttons">
                            <button className="vehicles-btn-view">
                              <MdOutlineRemoveRedEye />
                            </button>
                            <button 
                              className="vehicles-btn-delete"
                              onClick={() => handleDeleteClick(category, 'category')}
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
              <div className="vehicles-pagination-wrapper pagination-container-2">
                <span className="pagination-info">
                  Showing {categoriesIndexOfFirstEntry + 1} to {Math.min(categoriesIndexOfLastEntry, searchFilteredCategories.length)} of {searchFilteredCategories.length} entries
                </span>
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={handleCategoriesPrevious}
                    disabled={categoriesCurrentPage === 1}
                  >
                    Previous
                  </button>
                  {Array.from({ length: categoriesTotalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`pagination-btn ${categoriesCurrentPage === page ? 'active' : ''}`}
                      onClick={() => handleCategoriesPageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="pagination-btn"
                    onClick={handleCategoriesNext}
                    disabled={categoriesCurrentPage === categoriesTotalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Features Tab Content */}
          {activeTab === 'Features' && (
            <div className="vehicles-content-wrapper Features">
              {/* Search Bar */}
              <div className="vehicles-search-section d-flex justify-content-between align-items-center">
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search Vehicles..."
                    value={featuresSearchTerm}
                    onChange={(e) => {
                      setFeaturesSearchTerm(e.target.value);
                      setFeaturesCurrentPage(1);
                    }}
                  />
                </div>
                <button className="btn-add-booking" onClick={() => setShowAddFeatureModal(true)}>
                  <FaPlus className="me-2" />
                  Add Feature
                </button>
              </div>

              {/* Features Table */}
              <div className="vehicles-table-wrapper features-table-wrapper">
                <table className="affiliate-table vch-font">
                  <thead>
                    <tr>
                      <th>
                        <div className="th-content">
                          Feature Name
                          <div className="sort-icons d-flex align-items-center clickable-sort" style={{ cursor: 'pointer' }}>
                            <RiArrowUpDownLine />
                          </div>
                        </div>
                      </th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentFeatures.map((feature) => (
                      <tr key={feature.id}>
                        <td>
                          <div className="vehicle-name">{feature.name}</div>
                        </td>
                        <td>
                          <span className="vehicles-status-badge">
                            <FaCheck />
                            {feature.status}
                          </span>
                        </td>
                        <td>
                          <div className="vehicles-action-buttons">
                            <button className="vehicles-btn-view">
                              <MdOutlineRemoveRedEye />
                            </button>
                            <button 
                              className="vehicles-btn-delete"
                              onClick={() => handleDeleteClick(feature, 'feature')}
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
              <div className="vehicles-pagination-wrapper pagination-container-2">
                <span className="pagination-info">
                  Showing {featuresIndexOfFirstEntry + 1} to {Math.min(featuresIndexOfLastEntry, searchFilteredFeatures.length)} of {searchFilteredFeatures.length} entries
                </span>
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={handleFeaturesPrevious}
                    disabled={featuresCurrentPage === 1}
                  >
                    Previous
                  </button>
                  {Array.from({ length: featuresTotalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`pagination-btn ${featuresCurrentPage === page ? 'active' : ''}`}
                      onClick={() => handleFeaturesPageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="pagination-btn"
                    onClick={handleFeaturesNext}
                    disabled={featuresCurrentPage === featuresTotalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowAddCategoryModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Category</h3>
              <button className="modal-close" onClick={() => setShowAddCategoryModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Category Name</label>
                  <select>
                    <option value="">Select</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Category Color</label>
                  <select defaultValue="Red">
                    <option value="">Select</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Passengers Capacity</label>
                  <select>
                    <option value="">Select</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="7">7</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Luggage Capacity</label>
                  <select>
                    <option value="">select</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category Order</label>
                  <input type="text" placeholder="add" />
                </div>
                <div className="form-group mt-2">
                  <label>IMG Upload</label>
                  <div className="file-upload">
                    <input 
                      type="file" 
                      id="category-image-upload" 
                      ref={categoryImageInputRef}
                      style={{ display: 'none' }} 
                    />
                    <button 
                      type="button"
                      className="file-upload-label"
                      onClick={() => categoryImageInputRef.current?.click()}
                    >
                      <HiUpload className="me-2" />
                      Choose File
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddCategoryModal(false)}>
                <FaPlus className="me-2" />
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showAddVehicleModal && (
        <div className="modal-overlay" onClick={() => setShowAddVehicleModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Vehicle</h3>
              <button className="modal-close" onClick={() => setShowAddVehicleModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Select Category</label>
                  <select>
                    <option value="">Select</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Vehicle Black Out</label>
                  <select>
                    <option value="Okay">Okay</option>
                    <option value="Not Okay">Not Okay</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ownership Type</label>
                  <select>
                    <option value="">Select</option>
                    <option value="Owned">Owned</option>
                    <option value="Rented">Rented</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Fuel Type <span style={{ color: 'red' }}>*</span></label>
                  <select>
                    <option value="">select</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle Plate Numbe</label>
                  <input type="text" placeholder="add" />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select>
                    <option value="">select</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle Model Name</label>
                  <input type="text" placeholder="Add" />
                </div>
                <div className="form-group">
                  <label>Vehicle Brand Name</label>
                  <input type="text" placeholder="percentage*" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle Licence Plate Expiry Date</label>
                  <input type="text" placeholder="Add" />
                </div>
                <div className="form-group">
                  <label>Vehicle Insurance Expiry Date</label>
                  <input type="text" placeholder="percentage*" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle Safety Expiry Date</label>
                  <input type="text" placeholder="Add" />
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddVehicleModal(false)}>
                <FaPlus className="me-2" />
                Add Vehcile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Feature Modal */}
      {showAddFeatureModal && (
        <div className="modal-overlay" onClick={() => setShowAddFeatureModal(false)}>
          <div className="modal-content-2 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Feature</h3>
              <button className="modal-close" onClick={() => setShowAddFeatureModal(false)}>×</button>
            </div>
            <div className="modal-body pt-0">
              <div className="form-row pt-2">
                <div className="form-group">
                  <label>Feature Name</label>
                  <input type="text" placeholder="Add Name" />
                </div>
              </div>
            </div>
            <div className="modal-footer-2">
              <button className="btn-add-booking" onClick={() => setShowAddFeatureModal(false)}>
                <FaPlus className="me-2" />
                Add Feature
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && itemToDelete && (
        <div className="modal-overlay" onClick={() => {
          setShowDeleteModal(false);
          setItemToDelete(null);
          setDeleteType(null);
        }}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-body">
              <p className="delete-modal-question">
                Are You Sure You Want Delete <br /> <span className="delete-customer-name">
                  {deleteType === 'vehicle' && itemToDelete.name}
                  {deleteType === 'category' && itemToDelete.vehicleCategory}
                  {deleteType === 'feature' && itemToDelete.name}
                </span> ?
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
                    setItemToDelete(null);
                    setDeleteType(null);
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

export default Vehicles;
