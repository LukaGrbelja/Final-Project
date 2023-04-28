import express from 'express';
const app: express.Application = express();

app.get('/', (req, res) => {
    res.send("TypeScript With Express");
});

app.listen(3001, () => {
    console.log(`TypeScript with Express http://localhost:${3001}/`);
});