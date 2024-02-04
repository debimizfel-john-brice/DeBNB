import Card from '../Card/Card';
import LikeButton from '../LikeButton/LikeButton';
import VacationWithLikes from '../../Models/VacationWithLikesModel';
import './Vacation.css';

interface VacationProps {
    vacation: VacationWithLikes;
}

function Vacation(props: VacationProps): JSX.Element {
    return (
        <div className="Vacation">
            <Card key={props.vacation.vacationId} width={350}>
                <div className="card_image" style={{ backgroundImage: `url(${props.vacation.image})` }}>
                    <div className="like_button">
                        <LikeButton vacation={props.vacation} />
                    </div>
                </div>
                <div className="card_content">
                    <hgroup>
                        <h6>{props.vacation.destination}</h6>
                        <p>{new Date(props.vacation.start).toLocaleDateString()} - {new Date(props.vacation.end).toLocaleDateString()}</p>
                    </hgroup>
                    <p className="description">{props.vacation.description}</p>
                    <div className="price"><a href="#" role="button" className="secondary">{props.vacation.price}$</a></div>
                </div>
            </Card>
        </div>
    );
}

export default Vacation;
