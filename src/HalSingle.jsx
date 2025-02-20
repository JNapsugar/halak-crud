import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DotLoader } from "react-spinners";

export const HalSingle = () => {
    const { halId } = useParams();
    const [hal, setHal] = useState({});
    const [isPending, setPending] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            setPending(true);
            try {
                const response = await axios.get(`https://localhost:7067/api/Halak/${halId}`);
                if (response.data.kep) {
                    const base64Image = `data:image/png;base64,${response.data.kep}`;
                    setHal({ ...response.data, kep: base64Image });
                } else {
                    setHal(response.data);
                }
            } catch (error) {
                console.error('Hiba történt a hal adatainak betöltésekor:', error);
            } finally {
                setPending(false);
            }
        };

        fetchData();
    }, [halId]);

    const deleteHal = () => {
        if (window.confirm("Biztosan törlöd ezt a halat?")) {
            axios.delete(`https://localhost:7067/api/Halak/${hal.id}`)
                .then(() => {
                    navigate('/');
                })
                .catch(error => {
                    console.error('Hiba történt a hal törlésekor:', error);
                    alert('Hiba történt a hal törlésénél');
                });
        }
    };

    return (
        <div className="single-container">
            {isPending || !hal ? (
                <DotLoader color="#7D3C98" size={50} />
            ) : (
                <div className="single-card">
                    <h3 className="single-title">{hal.nev}</h3>
                    <img src={hal.kep} alt={hal.nev} className="single-image" />
                    <p className="single-description">{hal.faj}</p>
                    <p className="single-description">Méret: {hal.meretCm} cm</p>
                    <div className="button-group">
                        <Link to="/" className="back-button">⬅️</Link>
                        <Link to={`/mod-hal/${hal.id}`} className="edit-button">✏️</Link>
                        <button onClick={deleteHal} className="delete-button">🗑️</button>
                    </div>
                </div>
            )}
        </div>
    );
};
