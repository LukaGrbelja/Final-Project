import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import UserModel from "./models/Users";
import MovieModel from './models/Movies';
import { passWord } from './personalData';
import { dataRequest } from "../client/src/@types/username";

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
    MovieModel.find({}).then(resp => {
        let response: Array<Array<any>> = [];
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
});

app.get("/getMovie/:id", (req, res) => {
    MovieModel.findOne({_id: req.params.id}).then(resp => {
        res.send(resp);
    });
});

app.get("/contentData/:type/:genre/:sort/:page", (req, res) => {
    const {type, genre, sort, page} = req.params;
    const [from, to] = [(parseInt(page) - 1) * 12, parseInt(page) * 12];
    if (genre === "none") {
        if (sort === "rating") {
            MovieModel.find({Type: type}).then(resp => {
                res.send(resp.sort((first, second) => parseFloat(second.imdbRating) - parseFloat(first.imdbRating)).splice(from, to));
            });
        }
        else {
            MovieModel.find({Type: type}).sort({Year: -1}).skip(from).limit(to).then(resp => {
                res.send(resp);
            });
        }
    }
    else {
        if (sort === "rating") {
            MovieModel.find({Type: type, Genre: { $regex: genre }}).then(resp => {
                res.send(resp.sort((first, second) => parseFloat(second.imdbRating) - parseFloat(first.imdbRating)).splice(from, to-1));
            });
        }
        else {
            MovieModel.find({Type: type, Genre: { $regex: genre }}).sort({Year: -1}).skip(from).limit(to).then(resp => {
                res.send(resp);
            });
        }
    }
});

app.listen(3001, () => {
    console.log(`TypeScript with Express http://localhost:3001/`);
});