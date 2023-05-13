import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import UserModel from "./models/Users";
import { passWord } from './personalData';

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
    req.body.forEach((element: any) => {
        if (element.type) {
            if (element === "latest") {
                
            }
        }
    });
    res.send([]);
});

app.listen(3001, () => {
    console.log(`TypeScript with Express http://localhost:3001/`);
});