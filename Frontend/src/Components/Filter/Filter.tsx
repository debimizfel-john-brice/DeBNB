import { SyntheticEvent } from 'react';
import './Filter.css';
import Vacation from '../../Models/VacationsModel';
import VacationWithLikes from '../../Models/VacationWithLikesModel';

interface FilterProps {
    setFilter: (filter: ((v: VacationWithLikes) => boolean)[]) => void;
}

function Filter(props: FilterProps): JSX.Element {

    function filter(option: SyntheticEvent<HTMLSelectElement>) {
        switch (option.currentTarget.value) {
            case 'Liked':
                props.setFilter([v => v.liked]);
                break;
            case 'Started':
                props.setFilter([v => v.start <= new Date().toISOString()]);
                break;
            case 'Not started':
                props.setFilter([v => v.start > new Date().toISOString()]);
                break;
            default:
                props.setFilter([_ => true]);
                break;
        }
    }
    return (
        <div className="Filter">
            <select className="select" onChange={e => filter(e)} >
                <option value="" disabled selected>Filter by</option>
                <option>All</option>
                <option>Liked</option>
                <option>Started</option>
                <option>Not started</option>
            </select>
        </div>
    );
}

export default Filter;
