import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function SinglePostView(props) {

    const [post, setPost] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    
    useEffect(() => {
        console.log('hi!')
        axios
            .get(`http://localhost:5000/posts/${id}`)
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const onDelete = (id) => {
        axios
            .delete(`http://localhost:5000/posts/${id}`)
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
                    <p>{post.content}</p>
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
            <p> test</p>
        </div>
    );
}