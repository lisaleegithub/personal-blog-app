import { useState, useEffect } from "react";
import Form from "./Form";

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5005/api/posts")
            .then((response) => response.json())
            .then(posts => {
                setPosts(posts);
            })
    }, []);

    // to show list of sightings after adding
    const addPost = (newPost) => {
        setPosts((posts) => [...posts, newPost]);

    }
    return (
        <div className="posts">
            <Form addPost={addPost}/>
            <h2> List of Blog Posts </h2>
            <ul>
                {posts.map(post =>
                    <li key={post.id}>
                        Title: {post.title} <br />
                        Content: {post.content}<br />
                        <br />
                    </li>)}
            </ul>
        </div>
    );
}
export default Posts;