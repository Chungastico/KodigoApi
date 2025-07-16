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
        <div>
            <h1>Registrar nuevo alojamiento!!</h1>

            <form onSubmit={handleSubmit(saveData)}> {/* Formulario para registrar un nuevo alojamiento */}
                <div>
                    <label>Nombre</label>
                    <input type="text" {...register('name')} />
                </div>
                <div>
                    <label>Descripción</label>
                    <input type="text" {...register('description')} />
                </div>
                <div>
                    <label>Dirección</label>
                    <input type="text" {...register('address')} />
                </div>
                <div>
                    <input type="submit" value="Guardar Datos" />
                </div>
            </form>
        </div>
    );
}
