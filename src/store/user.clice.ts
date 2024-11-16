import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadJwtState } from './storage';

export const JWT_KEY = 'userData';

export interface UserState {
    jwt: string | null;
}

const initialState: UserState = {
    jwt: loadJwtState(JWT_KEY) ?? null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addJwt: (state, action: PayloadAction<string>) => {
            state.jwt = action.payload;
        },
        logout: (state) => {
            state.jwt = null;
        },
    },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
