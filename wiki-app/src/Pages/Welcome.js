import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
            r[group].children.sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase());

            return r;
        }, {});

        // Wir werfen die sortierten einträge in ein neues Array.
        const result = Object.values(sortedEntries);

        // Wir sortieren unsere gruppen.
        result.sort((a, b) => a.group.toUpperCase() > b.group.toUpperCase());

        setEntries(result);
        setLoading(false);
    }, [])

    return(
        <div className="Welcome">
            <h2>Willkommen auf unserer Wiki</h2>

            {
                loading ?
                <p>Loading...</p>
                :
                <>
                    <h3>Einträge</h3>
                    {
                        entries.length === 0 ?
                        <p>Keine einträge vorhanden!</p>
                        :
                        entries.map((item, i) =>
                        {
                            return(
                                <div key={ i }>
                                    <b>{ item.group }</b>
                                    <br />
                                    <ul>
                                        {
                                            item.children.map((entry, j) =>
                                            {
                                                return(
                                                    <li key={ j }>
                                                        <Link to={ `/entry/${ entry.id }` }>
                                                            { entry.title }
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </>
            }
        </div>
    )
};

export default Welcome;
