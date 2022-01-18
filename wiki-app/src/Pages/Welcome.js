import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const Welcome = () =>
{
    // Wir erstellen zwei state hooks, einen für alle einträge, und einen für unseren loading state.
    const [ entries, setEntries ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() =>
    {
        // Wir holen uns aöle einträge, und geben als default ein leeres array zurück.
        const allEntries = JSON.parse(window.localStorage.getItem('entries')) || [];

        // Wir machen irgendwas damit wir gruppen erstellen können.
        const sortedEntries = allEntries.reduce((r, e) =>
        {
            /* struktur unserer einträge:
            {
                id: slug,
                title: string,
                content: string,
                timestamp: timestamp
            }
            */

            // Wir nehmen den ersten buchstaben des aktuellen eintrages und machen ihn groß.
            let group = e.title[0].toUpperCase();

            // Wenn r mit gruppe noch nicht existiert
            if(!r[ group ])
            {
                // Wir erstellen die gruppe mit aktuellen eintrag als kind
                r[ group ] = { group, children: [ e ] }
            }
            // Wenn r mit gruppe schon existiert
            else
            {
                // Wir fügen dem gruppenkind den eintrag hinzu.
                r[ group ].children.push(e);
            }

            // Wir sortieren unsere einträge.
            r[group].children.sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase() && 1 || -1);

            return r;
        }, {});

        // Wir werfen die sortierten einträge in ein neues Array.
        const result = Object.values(sortedEntries);

        // Wir sortieren unsere gruppen.
        result.sort((a, b) => a.group.toUpperCase() > b.group.toUpperCase() && 1 || -1);

        setEntries(result);
        setLoading(false);
    }, [])

    return(
        <Container>
            <div className="Welcome">
                <h2>Willkommen auf unserer Wiki</h2>

                {
                    loading ?
                    <Spinner animation="border" />
                    :
                    <>
                        <h3>Einträge</h3>
                        {
                            entries.length === 0 ?
                            <Alert variant="danger">
                                Kein Einträge vorhanden!
                                <br />
                                <br />
                                <Link to="/entry/create">Erstelle jetzt deinen ersten Eintrag</Link>
                            </Alert>
                            :
                            <Accordion defaultActiveKey="0">
                                {
                                entries.map((item, i) =>
                                {
                                    return(
                                        <Accordion.Item eventKey={ i.toString() } key={ i }>
                                            <Accordion.Header>{ item.group }</Accordion.Header>
                                            <Accordion.Body>
                                            {
                                                item.children.map((entry, j) =>
                                                {
                                                    return(
                                                        <Stack key={ j } gap={ 3 }>
                                                            <Link to={ `/entry/${ entry.id }` }>
                                                                { entry.title }
                                                            </Link>
                                                        </Stack>
                                                    )
                                                })
                                            }
                                            </Accordion.Body>
                                            </Accordion.Item>
                                    )
                                })}
                            </Accordion>
                        }
                    </>
                }
            </div>
        </Container>
    )
};

export default Welcome;
