import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Accomodations from "../../hooks/AccomServices";

export default function EditAccom() { //edita la informacion sobre los alojamientos disponibles
    const { register, handleSubmit, setValue } = useForm();
    const { AccomId } = useParams();

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
            const response = await Accomodations.getAccomodationById(AccomId);
            if (response) { // Verifica que la respuesta tenga datos
                setValue("id", response.id);
                setValue("name", response.name);
                setValue("description", response.description);
                setValue("address", response.address);
            }
        };
        fetchAccomId();
    }, [AccomId, setValue]);

    const saveData = async (data) => {
        try {
            const updated = await Accomodations.updateAccomodation(data, AccomId);
            console.log("Alojamiento actualizado:", updated); // Verifica que se haya actualizado correctamente
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };

    return (
        <div>
            <h1>Edita tu Alojamiento!!</h1>
            <form onSubmit={handleSubmit(saveData)}>
                <div>
                    <label>Id</label>
                    <input type="text" {...register("id")} disabled />
                </div>
                <div>
                    <label>Nombre</label>
                    <input type="text" {...register("name")} />
                </div>
                <div>
                    <label>Descripción</label>
                    <input type="text" {...register("description")} />
                </div>
                <div>
                    <label>Dirección</label>
                    <input type="text" {...register("address")} />
                </div>
                <div>
                    <input type="submit" value="Guardar Datos" />
                </div>
            </form>
        </div>
    );
}
