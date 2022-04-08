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
        const { rows: posts } = await db.query('SELECT * FROM posts ORDER BY id DESC');
        res.send(posts);
    } catch (e){
        return res.status(400).json({e});
    }
});

// POST request for the posts table
app.post('/api/posts', cors(), async (req, res) => {
    const newPost = { 
        title: req.body.title, 
        content: req.body.content, 
        location: req.body.location,
        image: req.body.image,
        alt: req.body.alt
    }
    console.log([newPost.title, newPost.content]);
    const creationTime = new Date().toISOString();
    const result = await db.query(
        'INSERT INTO posts(title, content, location, image, alt, timestamp) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        [newPost.title, newPost.content, newPost.location, newPost.image, newPost.alt, creationTime]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

// DELETE endpoint
app.delete('/api/posts/:postId', cors(), async (req, res) =>{
    const postId = req.params.postId;
    //console.log(req.params);
    await db.query('DELETE FROM posts WHERE id=$1', [postId]);
    res.status(200).end();
});


// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// PUT request - Update request
app.put('/api/posts/:postId', cors(), async (req, res) =>{
    const postId = req.params.postId;
    const updatePost = { 
        title: req.body.title, 
        content: req.body.content, 
        location: req.body.location,
        image: req.body.image,
        alt: req.body.alt
    }
    //console.log(req.params);
    console.log("this is postId", postId);
    console.log("this is updatePost", updatePost);
    const query = `UPDATE posts SET title=$1, content=$2, location=$3, image=$4, alt=$5 WHERE id = ${postId} RETURNING *`;
    console.log("this is query", query);
    const values = [updatePost.title, updatePost.content, updatePost.location, updatePost.image, updatePost.alt];
    try{
        const updated = await db.query(query, values);
        console.log(updated.rows[0]);
        res.send(updated.rows[0]);
    } catch (e){
        console.log(e);
        return res.status(400).json({e});
    }
});