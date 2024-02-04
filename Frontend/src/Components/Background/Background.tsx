import './Background.css';
import { RootState } from '../../Globalstate/Store';
import { useSelector } from 'react-redux';  
import { ReactNode } from 'react';

function Backgrou({ children }: { children: ReactNode }): JSX.Element {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <div className="Background">
            <div className="overlay">
                {children}
            </div>
        </div>
    );
}

export default Backgrou;
