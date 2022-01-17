import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Menu, Segment, Icon, Popup } from 'semantic-ui-react';

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
        <Segment inverted>
            <Menu fixed="top" inverted>
                <Menu.Item header>Unsere Wiki</Menu.Item>
                
                <Menu.Item as={NavLink} to="/">
                    Startseite
                </Menu.Item>
                <Menu.Item as={Link} to={`/entry/${ randomEntry }`}>
                    Zufälliger Eintrag
                </Menu.Item>

                <Menu.Menu position="right">
                    <Popup
                        content="Einen neuen eintrag verfassen"
                        trigger={
                            <Menu.Item as={NavLink} to="/entry/create">
                                <Icon name="add" size="small" />
                            </Menu.Item>
                        }
                        basic
                        inverted
                    />
                </Menu.Menu>
            </Menu>
        </Segment>
    )
};

export default Header;
