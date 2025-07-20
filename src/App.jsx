// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import BookingsList from './pages/Bookings/BookingsList';
import BookingForm from './pages/Bookings/BookingsForm';
import Login from './pages/Login';
import ReservationsView from './pages/ReservationsView';
import EditAccom from './pages/Accomodations/EditAccom';
import RegisterAccom from './pages/Accomodations/RegisterAccom';
import SeeAccom from './pages/Accomodations/Accomodations';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Routes>
            {/* Ruta pública */}
            <Route path="/" element={<Login />} />

            {/* Rutas protegidas */}
            <Route path="/bookings" element={<ProtectedRoute><BookingsList /></ProtectedRoute>} />
            <Route path="/bookings/register" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><ReservationsView /></ProtectedRoute>} />
            <Route path="/Accom" element={<ProtectedRoute><SeeAccom /></ProtectedRoute>} />
            <Route path="/Accom/edit/:id" element={<ProtectedRoute><EditAccom /></ProtectedRoute>} />
            <Route path="/Accom/register" element={<ProtectedRoute><RegisterAccom /></ProtectedRoute>} />
        </Routes>
    );
}

export default App;
