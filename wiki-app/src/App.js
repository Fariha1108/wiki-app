import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { Header } from './Components';
import { NotFound, Editor, Page, Welcome } from "./Pages";

import './App.css';

function App()
{
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>

                <Container>
                    <Routes>
                        <Route path="/" element={ <Welcome/> }></Route>
                        <Route path="/entry/create" element={ <Editor/> }></Route>
                        <Route path="/entry/:id" element={ <Page/> }></Route>
                        <Route path="/entry/:id/edit" element={ <Editor/> }></Route>
                        <Route path="*" element={ <NotFound/> }></Route>
                    </Routes>
                </Container>
            </BrowserRouter>
            
        </div>
    );
}

export default App;
