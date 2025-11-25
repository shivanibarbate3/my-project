import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav() {
  const linkStyle = ({ isActive }) => ({
    marginRight: 16,
    textDecoration: 'none',
    color: isActive ? '#0b5fff' : '#0f172a',
    fontWeight: isActive ? 700 : 500
  })

  return (
    <nav style={{ padding: '16px 24px', borderBottom: '1px solid #e6e9ef', background: '#fff' }}>
      <NavLink to="/" style={linkStyle} end>Home</NavLink>
      <NavLink to="/about" style={linkStyle}>About</NavLink>
      <NavLink to="/service" style={linkStyle}>Service</NavLink>
      <NavLink to="/casestudy" style={linkStyle}>Case Study</NavLink>
      <NavLink to="/upload" style={linkStyle}>Upload</NavLink>
    </nav>
  )
}
