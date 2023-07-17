import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { postURL } from '../components/Navbar';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const quillModules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [{ script: "sub" }, { script: "super" }],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
    ],
};
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
            .get(postURL + String(id))
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

    const handleChange = (value) => {
        setPost({ ...post, body: value });
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
            .post(postURL + `update/` + String(id), newPost)
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
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
                <label>Content:</label>
                <ReactQuill
                    value={post.body}
                    onChange={handleChange}
                    modules={quillModules}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
