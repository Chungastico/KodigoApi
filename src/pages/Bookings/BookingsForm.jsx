import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from '../../utils/axiosInstance'; // Ajusta la ruta si usas un axios configurado

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
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-xl mx-auto bg-white shadow rounded space-y-4">
            <h2 className="text-xl font-bold">Crear Nueva Reservación</h2>

            <div>
                <label className="block mb-1">Nombre del huésped</label>
                <input
                    type="text"
                    {...register('guestName')}
                    className="w-full border px-3 py-2 rounded"
                />
                {errors.guestName && <p className="text-red-500">{errors.guestName.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Correo electrónico</label>
                <input
                    type="email"
                    {...register('email')}
                    className="w-full border px-3 py-2 rounded"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Teléfono</label>
                <input
                    type="text"
                    {...register('phone')}
                    className="w-full border px-3 py-2 rounded"
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Alojamiento</label>
                <select
                    {...register('accommodationId')}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="">Selecciona un alojamiento</option>
                    {accommodations.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                            {acc.name}
                        </option>
                    ))}
                </select>
                {errors.accommodationId && <p className="text-red-500">{errors.accommodationId.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Fecha de inicio</label>
                <input
                    type="date"
                    {...register('startDate')}
                    className="w-full border px-3 py-2 rounded"
                />
                {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Fecha de fin</label>
                <input
                    type="date"
                    {...register('endDate')}
                    className="w-full border px-3 py-2 rounded"
                />
                {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {isSubmitting ? 'Enviando...' : 'Crear Reservación'}
            </button>
        </form>
    );
};

export default BookingForm;
