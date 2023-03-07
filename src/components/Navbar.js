import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="navbar">
      <h1>My Blog</h1>
      <div className="links">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/posts/create">Create Post</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export const postURL = 'http://localhost:5000/posts/';

// why doesn't export default work?