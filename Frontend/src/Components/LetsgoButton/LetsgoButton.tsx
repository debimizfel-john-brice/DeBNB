import { useSelector } from 'react-redux';
import './LetsgoButton.css';
import { RootState } from '../../Globalstate/Store';

function LetsgoButton(): JSX.Element {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div className="LetsgoButton">
            {
                user
                    ?
                    <a href="/vacations" role="button" className="button">Let's Go</a>
                    :
                    <a href="/login" role="button" className="button">Let's Go</a>
            }
        </div>
    );
}

export default LetsgoButton;
