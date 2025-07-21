import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/layout.jsx";

export default function BookingEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [booking, setBooking] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await axios.get(
                    `https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const found = res.data.find((b) => String(b.id) === id);
                if (!found) throw new Error("Reserva no encontrada");
                setBooking(found);
                setStatus(found.status);
            } catch (err) {
                console.error("Error obteniendo reserva", err);
                alert("Reserva no encontrada o error de autenticación");
                navigate("/bookings");
            }
        };

        if (token) fetchBooking();
        else {
            alert("No has iniciado sesión");
            navigate("/login");
        }
    }, [id, token, navigate]);

    const handleUpdate = async () => {
        try {
            await axios.patch(
                `https://apibookingsaccomodations-production.up.railway.app/api/V1/status_booking/${id}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Reserva actualizada correctamente");
            navigate("/bookings");
        } catch (err) {
            console.error("Error actualizando reserva", err);
            alert("Error al actualizar: " + JSON.stringify(err.response?.data || err.message));
        }
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 border border-stone-300">
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">Editar Estado de la Reserva</h2>

                {!booking ? (
                    <p>Cargando reserva...</p>
                ) : (
                    <>
                        <p><strong>ID:</strong> {booking.id}</p>
                        <p><strong>Cliente:</strong> {booking.user}</p>
                        <p><strong>Alojamiento:</strong> {booking.accomodation}</p>
                        <p><strong>Fecha:</strong> {booking.check_in_date} - {booking.check_out_date}</p>
                        <p><strong>Estado actual:</strong> {booking.status}</p>

                        <div className="mt-6">
                            <label className="block text-sm font-semibold text-zinc-900 mb-1">Nuevo estado</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-stone-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                            >
                                <option value="PENDING">PENDING</option>
                                <option value="CONFIRMED">CONFIRMED</option>
                                <option value="CANCELLED">CANCELLED</option>
                                <option value="COMPLETED">COMPLETED</option>
                            </select>

                            <button
                                onClick={handleUpdate}
                                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-md transition"
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}
