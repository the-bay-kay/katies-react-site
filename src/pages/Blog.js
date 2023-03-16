import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { postURL } from '../components/Navbar';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';


// Where the blogs go :)
export const Blog = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get(postURL)
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
                <h2 className="post-title">{post.title}</h2>
                    <Link to={`/posts/${post._id}`}>Read More</Link>
                    <br />
                    <ReactTimeAgo date={new Date(post.date)} />
            </div>
        )));

    return (
        <div>
            <h1>Katie's Blog</h1>
            <div>
                {postList}
            </div>
        </div>
    );
}