import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Cookies } from 'react-cookie';

import { Navbar } from './components/Navbar';

import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { SinglePostView } from './pages/SinglePostView';
import { CreatePost } from './pages/CreatePost';
import { EditPost } from './pages/EditPost';
import { Login } from './pages/Login';

function App() {
  const cookies = new Cookies();
  return (
    <div>
      <CookiesProvider>
        <HashRouter>
          <Navbar cookies={cookies} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/login" element={
                <Login cookies={cookies}/>
                } />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/posts/:id" element={<SinglePostView cookies={cookies} />} />
              <Route path="/posts/create" element={<CreatePost />} />
              <Route path="/posts/edit/:id" element={<EditPost />} />
            </Routes>
          </div>
        </HashRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;
