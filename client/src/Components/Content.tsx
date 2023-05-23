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
                <div className="col-sm-5">
                    <img src={data.Poster} style={{width: "-webkit-fill-available"}} alt="Nema slike"/>
                </div>
                <div className="col-sm-7 p-4">
                    <h1 className="mb-4">{data.Title}</h1>
                    <h5>{data.Plot}</h5>
                    <a href={`https://www.imdb.com/title/${data.imdbID}`} style={{textDecoration: "none"}}>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button type="button" className="btn btn-warning btn-lg">IMDb</button>
                        </div>
                    </a>
                </div>
                <p>
                    <h3>Žanrovi: {data.Genre}</h3>
                    <h3>Glumci: {data.Actors}</h3>
                    Direktor: {data.Director}<br/>
                    Duljina filma: {data.Runtime}<br/>
                    Datum izlaska: {data.Released}<br/>
                    Država: {data.Country}<br/>
                    Jezik: {data.Language}<br/>
                    Zarada: {data.BoxOffice}<br/>
                    IMDb ocjena: {data.imdbRating}<br/>
                    Opis: {data.Plot}</p>
                </>
                : <p>loading</p>
                }
        </div>
    );
}