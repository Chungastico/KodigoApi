import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-light-beige text-dark-brown p-4">
        <h1 className="text-6xl font-bold text-primary-gold mb-4">404</h1>
        <p className="text-2xl mb-8">Página no encontrada</p>
        <Link to="/" className="bg-dark-brown text-white font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 ease-in-out">Volver al Inicio</Link>
    </div>
    );
};

export default NotFoundPage;