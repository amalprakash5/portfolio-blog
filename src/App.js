import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import Home from './components/container/Home/Home'
import BlogPage from './components/container/Home/BlogPage'
import GoToTop from './components/container/Wrapper/GoToTop';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="/blog" element={<Home />} />
      </Routes>
      <GoToTop />
    </Router>
  )
}

export default App
