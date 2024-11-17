import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_KEY } from './user.clice';
import { saveJwtState } from './storage';

export const store = configureStore({
    reducer: {
        userSlice,
    },
});

store.subscribe(() => {
    saveJwtState({ jwt: store.getState().userSlice.jwt }, JWT_KEY);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
