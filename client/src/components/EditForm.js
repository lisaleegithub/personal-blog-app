import { useState } from "react";

// form for a new blog post
const EditForm = (props) => {
    const [post, setPost] = useState({
        title: props.post.title,
        content: props.post.content
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
    const putPost = (post) => {
        return fetch(`http://localhost:5005/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(post)
      }).then((response) => {
          return response.json()
      }).then((data) => {
        // console.log("From the post ", data);
        props.editPost(data);
    });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("current post is" + JSON.stringify(post));
        setPost(post);
        putPost(post);
    };

    const onCancel = () => {
        props.setIsEditing(null);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Edit {props.post.title}</h3>
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
            <button type="submit">Update Post</button>
            <button type="button" onClick={() => { onCancel() }}>Cancel</button>
        </form>
    );
};

export default EditForm;