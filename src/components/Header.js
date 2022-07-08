import React from 'react'
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Container,
} from "react-bootstrap";

const navStyle= {color:"white" , marginLeft:"15px", fontSize:"20px", textDecoration: 'none'}
const selectedStyle={borderBottom: "1px solid white" , color: "#e9c363",marginLeft:"15px", fontSize:"20px", textDecoration: 'none'}

const Header = () => {
  return (
    <Navbar style={{background:"black",boxShadow: "rgb(210 188 125) 0px 0px 5px",height:"50px"}} bg="dark" variant="dark">
        <Container>

          <Nav className="me-auto">
            <Nav.Link href="/" style={window.location.pathname=="/" ? selectedStyle: navStyle} >
              Home
            </Nav.Link>
            <Nav.Link  href="../offvsdef" style={window.location.pathname=="/offvsdef" ? selectedStyle :navStyle}>
              Offence VS Defence
            </Nav.Link>

            <Nav.Link href="../teamcompare" style={window.location.pathname=="/teamcompare" ? selectedStyle :navStyle}>
              Teams comparison
            </Nav.Link>
              <Nav.Link href="../aggvsrank" style={window.location.pathname=="/aggvsrank" ? selectedStyle :navStyle}>
              Aggressiveness vs Rank
            </Nav.Link>
              <Nav.Link href="../leagchamps" style={window.location.pathname=="/leagchamps" ? selectedStyle :navStyle}>
              League Champions
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar> 
  )
}

export default Header