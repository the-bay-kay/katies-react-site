import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function EditPost(props) {
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: '',
        body: '',
        images: [],
        tags: [],
        date: new Date()
    });

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/posts/${id}`)
            .then((response) => {
                setPost ({
                    title: response.data.title,
                    body: response.data.body,
                    images: response.data.images,
                    tags: response.data.tags,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            title: post.title,
            body: post.body,
            tags: post.tags,
            date: new Date()
        };
        axios
            .post(`http://localhost:5000/posts/update/${id}`, newPost)
            .then((response) => {
                navigate('/'); // fix later
            })
            .catch((error) => {
                console.log(error);
            });
        navigate('/');
    }
    
    return (
        <div>
            <h1>Edit Post</h1>
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
                    type="body"
                    name="body"
                    value={post.body}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
