import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import UserModel from "./models/Users";
import { passWord } from './personalData';
import { dataRequest } from "../client/src/@types/username";
import { log } from 'console';

const app: express.Application = express();

app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://lukagrbelja:${passWord}@mern0.e4w87dw.mongodb.net/mernpr?retryWrites=true&w=majority`);

app.get('/', (req, res) => {
    res.send("TypeScript With Express");
});

app.post("/createUser", (req, res) => {
    UserModel.findOne({username: req.body.username}).then(resp => {
        if (resp?.username) {
            res.send(false);
        }
        else {
            res.send(true);
            bcryptjs.genSalt(10, (err, salt) => {
                if (err) {
                    throw err;
                }
                else {
                    bcryptjs.hash(req.body.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        else {
                            const user = new UserModel({
                                username: req.body.username,
                                password: hash,
                                email: req.body.email,
                                usertype: "participant"
                            });
                            user.save();
                        }
                    });
                }
            });
        }
    });
});

app.get("/checkUser/:username/:password", (req, res) => {
    UserModel.findOne({username: req.params.username}).then(resp => {
        if (resp === null) {
            res.send(false);
        }
        else {
            bcryptjs.compare(req.params.password, resp.password,
                async function (err, isMatch) {
                    isMatch ? res.send(true) : res.send(false);
                }
            );
        }
    });
});

app.post('/data', (req, res) => {
    let response: Array<Array<any>> = [];
    let resp: Array<any> = [
        {
            "Title": "Batman",
            "Year": "1989",
            "Released": "23 Jun 1989",
            "Runtime": "126 min",
            "Genre": "Action, Adventure",
            "Director": "Tim Burton",
            "Actors": "Michael Keaton, Jack Nicholson, Kim Basinger",
            "Plot": "The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZDNjOGNhN2UtNmNhMC00YjU4LWEzMmUtNzRkM2RjN2RiMjc5XkEyXkFqcGdeQXVyMTU0OTM5ODc1._V1_SX300.jpg",
            "imdbRating": "7.5",
            "imdbID": "tt0096895",
            "Type": "movie",
            "BoxOffice": "$251,409,241"
        },
        {
            "Title": "Black Adam",
            "Year": "2022",
            "Released": "21 Oct 2022",
            "Runtime": "125 min",
            "Genre": "Action, Adventure, Fantasy",
            "Director": "Jaume Collet-Serra",
            "Actors": "Dwayne Johnson, Aldis Hodge, Pierce Brosnan",
            "Plot": "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods--and imprisoned just as quickly--Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYzZkOGUwMzMtMTgyNS00YjFlLTg5NzYtZTE3Y2E5YTA5NWIyXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg",
            "imdbRating": "6.3",
            "imdbID": "tt6443346",
            "Type": "movie",
            "BoxOffice": "$168,152,111"
        },
        {
            "Title": "Top Gun: Maverick",
            "Year": "2022",
            "Released": "27 May 2022",
            "Runtime": "130 min",
            "Genre": "Action, Drama",
            "Director": "Joseph Kosinski",
            "Actors": "Tom Cruise, Jennifer Connelly, Miles Teller",
            "Plot": "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to ...",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg",
            "imdbRating": "8.3",
            "imdbID": "tt1745960",
            "Type": "movie",
            "BoxOffice": "$718,732,821"
        },
        {
            "Title": "Thor: Love and Thunder",
            "Year": "2022",
            "Released": "08 Jul 2022",
            "Runtime": "118 min",
            "Genre": "Action, Adventure, Comedy",
            "Director": "Taika Waititi",
            "Actors": "Chris Hemsworth, Natalie Portman, Christian Bale",
            "Plot": "Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYmMxZWRiMTgtZjM0Ny00NDQxLWIxYWQtZDdlNDNkOTEzYTdlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
            "imdbRating": "6.2",
            "imdbID": "tt10648342",
            "Type": "movie",
            "BoxOffice": "$343,256,830"
        },
        {
            "Title": "Ant-Man and the Wasp: Quantumania",
            "Year": "2023",
            "Released": "17 Feb 2023",
            "Runtime": "124 min",
            "Genre": "Action, Adventure, Comedy",
            "Director": "Peyton Reed",
            "Actors": "Paul Rudd, Evangeline Lilly, Michael Douglas",
            "Plot": "Scott Lang and Hope Van Dyne are dragged into the Quantum Realm, along with Hope's parents and Scott's daughter Cassie. Together they must find a way to escape, but what secrets is Hope's mother hiding? And who is the mysterious K...",
            "Poster": "https://m.media-amazon.com/images/M/MV5BODZhNzlmOGItMWUyYS00Y2Q5LWFlNzMtM2I2NDFkM2ZkYmE1XkEyXkFqcGdeQXVyMTU5OTA4NTIz._V1_SX300.jpg",
            "imdbRating": "6.2",
            "imdbID": "tt10954600",
            "Type": "movie",
            "BoxOffice": "$213,747,807"
        },
        {
            "Title": "Avengers: Endgame",
            "Year": "2019",
            "Released": "26 Apr 2019",
            "Runtime": "181 min",
            "Genre": "Action, Adventure, Drama",
            "Director": "Anthony Russo, Joe Russo",
            "Actors": "Robert Downey Jr., Chris Evans, Mark Ruffalo",
            "Plot": "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
            "imdbRating": "8.4",
            "imdbID": "tt4154796",
            "Type": "movie",
            "BoxOffice": "$858,373,000"
        },
        {
            "Title": "As Above, So Below: The Underworld of 'John Wick'",
            "Year": "2017",
            "Released": "13 Jun 2017",
            "Runtime": "5 min",
            "Genre": "Documentary, Short",
            "Director": "Josh Oreck",
            "Actors": "Basil Iwanyk, Keanu Reeves, Chad Stahelski",
            "Plot": "A close look at the assassin's lifestyle in the film.",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNmM2YmY2MzgtZTViNC00NGQxLWE5ZjEtNjFjZmUxZTBkN2Q1XkEyXkFqcGdeQXVyODA1NjQ0OTY@._V1_SX300.jpg",
            "imdbRating": "7.8",
            "imdbID": "tt7161894",
            "Type": "movie",
            "BoxOffice": "N/A"
        },
        {
            "Title": "Doctor Strange in the Multiverse of Madness",
            "Year": "2022",
            "Released": "06 May 2022",
            "Runtime": "126 min",
            "Genre": "Action, Adventure, Fantasy",
            "Director": "Sam Raimi",
            "Actors": "Benedict Cumberbatch, Elizabeth Olsen, Chiwetel Ejiofor",
            "Plot": "Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses, to battle multiple threats, including other-universe versions of himself, which threaten to wipe out millions across the mul...",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_SX300.jpg",
            "imdbRating": "6.9",
            "imdbID": "tt9419884",
            "Type": "movie",
            "BoxOffice": "$411,331,607"
        },
        {
            "Title": "Loki",
            "Year": "2021–",
            "Released": "09 Jun 2021",
            "Runtime": "N/A",
            "Genre": "Action, Adventure, Fantasy",
            "Director": "N/A",
            "Actors": "Tom Hiddleston, Owen Wilson, Eugene Cordero",
            "Plot": "The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of “Avengers: Endgame.”",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNTkwOTE1ZDYtODQ3Yy00YTYwLTg0YWQtYmVkNmFjNGZlYmRiXkEyXkFqcGdeQXVyNTc4MjczMTM@._V1_SX300.jpg",
            "imdbRating": "8.2",
            "imdbID": "tt9140554",
            "Type": "series"
        },
        {
            "Title": "Joker",
            "Year": "2019",
            "Released": "04 Oct 2019",
            "Runtime": "122 min",
            "Genre": "Crime, Drama, Thriller",
            "Director": "Todd Phillips",
            "Actors": "Joaquin Phoenix, Robert De Niro, Zazie Beetz",
            "Plot": "The rise of Arthur Fleck, from aspiring stand-up comedian and pariah to Gotham's clown prince and leader of the revolution.",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
            "imdbRating": "8.4",
            "imdbID": "tt7286456",
            "Type": "movie",
            "BoxOffice": "$335,477,657"
        },
        {
            "Title": "Dune",
            "Year": "2021",
            "Released": "22 Oct 2021",
            "Runtime": "155 min",
            "Genre": "Action, Adventure, Drama",
            "Director": "Denis Villeneuve",
            "Actors": "Timothée Chalamet, Rebecca Ferguson, Zendaya",
            "Plot": "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
            "Poster": "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
            "imdbRating": "8.0",
            "imdbID": "tt1160419",
            "Type": "movie",
            "BoxOffice": "$108,327,830"
        },
        {
            "Title": "Black Panther",
            "Year": "2018",
            "Released": "16 Feb 2018",
            "Runtime": "134 min",
            "Genre": "Action, Adventure, Sci-Fi",
            "Director": "Ryan Coogler",
            "Actors": "Chadwick Boseman, Michael B. Jordan, Lupita Nyong'o",
            "Plot": "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SX300.jpg",
            "imdbRating": "7.3",
            "imdbID": "tt1825683",
            "Type": "movie",
            "BoxOffice": "$700,426,566"
        },
        {
            "Title": "Shazam! Fury of the Gods",
            "Year": "2023",
            "Released": "17 Mar 2023",
            "Runtime": "130 min",
            "Genre": "Action, Adventure, Comedy",
            "Director": "David F. Sandberg",
            "Actors": "Zachary Levi, Asher Angel, Jack Dylan Grazer",
            "Plot": "The film continues the story of teenage Billy Batson who, upon reciting the magic word \"SHAZAM!\" is transformed into his adult Super Hero alter ego, Shazam.",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNzJlM2NmZTItOGQyYS00MmE2LTkwZGUtNDFkNmJmZjRjZjcxXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_SX300.jpg",
            "imdbRating": "6.1",
            "imdbID": "tt10151854",
            "Type": "movie",
            "BoxOffice": "$57,474,575"
        }
    ];
    console.log(req.body);
    req.body.forEach((element: dataRequest) => {
        let tempArray: Array<any>;

        if (element.dataTypes === "movies") {
            tempArray = resp.filter(el => el.Type === "movie");
        }
        else {
            tempArray = resp.filter(el => el.Type === "series");
        }

        if (element.type === "rating") {
            tempArray = tempArray.sort((first, second) => parseFloat(second.imdbRating) - parseFloat(first.imdbRating));
            response.push(tempArray.splice(element.data.from, element.data.to));
        }
        else if (element.type === "latest") {
            tempArray = tempArray.sort((first, second) => new Date(second.Released).valueOf() - new Date(first.Released).valueOf());
            response.push(tempArray.splice(element.data.from, element.data.to));
        }
        else if (element.type === "comments") {
            
        }
        else {
            if ("data" in element.data && element.data.data.length !== 0) {
                let combinations = [[[0,1], [0,2], [1,2]], [[0,1,2], [0,1,3], [1,2,3]]];
                let data = element.data.data;
                let length = data.length;
                let len = [length-1, 0];
                let rez: any = new Set();
                for (let i = 0; i < 10; i++) {
                    if (response.length >= 10) {
                        break
                    }
                    let comb: any[] = [];
                    if (len[0] === 0) {
                        break;
                    }
                    else if (len[0] === 1) {
                        if (len[1] === length) {
                            len[0] = 0;
                            continue;
                        }
                        comb = [element.data.data[len[1]]];
                        len[1] += 1;
                    }
                    else {
                        combinations[len[0]-2][len[1]].forEach(el => {
                            comb.push(data[el]);
                        });
                        if (len[1] === 2) {
                            len[0] -= 1;
                            len[1] = -1;
                        }
                        len[1] += 1;
                    }
                    tempArray.forEach(el => {
                        let cont = true;
                        for (const key in comb) {
                            if (el.Genre.indexOf(comb[key]) === -1) {
                                cont = false;
                            }
                        }
                        if (cont) {
                            rez.add(el);
                        }
                    });
                }
                response.push(Array.from(rez));
            }
            else {
                response.push([]);
            }
        }
    });
    res.send(response);
});

app.listen(3001, () => {
    console.log(`TypeScript with Express http://localhost:3001/`);
});