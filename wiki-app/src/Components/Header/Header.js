import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

import Navbar from  'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Header = () =>
{
    // Wir erstellen einen hook in dem wir die id eines zufallseintrag speichern
    const [ randomEntry, setRandomEntry ] = useState('');

    useEffect(() =>
    {
        // Wir holen uns alle einträge aus der localstorage
        const allEntries = JSON.parse(window.localStorage.getItem('entries'));

        // Wir führen das zufällige selektieren eines eintrags nur aus, wenn der wert entries in der localstorage existiert, und mindestens einen eintrag hat.
        if(allEntries && allEntries.length > 0)
        {
            // Wir wählen einen zufälligen eintrag aus der liste aus. Anhand der menge der einträge definieren wir den randomizer.
            const id = allEntries[Math.floor(Math.random() * allEntries.length)].id;

            // Wir setzen randomEntry auf den zufallswert. damit wir ihn bei unserem zufallseintragslink verwenden können.
            setRandomEntry(id);
        }
    }, []);

    return(
        // <div className="Header">
        //     <ul>
        //         <li><NavLink to="/">Startseite</NavLink></li>
        //         <li><Link to={`/entry/${ randomEntry }`}>Zufälliger Eintrag</Link></li>
        //         <li><NavLink to="/entry/create">Eintrag Erstellen</NavLink></li>
        //     </ul>
        // </div>
        <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Unsere Wiki</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={`/entry/${ randomEntry }`}>Zufälliger Eintrag</Nav.Link>
                        <Nav.Link as={NavLink} to="/entry/create">Eintrag erstellen</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default Header;
