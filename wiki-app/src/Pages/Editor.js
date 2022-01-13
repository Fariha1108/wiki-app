import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect} from 'react';

import ReactMarkdown from 'react-markdown'; // Für unsere markdown ansicht
import slugify from 'slugify'; // Für unseren slug, mit dem wir, als id, den artikel aufrufen können

const Editor = () =>
{
    // Wir erstellen 2 state hooks, einen für den titel und einen für den inhalt des eintrages
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() =>
    {
        // Wir prüfen ob eine ID übergeben wurde, und nur dann bedienen wir uns existierender daten aus der localstorage.
        if(id !== undefined)
        {
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
        console.log("funktioniert...");
    }

    return(
        <div className="Editor">
            <h1>Eintrag erstellen</h1>

            <div>
                <h3>Titel</h3>

                <input
                    type="text"
                    value={ title }
                    onChange={ (e) => setTitle(e.target.value) }
                />
                <br />

                <h3>Inhalt</h3>

                <textarea
                    value={ content }
                    onChange={ (e) => setContent(e.target.value) }
                    cols="30"
                    rows="10"
                ></textarea>
            </div>

            <hr />

            <div>
                <h3>Titel</h3>
                <p>{ title }</p>
                <br />
                <h3>Inhalt</h3>
                <ReactMarkdown>{ content }</ReactMarkdown>
            </div>
        </div>
    )
};

export default Editor;
