import { FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Topbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isAccom = location.pathname.startsWith("/Accom");
    const isBooking = location.pathname.startsWith("/bookings");

    // Título dinámico
    const pageTitle = isAccom ? "Alojamientos" : isBooking ? "Reservaciones" : "Panel";

    // Lógica del botón (solo mostrar en alojamientos)
    const handleClick = () => {
        if (isAccom) navigate("/Accom/register");
        if (isBooking) navigate("/bookings/register");
    };

    const showButton = isAccom || isBooking;

    return (
        <header className="bg-amber-800 text-white py-3 px-6 shadow-md flex justify-between items-center">
            <h1 className="text-lg font-semibold">{pageTitle}</h1>

            {showButton && (
                <button
                    onClick={handleClick}
                    className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1.5 rounded shadow-sm text-sm"
                >
                    <FaPlus />
                    {isAccom ? "Nuevo Alojamiento" : "Nueva Reserva"}
                </button>
            )}
        </header>
    );
};

export default Topbar;
