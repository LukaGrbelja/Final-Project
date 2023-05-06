import Axios from "axios";
import { useEffect, useState } from "react";
import { setCookies, getCookies } from "../Cookies";

export default function Home() {
    const [moviesList, setList] = useState<any[]>([]);
    useEffect(() => {
		Axios.get("http://localhost:3001/data")
			.then((response) => {
				setList(response.data);
			});
	},[]);
    const putCookies = () => {
        setCookies(["tagOne","tagTwo"],["actorOne", "actorTwo"]);
        console.log(getCookies());
    }
    return (
        <>
            <div className="row p-4 bg-dark">
                <div className="col-12 text-center mb-4">
                    <h2>Za vas</h2>
                    <h2>Posljednje dodano</h2>
                    <div style={{whiteSpace: "nowrap", height: "400px", overflow: "auto"}}>
                        {
                            moviesList.length === 0 ?
                            "Nema Ponuđenih Filmova"
                            :
                            [...moviesList].reverse().map(
                                movie => 
                                <div onClick={putCookies} style={{display: "inline-block", float: "none", width: "18rem"}}>
                                <img src="https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg" style={{height: "15rem", width: "10rem"}} className="card-img-top" alt="some text" />
                                <div className="card-body mt-3">
                                    <h5 className="card-title">{movie.Title}</h5>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                                </div>
                            )
                        }
                    </div>
                    <h2>Najbolje ocijenjeni</h2>
                    <h2>Najgledaniji</h2>
                </div>
            </div>
        </>
    );
}