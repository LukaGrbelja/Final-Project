import axios from "axios";
import { useState } from "react";
import MovieCard from "./MovieCard";
import { useParams } from "react-router-dom";

export default function Main() {
    const [formData, setFormData] = useState<any>({ genre: "none", sort: "latest" });
    const [data, setData] = useState<Array<any>>([]);
    const { type } = useParams();
    let handleSubmit = (e: any) => {
        e.preventDefault();
        axios.get(`http://localhost:3001/contentData/${type}/${formData.genre}/${formData.sort}/${1}`)
            .then(res => {
                setData(res.data);
                console.log(res.data);
            });
    }
    return (
        <div className="row p-4 bg-dark">
            <div className="col-12 text-center mb-4 border border-success rounded">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-lg-6">
                        <label htmlFor="passwordInput1" className="form-label">Odaberi žanr</label>
                        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(e) => { setFormData({ ...formData, genre: e.target.value }); }}>
                            <option defaultValue="none">None</option>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                        </select>
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="passwordInput1" className="form-label">Poredaj</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={(e) => { setFormData({ ...formData, sort: "latest" }) }} checked={formData.sort === "latest"} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Po datumu
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={(e) => { setFormData({ ...formData, sort: "rating" }) }} checked={formData.sort === "rating"} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Po ocjeni
                            </label>
                        </div>
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary mb-3">Traži</button>
                    </div>
                </form>
            </div>
            {
                data.length !== 0 ?
                    data.map(
                        (movie: any) =>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={movie._id}>
                                <MovieCard movie={movie} />
                            </div>
                    )
                    :
                    false
            }
        </div>
    );
}