import Header from "../Header/Header";
import Routing from "../../Pages/Routing/Routing";
import "./App.css";
import "@picocss/pico";
import 'react-notifications-component/dist/theme.css'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Globalstate/Store";

function App(): JSX.Element {
    


    return (
        <div className="App" >
            <div className="overlay">
                <main>
                    <Routing />
                </main>
            </div>
        </div>
    );
}

export default App;
