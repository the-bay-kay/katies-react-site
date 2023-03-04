import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { SinglePostView } from './pages/SinglePostView';
import { CreatePost } from './pages/CreatePost';

function App() {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/posts/:id" element={<SinglePostView />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </div>
      </HashRouter>

    </div>
  );
}

export default App;
