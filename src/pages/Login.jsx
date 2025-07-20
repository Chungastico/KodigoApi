import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt, FaInfoCircle, FaShieldAlt, FaQuestionCircle } from 'react-icons/fa';
import axios from '../utils/axiosInstance';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post('/login', data);

            
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user)); // guardar user

            navigate('/bookings');
        } catch (err) {
            alert('Login incorrecto. Verifica tus credenciales.');
            console.error(err);
    }
};


    return (
        <div className="flex flex-col justify-center items-center min-h-screen w-full bg-amber-900 px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-stone-300">
                <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2 justify-center mb-2">
                    <FaSignInAlt /> Iniciar Sesión
                </h2>
                <p className="text-sm text-gray-700 text-center flex items-center justify-center gap-1 mb-6">
                    <FaInfoCircle className="text-yellow-600" />
                    Ingresa tus credenciales para acceder al sistema
                </p>

                <div className="mb-4">
                    <label className="block text-zinc-900 text-sm mb-1">Correo Electrónico</label>
                    <div className="flex items-center border border-stone-300 rounded-lg px-3 py-2 bg-white">
                        <FaEnvelope className="text-yellow-600 mr-2" />
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            placeholder="johnDoe@gmail.com"
                            className="w-full focus:outline-none text-zinc-900"
                            defaultValue=""
                        />
                    </div>
                    {errors.email && <p className="text-red-600 text-sm mt-1">El correo es obligatorio.</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-zinc-900 text-sm mb-1">Contraseña</label>
                    <div className="flex items-center border border-stone-300 rounded-lg px-3 py-2 bg-white">
                        <FaLock className="text-yellow-600 mr-2" />
                        <input
                            type="password"
                            {...register('password', { required: true })}
                            className="w-full focus:outline-none text-zinc-900"
                            defaultValue="password123"
                        />
                    </div>
                    {errors.password && <p className="text-red-600 text-sm mt-1">La contraseña es obligatoria.</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-yellow-600 text-white font-semibold py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-yellow-700 transition ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                    <FaSignInAlt />
                    {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
                </button>

                <div className="mt-4 text-center text-sm">
                    <p className="flex justify-center items-center gap-1 text-zinc-900">
                        <FaQuestionCircle />
                        ¿Necesitas ayuda?{' '}
                        <a href="#" className="text-yellow-600 hover:underline">
                            Contacta soporte
                        </a>
                    </p>
                </div>
            </form>

            <p className="text-xs text-white mt-4 flex items-center gap-1">
                <FaShieldAlt className="text-white" />
                Este es un sistema seguro. Tus datos están protegidos.
            </p>
        </div>
    );
};

export default LoginPage;