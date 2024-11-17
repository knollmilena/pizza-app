import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const JWT_KEY = 'userData';

export interface ProductItem {
    id: number;
    count: number;
}
export interface BasketState {
    items: ProductItem[];
}

const initialState: BasketState = {
    items: [],
};

export const basketSlice = createSlice({
    name: 'basketSlice',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<number>) => {
            const index = state.items.findIndex(
                (item) => item.id === action.payload
            );

            if (index === -1) {
                state.items.push({ id: action.payload, count: 1 });
            } else {
                state.items[index] = {
                    ...state.items[index],
                    count: state.items[index].count + 1,
                };
            }
        },
    },
});

export default basketSlice.reducer;
export const basketActions = basketSlice.actions;
