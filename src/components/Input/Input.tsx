import { forwardRef } from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { isValid = true, className, ...props },
    ref
) {
    return (
        <input
            ref={ref}
            className={`${styles['input']} ${className} ${
                isValid ? styles['invalid'] : ''
            }`}
            {...props}
        />
    );
});

export default Input;
