import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from '../Login/Login.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { register, userActions } from '../../store/user.clice';

export const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, loginErrorMessage } = useSelector(
        (s: RootState) => s.userSlice
    );

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearLoginError());
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        postLogin(name, email, password);
    };

    const postLogin = async (name: string, email: string, password: string) => {
        dispatch(register({ name, email, password }));
    };

    return (
        <div className={styles['login']}>
            <Heading>Регистрация</Heading>
            {loginErrorMessage && (
                <div className={styles['error']}>{loginErrorMessage}</div>
            )}
            <form className={styles['login']} onSubmit={onSubmit}>
                <div className={styles['field']}>
                    <label htmlFor="name">Ваше имя</label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Имя"
                    />
                </div>
                <div className={styles['field']}>
                    <label htmlFor="email">Ваш email</label>
                    <Input id="email" name="email" placeholder="Email" />
                </div>
                <div className={styles['field']}>
                    <label htmlFor="password">Ваш пароль</label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                    />
                </div>
                <Button appearence="big">Зарегистрироваться</Button>
                <div className={styles['links']}>
                    <div>Есть аккаунт?</div>
                    <Link to="/auth/login">Войти</Link>
                </div>
            </form>
        </div>
    );
};
