import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import avatarImg from '@images/avatar.svg';
import menuIcon from '@images/menu-icon.svg';
import cartIcon from '@images/cart-icon.svg';
import exitIcon from '@images/exit.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';

export const Layout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((s: RootState) => s.userSlice.profile);
    const itemsInBasket = useSelector((s: RootState) => s.basketSlice.items);

    useEffect(() => {
        dispatch(getProfile());
    }, []);

    const logout = () => {
        dispatch(userActions.logout());
        navigate('/auth/login');
    };
    return (
        <div className={`${styles['layout']}`}>
            <div className={`${styles['sidebar']}`}>
                <div className={`${styles['user']}`}>
                    <img
                        className={`${styles['avatar']}`}
                        src={avatarImg}
                        alt="Avatar user"
                    />
                    <div className={`${styles['name']}`}>{profile?.name}</div>
                    <div className={`${styles['email']}`}>{profile?.email}</div>
                </div>

                <div className={`${styles['menu']}`}>
                    <NavLink
                        className={({ isActive }) =>
                            `${isActive ? `${styles['active']}` : ''} ${
                                styles['link']
                            }`
                        }
                        to="/"
                    >
                        <img src={menuIcon} alt="Menu icon" /> Меню
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `${isActive ? `${styles['active']}` : ''} ${
                                styles['link']
                            }`
                        }
                        to="/cart"
                    >
                        <img src={cartIcon} alt="Basket icon" /> Корзина{' '}
                        <span className={styles['cart-count']}>
                            {itemsInBasket.reduce(
                                (acc, item) => (acc += item.count),
                                0
                            )}
                        </span>
                    </NavLink>
                </div>
                <Button className={styles['exit']} onClick={logout}>
                    <img src={exitIcon} alt="Exit icon" /> Выйти
                </Button>
            </div>
            <div className={styles['content']}>
                <Outlet />
            </div>
        </div>
    );
};
