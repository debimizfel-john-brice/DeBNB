import './Register.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import Card from '../../Components/Card/Card';
import notifyService from '../../Services/NotifyService';
import User from '../../Models/UserModel';
import Header from '../../Layout/Header/Header';
import Background from '../../Components/Background/Background';

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<User>();
    const navigate = useNavigate();

    async function save(user: User) {
        try {
            await AuthService.register(user);
            notifyService.success("User registered successfully");
            navigate("/vacations");
        } catch (error: any) {
            notifyService.error(error.message);
        }
    }

    return (
        <Background>
            <Header />
            <div className="Register">
                <Card width={650}>
                    <form onSubmit={handleSubmit(save)}>
                        <h2>Sign up</h2>
                        <div className="grid">
                            <div className='input'>
                                <label>First Name: </label>
                                <input type="text" {...register("firstName", User.firstNameValidation)} />
                                <span className="validation">{formState.errors.firstName?.message}</span>
                            </div>
                            <div className='input'>
                                <label>Last Name: </label>
                                <input type="text" {...register("lastName", User.lastNameValidation)} />
                                <span className="validation">{formState.errors.lastName?.message}</span>
                            </div>
                        </div>
                        <div className="grid">
                            <div className='input'>
                                <label>Email: </label>
                                <input type="email" {...register("email", User.emailValidation)} />
                                <span className="validation">{formState.errors.email?.message}</span>
                            </div>
                            <div className='input'>
                                <label>Password: </label>
                                <input type="password" {...register("password", User.passwordValidation)} />
                                <span className="validation">{formState.errors.password?.message}</span>
                            </div>
                        </div>
                        <div className="grid">
                            <button className='secondary' type='button' onClick={() => navigate("/home")}>Cancel</button>
                            <button>Submit</button>
                        </div>
                        <small>
                            <div>Already have an acount?</div>
                            <Link to={"/login"}>Log in</Link>
                        </small>
                    </form>
                </Card>
            </div>
        </Background>
    );
}

export default Register;
