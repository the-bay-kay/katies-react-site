import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postURL } from '../components/Navbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // other options, check them out!
import axios from 'axios'

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{'script': 'sub'}, {'script': 'super'}],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
}

export function CreatePost() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e) => {
        const newPost = {
            title: title ,
            body: body,
            tags: tags,
            date: new Date()
        };
        axios
            .post(postURL + 'add', newPost)
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
            <form>
                <input type='title' 
                    placeholder='Title' 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}     
                />
                <input type='file' />
                <ReactQuill value={body} modules={quillModules} />
                <input type='tags'
                    placeholder='#tag #tag2'
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </form>
        </div>
    )
}