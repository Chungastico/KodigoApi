import React from 'react';
import { useForm } from 'react-hook-form';
import Accomodations from '../../hooks/AccomServices'

export default function RegisterAccom() { //registra un nuevo alojamiento

    const { register, handleSubmit, reset } = useForm();


    const saveData = async (data) => {
        console.log("Datos enviados al backend:", data); // verifica los datos

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
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Registrar nuevo alojamiento!!</h1>

            <form onSubmit={handleSubmit(saveData)} className="space-y-4"> {/* Formulario para registrar un nuevo alojamiento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        {...register('name')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <input
                        type="text"
                        {...register('description')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input
                        type="text"
                        {...register('address')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="pt-2">
                    <input
                        type="submit"
                        value="Guardar Datos"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                    />
                </div>
            </form>
        </div>

    );
}
