import { useNavigate } from 'react-router-dom';
import './AddVacation.css';
import VacationsService from '../../Services/VacationsService';
import notifyService from '../../Services/NotifyService';
import Vacation from '../../Models/VacationsModel';
import { useForm } from 'react-hook-form';
import Card from '../../Components/Card/Card';
import { useState } from 'react';
import Header from '../../Layout/Header/Header';

function AddVacation(): JSX.Element {
    const { register, handleSubmit, formState, getValues  } = useForm<Vacation>();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    async function add(vacation: Vacation) {
        try {
            await VacationsService.addVacation(vacation);
            notifyService.success("Vacation added successfully");
            navigate("/vacations");
        } catch (error: any) {
            notifyService.error(error);
        }
    }
    return (
        <>
            <Header />
            <div className="AddVacation">
                <Card width={650}>
                    <form onSubmit={handleSubmit(add)}>
                        <h2>Add vacation</h2>
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
                            <input type="file" {...register("image", Vacation.imageValidation)} onChange={handleImageChange} />
                            {previewImage && <img src={previewImage} alt="Preview" />}
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

export default AddVacation;
