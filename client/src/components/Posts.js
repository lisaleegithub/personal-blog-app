import { useState, useEffect } from "react";

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5005/api/posts")
            .then((response) => response.json())
            .then(posts => {
                setPosts(posts);
            })
    }, []);

    return (
        <div className="posts">
            <h2> List of Blog Posts </h2>
            <ul>
                {posts.map(post =>
                    <li key={post.id}>
                        Title: {post.title} <br />
                        Date: {post.date}<br />
                        Content: {post.content}<br />
                        <br />
                    </li>)}
            </ul>
        </div>
    );
}
export default Posts;