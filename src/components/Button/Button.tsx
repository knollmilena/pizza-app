import styles from './Button.module.css';
import { ButtonProps } from './Button.props';

function Button({
    children,
    className,
    appearence = 'small',
    ...props
}: ButtonProps) {
    return (
        <button
            className={`
                ${styles.button} 
                ${appearence === 'big' ? styles.big : styles.small} ${
                className || ''
            } `}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
