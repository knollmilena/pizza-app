import { ProductCardProps } from './ProductCard.props';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';

export function ProductCard(props: ProductCardProps) {
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
                    <button className={styles['add-to-basket']}>
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
