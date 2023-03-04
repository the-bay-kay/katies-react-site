import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'


export function CreatePost() {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: '',
        content: '',
        tags: '',
        date: new Date()
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    }

    const handleSubmit = (e) => {
        const newPost = {
            title: post.title,
            body: post.content,
            tags: post.tags,
            date: new Date()
        };
        axios
            .post('http://localhost:5000/posts/add', newPost)
            .then((response) => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
        navigate('/');
    }

    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                />
                <label>Content:</label>
                <input
                    type="content"
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}