import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Content() {
    const {type, id} = useParams();
    const [data, setData] = useState<any>({});
    useEffect(() => {
        axios.get(`http://localhost:3001/getMovie/${id}`).then(resp => {
            setData(resp.data);
        });
    }, []);
    return (
        <div className="row p-4 bg-dark">
            {
                data ? 
                <>
                <div className="col-md-6">
                    <img src={data.Poster} className="img-fluid rounded" alt="Nema slike" />
                </div>
                <div className="col-md-6">
                    <h1 className="mb-4">{data.Title}</h1>
                    <h5>{data.Plot}</h5>
                    <div className="mt-4">
                        <a href={`https://www.imdb.com/title/${data.imdbID}`} className="text-decoration-none">
                            <button type="button" className="btn btn-warning btn-lg">IMDb</button>
                        </a>
                    </div>
                    <div className="mt-4">
                        <h3>Detalji o filmu:</h3>
                        <ul className="list-group bg-dark mt-4">
                            <span><strong>Godina:</strong> {data.Year}</span>
                            <hr />
                            <span><strong>Datum izlaska:</strong> {data.Released}</span>
                            <hr />
                            <span><strong>Trajanje:</strong> {data.Runtime}</span>
                            <hr />
                            <span><strong>Žanrovi:</strong> {data.Genre}</span>
                            <hr />
                            <span><strong>Direktor:</strong> {data.Director}</span>
                            <hr />
                            <span><strong>Glumci:</strong> {data.Actors}</span>
                            <hr />
                            <span><strong>IMDb ocjena:</strong> {data.imdbRating}</span>
                            <hr />
                        </ul>
                    </div>
                </div>
                </>
                : <p>loading</p>
                }
        </div>
    );
}