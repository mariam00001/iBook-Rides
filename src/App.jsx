import { Routes, Route } from 'react-router-dom';
import BookingDashboard from './components/BookingDashboard/BookingDashboard';
import AddNewBooking from './components/AddNewBooking/AddNewBooking';
import Dashboard from './components/dashboard/Dashboard';
import Drivers from './components/Drivers/Drivers';
import Affilate from './components/Affilate/Affilate';
import Custmors from './components/Custmors/Custmors';
import Feedbacks from './components/Feedbacks/Feedbacks';
import Teams from './components/Teams/Teams';
import Invoicing from './components/Invoicing/Invoicing';
import Emailhistiory from './components/Emailhistiory/Emailhistiory';

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
    </Routes>
  );
}

export default App;

