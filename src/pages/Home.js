import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { postURL } from '../components/Navbar';
import axios from 'axios';


// Where the blogs go :)
export const Home = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get(postURL)
            .then((response) => {
                setPosts(response.data);
                console.log(response.data.reverse())
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