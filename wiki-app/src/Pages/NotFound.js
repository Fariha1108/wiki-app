import { useNavigate } from "react-router-dom";

const NotFound = () =>
{
    // Wir erstellen einen useNavigate Hook.
    const navigate = useNavigate();

    return(
        <div className="NotFound">
            <h1>404</h1>

            <p>
                Seite nicht gefunden!
            </p>

            {/* Wir erstellen einen button, mit dem wir durch den wert "-1" in navigate auf die vorherige seite zurückkehren könenn. */}
            <button onClick={ () => navigate(-1) }>Zurück zur vorherigen Seite</button>
        </div>
    )
};

export default NotFound;
