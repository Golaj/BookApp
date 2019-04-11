import React from 'react'
import Navbar, { Brand, Toggle, Collapse } from 'react-bootstrap/Navbar'
import Nav, { Link } from 'react-bootstrap/Nav'

export default props => (
  <header>
    <Navbar expand="lg" className="navbar-dark" id="navvy">
     <div className="test">Save your favorite books in this wonderful booklist saver.</div>
     {/*  <Toggle aria-controls="basic-navbar-nav" />
      <Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
      </Collapse> */}
    </Navbar>
  </header>
)
