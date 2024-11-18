import { useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import { RootState } from '../../store/store';
import CartItem from '../../components/BasketItem/BasketItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductInterface } from '../../interfaces/product.interfaces';
import { PREFIX } from '../../helpers/API';

export const Basket = () => {
    const [cartProducts, setCardProducts] = useState<ProductInterface[]>();
    const items = useSelector((s: RootState) => s.basketSlice.items);

    const getItem = async (id: number) => {
        const { data } = await axios.get<ProductInterface>(
            `${PREFIX}products/${id}`
        );
        return data;
    };

    const loadAllitems = async () => {
        const res = await Promise.all(items.map((i) => getItem(i.id)));
        setCardProducts(res);
    };

    useEffect(() => {
        loadAllitems();
    }, [items]);
    return (
        <>
            <Heading style={{ marginBottom: '40px' }}>Корзина</Heading>
            {items.map((i) => {
                const product = cartProducts?.find((p) => p.id === i.id);
                if (!product) {
                    return;
                }
                return <CartItem key={i.id} count={i.count} {...product} />;
            })}
        </>
    );
};
