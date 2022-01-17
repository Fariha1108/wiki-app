import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import { 
    Header, 
    Grid, 
    Input,
    TextArea,
    Form,
    Segment,
    Button,
    Tab
} from 'semantic-ui-react';

import ReactMarkdown from 'react-markdown'; // Für unsere markdown ansicht
import slugify from 'slugify'; // Für unseren slug, mit dem wir, als id, den artikel aufrufen können

const Editor = () =>
{
    // Wir erstellen 2 state hooks, einen für den titel und einen für den inhalt des eintrages
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ windowWidth, setWindowWidth ] = useState(1000);

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

    useEffect(() =>
    {
        const updateWindowDimensions = () =>
        {
            const newWidth = window.innerWidth;

            setWindowWidth(newWidth);
        }

        window.addEventListener('resize', updateWindowDimensions);

        return () => window.removeEventListener('resize', updateWindowDimensions);
    }, [])

    // wir schreiben eine funktion zum speichern unserer änderungen, oder dem erstellen eines neuen eintrags.
    const handleSave = () =>
    {
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
        if(id !== undefined)
        {
            // Wir holen uns alle einträge die NICHT die gesuchte ID haben
            const filteredEntries = entries.filter(entry => entry.id !== id);

            // wir Fügen den eintrag hinzu
            filteredEntries.push(newPost);

            // wir ersetzen das vorhandene array mit dem neuen, inklusive der änderung.
            window.localStorage.setItem('entries', JSON.stringify(filteredEntries));
        }
        // Wenn wir einen neuen eintrag hinzufügen.
        else
        {
            // Wir pushen den neuen eintrag in unsere entries
            entries.push(newPost);

            // wir ersetzen das vorhandene array mit dem neuen, inklsive des neuen eintrags.
            window.localStorage.setItem('entries', JSON.stringify(entries));
        }

        // wir nutzen den useNavigate hook um auf die seite mit dem eintrag per slug zu kommen.
        navigate('/entry/' + newPost.id);
    }

    return(
        <div className="Editor">
            <Header
                as="h1"
                textAlign="center"
                dividing
            >
                <Header.Content>
                    Eintrag erstellen
                </Header.Content>
            </Header>
            
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h3">Titel</Header>
                        <Input
                            fluid
                            value={ title }
                            onChange={ (e) => setTitle(e.target.value) }
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {
                windowWidth < 768 ?
                <Tab
                    menu={{ pointing: true }}
                    panes={
                        [
                            { menuItem: "Editor", render: () => (
                                    <Form>
                                    <TextArea
                                        rows={20}
                                        value={ content }
                                        onChange={ (e) => setContent(e.target.value) }
                                    />
                                </Form>
                                
                            )},
                            { menuItem: "Preview", render: () => (
                                <Segment basic>
                                    <ReactMarkdown>{ content }</ReactMarkdown>
                                </Segment>
                            )}
                        ]
                    }
                ></Tab>
                :
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={ 8 }>
                            <Form>
                                <Header as="h3">Inhalt</Header>
                                <TextArea
                                    rows={20}
                                    value={ content }
                                    onChange={ (e) => setContent(e.target.value) }
                                />
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={ 8 }>
                            <Header as="h3">Inhalt</Header>
                            <Segment>
                                <ReactMarkdown>{ content }</ReactMarkdown>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <a
                        href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                        target="_blank"
                    >
                        Markdown Cheatsheet
                    </a>
                </Grid>
            }

            

            <Button.Group fluid className="lowerButtons">
                <Button
                    color="green"
                    onClick={ handleSave }
                    disabled={ title.length === 0 }
                >
                    Speichern
                </Button>
                <Button color="red">Abbrechen</Button>
            </Button.Group>
        </div>
    )
};

export default Editor;
