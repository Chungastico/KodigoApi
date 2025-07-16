import { Routes, Route, Navigate } from 'react-router-dom';
import BookingsList from './pages/Bookings/BookingsList';
import BookingForm from './pages/Bookings/BookingsForm';
import Login from './pages/Login';

import ReservationsView from './pages/ReservationsView';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/bookings" />} />
            <Route path="/bookings" element={<BookingsList />} />
            <Route path="/bookings/new" element={<BookingForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reservations" element={<ReservationsView />}/>
        </Routes>
    );
}

export default App;
