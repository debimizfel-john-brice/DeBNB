import Card from '../Card/Card';
import LikeButton from '../LikeButton/LikeButton';
import VacationWithLikes from '../../Models/VacationWithLikesModel';
import './VacationsChunk.css';
import Vacation from '../Vacation/Vacation';

interface VacationsChunkProps {
    vacations: VacationWithLikes[];
}

function VacationsChunk(props: VacationsChunkProps): JSX.Element {
    return (
        <div className="VacationsChunk">
            {props.vacations.map(v => <Vacation vacation={v} />)}
        </div>
    );
}

export default VacationsChunk;
