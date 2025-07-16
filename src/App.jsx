import { Routes, Route, Navigate } from 'react-router-dom';
import BookingsList from './pages/Bookings/BookingsList';
import BookingForm from './pages/Bookings/BookingsForm';
import Login from './pages/Login';
EditAccom
RegisterAccom
SeeAccom
import ReservationsView from './pages/ReservationsView';
import EditAccom from './pages/Accomodations/EditAccom';
import RegisterAccom from './pages/Accomodations/RegisterAccom';
import SeeAccom from './pages/Accomodations/Accomodations';
import styled from "styled-components";


function App() {
    return (

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/bookings" element={<BookingsList />} />
            <Route path="/bookings/new" element={<BookingForm />} />
            <Route path="/reservations" element={<ReservationsView />} />
            {/* Rutas para alojamientos */}
            <Route path='/Accom' element={<SeeAccom/>}/> {/*ver alojamientos */}
            <Route path='/Accom/edit/:id' element={<EditAccom/>}/>{/*editar alojamientos */}
            <Route path='/Accom/register' element={<RegisterAccom/>}/>{/*registrar un nuevo alojamientos */}
        </Routes>
    );
}

export default App;
