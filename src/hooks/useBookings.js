import { useState, useCallback } from 'react';
import axios from '../utils/axiosInstance'; // Ajusta la ruta si usas un axios configurado

/**
 * Hook para gestionar reservas:
 * - bookings: lista de reservaciones
 * - isLoading: estado de carga
 * - error: errores en las llamadas
 * - getBookings: carga todas las reservas
 * - cancelBooking: cancela una reserva por ID
 */
export default function useBookings() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Obtiene todas las reservaciones
     */
    const getBookings = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
        const response = await axios.get('/bookings'); 
        setBookings(response.data);
        } catch (err) {
        setError(err);
        } finally {
        setIsLoading(false);
        }
    }, []);

    /**
     * Cancela una reservación por ID
     */
    const cancelBooking = useCallback(async (id) => {
        setIsLoading(true);
        setError(null);
        try {
        // Ajusta el método según tu API: DELETE o PUT
        await axios.delete(`/bookings/${id}/cancel`);
        // Actualiza estado localmente (optimistic update)
        setBookings((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
        setError(err);
        } finally {
        setIsLoading(false);
        }
    }, []);

    return {
        bookings,
        isLoading,
        error,
        getBookings,
        cancelBooking,
    };
}
