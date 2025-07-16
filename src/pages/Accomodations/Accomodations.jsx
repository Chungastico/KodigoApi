import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Accomodations } from '../../hooks/AccomServices';

const Container = styled.section`  
    margin: 2.5rem 5rem;
    font-family: Tahoma, Geneva, Verdana, sans-serif;
`;
const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.2rem;
`;

export default function SeeAccom() { //muestra los alojamientos disponibles 
    const [accomList, setAccomList] = useState([]);

    // trae los alojamientos reales desde la API
    const fetchData = async () => {
        const data = await Accomodations.getAccomodations();
        console.log(data); // verifica que tenga name, description y address

        if (Array.isArray(data)) {
            setAccomList(data);
        } else {
            console.warn("La respuesta de getAccomodations no es una lista:", data);
            setAccomList([]); // evita errores de map si data no es válida
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <Title>¡Últimos Alojamientos Disponibles!</Title>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque, blanditiis.</p>
            <section>
                {accomList.map((item) => ( //Mostrando datos: id, name, description y address
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {accomList.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition duration-300"
                            >
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h4>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium text-gray-700">Descripción:</span> {item.description}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-medium text-gray-700">Dirección:</span> {item.address}
                                </p>
                                <Link
                                    to={`/Accom/edit/${item.id}`}
                                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Editar Alojamiento
                                </Link>
                            </div>
                        ))}
                    </section>

                ))}
            </section>
        </Container>
    );
}
