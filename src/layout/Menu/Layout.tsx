import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import avatarImg from '@images/avatar.svg';
import menuIcon from '@images/menu-icon.svg';
import cartIcon from '@images/cart-icon.svg';
import exitIcon from '@images/exit.svg';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/user.clice';

export const Layout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const logout = () => {
        // localStorage.removeItem('jwt');
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
                    <div className={`${styles['name']}`}>Artur Pirozhkov</div>
                    <div className={`${styles['email']}`}>
                        artur-pirazhkov@mail.ru
                    </div>
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
                        <img src={cartIcon} alt="Basket icon" /> Корзина
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