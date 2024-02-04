import AddVacation from '../AddVacation/AddVacation';
import EditVacation from '../EditVacation/EditVacation';
import Home from '../Home/Home';
import LogIn from '../LogIn/LogIn';
import Register from '../Register/Register';
import RouteNotFound from '../RouteNotFound/RouteNotFound';
import Vacations from '../Vacations/Vacations';
import VacationsReport from '../VacationsReport/VacationsReport';
import './Routing.css';
import { Navigate, Route, Routes } from "react-router-dom";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LogIn />} />

                <Route path="/vacations" element={<Vacations />} />
                <Route path="/edit-vacation/:vacationId" element={<EditVacation />} />
                <Route path="/add-vacation" element={<AddVacation />} />

                <Route path="/vacations-report" element={<VacationsReport />} />

                <Route path="*" element={<RouteNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
