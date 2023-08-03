import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import Portfolio from './components/container/Portfolio/Portfolio'
import BlogPage from './components/container/Portfolio/BlogPage'
import GoToTop from './components/container/Wrapper/GoToTop';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Portfolio />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="/blog" element={<Portfolio />} />
      </Routes>
      <GoToTop />
    </Router>
  )
}

export default App
