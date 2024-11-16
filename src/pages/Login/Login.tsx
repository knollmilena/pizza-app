import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { AuthInterface } from '../../interfaces/auth.interface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/user.clice';

export const Login = () => {
    const [error, setError] = useState<string | null>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const name = formData.get('password') as string;

        postLogin(email, name);
    };

    const postLogin = async (email: string, password: string) => {
        console.log(email, password);

        try {
            const { data } = await axios.post<AuthInterface>(
                `https://purpleschool.ru/pizza-api-demo/auth/login`,
                {
                    email,
                    password,
                }
            );
            dispatch(userActions.addJwt(data.access_token));
            // localStorage.setItem('jwt', data.access_token);
            navigate('/');
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    };

    return (
        <div className={styles['login']}>
            <Heading>Вход</Heading>
            {error && <div className={styles['error']}>{error}</div>}
            <form className={styles['login']} onSubmit={onSubmit}>
                <div className={styles['field']}>
                    <label htmlFor="email">Yout email</label>
                    <Input id="email" name="email" placeholder="Email" />
                </div>
                <div className={styles['field']}>
                    <label htmlFor="password">Yout password</label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="password"
                    />
                </div>
                <Button appearence="big">Login</Button>
                <div className={styles['links']}>
                    <div>Нет аккаунта?</div>
                    <Link to="/auth/register">Зарегистрироваться</Link>
                </div>
            </form>
        </div>
    );
};
