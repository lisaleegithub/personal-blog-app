const express = require('express');
const cors = require('cors');
require('dotenv').config()
const db = require('../server/db/db-connection.js'); 

const app = express();

const PORT = 5005;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
    res.json({ message: 'Hello from My ExpressJS' });
});

// GET request for the posts table
app.get('/api/posts', cors(), async (req, res) => {
    try{
        const { rows: posts } = await db.query('SELECT * FROM posts');
        res.send(posts);
    } catch (e){
        return res.status(400).json({e});
    }
});

// POST request for the posts table
app.post('/api/posts', cors(), async (req, res) => {
    const newPost = { 
        title: req.body.title, 
        content: req.body.content 
    }
    console.log([newPost.title, newPost.content]);
    const creationTime = new Date().toISOString();
    const result = await db.query(
        'INSERT INTO posts(title, content, timestamp) VALUES($1, $2, $3) RETURNING *',
        [newPost.title, newPost.content, creationTime]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});