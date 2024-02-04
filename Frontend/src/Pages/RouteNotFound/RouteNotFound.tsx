import Header from "../../Layout/Header/Header";
import "./RouteNotFound.css";

function RouteNotFound(): JSX.Element {
    return (
        <>
            <Header />
                <div className="RouteNotFound">
                <article>
                    <hgroup>
                        <h1>404</h1>
                        <h2>Page not found</h2>
                    </hgroup>
                </article>
            </div>
        </>
    );
}

export default RouteNotFound;
