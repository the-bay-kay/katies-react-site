import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { postURL } from '../components/Navbar';
import axios from 'axios';

export function SinglePostView(props) {

    const [post, setPost] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    
    useEffect(() => {
        axios
            .get( postURL + String(id))
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const onDelete = (id) => {
        console.log('id: ', id);
        axios
            .post(postURL + `delete/` + String(id))
            .then((response) => {
                navigate('/');
             })
            .catch((error) => {
                console.log(error);
            });
    };
   
    function PostView() {
        if (post) {
            return (
                <div className="post">
                    <h2>{post.title}</h2>
                    <p>{post._id}</p>
                    <p>{post.body}</p>
                    <p>{post.tags}</p>
                    <p>{post.date}</p>
                    <button onClick={() => onDelete(post._id)}>Delete</button>
                    <button onClick={() => navigate(`/posts/edit/${post._id}`)}>Edit</button>
                </div>
            );
        } else {
            return (
                <div className="center">Loading...</div>
            );
        }
    }


    return (
        <div>
            <h1>Single Post View</h1>
            <PostView />
        </div>
    );
}