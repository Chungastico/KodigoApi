import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import Accomodations from "../../hooks/AccomServices";
import { FaArrowLeft } from 'react-icons/fa';

export default function EditAccom() {
    const { register, handleSubmit, setValue } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        const fetchAccomId = async () => {
            const response = await Accomodations.getAccomodationById(id);
            if (response) {
                setValue("id", response.id);
                setValue("name", response.name);
                setValue("description", response.description);
                setValue("address", response.address);
            }
        };
        fetchAccomId();
    }, [id, setValue]);

    const saveData = async (data) => {
        try {
            await Accomodations.updateAccomodation(data, id);
            setUpdateSuccess(true);

            setTimeout(() => {
                navigate("/Accom");
            }, 1500);
        } catch (error) {
            console.error("Error al actualizar:", error);
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
                    Editar Alojamiento
                </h1>

                {updateSuccess && (
                    <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 border border-green-300 text-center">
                        Alojamiento actualizado con éxito.
                    </div>
                )}

                <form onSubmit={handleSubmit(saveData)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-1">ID</label>
                        <input
                            type="text"
                            {...register("id")}
                            readOnly
                            className="w-full px-4 py-2 bg-gray-100 text-gray-600 border border-stone-300 rounded-md cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-1">Nombre</label>
                        <input
                            type="text"
                            {...register("name")}
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-1">Descripción</label>
                        <input
                            type="text"
                            {...register("description")}
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-900 mb-1">Dirección</label>
                        <input
                            type="text"
                            {...register("address")}
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-600 text-white py-2 rounded-md font-semibold hover:bg-yellow-700 transition"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
