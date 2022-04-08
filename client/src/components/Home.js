import { useState, useEffect } from "react";
import Form from "./Form";

function Home() {
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

    // // to show list of sightings after adding
    // const addPost = (newPost) => {
    //     setPosts((posts) => [...posts, newPost]);
    // }

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
            <h2> List of Blog Posts </h2>
            <ul>
                {posts.map((post) => {
                    if (post.id === editingPostId) {
                        return <Form initialPost={post} savePost={updatePost} />
                    } else {
                        return (
                            <div className="card" style={{ width: "45rem" }} key={post.id}>
                                {<img className="card-img-top" src={post.image} alt={post.alt}></img>}
                                <div className="card-body">
                                    <p className="card-text">
                                        <strong>Post ID:</strong> {post.id}
                                        <button type="button" className="delete-button" onClick={() => { onDelete(post) }}>Delete</button>
                                        <button type="button" className="edit-button" onClick={() => { onEdit(post) }}>Edit</button>
                                        <br />
                                        <strong>Title:</strong> {post.title} <br />
                                        <strong>Content:</strong> {post.content} <br />
                                        <br />
                                    </p>
                                </div>
                            </div>
                        );
                    }
                }
                )}
            </ul>
        </div>
    );
}
export default Home;