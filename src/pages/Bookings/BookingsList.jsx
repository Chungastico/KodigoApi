import React, { useEffect } from 'react';
import useBookings from '../../hooks/useBookings';

const BookingsList = () => {
    const {
        bookings,
        isLoading,
        error,
        getBookings,
        cancelBooking
    } = useBookings();

    useEffect(() => {
        getBookings();
    }, [getBookings]);

    const handleCancel = (id) => {
        const confirm = window.confirm('¿Estás seguro de que deseas cancelar esta reservación?');
        if (confirm) {
            cancelBooking(id);
        }
    };

    if (isLoading) {
        return <p>Cargando reservaciones...</p>;
    }

    if (error) {
        return <p>Error al cargar las reservaciones.</p>;
    }

    if (bookings.length === 0) {
        return <p>No hay reservaciones registradas.</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Lista de Reservaciones</h2>
            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div key={booking.id} className="border p-4 rounded shadow bg-white">
                        <p><strong>ID:</strong> {booking.id}</p>
                        <p><strong>Cliente:</strong> {booking.guestName || 'N/A'}</p>
                        <p><strong>Alojamiento:</strong> {booking.accommodationId}</p>
                        <p><strong>Fecha:</strong> {booking.startDate} a {booking.endDate}</p>
                        <button
                            onClick={() => handleCancel(booking.id)}
                            className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Cancelar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingsList;
