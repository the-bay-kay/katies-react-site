import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';



// Where the blogs go :)
export function Home() {
    document.title = "Home";

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/posts/') // change hardcode later
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const postList = 
        posts.length === 0 ? (
            <div className="center">No posts yet</div>
        ) : (posts.map((post) => (
            <div className="post-preview" key={post.id}>
                <h2>{post.title}</h2>
                <p>
                    temp
                </p>
            </div>
        )));

    return (
        <div>
            <h1>Home</h1>
            <div className="posts">
                {postList}
            </div>
            <p> text</p>

        </div>
    );
}