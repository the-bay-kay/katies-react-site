import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { postURL } from '../components/Navbar';
import DOMPurify from 'dompurify';
import axios from 'axios';

export const SinglePostView = (props) => {
    const cookies = props.cookies;
    const [post, setPost] = useState(null);
    const [admin, setAdmin] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    
    useEffect(() => {
        if('token' in cookies.getAll()) {
            const token = cookies.get('token');
            axios
                .post('http://localhost:5000/auth/readCookie', {token: token})
                .then((response) => {
                    setAdmin(true);
                })
                .catch((error) => {
                    console.log(error)
                });
            }


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
        if(window.confirm('Are you sure you want to delete this post?')) {
            axios
                .post(postURL + `delete/` + String(id))
                .then((response) => {
                    navigate('/');
                })
                .catch((error) => {
                    console.log(error);
            });
        }
        
    };

    function PostView() {
        if (post) {
            return (
                <div className="post">
                    <h2>{post.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: (DOMPurify.sanitize(post.body))}}></div>
                    <p>{post.tags}</p>
                    <p>{post.date}</p>
                    {admin && 
                        <button onClick={() => onDelete(post._id)}>Delete</button>
                    }
                    {admin &&
                        <button onClick={() => navigate(`/posts/edit/${post._id}`)}>Edit</button>
                    }
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