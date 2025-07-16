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
                    <div key={item.id}>
                        <h4>{item.name}</h4>
                        <p><b>Descripción:</b> {item.description}</p>
                        <p><b>Dirección:</b> {item.address}</p>
                        <Link to={`/accommodation/${item.id}`}>Editar Alojamiento</Link>
                    </div>
                ))}
            </section>
        </Container>
    );
}
