import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Accomodations from "../../hooks/AccomServices";


export default function EditAccom() { //edita la informacion sobre los alojamientos disponibles
    const { register, handleSubmit, setValue } = useForm();
    const { id } = useParams();
    const [updateSuccess, setUpdateSuccess] = useState(false);


    const [accomList, setAccomList] = useState([]);

    useEffect(() => {
        Accomodations.getAccomodations()
            .then((data) => {
                console.log("Lista completa de alojamientos:", data);
                setAccomList(data);
            })
            .catch((error) => {
                console.error("Error al obtener alojamientos:", error);
            });
    }, []);

    useEffect(() => {
        const fetchAccomId = async () => {
            const response = await Accomodations.getAccomodationById(id);
            if (response) { // Verifica que la respuesta tenga datos
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
            const updated = await Accomodations.updateAccomodation(data, id);
            console.log("Alojamiento actualizado:", updated);
            setUpdateSuccess(true); // activa la alerta

            setTimeout(() => {
                navigate("/Accom"); // redirige después de unos segundos
            }, 1500); // 1.5 segundos de espera
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };
    const handleLinkClick = () => {
        handleSubmit(saveData)();
    };
    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Edita tu Alojamiento!!</h1>
            {updateSuccess && (
                <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 border border-green-300 text-center animate-fade">
                    Alojamiento actualizado con éxito.
                </div>
            )}

            <form onSubmit={handleSubmit(saveData)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Id</label>
                    <input
                        type="text"
                        {...register("id")}
                        readOnly
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 text-gray-600 border border-gray-300 rounded-md cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        {...register("name")}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <input
                        type="text"
                        {...register("description")}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input
                        type="text"
                        {...register("address")}
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
