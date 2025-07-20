import React from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return <div className="text-center p-8 text-dark-brown">Cargando usuario...</div>;

    return (
    <div className="min-h-screen bg-light-beige text-dark-brown p-8">
        <div className="max-w-4xl mx-auto bg-accent-cream p-8 rounded-lg shadow-xl border border-medium-beige">
        <h1 className="text-4xl font-bold text-dark-brown mb-6">Bienvenido, {user.username}!</h1>
        <p className="text-xl mb-8">Tu rol: <span className="font-semibold text-primary-gold">{user.role}</span></p>
        <button onClick={handleLogout} className="bg-dark-brown text-white font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 ease-in-out">Cerrar Sesión</button>
        </div>
    </div>
    );
};

export default DashboardPage;