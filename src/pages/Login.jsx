import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';

const Login = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post('/login', data);
            localStorage.setItem('token', res.data.token);
            navigate('/bookings');
        } catch (err) {
            alert('Login incorrecto. Verifica tus credenciales.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Iniciar sesión</h2>

                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className="w-full border px-3 py-2 rounded"
                        defaultValue="user@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm">El email es requerido</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Contraseña</label>
                    <input
                        type="password"
                        {...register('password', { required: true })}
                        className="w-full border px-3 py-2 rounded"
                        defaultValue="password123"
                    />
                    {errors.password && <p className="text-red-500 text-sm">La contraseña es requerida</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {isSubmitting ? 'Cargando...' : 'Ingresar'}
                </button>
            </form>
        </div>
    );
};

export default Login;
