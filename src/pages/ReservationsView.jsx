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

    const [accommodations, setAccommodations] = useState([]);
    const [selectedAccommodation, setSelectedAccommodation] = useState("");
    const [bookedRanges, setBookedRanges] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            alert("Sesión no encontrada. Inicia sesión nuevamente.");
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const [accRes, bookRes] = await Promise.all([
                    axios.get("https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setAccommodations(accRes.data);
                const ranges = bookRes.data.map((item) => ({
                    start: new Date(item.check_in_date),
                    end: new Date(item.check_out_date),
                }));
                setBookedRanges(ranges);
            } catch (err) {
                console.error("Error cargando datos:", err);
                alert("Error cargando datos. Inicia sesión nuevamente.");
                navigate("/login");
            }
        };

        fetchData();
    }, [token, navigate]);

    const isDayBlocked = (date) => {
        return bookedRanges.some((range) =>
            isWithinInterval(date, { start: range.start, end: range.end })
        );
    };

    const renderDayContent = (day) => {
        const blocked = isDayBlocked(day);
        return (
            <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    blocked ? "bg-amber-800 text-white font-bold" : ""
                }`}
            >
                {day.getDate()}
            </div>
        );
    };

    const handleSubmit = async () => {
        if (!selectedAccommodation) {
            alert("Selecciona un alojamiento antes de continuar.");
            return;
        }

        const days =
            Math.ceil(
                (state[0].endDate - state[0].startDate) / (1000 * 60 * 60 * 24)
            ) || 1;

        const data = {
            accomodation_id: selectedAccommodation,
            booking: "BK-" + Math.floor(Math.random() * 100000),
            check_in_date: format(state[0].startDate, "yyyy-MM-dd"),
            check_out_date: format(state[0].endDate, "yyyy-MM-dd"),
            total_amount: days * 100,
            user_id: 1, // O usa el ID real si lo tienes disponible
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

    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
            .rdrCalendarWrapper {
                width: 100% !important;
                max-width: none !important;
            }
            .rdrMonths {
                display: flex !important;
                gap: 2rem;
            }
            .rdrMonth {
                width: 100% !important;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <Layout>
            <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md border border-stone-300">
                <div className="mb-6">
                    <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                        rangeColors={["#facc15"]}
                        minDate={new Date()}
                        months={2}
                        direction="horizontal"
                        dayContentRenderer={renderDayContent}
                        className="w-full"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold text-zinc-900 mb-1">
                        Alojamiento
                    </label>
                    <select
                        value={selectedAccommodation}
                        onChange={(e) => setSelectedAccommodation(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    >
                        <option value="">Selecciona un alojamiento</option>
                        {accommodations.map((acc) => (
                            <option key={acc.id} value={acc.id}>
                                {acc.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-md transition"
                >
                    Reservar ahora
                </button>
            </div>
        </Layout>
    );
}
