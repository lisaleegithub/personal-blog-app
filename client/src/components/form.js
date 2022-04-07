import { useState } from "react";

// form for a new blog post
const Form = (props) => {
    const [post, setPost] = useState({
        title: "",
        content: ""
    });

    //create functions that handle the event of the user typing into the form
    const handleTitleChange = (event) => {
        const title = event.target.value;
        setPost((post) => ({ ...post, title}));
    }

    const handleContentChange = (event) => {
        const content = event.target.value;
        setPost((post) => ({ ...post, content }));
    }

    // a function to handle the post request
    const postPost = (newPost) => {
        return fetch('http://localhost:5005/api/posts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(newPost)
      }).then((response) => {
          return response.json()
      }).then((data) => {
        console.log("From the post ", data);
        props.addPost(data);
    });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("current post is" + JSON.stringify(post));
        setPost(post);
        postPost(post);
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
            <button type="submit">Add Post</button>
        </form>
    );
};

export default Form;