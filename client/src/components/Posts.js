import { useState, useEffect } from "react";
import Form from "./Form";

function Posts() {
    // Original state in the parent component so the page will now when to render new posts
    const [posts, setPosts] = useState([]);

    // New state to check if we are working on editing a post 
    const [editingPostId, setEditingPostId] = useState(null);

    // // display the form if it's true
    // const [isEditing, setIsEditing] = useState(null);

    const loadPosts = () => {
        fetch("http://localhost:5005/api/posts")
            .then((response) => response.json())
            .then(posts => {
                setPosts(posts);
            })
    }

    // Use effect hook to render the posts in the app. This will change any time that our initial state change
    useEffect(() => {
        loadPosts();
    }, []);

    // to show list of sightings after adding
    const addPost = (newPost) => {
        setPosts((posts) => [...posts, newPost]);
    }

    // a function to handle the Delete funtionallity
    const onDelete = (post) => {
        return fetch(`http://localhost:5005/api/posts/${post.id}`, {
            method: "DELETE"
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                loadPosts();
            }
        })
    }

    // A function to update the list of posts when the user edit a post 
    const updatePost = (savedPost) => {
        setPosts((posts) => {
            const newPost = [];
            for (let post of posts) {
                if (post.id === savedPost.id) {
                    newPost.push(savedPost);
                } else {
                    newPost.push(post);
                }
            }
            return newPost;
        })
        // This line is just to close the form! 
        setEditingPostId(null);
    }

    // a function to grab the post.id of the post that we want to edit
    const onEdit = (post) => {
        const editingId = post.id;
        setEditingPostId(editingId);
    }

    return (
        <div className="posts">
            <h2>Create a New Post</h2>
            <Form savePost={addPost} />
            
            <h2> List of Blog Posts </h2>

            <ul>
                {posts.map((post) => {
                    if (post.id === editingPostId) {
                        return <Form initialPost={post} savePost={updatePost} />
                    } else {
                        return (
                            <li key={post.id}>
                                Post ID: {post.id}
                                <button type="button" onClick={() => { onDelete(post) }}>Delete</button>
                                <button type="button" onClick={() => { onEdit(post) }}>Edit</button>
                                <br />
                                Title: {post.title} <br />
                                {<img src={post.image} alt={post.alt} width="600px"></img>}<br />
                                Content: {post.content} <br />

                                <br />
                            </li>
                        );
                    }
                }
                )}
            </ul>

        </div>
    );
}
export default Posts;