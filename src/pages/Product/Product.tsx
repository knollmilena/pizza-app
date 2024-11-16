import { useLoaderData } from 'react-router-dom';
import { ProductInterface } from '../../interfaces/product.interfaces';

export const Product = () => {
    const data = useLoaderData() as ProductInterface;
    return (
        <div>
            Product - <>{data.name}</>
        </div>
    );
};
