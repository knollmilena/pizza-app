import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import logoImg from '@images/favicon.svg';

export const AuthLayout = () => {
    return (
        <div className={`${styles['layout']}`}>
            <div className={`${styles['logo']}`}>
                <img src={logoImg} alt="Logo" />
            </div>
            <div className={styles['content']}>
                <Outlet />
            </div>
        </div>
    );
};
