import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        if (isRegisterMode) {
            if (password !== confirmPassword) {
                setError('Las contraseñas no coinciden.');
                setLoading(false);
                return;
            }
            try {
                const response = await register(username, password);
                setSuccessMessage(response.message || 'Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
                setIsRegisterMode(false); // Vuelve a login después del registro
                setUsername('');
                setPassword('');
                setConfirmPassword('');
            } catch (err) {
                setError(err.message || 'Error al registrar usuario.');
            } finally {
                setLoading(false);
            }
        } else {
            try {
                await login(username, password);
                navigate('/dashboard');
            } catch (err) {
                setError(err.message || 'Error al iniciar sesión.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-light-beige p-4">
            <form onSubmit={handleSubmit} className="bg-accent-cream p-8 rounded-lg shadow-xl w-full max-w-md border border-medium-beige">
                <h2 className="text-3xl font-bold text-dark-brown text-center mb-6">
                    {isRegisterMode ? 'Registrar Cuenta' : 'Iniciar Sesión'}
                </h2>

                {error && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4 text-center">{error}</p>}
                {successMessage && <p className="text-green-600 bg-green-100 p-3 rounded-md mb-4 text-center">{successMessage}</p>}

                <div className="mb-5">
                    <label htmlFor="username" className="block text-dark-brown text-lg font-medium mb-2">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-4 py-3 rounded-lg border border-medium-beige focus:outline-none focus:ring-2 focus:ring-primary-gold bg-white text-dark-brown"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block text-dark-brown text-lg font-medium mb-2">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-3 rounded-lg border border-medium-beige focus:outline-none focus:ring-2 focus:ring-primary-gold bg-white text-dark-brown"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {isRegisterMode && (
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-dark-brown text-lg font-medium mb-2">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-4 py-3 rounded-lg border border-medium-beige focus:outline-none focus:ring-2 focus:ring-primary-gold bg-white text-dark-brown"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className={`w-full bg-primary-gold text-white font-semibold py-3 rounded-lg hover:bg-opacity-90 transition duration-300 ease-in-out ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading
                        ? isRegisterMode
                            ? 'Registrando...'
                            : 'Iniciando...'
                        : isRegisterMode
                        ? 'Registrarse'
                        : 'Entrar'}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setIsRegisterMode(!isRegisterMode);
                        setError('');
                        setSuccessMessage('');
                        setUsername('');
                        setPassword('');
                        setConfirmPassword('');
                    }}
                    className="w-full mt-4 py-3 rounded-lg border border-primary-gold text-primary-gold font-semibold hover:bg-primary-gold hover:text-white transition duration-300 ease-in-out"
                >
                    {isRegisterMode ? 'Volver a Iniciar Sesión' : '¿No tienes cuenta? Regístrate'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
