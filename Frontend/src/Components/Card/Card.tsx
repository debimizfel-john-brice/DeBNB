import { ReactNode } from 'react';
import './Card.css';

interface CardProps {
    children: ReactNode;
    width?: number;
    height?: number;
}

function Card(props: CardProps): JSX.Element {
    return (
        <div className="Card" style={{ width: props.width, height: props.height }}>
            <article className="article">
                {props.children}
            </article>
        </div>
    );
}

export default Card;
