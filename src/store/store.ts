import { configureStore, createSlice } from '@reduxjs/toolkit';
import userClice, { JWT_KEY } from './user.clice';
import { saveJwtState } from './storage';

export const store = configureStore({
    reducer: {
        userClice,
    },
});

store.subscribe(() => {
    saveJwtState({ jwt: store.getState().userClice.jwt }, JWT_KEY);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
