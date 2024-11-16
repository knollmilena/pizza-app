import { forwardRef } from 'react';
import { SearchProps } from './Search.props';
import styles from './Search.module.css';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
    { isValid = true, className, ...props },
    ref
) {
    return (
        <div className={styles['input-wrapper']}>
            <img
                className={styles['icon']}
                src="./src/assets/images/search.svg"
                alt=""
            />

            <input
                ref={ref}
                className={`${styles['input']} ${className} ${
                    isValid ? styles['invalid'] : ''
                }`}
                {...props}
            />
        </div>
    );
});

export default Search;
