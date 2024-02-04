import { useEffect, useState } from 'react';
import './Vacations.css';
import VacationsService from '../../Services/VacationsService';
import notifyService from '../../Services/NotifyService';
import VacationWithLikes from '../../Models/VacationWithLikesModel';
import { useSelector } from 'react-redux';
import { RootState } from '../../Globalstate/Store';
import Filter from '../../Components/Filter/Filter';
import VacationsChunk from '../../Components/VacationsChunk/VacationsChunk';
import ReactPaginate from 'react-paginate';
import Header from '../../Layout/Header/Header';

function Vacations(): JSX.Element {
    const [filter, setFilter] = useState<((v: VacationWithLikes) => boolean)[]>([_ => true]);
    const [page, setPage] = useState(1);

    const user = useSelector((state: RootState) => state.auth.user);
    const vacations = useSelector<RootState, VacationWithLikes[]>(state => state.vacations.vacations).filter(filter[0]);

    useEffect(() => {
        if (!vacations.length) {
            VacationsService.getVacations()
                .catch(e => notifyService.error(e.message));
        }
    }, []);

    return (
        <>
            <Header />
            <div className="Vacations">
                <div className="container">
                    {user?.role !== "admin" && <Filter setFilter={setFilter} />}
                </div>
                <VacationsChunk vacations={vacations.slice((page - 1) * 10, page * 10)} />
                <nav className="pagination">
                    <ReactPaginate
                        onPageChange={e => setPage(e.selected + 1)}
                        pageCount={Math.ceil(vacations.length / 10)}
                    />
                </nav>
            </div>
        </>
    );
}

export default Vacations;
