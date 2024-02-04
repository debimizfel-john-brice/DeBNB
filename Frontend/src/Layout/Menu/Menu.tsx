import "./Menu.css";
import { Link } from "react-router-dom";
import { RootState } from "../../Globalstate/Store";
import { useSelector } from 'react-redux';
import AuthService from "../../Services/AuthService";
import notifyService from "../../Services/NotifyService";
import Filter from "../../Components/Filter/Filter";

function Menu(): JSX.Element {
    const user = useSelector((state: RootState) => state.auth.user);

    function logout() {
        AuthService.logout();
        notifyService.success("Logged out successfully");
    }

    return (
        <ul className="Menu">
            {
                user
                    ? <>

                        {
                            user.role === "admin" ?
                                <>
                                    <li><Link to="/home" onClick={logout}>Log out</Link></li>
                                    <li><Link to="/add-vacation">Add vacation</Link></li>
                                    <li><Link to="/vacations-report">Vacations report</Link></li>
                                </>
                                : <>
                                    <li><Link to="/home" onClick={logout}>Log out</Link></li>
                                </>
                        }
                    </>
                    : <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Log in</Link></li>
                    </>
            }
        </ul>
    );
}


export default Menu;
