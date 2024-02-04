import { useNavigate, useParams } from 'react-router-dom';
import './EditVacation.css';
import { useForm } from 'react-hook-form';
import Vacation from '../../Models/VacationsModel';
import Card from '../../Components/Card/Card';
import notifyService from '../../Services/NotifyService';
import VacationsService from '../../Services/VacationsService';
import { useEffect, useState } from 'react';
import Header from '../../Layout/Header/Header';

function EditVacation(): JSX.Element {
    const { register, handleSubmit, formState, setValue, getValues } = useForm<Vacation>();
    const navigate = useNavigate();

    const params = useParams();
    const { vacationId } = params;

    const [vacation, setVacation] = useState<Vacation>();
    useEffect(() => {
        VacationsService.getVacation(vacationId!)
            .then(v => {
                setVacation(v);
                setValue("destination", v.destination);
                setValue("price", v.price);
                setValue("start", v.start);
                setValue("end", v.end);
                setValue("description", v.description);
            })
            .catch(e => notifyService.error(e.message));
    }, []);

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    async function update(vacation: Vacation) {
        try {
            vacation.vacationId = parseInt(vacationId!);
            await VacationsService.updateVacation(vacation);
            notifyService.success("Vacation updated successfully");
            navigate("/vacations");
        } catch (error: any) {
            notifyService.error(error.message);
        }
    }

    return (
        <>
            <Header />
            <div className="EditVacation">
                <Card width={650}>
                    <form onSubmit={handleSubmit(update)}>
                        <h2>Edit vacation</h2>
                        <div className="grid">
                            <div className='input'>
                                <label>Destination </label>
                                <input type="text" {...register("destination", Vacation.destinationValidation)} />
                                <span className="validation">{formState.errors.destination?.message}</span>
                            </div>
                            <div className='input'>
                                <label>Price </label>
                                <input type="text" {...register("price", Vacation.priceValidation)} />
                                <span className="validation">{formState.errors.price?.message}</span>
                            </div>
                        </div>
                        <div className="grid">
                            <div className='input'>
                                <label>Start date: </label>
                                <input type="date" {...register("start", Vacation.startValidation)} />
                                <span className="validation">{formState.errors.start?.message}</span>
                            </div>
                            <div className='input'>
                                <label>End date: </label>
                                <input type="date" {...register(
                                    "end",
                                    {
                                        ...Vacation.endValidation,
                                        validate: {
                                            afterStart: (value: string) => value > getValues().start || "End date must be after start date",
                                        }
                                    }
                                )} />
                                <span className="validation">{formState.errors.end?.message}</span>
                            </div>
                        </div>
                        <div className='input'>
                            <label>Description: </label>
                            <textarea {...register("description", Vacation.descriptionValidation)} />
                            <span className="validation">{formState.errors.description?.message}</span>
                        </div>
                        <div className='input'>
                            <label>Image: </label>
                            <input type="file" {...register("image")} onChange={handleImageChange} />
                            <img src={previewImage || vacation?.image} />
                            <span className="validation">{formState.errors.image?.message}</span>
                        </div>
                        <div className="grid">
                            <button className='secondary' type='button' onClick={() => navigate("/vacations")}>Cancel</button>
                            <button>Submit</button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );

}

export default EditVacation;
