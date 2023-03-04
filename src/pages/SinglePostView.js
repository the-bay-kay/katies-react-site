import Link from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function SinglePostView(props) {

    const [post, setPost] = useState(null);
    
    useEffect(() => {
        axios
            .get(`http://localhost:5000/posts/${props.match.params.id}`)
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [props.match.params.id]);

    const postView = post ? (
        <div className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    ) : (
        <div className="center">Loading post...</div>
    );

    return (
        <div>
            <h1>Single Post View</h1>
            {postView}
        </div>
    );
}