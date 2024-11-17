import { ProductCardProps } from './ProductCard.props';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { basketActions } from '../../store/basket.slice';

export function ProductCard(props: ProductCardProps) {
    const dispatch = useDispatch<AppDispatch>();
    const add = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(basketActions.add(props.id));
    };

    return (
        <Link to={`/product/${props.id}`} className={styles['link']}>
            <div className={styles['card']}>
                <div
                    className={styles['head']}
                    style={{ backgroundImage: `url(${props.image})` }}
                >
                    <div className={styles['price']}>
                        {props.price}&nbsp;
                        <span className={styles['currency']}>₽</span>
                    </div>
                    <button className={styles['add-to-basket']} onClick={add}>
                        <img
                            src="./src/assets/images/basket-button.svg"
                            alt="Basket icon"
                        ></img>
                    </button>
                    <div className={styles['raiting']}>
                        {props.raiting}&nbsp;
                        <img
                            src="./src/assets/images/star.svg"
                            alt="Raiting icon"
                        />
                    </div>
                </div>
                <div className={styles['footer']}>
                    <div className={styles['title']}>{props.title}</div>
                    <div className={styles['description']}>
                        {props.description}
                    </div>
                </div>
            </div>
        </Link>
    );
}
