import { Routes, Route } from 'react-router-dom';
import BookingDashboard from './components/BookingDashboard/BookingDashboard';
import AddNewBooking from './components/AddNewBooking/AddNewBooking';
import Dashboard from './components/Dashboard/Dashboard';
import Drivers from './components/Drivers/Drivers';
import Affilate from './components/Affilate/Affilate';
import Custmors from './components/Custmors/Custmors';
import Feedbacks from './components/Feedbacks/Feedbacks';
import Teams from './components/Teams/Teams';
import Invoicing from './components/Invoicing/Invoicing';
import Emailhistiory from './components/Emailhistiory/Emailhistiory';
import Company from './Setting/Company/Company';
import Preview from './setting/Preview& Instal/Preview';
import Payment from './setting/payment-type/Payment-type';
import Vehicles from './components/Vehicles/Vehicles';
import Discount from './setting/Discount/Discount';
import Revenu from './components/Revenureport/Revenu/Revenu';
import Payroll from './components/Revenureport/Payroll/Payroll';
import Service from './components/usermanage/Service/Service';
import Ratemanage from './components/usermanage/Ratemanage/Ratemanage';
import Additional from './components/usermanage/Additional/Additional';
import Addrates from './components/usermanage/Addrates/Addrates';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/booking" element={<BookingDashboard />} />
      <Route path="/add-booking" element={<AddNewBooking />} />
      <Route path="/drivers" element={<Drivers />} />
      <Route path="/affiliate" element={<Affilate />} />
      <Route path="/customers" element={<Custmors />} />
      <Route path="/feedbacks" element={<Feedbacks />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/invoices" element={<Invoicing />} />
      <Route path="/mail-history" element={<Emailhistiory />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/settings/company" element={<Company />} />
      <Route path="/settings/discounts" element={<Discount />} />
      <Route path="/settings/preview" element={<Preview />} />
      <Route path="/settings/payment-type" element={<Payment />} />
      <Route path="/revenue/revenue" element={<Revenu />} />
      <Route path="/revenue/payroll" element={<Payroll />} />
      <Route path="/user-manage/service" element={<Service />} />
      <Route path="/user-manage/ratemanage" element={<Ratemanage />} />
      <Route path="/user-manage/additional" element={<Additional />} />
      <Route path="/user-manage/addrates" element={<Addrates />} />
    </Routes>
  );
}

export default App;

