import { useNavigate } from "react-router-dom";

import { Segment, Button } from 'semantic-ui-react';

const NotFound = () => {
    // Wir erstellen einen useNavigate Hook.
    const navigate = useNavigate();

    return (
        <div className="NotFound">
            <Segment>
                <h1>404</h1>

                <p>
                    Seite nicht gefunden!
                </p>

                {/* Wir erstellen einen button, mit dem wir durch den wert "-1" in navigate auf die vorherige seite zurückkehren könenn. */}
                <Button onClick={() => navigate(-1)} size="large" inverted color='blue'>Zurück zur vorherigen Seite</Button>
            </Segment>
        </div>
    )
};

export default NotFound;
