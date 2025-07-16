import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, isWithinInterval } from "date-fns";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
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

    //Cargar alojamientos disponibles
    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const res = await axios.get(
                    "https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setAccommodations(res.data);
            } catch (err) {
                console.error("Error cargando alojamientos", err);
                alert("Error cargando alojamientos. Inicia sesión nuevamente.");
                navigate("/login");
            }
        };

        if (token) {
            fetchAccommodations();
        } else {
            alert("Sesión no encontrada. Inicia sesión nuevamente.");
            navigate("/login");
        }
    }, [token, navigate]);

    //Cargar reservas existentes para bloquear fechas
    useEffect(() => {
    const fetchBookings = async () => {
        try {
            const response = await axios.get(
                "https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("Respuesta cruda de la API de bookings:", response.data);

            const ranges = response.data.map((item) => ({
                start: new Date(item.start),
                end: new Date(item.end),
            }));

            console.log("Fechas bloqueadas cargadas:", ranges);
            setBookedRanges(ranges);
        } catch (error) {
            console.error("Error cargando reservas:", error);
            alert("Error cargando reservas. Inicia sesión nuevamente.");
            navigate("/login");
        }
    };

    if (token) {
        fetchBookings();
    }
}, [token, navigate]);


    //Bloqueo de fechas
    const isDayBlocked = (date) => {
        if (!bookedRanges || bookedRanges.length === 0) {
            return false; // Permitir fechas si no hay rangos cargados aún
        }
        return bookedRanges.some((range) =>
            isWithinInterval(date, { start: range.start, end: range.end })
        );
    };

    //Enviar reserva y redirigir
    const handleSubmit = async () => {
        if (!selectedAccommodation) {
            alert("Selecciona un alojamiento antes de continuar.");
            return;
        }

        const days = Math.ceil(
            (state[0].endDate - state[0].startDate) / (1000 * 60 * 60 * 24)
        ) || 1;

        const data = {
            accomodation_id: selectedAccommodation,
            booking: "pending",
            check_in_date: format(state[0].startDate, "yyyy-MM-dd"),
            check_out_date: format(state[0].endDate, "yyyy-MM-dd"),
            total_amount: days * 100, // Ajusta según tarifa real
        };

        try {
            await axios.post(
                "https://apibookingsaccomodations-production.up.railway.app/api/V1/booking",
                data,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert("Reserva creada exitosamente.");
            navigate("/bookings"); // redirige al listado tras reservar
        } catch (error) {
            console.error("Error al crear la reserva:", error);
            alert(
                "Error al crear la reserva: " +
                JSON.stringify(error.response?.data?.errors || error.message)
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#fdfaf5] flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-bold mb-8">Make a Reservation</h1>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Calendario */}
                <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    rangeColors={["#f5b041"]}
                    minDate={new Date()}
                    disabledDay={(date) => isDayBlocked(date)}
                />

                {/* Formulario */}
                <div className="flex flex-col gap-4 max-w-xs w-full">
                    <h2 className="text-lg font-semibold">Room Type</h2>
                    <div className="flex gap-2 flex-wrap">
                        {["Standard Room", "Deluxe Room", "Suite"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setRoomType(type)}
                                className={`px-4 py-2 rounded border text-sm ${
                                    roomType === type
                                        ? "bg-yellow-400 text-white border-yellow-400"
                                        : "bg-white text-black border-gray-400"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <label className="mt-4 text-lg font-semibold">Guests</label>
                    <input
                        type="number"
                        min="1"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="border border-gray-400 p-2 rounded w-full"
                        placeholder="Number of guests"
                    />

                    <label className="mt-2 text-lg font-semibold">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-400 p-2 rounded w-full"
                        placeholder="you@example.com"
                    />

                    <label className="mt-2 text-lg font-semibold">Accommodation</label>
                    <select
                        value={selectedAccommodation}
                        onChange={(e) => setSelectedAccommodation(e.target.value)}
                        className="border border-gray-400 p-2 rounded w-full"
                    >
                        <option value="">Select accommodation</option>
                        {accommodations.map((acc) => (
                            <option key={acc.id} value={acc.id}>
                                {acc.name}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleSubmit}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded mt-6"
                    >
                        Check Availability
                    </button>
                </div>
            </div>
        </div>
    );
}
