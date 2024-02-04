import './LogIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Card from '../../Components/Card/Card';
import Credentials from '../../Models/CredentialsModel';
import AuthService from '../../Services/AuthService';
import notifyService from '../../Services/NotifyService';
import Header from '../../Layout/Header/Header';
import Background from '../../Components/Background/Background';

function LogIn(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<Credentials>();

    const navigate = useNavigate();

    async function save(credentials: Credentials) {
        try {
            await AuthService.login(credentials);
            notifyService.success("Welcome Back!");
            navigate("/vacations");

        } catch (error: any) {
            notifyService.error(error.message);
        }
    }

    return (
        <Background>
            <Header />
            <div className="LogIn">
                <Card width={500}>
                    <form onSubmit={handleSubmit(save)}>
                        <h2>Log in</h2>
                        <div className='input'>
                            <label>Email: </label>
                            <input type="email" {...register("email", Credentials.emailValidation)} />
                            <span className="validation">{formState.errors.email?.message}</span>
                        </div>
                        <div className='input'>
                            <label>Password: </label>
                            <input type="password" {...register("password", Credentials.passwordValidation)} />
                            <span className="validation">{formState.errors.password?.message}</span>
                        </div>
                        <div className="grid">
                            <button className='secondary' type='button' onClick={() => navigate("/home")}>Cancel</button>
                            <button>Submit</button>
                        </div>
                        <small>
                            <div>Don't have an acount?</div>
                            <Link to={"/register"}>Register now</Link>
                        </small>
                    </form>
                </Card>
            </div>
        </Background>
    );
}

export default LogIn;
