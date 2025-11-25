import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Service from './pages/Service'
import CaseStudy from './pages/CaseStudy'
import Upload from './pages/Upload'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Nav />
        <main style={{ padding: 20 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/casestudy" element={<CaseStudy />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
