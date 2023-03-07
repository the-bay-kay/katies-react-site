import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { postURL } from '../components/Navbar';
import axios from 'axios';
// should probably use proxy, but higher priorites, just want it working :)

// Where the blogs go :)
export function Home() {
    document.title = "Home";

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get(postURL) // change hardcode later
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const postList = 
        posts.length === 0 ? (
            <div className="center">Loading....</div>
        ) : (posts.map((post) => (
            <div className="post-preview" key={post._id}>
                <h2>
                    <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </h2>
                <p>{post._id}</p>
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