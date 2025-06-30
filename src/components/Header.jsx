import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import '../scss/header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg"
                fixed='top'
                className="headernav" >
                <div className='headerbox' style={{width: '1400px'}}>
                    <Navbar.Brand>
                        <Link as={Link} to='/'>
                            <img className="logo" src={process.env.PUBLIC_URL + "/img/logo.png"} alt="logo" />
                        </Link>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to='/payment' >주차정산</Nav.Link>
                            <Nav.Link as={Link} to='/usage'>이용내역</Nav.Link>
                            <Nav.Link as={Link} to='/commuterpass'>정기권 조회/신청</Nav.Link>
                            <Nav.Link as={Link} to='/notice'>공지사항</Nav.Link>
                            <Nav.Link >로그인</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </>
    )
}

export default Header