import { useState, useEffect } from "react";
import AddForm from "./AddForm";
import EditForm from "./EditForm";

function Posts() {
    // Original state in the parent component so the page will now when to render new posts
    const [posts, setPosts] = useState([]);

    // display the form if it's true
    const [isEditing, setIsEditing] = useState(null);

    // // New state to check if we are working on editing a post 
    // const [editingStudentId, setEditingStudentId] = useState(null);

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

    // to show list of sightings after updating
    const editPost = (currentPost) => {
        setPosts((posts) => [...posts, currentPost]);
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

    // a function to grab the post.id of the post that we want to edit
    const onEdit = (post) => {
        // const editingId = student.id;
        setIsEditing(post);
    }
   
    return (
        <div className="posts">
            {isEditing ? <EditForm post={isEditing} setIsEditing={setIsEditing}/> : (
                <div className="list">
                <AddForm addPost={addPost} />
            <h2> List of Blog Posts </h2>
            <ul>
                {posts.map(post =>
                    <li key={post.id}>
                        Post Id: {post.id} <br />
                        Title: {post.title} <br />
                        Content: {post.content}<br />
                        <button type="button" onClick={() => { onDelete(post) }}>Delete</button>
                        <button type="button" onClick={() => { onEdit(post) }}>Edit</button>
                        <br />
                    </li>)}
            </ul>
            </div>
            )}
        </div>
    );
}
export default Posts;