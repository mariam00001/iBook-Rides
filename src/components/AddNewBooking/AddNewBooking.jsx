import { useState } from 'react';
import profile from '../../assets/Elipse 5.svg';
import word from '../../assets/icons set.svg';
import night from '../../assets/icons set (1).svg';
import Sidebar from '../Sidebar/Sidebar';
import { 
  FaRegCalendar, FaBars
} from 'react-icons/fa';
import './AddNewBooking.css';
import { LuHeartHandshake } from 'react-icons/lu';
import { RiLuggageDepositLine, RiUser6Line, RiUserAddLine } from 'react-icons/ri';
import { GoClock } from 'react-icons/go';
import { PiCarLight } from 'react-icons/pi';
import { BsBagDash } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { MdOutlineLocalPhone } from 'react-icons/md';
import { CgTrash } from 'react-icons/cg';

const AddNewBooking = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    pickupDate: '',
    pickupTime: '',
    serviceType: '',
    vehicle: '',
    passengers: '',
    bigLuggage: false,
    smallLuggage: false,
    firstName: '',
    lastName: '',
    mobile: '',
    landline: '',
    email: '',
    clientNotes: '',
    adminNotes: '',
    passengerName: '',
    passengerEmail: '',
    passengerPhone: '',
    passengerNotes: '',
    passengerAdminNotes: '',
    accountType: 'Individual'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLuggageToggle = (type) => {
    setFormData(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleClear = () => {
    setFormData({
      pickupDate: '',
      pickupTime: '',
      serviceType: '',
      vehicle: '',
      passengers: '',
      bigLuggage: false,
      smallLuggage: false,
      firstName: '',
      lastName: '',
      mobile: '',
      landline: '',
      email: '',
      clientNotes: '',
      adminNotes: '',
      passengerName: '',
      passengerEmail: '',
      passengerPhone: '',
      passengerNotes: '',
      passengerAdminNotes: '',
      accountType: 'Individual'
    });
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <div className="container-fluid p-4">
          {/* Header with Booking title and Profile */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <button 
                className="menu-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
              <h2 className='booking-title'>Add new booking</h2>
            </div>
            <div className="profile d-flex align-items-center justify-content-center">
              <img src={profile} alt="profile" className="profile-img me-3" />
              <img src={word} className="me-2" alt="word" />
              <img src={night} alt="night" />
            </div>
          </div>
          
          <form className="add-booking-form">
            
            <div className="row">
              {/* Pickup Date/Time */}

               
                  <div className="col-md-4 placholder">
                  <label className="form-label required">Pickup Date/Time</label>
                    <div className="input-group-custom">
                      <input
                        type="text"
                        className="form-control-custom"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleChange}
                        placeholder="mm/dd/yyyy"
                      />
                      <span className="input-icon">
                      <FaRegCalendar size={16} />
                      </span>
                    </div>
                  </div>
              {/* Service/Vehicle Type */}
              <div className="col-md-4 mb-3 placholder">
                <label className="form-label required">Service/Vehicle Type</label>

                    <div className="input-group-custom">
                      <select
                        className="form-control-custom"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                      >
                        <option value="">Select Service Type</option>
                        <option>Airport Transfer</option>
                        <option>City Ride</option>
                        <option>Hourly Rental</option>
                      </select>
                      <span className="input-icon">
                      <LuHeartHandshake size={16} />
                      </span>
                   </div>

                  
              </div>
              <div className="col-md-4 placholder">
              <label className="form-label required">Passengers/Luggage *</label>
              <div className="input-group-custom">
                      <select
                        className="form-control-custom"
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleChange}
                      >
                        <option value="">Select Passenger(s)</option>
                        <option>Luxury SUV</option>
                        <option>Sedan</option>
                        <option>Van</option>
                      </select>
                      <span className="input-icon">
                      <RiUser6Line size={16} />
                      </span>
                </div>
              </div>



              <div className="col-md-4 placholder">
                
                    <div className="input-group-custom">
                      <input
                        type="text"
                        className="form-control-custom"
                        name="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleChange}
                        placeholder="--:--"
                      />
                      <span className="input-icon">
                      <GoClock size={16} />
                      </span>
                    </div>
                   </div>
                   <div className="col-md-4 placholder">
            
              <div className="input-group-custom">
                      <select
                        className="form-control-custom"
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleChange}
                      >
                        <option value="">Select Vehicle</option>
                        <option>Luxury SUV</option>
                        <option>Sedan</option>
                        <option>Van</option>
                      </select>
                      <span className="input-icon">
                      <PiCarLight />
                      </span>
                </div>
              </div>

              {/* Passengers/Luggage */}
              <div className="col-4 mb-3 placholder">
               
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group-custom">
                      <select
                        className="form-control-custom"
                        name="passengers"
                        value={formData.passengers}
                        onChange={handleChange}
                      >
                        <option value="">Select Big Luggage</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4+</option>
                      </select>
                      <span className="input-icon">
                      <RiLuggageDepositLine />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group-custom">
                      <select
                        className="form-control-custom"
                        name="passengers"
                        value={formData.passengers}
                        onChange={handleChange}
                      >
                        <option value="">Select Small Luggage</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4+</option>
                      </select>
                      <span className="input-icon">
                      <BsBagDash />
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Client Info */}
              <div className="col-12">
                <h5 className="section-heading">
                  <RiUser6Line className="section-icon" />
                  Client Info
                </h5>
              </div>
              <div className="col-md-4 mb-4">
                <label className="form-label required">First Name</label>
                <div className="input-group-custom">
                  <input
                    type="text"
                    className="form-control-custom"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name or Search existing"
                  />
                  <span className="input-icon">
                  <RiUser6Line />
                  </span>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <label className="form-label required">Last Name</label>
                <div className="input-group-custom">
                <input
                  type="text"
                  className="form-control-custom"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                />
                 <span className="input-icon">
                  <RiUser6Line />
                  </span>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <label className="form-label required">Email</label>
                <div className="input-group-custom">
                  <input
                    type="email"
                    className="form-control-custom"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Client Email"
                  />
                  <span className="input-icon">
                  <AiOutlineMail />
                  </span>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label required">Mobile</label>
                <div className="input-group-custom">
                  <input
                    type="tel"
                    className="form-control-custom"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Client Mobile"
                  />
                  <span className="input-icon">
                  <MdOutlineLocalPhone />
                  </span>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Landline</label>
                <div className="input-group-custom">
                  <input
                    type="tel"
                    className="form-control-custom"
                    name="landline"
                    value={formData.landline}
                    onChange={handleChange}
                    placeholder="Client Landline Number"
                  />
                  <span className="input-icon">
                  <MdOutlineLocalPhone />
                  </span>
                </div>
              </div>
           
              <div className="col-md-6 mb-1">
                <label className="form-label">Client Notes</label>
                <textarea
                  className="form-control-custom textarea-custom"
                  name="clientNotes"
                  value={formData.clientNotes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Add client notes..."
                />
              </div>
              <div className="col-md-6 mb-1">
                <label className="form-label">Admin Notes</label>
                <textarea
                  className="form-control-custom textarea-custom"
                  name="adminNotes"
                  value={formData.adminNotes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Add admin notes..."
                />
              </div>
              <div className="col-md-12">
                <p className='account-type-text'>Account Type:  <a href="#" className="switch-link">Switch To Corporate</a></p>
                 
              </div>

              {/* Passenger/Guest Info */}
              <div className="col-12 mb-3">
                <h5 className="section-heading">   
                  Passenger/Guest Info
                  <RiUserAddLine className="section-icon" />
                </h5>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Passenger Info</label>
                <div className="input-group-custom">
                  <input
                    type="text"
                    className="form-control-custom"
                    name="passengerName"
                    value={formData.passengerName}
                    onChange={handleChange}
                    placeholder="Passenger Name"
                  />
                  <span className="input-icon">
                  <RiUser6Line />
                  </span>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Email</label>
                <div className="input-group-custom">
                  <input
                    type="email"
                    className="form-control-custom"
                    name="passengerEmail"
                    value={formData.passengerEmail}
                    onChange={handleChange}
                    placeholder="Passenger Email"
                  />
                  <span className="input-icon">
                  <AiOutlineMail />
                  </span>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Phone</label>
                <div className="input-group-custom">
                  <input
                    type="tel"
                    className="form-control-custom"
                    name="passengerPhone"
                    value={formData.passengerPhone}
                    onChange={handleChange}
                    placeholder="Passenger Phone"
                  />
                  <span className="input-icon">
                  <MdOutlineLocalPhone />
                  </span>
                </div>
              </div>
              <div className="col-md-6 mb-3 mt-3">
                <label className="form-label">Passenger Notes</label>
                <textarea
                  className="form-control-custom textarea-custom"
                  name="passengerNotes"
                  value={formData.passengerNotes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Add passenger notes..."
                />
              </div>
              <div className="col-md-6 mb-3 mt-3">
                <label className="form-label">Admin Notes</label>
                <textarea
                  className="form-control-custom textarea-custom"
                  name="passengerAdminNotes"
                  value={formData.passengerAdminNotes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Add admin notes..."
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-clear"
                onClick={handleClear}
              >
                <CgTrash />
                <span>Clear Form</span>
              </button>
              <button 
                  className="btn-add-booking"
                
                >
                  + Add New Booking
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewBooking;
