import "./Header.css";
import Menu from "../Menu/Menu";

function Header(): JSX.Element {

    return (
        <header className="Header container">
            <nav>
                <ul>
                    <li><strong><a href="/home"><img className="logo" src="/logo.svg" /></a></strong></li>
                </ul>
                <Menu />
            </nav>
        </header>

    );
}


export default Header;

