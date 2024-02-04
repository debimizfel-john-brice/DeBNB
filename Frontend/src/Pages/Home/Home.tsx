import './Home.css';
import { RootState } from '../../Globalstate/Store';
import { useSelector } from 'react-redux';
import LetsgoButton from '../../Components/LetsgoButton/LetsgoButton';
import Header from '../../Layout/Header/Header';
import Background from '../../Components/Background/Background';

function Home(): JSX.Element {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <Background>
            <Header />
            <div className="Home container">
                <h1>Welcome {user ? user.firstName : ""}</h1>
                <p>Explore your ideal getaways with our platform, inspired by the user-friendly design of DeBNB. Navigate through a diverse selection of enticing vacation packages tailored to meet every traveler's desires. Effortlessly curate your dream holiday by giving a thumbs up to the packages that captivate you. With a simple click, you can easily save and organize your preferred trips, ensuring that your travel aspirations are just a heartbeat away. Embrace the convenience of planning your perfect escape, all within the seamless and engaging experience our platform, inspired by DeBNB, provides.</p>
                <LetsgoButton />
            </div>
        </Background>
    );
}

export default Home;
