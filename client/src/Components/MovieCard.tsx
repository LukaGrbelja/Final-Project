import { Link } from "react-router-dom";
import { setCookies, getCookies } from "../Cookies";

export default function MovieCard({movie}: any): JSX.Element {
    const putCookies = (): void => {
        setCookies(movie.Genre);
    }
    return (
        <div className="card bg-dark border-primary me-3" onClick={putCookies} style={{ display: "inline-block", float: "none", width: "15rem", whiteSpace: "normal", verticalAlign: "top", textAlign: "center" }}>
            <img src={movie.Poster} style={{ height: "15rem", width: "10rem" }} className="card-img-top" alt="Nema ponudene slike" />
            <div className="card-body mt-3">
                <h6 className="card-title" style={{ height: "2rem" }}>{movie.Title}</h6>
            </div>
            <ul className="pe-4 me-2">
                <p>IMDd Ocjena: {movie.imdbRating}</p>
                <hr />
                <p style={{ height: "3rem" }}>Zanr: {movie.Genre}</p>
                <hr />
                <p>Trajanje: {movie.Runtime}</p>
                <hr />
            </ul>
            <div className="card-body mt-3">
                <Link to={`/content/movie/${movie._id}`}>
                    <button className="btn btn-primary">Više informacija</button>
                </Link>
            </div>
        </div>
    );
}