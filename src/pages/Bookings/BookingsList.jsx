// pages/BookingsList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout.jsx";
import { Pencil, Trash2 } from "lucide-react";

const BookingsList = () => {
    const [bookings, setBookings] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(
                    "https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setBookings(res.data);
            } catch (err) {
                console.error("Error al cargar reservas", err);
                alert("Inicia sesión nuevamente.");
            }
        };

        if (token) fetchBookings();
    }, [token]);

    const handleEdit = (id) => {
        navigate(`/bookings/edit/${id}`);
    };

    return (
        <Layout>
            <h2 className="text-2xl font-bold mb-4 text-zinc-800">Reservas</h2>
            <div className="grid gap-4">
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="bg-white rounded-xl shadow p-4 border flex justify-between items-center"
                    >
                        <div>
                            <p className="text-sm"><strong>ID:</strong> {booking.id}</p>
                            <p className="text-sm"><strong>Cliente:</strong> {booking.user || "N/A"}</p>
                            <p className="text-sm"><strong>Alojamiento:</strong> {booking.accomodation || "N/A"}</p>
                            <p className="text-sm"><strong>Fecha:</strong> {booking.check_in_date} - {booking.check_out_date}</p>
                            <p className="text-sm"><strong>Estado:</strong> {booking.status}</p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(booking.id)}
                                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                                title="Editar"
                            >
                                <Pencil size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default BookingsList;
