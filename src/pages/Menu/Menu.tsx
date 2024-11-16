import { useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { ProductInterface } from '../../interfaces/product.interfaces';
import styles from './Menu.module.css';
import axios from 'axios';

const Menu = () => {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    const getMenu = async () => {
        try {
            // setIsLoading(true);
            // await new Promise<void>((resolve) => {
            //     setTimeout(() => {
            //         resolve();
            //     }, 2000);
            // });
            const { data } = await axios.get<ProductInterface[]>(
                `${PREFIX}products`
            );
            setProducts(data);
            // setIsLoading(false);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
            console.error(e);
            return;
        } finally {
            // setIsLoading(false);
        }
    };

    useEffect(() => {
        getMenu();
    }, []);
    return (
        <>
            <div className={styles['head']}>
                <Heading>Меню</Heading>
                <Search placeholder="Введите блюдо или состав" />
            </div>
            <div className={styles['products']}>
                {error && <>{error}</>}
                {/* {!isLoading ? ( */}
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        id={p.id}
                        title={p.name}
                        description={JSON.stringify(p.ingredients)}
                        raiting={p.rating}
                        price={p.prices}
                        image={p.image}
                    />
                ))}
                {/* ) : (
                    <p>Идёт загрузка...</p>
                )} */}
            </div>
        </>
    );
};

export default Menu;
