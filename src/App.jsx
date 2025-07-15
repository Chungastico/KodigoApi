import { Routes, Route, Navigate } from 'react-router-dom';
import BookingsList from './pages/Bookings/BookingsList';
import BookingForm from './pages/Bookings/BookingsForm';
import Login from './pages/Login';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/bookings" />} />
            <Route path="/bookings" element={<BookingsList />} />
            <Route path="/bookings/new" element={<BookingForm />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default App;
