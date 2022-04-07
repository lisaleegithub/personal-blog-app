import { useState } from "react";

const Form = (props) => {
    // Initial post in case that you want to update a new post
    const { initialPost = {
        id: null,
        title: "",
        content: ""
    } } = props;

    // We're using that initial post as our initial state                       
    const [post, setPost] = useState(initialPost);

    //create functions that handle the event of the user typing into the form
    const handleTitleChange = (event) => {
        const title = event.target.value;
        setPost((post) => ({ ...post, title }));
    }

    const handleContentChange = (event) => {
        const content = event.target.value;
        setPost((post) => ({ ...post, content }));
    }

    // a function to handle the post request
    const postPost = (newPost) => {
        return fetch('http://localhost:5005/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("From the post ", data);
            props.savePost(data);
        });
    }

    // a function to handle the update request
    const updatePost = (existingPost) => {
        return fetch(`http://localhost:5005/api/posts/${existingPost.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(existingPost)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("From put request ", data);
            props.savePost(data);
        });
    }

    // handle submit function now needs the logic for the update scenario 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (post.id) {
            updatePost(post);
        } else {
            postPost(post);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add a New Post</h3>
            <label>Title</label>
            <input
                type="text"
                id="add-title"
                placeholder="Title"
                required
                value={post.title}
                onChange={handleTitleChange}
            />
            <label>Content</label>
            <textarea
                type="text"
                id="add-content"
                placeholder="Start writing"
                required
                value={post.content}
                onChange={handleContentChange}
            />
            <button type="submit">{!post.id ? "Add" : "Save"}</button>
        </form>
    );
};

export default Form;