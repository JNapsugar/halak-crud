import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './style.css';

export const HalMod = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        nev: '',
        faj: '',
        meret_cm: '',
        to_id: '',
        kep: ''
    });
    const [file, setFile] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:7067/api/Halak/${id}`)
            .then((response) => {
                setFormData({
                    nev: response.data.nev,
                    faj: response.data.faj,
                    meretCm: response.data.meretCm,
                    toId: response.data.toId,
                    kep: response.data.kep || ''
                });
            })
            .catch((error) => console.error("Hiba történt:", error));
    }, [id]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedFormData = new FormData();
        updatedFormData.append("nev", formData.nev);
        updatedFormData.append("faj", formData.faj);
        updatedFormData.append("meretCm", formData.meretCm);
        updatedFormData.append("toId", formData.toId);
        
        if (file) {
            updatedFormData.append("kep", file);
        }
        axios.put(`https://localhost:7067/api/Halak/${id}`, updatedFormData)
        .then(() => {
            alert("A hal adatai sikeresen módosultak!");
            navigate("/");
        })
        .catch((error) => {
            console.error("Hiba történt:", error);
            alert("Hiba történt az adatok mentése során!");
        });
    };
    
    

    return (
        <div className="create-container">
            <h2 className="create-title">Hal módosítása</h2>
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Név:</label>
                    <input 
                        type="text" 
                        name="nev" 
                        className="form-control" 
                        value={formData.nev} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Faj:</label>
                    <input 
                        type="text" 
                        name="faj" 
                        className="form-control" 
                        value={formData.faj} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Méret(cm):</label>
                    <input 
                        type="number" 
                        name="meretCm" 
                        className="form-control" 
                        value={formData.meretCm} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Tó id:</label>
                    <input 
                        type="number" 
                        name="toId" 
                        className="form-control" 
                        value={formData.toId} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Kép módosítása:</label>
                    <input 
                        type="file" 
                        name="kep" 
                        className="form-control" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                    />
                </div>
                <button type="submit" className="submit-button">Módosítás</button>
            </form>
        </div>
    );
};
