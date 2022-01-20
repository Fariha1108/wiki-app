import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { Icon, Menu, Segment } from 'semantic-ui-react';

const Header = () => {
    // Wir erstellen einen hook in dem wir die id eines zufallseintrag speichern
    const [randomEntry, setRandomEntry] = useState('');

    useEffect(() => {
        // Wir holen uns alle einträge aus der localstorage
        const allEntries = JSON.parse(window.localStorage.getItem('entries'));

        // Wir führen das zufällige selektieren eines eintrags nur aus, wenn der wert entries in der localstorage existiert, und mindestens einen eintrag hat.
        if (allEntries && allEntries.length > 0) {
            // Wir wählen einen zufälligen eintrag aus der liste aus. Anhand der menge der einträge definieren wir den randomizer.
            const id = allEntries[Math.floor(Math.random() * allEntries.length)].id;

            // Wir setzen randomEntry auf den zufallswert. damit wir ihn bei unserem zufallseintragslink verwenden können.
            setRandomEntry(id);
        }
    }, []);

    return (
        <div className="Header">
            <Segment fixed="top">
                <Menu tabular color="olive" size="large">
                    <Menu.Item as={NavLink} to="/" name="Startseite" />
                    <Menu.Item as={NavLink} to={`/entry/${randomEntry}`} name="Zufälliger Eintrag" />
                    <Menu.Item as={NavLink} to="/entry/create">
                        Neuen Eintrag erstellen
                        &nbsp;&nbsp;
                        <Icon name="pencil" color="brown" />
                    </Menu.Item>
                    <Menu.Item position='right' as={NavLink} to="/">
                        <Icon name="world" color="blue" size="large" />
                        <br />
                        Unsere Wiki
                    </Menu.Item>
                </Menu>
            </Segment>
        </div>
    )
};

export default Header;
