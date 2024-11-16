import { HeadlingProps } from './Heading.props';
import styles from './Heading.module.css';

function Heading({ children, className, ...props }: HeadlingProps) {
    return (
        <h1 className={`${styles['h1']} ${className}`} {...props}>
            {children}
        </h1>
    );
}

export default Heading;
