import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from './Components';
import { NotFound, Editor, Page, Welcome } from "./Pages";

import './App.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />

                <div className="layout">
                    <Routes>
                        <Route path="/" element={<Welcome />}></Route>
                        <Route path="/entry/create" element={<Editor />}></Route>
                        <Route path="/entry/:id" element={<Page />}></Route>
                        <Route path="/entry/:id/edit" element={<Editor />}></Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>

        </div>
    );
}

export default App;
