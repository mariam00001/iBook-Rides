import { Routes, Route, Navigate } from 'react-router-dom';
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
import Company from './setting/Company/Company';
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
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import { getAuth } from './auth/authStorage';

function RootRedirect() {
  const auth = getAuth();
  if (!auth) return <Navigate to="/login" replace />;
  if (auth.role === 'admin') return <Navigate to="/admin" replace />;
  return <Navigate to="/home" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RootRedirect />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <BookingDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-booking"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <AddNewBooking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/drivers"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Drivers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/affiliate"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Affilate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Custmors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedbacks"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Feedbacks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teams"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Teams />
          </ProtectedRoute>
        }
      />
      <Route
        path="/invoices"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Invoicing />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mail-history"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Emailhistiory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vehicles"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Vehicles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/company"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Company />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/discounts"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Discount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/preview"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Preview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/payment-type"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/revenue/revenue"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Revenu />
          </ProtectedRoute>
        }
      />
      <Route
        path="/revenue/payroll"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Payroll />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-manage/service"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Service />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-manage/ratemanage"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Ratemanage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-manage/additional"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Additional />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-manage/addrates"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Addrates />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
