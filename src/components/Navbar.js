import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Logout } from './Logout';

export const Navbar = (props) => {
  const cookies = props.cookies;

  const [admin, setAdmin] = useState(false);
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
    
  }, []);
  

  if (admin) {
    return (
      <nav className="navbar">
        <h1>My Blog</h1>
        <div className="links">
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/posts/create">Create Post</Link></li>
              <li><Logout cookies={cookies}/></li>
          </ul>
        </div>
      </nav>
    );
  }
  else {
    return (
          <nav className="navbar">
            <h1>My Blog</h1>
            <div className="links">
              <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/projects">Projects</Link></li>
                  <li><Link to="/login">Login</Link></li>
              </ul>
            </div>
          </nav>
      );
  }
}

export const postURL = 'http://localhost:5000/posts/';

// why doesn't export default work?