import Axios from "axios";
import { useEffect, useState } from "react";
import { cuntCookies } from "../Cookies";
import { dataRequest } from "../@types/username";
import MovieCard from "./MovieCard";

export default function Home() {
    const [moviesList, setList] = useState<Array<Array<any>>>([]);
    useEffect(() => {
        let options: Array<dataRequest> = [
            {
                type: "genre",
                dataTypes: "movies",
                data: {
                    from: 1,
                    to: 10,
                    data: cuntCookies()
                }
            },
            {
                type: "latest",
                dataTypes: "movies",
                data: {
                    from: 0,
                    to: 10
                }
            },
            {
                type: "rating",
                dataTypes: "movies",
                data: {
                    from: 0,
                    to: 10
                }
            }
        ]
		Axios.post("http://localhost:3001/data", options)
			.then((response) => {
                setList(response.data);
			});
	},[]);
    return (
            <div className="row p-4 bg-dark">
                <div className="col-12 text-center mb-4">
                    <h2>Za vas</h2>
                    <div style={{whiteSpace: "nowrap", height: "620px", overflow: "auto"}}>
                        {
                            moviesList.length !== 0 ?
                            moviesList[0].length !== 0 ?
                            moviesList[0].map(
                                movie => 
                                <MovieCard movie={movie} />
                            )
                            :
                            "Nema Ponuđenih Filmova"
                            :
                            "Nema Ponuđenih Filmova"
                        }
                    </div>
                    <h2>Posljednje dodano</h2>
                    <div style={{whiteSpace: "nowrap", height: "620px", overflow: "auto"}}>
                        {
                            moviesList.length !== 0 ?
                            moviesList[1].length !== 0 ?
                            moviesList[1].map(
                                movie => 
                                <MovieCard movie={movie} />
                            )
                            :
                            "Nema Ponuđenih Filmova"
                            :
                            "Nema Ponuđenih Filmova"
                        }
                    </div>
                    <h2>Najbolje ocijenjeni</h2>
                    <div style={{whiteSpace: "nowrap", height: "620px", overflow: "auto"}}>
                        {
                            moviesList.length !== 0 ?
                            moviesList[2].length !== 0 ?
                            moviesList[2].map(
                                movie => 
                                <MovieCard movie={movie} />
                            )
                            :
                            "Nema Ponuđenih Filmova"
                            :
                            "Nema Ponuđenih Filmova"
                        }
                    </div>
                </div>
            </div>
    );
}