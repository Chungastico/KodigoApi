import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from '../../utils/axiosInstance';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    guestName: yup.string().required('El nombre del huésped es obligatorio'),
    email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
    phone: yup.string().required('El teléfono es obligatorio'),
    accommodationId: yup.string().required('Selecciona un alojamiento'),
    startDate: yup.string().required('Fecha de inicio obligatoria'),
    endDate: yup.string().required('Fecha de fin obligatoria'),
});

const BookingForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();
    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const res = await axios.get('/accommodations');
                setAccommodations(res.data);
            } catch (err) {
                console.error('Error cargando alojamientos', err);
            }
        };
        fetchAccommodations();
    }, []);

    const onSubmit = async (data) => {
        try {
            await axios.post('/bookings', data);
            alert('Reservación creada exitosamente');
            reset();
        } catch (err) {
            console.error('Error creando reservación', err);
            alert('Hubo un error al crear la reservación');
        }
    };

    return (
        <div className="min-h-screen bg-amber-900 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8 border border-stone-300 relative">
                {/* Botón de regreso */}
                <button
                    onClick={() => navigate('/bookings')}
                    className="absolute -top-4 left-4 bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-1.5 rounded flex items-center gap-2 shadow"
                >
                    <FaArrowLeft size={14} />
                    Volver
                </button>

                <h2 className="text-2xl font-bold mb-6 text-zinc-900 text-center mt-2">
                    Crear Nueva Reservación
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-1">Nombre del huésped</label>
                        <input
                            type="text"
                            {...register('guestName')}
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                        {errors.guestName && <p className="text-red-500 text-sm mt-1">{errors.guestName.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-1">Correo electrónico</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-1">Teléfono</label>
                        <input
                            type="text"
                            {...register('phone')}
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-1">Alojamiento</label>
                        <select
                            {...register('accommodationId')}
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        >
                            <option value="">Selecciona un alojamiento</option>
                            {accommodations.map((acc) => (
                                <option key={acc.id} value={acc.id}>{acc.name}</option>
                            ))}
                        </select>
                        {errors.accommodationId && <p className="text-red-500 text-sm mt-1">{errors.accommodationId.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-1">Fecha de inicio</label>
                        <input
                            type="date"
                            {...register('startDate')}
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                        {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-1">Fecha de fin</label>
                        <input
                            type="date"
                            {...register('endDate')}
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                        {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-yellow-600 text-white py-2 rounded-md font-semibold hover:bg-yellow-700 transition"
                        >
                            {isSubmitting ? 'Enviando...' : 'Crear Reservación'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
