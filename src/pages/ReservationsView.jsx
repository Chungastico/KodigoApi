import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, isWithinInterval } from "date-fns";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout.jsx";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function ReservationsView() {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const [roomType, setRoomType] = useState("Standard Room");
    const [guests, setGuests] = useState(1);
    const [email, setEmail] = useState("");
    const [bookedRanges, setBookedRanges] = useState([]);
    const [accommodations, setAccommodations] = useState([]);
    const [selectedAccommodation, setSelectedAccommodation] = useState("");

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const res = await axios.get(
                    "https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setAccommodations(res.data);
            } catch (err) {
                console.error("Error cargando alojamientos", err);
                alert("Error cargando alojamientos. Inicia sesión nuevamente.");
                navigate("/login");
            }
        };

        if (token) fetchAccommodations();
        else {
            alert("Sesión no encontrada. Inicia sesión nuevamente.");
            navigate("/login");
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(
                    "https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const ranges = res.data.map((item) => ({
                    start: new Date(item.start),
                    end: new Date(item.end),
                }));
                setBookedRanges(ranges);
            } catch (error) {
                console.error("Error cargando reservas:", error);
                alert("Error cargando reservas. Inicia sesión nuevamente.");
                navigate("/login");
            }
        };

        if (token) fetchBookings();
    }, [token, navigate]);

    const isDayBlocked = (date) => {
        return bookedRanges.some((range) =>
            isWithinInterval(date, { start: range.start, end: range.end })
        );
    };

    const handleSubmit = async () => {
        if (!selectedAccommodation) {
            alert("Selecciona un alojamiento antes de continuar.");
            return;
        }

        const days = Math.ceil((state[0].endDate - state[0].startDate) / (1000 * 60 * 60 * 24)) || 1;

        const data = {
            accomodation_id: selectedAccommodation,
            booking: "pending",
            check_in_date: format(state[0].startDate, "yyyy-MM-dd"),
            check_out_date: format(state[0].endDate, "yyyy-MM-dd"),
            total_amount: days * 100,
        };

        try {
            await axios.post(
                "https://apibookingsaccomodations-production.up.railway.app/api/V1/booking",
                data,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Reserva creada exitosamente.");
            navigate("/bookings");
        } catch (error) {
            console.error("Error al crear la reserva:", error);
            alert("Error al crear la reserva: " + JSON.stringify(error.response?.data?.errors || error.message));
        }
    };

    return (
        <Layout>
            <h2 className="text-2xl font-bold mb-6 text-zinc-800">Reservar Alojamiento</h2>

            <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl">
                {/* Calendario */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-stone-300">
                    <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                        rangeColors={["#facc15"]}
                        minDate={new Date()}
                        disabledDay={(date) => isDayBlocked(date)}
                    />
                </div>

                {/* Formulario */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-stone-300 w-full max-w-md">
                    <h2 className="text-xl font-bold text-zinc-900 mb-4">Detalles de la Reserva</h2>

                    <label className="block text-sm font-semibold text-zinc-900 mb-1">Tipo de habitación</label>
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {["Standard Room", "Deluxe Room", "Suite"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setRoomType(type)}
                                className={`px-4 py-2 rounded border text-sm transition ${
                                    roomType === type
                                        ? "bg-yellow-600 text-white border-yellow-600"
                                        : "bg-white text-zinc-800 border-stone-300 hover:bg-stone-100"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <label className="block text-sm font-semibold text-zinc-900 mb-1">Huéspedes</label>
                    <input
                        type="number"
                        min="1"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        placeholder="Número de huéspedes"
                    />

                    <label className="block text-sm font-semibold text-zinc-900 mb-1">Correo electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        placeholder="you@example.com"
                    />

                    <label className="block text-sm font-semibold text-zinc-900 mb-1">Alojamiento</label>
                    <select
                        value={selectedAccommodation}
                        onChange={(e) => setSelectedAccommodation(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    >
                        <option value="">Selecciona un alojamiento</option>
                        {accommodations.map((acc) => (
                            <option key={acc.id} value={acc.id}>
                                {acc.name}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-md transition"
                    >
                        Reservar ahora
                    </button>
                </div>
            </div>
        </Layout>
    );
}
