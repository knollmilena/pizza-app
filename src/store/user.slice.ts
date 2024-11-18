import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadJwtState } from './storage';
import { AuthInterface } from '../interfaces/auth.interface';
import axios, { AxiosError } from 'axios';
import { Profile } from '../interfaces/user.interfaces';
import { RootState } from './store';
import { PREFIX } from '../helpers/API';

export const JWT_KEY = 'userData';

export interface UserState {
    jwt: string | null;
    loginErrorMessage?: string | null;
    profile?: Profile;
}

const initialState: UserState = {
    jwt: loadJwtState(JWT_KEY),
    loginErrorMessage: null,
};

export const register = createAsyncThunk(
    'user/register',
    async (params: { name: string; email: string; password: string }) => {
        try {
            const { data } = await axios.post<AuthInterface>(
                `${PREFIX}auth/register`,
                {
                    name: params.name,
                    email: params.email,
                    password: params.password,
                }
            );
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    }
);

export const login = createAsyncThunk(
    'user/login',
    async (params: { email: string; password: string }) => {
        try {
            const { data } = await axios.post<AuthInterface>(
                `${PREFIX}auth/login`,
                {
                    email: params.email,
                    password: params.password,
                }
            );
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    }
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
    'user/getProfile',
    async (_, thunkApi) => {
        const jwt = thunkApi.getState().userSlice.jwt;
        const { data } = await axios.get<Profile>(`${PREFIX}user/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return data;
    }
);

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        addJwt: (state, action: PayloadAction<AuthInterface>) => {
            state.jwt = action.payload.access_token;
        },
        logout: (state) => {
            state.jwt = null;
        },
        clearLoginError: (state) => {
            state.loginErrorMessage = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            {
                state.jwt = action.payload.access_token;
            }
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            {
                state.jwt = action.payload.access_token;
            }
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message;
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
    },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
