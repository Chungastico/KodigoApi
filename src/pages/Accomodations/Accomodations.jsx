import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Accomodations } from "../../hooks/AccomServices";
import Layout from "../../components/layout.jsx";
import { Pencil, Trash2 } from "lucide-react";

const SeeAccom = () => {
    const [accomList, setAccomList] = useState([]);

    const fetchData = async () => {
        const data = await Accomodations.getAccomodations();

        if (Array.isArray(data)) {
            setAccomList(data);
        } else {
            console.warn("La respuesta de getAccomodations no es una lista:", data);
            setAccomList([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = confirm("¿Estás seguro de eliminar este alojamiento?");
        if (!confirmDelete) return;

        try {
            await Accomodations.deleteAccomodation(id);
            setAccomList(accomList.filter((a) => a.id !== id));
            alert("Alojamiento eliminado con éxito.");
        } catch (err) {
            console.error("Error al eliminar alojamiento:", err);
            alert("No se pudo eliminar el alojamiento.");
        }
    };

    return (
        <Layout>
            <h2 className="text-2xl font-bold mb-4 text-zinc-800">Alojamientos</h2>
            <div className="grid gap-4">
                {accomList.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow p-4 border flex justify-between items-start"
                    >
                        <div>
                            <p className="text-sm"><strong>ID:</strong> {item.id}</p>
                            <p className="text-sm"><strong>Nombre:</strong> {item.name || "N/A"}</p>
                            <p className="text-sm"><strong>Descripción:</strong> {item.description || "N/A"}</p>
                            <p className="text-sm"><strong>Dirección:</strong> {item.address || "N/A"}</p>
                        </div>

                        <div className="flex gap-2">
                            <Link
                                to={`/Accom/edit/${item.id}`}
                                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                                title="Editar"
                            >
                                <Pencil size={18} />
                            </Link>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
                                title="Eliminar"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default SeeAccom;
