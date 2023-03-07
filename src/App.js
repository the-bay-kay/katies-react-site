import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { SinglePostView } from './pages/SinglePostView';
import { CreatePost } from './pages/CreatePost';
import { EditPost } from './pages/EditPost';
import { Login } from './pages/Login';

function App() {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/posts/:id" element={<SinglePostView />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/edit/:id" element={<EditPost />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
