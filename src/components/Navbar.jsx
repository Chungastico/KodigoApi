import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-800 text-white px-6 py-3 flex gap-4">
            <Link to="/bookings" className="hover:underline">
                Ver Reservaciones
            </Link>
            <Link to="/bookings/new" className="hover:underline">
                Nueva Reservación
            </Link>
        </nav>
    );
};

export default Navbar;
