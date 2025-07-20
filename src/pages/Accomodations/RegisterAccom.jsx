import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Accomodations from '../../hooks/AccomServices';
import { FaArrowLeft } from 'react-icons/fa';

export default function RegisterAccom() {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const saveData = async (data) => {
        console.log("Datos enviados al backend:", data);

        const response = await Accomodations.createAccomodation(data);
        if (data?.name && data?.address) {
            alert(`Registro exitoso: ${data.name} en ${data.address}`);
            reset();
        } else {
            alert("Registro completado, pero la respuesta no contiene los campos esperados.");
            console.log("Contenido completo de data:", data);
        }
    };

    return (
        <div className="min-h-screen bg-amber-900 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8 border border-stone-300 relative">
                {/* Botón de regreso */}
                <button
                    onClick={() => navigate('/Accom')}
                    className="absolute -top-4 left-4 bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-1.5 rounded flex items-center gap-2 shadow"
                >
                    <FaArrowLeft size={14} />
                    Volver
                </button>

                <h1 className="text-2xl font-bold mb-6 text-zinc-900 text-center mt-2">
                    Registrar nuevo alojamiento
                </h1>

                <form onSubmit={handleSubmit(saveData)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            {...register('name')}
                            placeholder="Nombre del alojamiento"
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-1">
                            Descripción
                        </label>
                        <input
                            type="text"
                            {...register('description')}
                            placeholder="Descripción breve"
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-1">
                            Dirección
                        </label>
                        <input
                            type="text"
                            {...register('address')}
                            placeholder="Dirección completa"
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-600 text-white py-2 rounded-md font-semibold hover:bg-yellow-700 transition"
                        >
                            Guardar Datos
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
