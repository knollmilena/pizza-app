import { basketActions } from '../../store/basket.slice';
import { AppDispatch } from '../../store/store';
import { CartItemProps } from './BasketItem.props';
import styles from './Basketitem.module.css';
import { useDispatch } from 'react-redux';
import minusIcon from '@images/minus-icon.svg';
import plusIcon from '@images/plus-icon.svg';
import deleteIcon from '@images/delete-icon.svg';

function CartItem(props: CartItemProps) {
    const dispatch = useDispatch<AppDispatch>();

    const add = () => {
        dispatch(basketActions.add(props.id));
    };

    const remove = () => {};

    const increase = () => {
        dispatch(basketActions.add(props.id));
    };

    const descrease = () => {};

    return (
        <div className={styles['item']}>
            <div
                className={styles['image']}
                style={{ backgroundImage: `url('${props.image}')` }}
            ></div>
            <div className={styles['description']}>
                <div className={styles['name']}>{props.name}</div>
                <div className={styles['price']}>{props.price}&nbsp;₽</div>
            </div>
            <div className={styles['actions']}>
                <button className={styles['minus']} onClick={descrease}>
                    <img src={minusIcon} alt="Удалить из корзины" />
                </button>
                <div className={styles['number']}>{props.count}</div>
                <button className={styles['plus']} onClick={increase}>
                    <img src={plusIcon} alt="Добавить в корзину" />
                </button>
                <button className={styles['remove']} onClick={remove}>
                    <img src={deleteIcon} alt="Удалить все" />
                </button>
            </div>
        </div>
    );
}

export default CartItem;
