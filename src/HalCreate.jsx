import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

export const HalCreate = () => {
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("nev", event.target.nev.value);
        formData.append("faj", event.target.faj.value);
        formData.append("meret_cm", event.target.meret_cm.value);
        formData.append("to_id", event.target.to_id.value);
        formData.append("to", null);
        formData.append("fogasoks", []);
        if (event.target.kep.files[0]) {
            formData.append("kep", event.target.kep.files[0]);
        }

        try {
            await axios.post("https://localhost:7067/api/Halak", formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("A hal felvétele sikeres volt!");
            navigate("/");
        } catch (error) {
            console.error("Hiba történt:", error);
        }
    };

    return (
        <div className="create-container">
            <h2 className="create-title">Új hal felvétele</h2>
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Név:</label>
                    <input type="text" name="nev" className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Faj:</label>
                    <input type="text" name="faj" className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Méret(cm):</label>
                    <input type="number" name="meret_cm" className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Tó id:</label>
                    <input type="number" name="to_id" className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Kép feltöltése:</label>
                    <input type="file" name="kep" className="form-control" accept="image/*" />
                </div>
                <button type="submit" className="submit-button">Felvitel</button>
            </form>
        </div>
    );
};
