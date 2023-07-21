import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Logout } from './Logout';

import NavbarCSS from './Navbar.module.css'
import katieLogo  from '../images/MainLink.svg'
import InstaHeader from '../images/InstaHeader.svg'
import LinkedinHeader from '../images/LinkedinHeader.svg'
import GithubCatHeader from '../images/GithubCatHeader.svg'

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
      <header>
        <nav className={NavbarCSS.navHeader}>
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/posts/create">Create Post</Link></li>
              <li><Logout cookies={cookies}/></li>
          </ul>
      </nav>
     </header>
    );
  }
  else {
    return (
          <header >
            <nav className={NavbarCSS.navHeader}>
              <ul>
                <li>
                  <Link to="/">
                    <img src={katieLogo} alt='Logo' />
                  </Link>
                </li>
                <li>
                  <ul >
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/blog">Blog</Link></li>
                      <li><Link to="/about">About</Link></li>
                      <li><Link to="/projects">Projects</Link></li>
                      <li><Link to="/login">Login</Link></li>
                  </ul>
                </li>
              </ul>
              <div className={NavbarCSS.socialMedia}>
                <ul>
                  <li>
                    <a href='https://www.instagram.com/the_bay_kay/'>
                      <img src={InstaHeader} alt='Instagram logo' />
                    </a>
                  </li>
                  <li>
                    <a href='https://www.linkedin.com/in/katie-rischpater/'>
                      <img src={LinkedinHeader} alt='Linkedin logo' />
                    </a>
                  </li>
                  <li>
                    <a href='https://github.com/the-bay-kay'>
                      <img src={GithubCatHeader} alt='Github logo' />
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
      );
  }
}

export const postURL = 'http://localhost:5000/posts/';

// why doesn't export default work?