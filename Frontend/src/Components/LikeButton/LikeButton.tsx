import { useSelector } from 'react-redux';
import './LikeButton.css';
import { RootState } from '../../Globalstate/Store';
import VacationsService from '../../Services/VacationsService';
import notifyService from '../../Services/NotifyService';
import { useNavigate } from 'react-router-dom';
import { SyntheticEvent, useState } from 'react';
import VacationWithLikes from '../../Models/VacationWithLikesModel';

interface LikeButtonProps {
    vacation: VacationWithLikes;
}

function LikeButton(props: LikeButtonProps): JSX.Element {

    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);

    async function toggleLike() {
        try {
            await VacationsService.updateLikes(props.vacation.vacationId, !props.vacation.liked);
        }
        catch (error: any) {
            notifyService.error(error.message);
        }

    }

    async function deleteVacation() {
        const vacationId = props.vacation.vacationId;
        try {
            await VacationsService.deleteVacation(vacationId);
            notifyService.success("Vacation deleted successfully");
            navigate("/vacations");
        } catch (error: any) {
            notifyService.error(error.message);
        }

    }

    return (
        <div className="LikeButton">
            {
                user?.role === "admin" ?
                    <>
                        <div className="admin">
                            <a href={`/edit-vacation/${props.vacation.vacationId}`} role="button" className="secondary admin_buttons">Edit</a>
                            <a href="#" role="button" className="contrast admin_buttons" onClick={() => setDeleting(true)}>Delete</a>
                        </div>
                        <dialog open={deleting ? true : undefined}>
                            <article className="dialog">
                                Are you sure you want to delete <b>{props.vacation.destination}</b>?
                                <div className="grid buttons">
                                    <button onClick={() => setDeleting(false)} className="secondary">Cancel</button>
                                    <button onClick={deleteVacation} className="contrast">Delete</button>
                                </div>
                            </article>
                        </dialog>
                    </>
                    :

                    <div className="user">
                        <button onClick={toggleLike} className={`like_button ${props.vacation.liked ? "liked" : "notLiked"} `}>Likes {props.vacation.likes}
                        </button>
                    </div>
            }
        </div>
    );
}

export default LikeButton;
