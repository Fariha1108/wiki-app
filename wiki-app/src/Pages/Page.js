import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import ReactMarkdown from 'react-markdown';

import { Segment, Button } from 'semantic-ui-react';

import Moment from 'react-moment';

// wir importieren die deutschen sprachdaten von moment.
import 'moment/locale/de';

const Page = () => {
    // Wir erstellen zwei state hooks für den eintrag und den ladezyklus der daten.
    const [entry, setEntry] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        // Wir holen uns den gesuchten eintrag
        const currentEntry = JSON.parse(window.localStorage.getItem('entries')).find(entry => entry.id === id);

        // Wir befüllen unseren entry hook mit dem gefundenen eintrag
        setEntry(currentEntry);

        // Wir sagen der applikation, dass das laden beendet wurde
        setLoading(false);
    }, []);

    // Wir erstellen eine funktion, um den eintrag zu editieren
    const handleEditEntry = () => {
        // anhand der ID lassen wir uns zum editor navigieren.
        navigate(`/entry/${id}/edit`);
    }

    // Wir erstellen eine funktion, um den aktuellen eintrag löschen zu können
    const handleDeleteEntry = () => {
        // Wir holen uns alle einträge
        const allEntries = JSON.parse(window.localStorage.getItem('entries'));

        // Wir filtern den gesuchten eintrag aus
        const leftoverEntries = allEntries.filter(oldEntries => oldEntries.id !== entry.id);

        // Wir überschreiben das alte array in der localstorage mit dem neuen array ohne den aktuellen eintrag.
        window.localStorage.setItem('entries', JSON.stringify(leftoverEntries));

        // Wir bauen den useNavigate hook ein, um zurück zur startseite zu gelangen.
        navigate('/');
    }

    return (
        <div className="Page">
            <Segment>
                {
                    loading ?
                        <p>Loading...</p>
                        :
                        <div>
                            <h1>{entry.title}</h1>

                            <div>
                                <Button.Group size="large">
                                    <Button onClick={() => handleEditEntry()} inverted color='green'>Editieren</Button>
                                    <Button.Or />
                                    <Button onClick={() => handleDeleteEntry()} inverted color='orange'>Löschen</Button>
                                </Button.Group>
                            </div>
                            <br />
                            <br />
                            <ReactMarkdown>{entry.content}</ReactMarkdown>

                            <hr />

                            {/* non breaking space: &nbsp; */}
                            Letzte änderung:&nbsp;
                            <b>
                                <Moment fromNow locale="de">
                                    {
                                        console.log(entry.timestamp)
                                        // new Date(entry.timestamp).toLocaleString()
                                    }
                                </Moment>
                            </b>
                        </div>
                }
            </Segment>
        </div>
    )
};

export default Page;
