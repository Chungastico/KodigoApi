import { NavLink } from "react-router-dom";
import { FaHotel, FaClipboardList, FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";

const Sidebar = () => {
    const activeClass = "text-yellow-600 font-semibold";
    const defaultClass = "flex items-center gap-2 text-gray-700 hover:text-yellow-600";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <div className="w-64 bg-white shadow-md p-6 hidden md:flex flex-col justify-between min-h-screen">
            <div>
                <h2 className="text-xl font-bold mb-6 text-gray-700">Panel de Control</h2>
                <nav className="flex flex-col gap-4">
                    <NavLink
                        to="/Accom"
                        className={({ isActive }) => `${defaultClass} ${isActive ? activeClass : ""}`}
                    >
                        <FaHotel /> Alojamientos
                    </NavLink>
                    <NavLink
                        to="/bookings"
                        className={({ isActive }) => `${defaultClass} ${isActive ? activeClass : ""}`}
                    >
                        <FaClipboardList /> Reservaciones
                    </NavLink>
                    <NavLink
                        to="/calendar"
                        className={({ isActive }) => `${defaultClass} ${isActive ? activeClass : ""}`}
                    >
                        <FaCalendarAlt /> Calendario
                    </NavLink>
                </nav>
            </div>

            <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-800"
            >
                <FaSignOutAlt /> Cerrar Sesión
            </button>
        </div>
    );
};

export default Sidebar;
