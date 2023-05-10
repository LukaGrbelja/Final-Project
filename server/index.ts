import express from 'express';
import cors from "cors";

const app: express.Application = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send("TypeScript With Express");
});

app.get('/data', (req, res) => {
    res.send([
        {
            "Id" : 1,
            "Title": "Guardians of the Galaxy Vol. 2",
            "Genre": "Action, Adventure, Comedy",
            "Actors": "Chris Pratt, Zoe Saldana, Dave Bautista"
        },
        {
            "Id" : 1,
            "Title": "Guardians of the Galaxy Vol. 1",
            "Genre": "Action, Adventure, Comedy",
            "Actors": "Chris Pratt, Zoe Saldana, Dave Bautista"
        },
        {
            "Id" : 1,
            "Title": "Guardians of the Galaxy Vol. 2",
            "Genre": "Action, Adventure, Comedy",
            "Actors": "Chris Pratt, Zoe Saldana, Dave Bautista"
        },
        {
            "Id" : 1,
            "Title": "Guardians of the Galaxy Vol. 3",
            "Genre": "Action, Adventure, Comedy",
            "Actors": "Chris Pratt, Zoe Saldana, Dave Bautista"
        },
        {
            "Id" : 1,
            "Title": "Guardians of the Galaxy Vol. 4",
            "Genre": "Action, Adventure, Comedy",
            "Actors": "Chris Pratt, Zoe Saldana, Dave Bautista"
        },
        {
            "Id" : 1,
            "Title": "Guardians of the Galaxy Vol. 5",
            "Genre": "Action, Adventure, Comedy",
            "Actors": "Chris Pratt, Zoe Saldana, Dave Bautista"
        }
    ]);
});

app.listen(3001, () => {
    console.log(`TypeScript with Express http://localhost:${3001}/`);
});