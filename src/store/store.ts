import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_KEY } from './user.slice';
import { saveJwtState } from './storage';
import basketSlice from './basket.slice';

export const store = configureStore({
    reducer: {
        userSlice,
        basketSlice,
    },
});

store.subscribe(() => {
    saveJwtState({ jwt: store.getState().userSlice.jwt }, JWT_KEY);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
