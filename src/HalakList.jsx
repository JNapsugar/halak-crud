import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DotLoader } from "react-spinners";
import "./style.css";

export const HalakList = () => {
    const [halak, setHalak] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        fetchHalak();
    }, []);

    const fetchHalak = () => {
        setPending(true);
        axios.get("https://localhost:7067/api/Halak")
            .then(response => {
                if (Array.isArray(response.data)) {
                    const halakWithImages = response.data.map(hal => ({
                        ...hal,
                        kep: hal.kep ? `data:image/png;base64,${hal.kep}` : null,
                    }));
                    setHalak(halakWithImages);
                } else {
                    console.error("Hibás válaszformátum:", response.data);
                }
            })
            .catch(error => console.error("Hiba történt:", error))
            .finally(() => setPending(false));
    };

    const deleteHal = (id) => {
        if (window.confirm("Biztosan törlöd ezt a halat?")) {
            axios.delete(`https://localhost:7067/api/Halak/${id}`)
                .then(() => {
                    setHalak(halak.filter(hal => hal.id !== id));
                })
                .catch(error => console.error("Hiba történt a törlésnél:", error));
        }
    };

    return (
        <div className="container">
            {isPending ? (
                <div className="loading">
                    <DotLoader color="#007BFF" size={50} />
                </div>
            ) : (
                <div className="grid-container">
                    {halak.map((hal) => (
                        <div className="card" key={hal.id}>
                                <img src={hal.kep} alt={hal.nev} className="fish-image" />
                            <h3 className="fish-title">{hal.nev}</h3>
                            <p className="fish-details">{hal.faj} cm</p>
                            <p className="fish-details">Méret: {hal.meretCm} cm</p>
                            <div className="button-group">
                                <Link to={`/halak/${hal.id}`} className="details-button">📄</Link>
                                <Link to={`/mod-hal/${hal.id}`} className="edit-button">✏️</Link>
                                <button onClick={() => deleteHal(hal.id)} className="delete-button">🗑️</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
