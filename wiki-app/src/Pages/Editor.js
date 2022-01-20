import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import ReactMarkdown from 'react-markdown'; // Für unsere markdown ansicht
import slugify from 'slugify'; // Für unseren slug, mit dem wir, als id, den artikel aufrufen können

import { Segment, Form, Button } from 'semantic-ui-react';

const Editor = () => {
    // Wir erstellen 2 state hooks, einen für den titel und einen für den inhalt des eintrages
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Wir prüfen ob eine ID übergeben wurde, und nur dann bedienen wir uns existierender daten aus der localstorage.
        if (id !== undefined) {
            // Wir suchen alle einträge
            const entries = JSON.parse(window.localStorage.getItem('entries'));

            // wir selektieren den gesuchten eintrag.
            const currentEntry = entries.filter(entry => entry.id === id)[0];

            // wir setzen die gefundenen informationen auf title und content.
            setTitle(currentEntry.title);
            setContent(currentEntry.content);
        }
    }, []);

    // wir schreiben eine funktion zum speichern unserer änderungen, oder dem erstellen eines neuen eintrags.
    const handleSave = () => {
        const newPost =
        {
            id: slugify(title,
                {
                    lower: true, // damit der slug-string kleingeschrieben wir
                    strict: true, // damit spezielle charaktere gelöscht werden
                    trim: true // damit vor und hinter dem slug kein leerzeichen entsteht.
                }),
            title, // kurz für title: title,
            content, // kurz für content: content,
            timestamp: new Date().getTime()
        }

        // Wir holen uns alle einträge, und setzen für den notfall, das array auf leer.
        const entries = JSON.parse(window.localStorage.getItem('entries')) || [];

        // Wenn wir einen vorhandenen eintrag editieren
        if (id !== undefined) {
            // Wir holen uns alle einträge die NICHT die gesuchte ID haben
            const filteredEntries = entries.filter(entry => entry.id !== id);

            // wir Fügen den eintrag hinzu
            filteredEntries.push(newPost);

            // wir ersetzen das vorhandene array mit dem neuen, inklusive der änderung.
            window.localStorage.setItem('entries', JSON.stringify(filteredEntries));
        }
        // Wenn wir einen neuen eintrag hinzufügen.
        else {
            // Wir pushen den neuen eintrag in unsere entries
            entries.push(newPost);

            // wir ersetzen das vorhandene array mit dem neuen, inklsive des neuen eintrags.
            window.localStorage.setItem('entries', JSON.stringify(entries));
        }

        // wir nutzen den useNavigate hook um auf die seite mit dem eintrag per slug zu kommen.
        navigate('/entry/' + newPost.id);
    }

    return (
        <div className="Editor">
            <Segment>
                <h1>Eintrag erstellen</h1>

                <div>
                    <Form success>
                        <h3>Titel</h3>

                        <Form.Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='schreibe hier deinen eintrag...'
                        />

                        <h3>Inhalt</h3>

                        <Form.TextArea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}

                        />
                    </Form>
                </div>
                <br />
                <hr />

                <div>
                    <h3>Titel</h3>
                    <p>{title}</p>
                    <br />
                    <h3>Inhalt</h3>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
                <br />
                <Button
                    onClick={handleSave}
                    disabled={title.length === 0}
                    inverted color="green"
                    size="large"
                >
                    Speichern
                </Button>
                <a
                    href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                    target="_blank"
                >
                    &nbsp;
                    Markdown Cheatsheet
                </a>
            </Segment>
        </div>
    )
};

export default Editor;
