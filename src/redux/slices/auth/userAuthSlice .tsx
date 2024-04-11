import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

interface User {
  email: string;
  password: string;
  username: string;
  token: string;
}

interface UserAuthState {
  isLoggedIn: boolean;
  error: string | null;
}

const initialState: UserAuthState = {
  isLoggedIn: false,
  error: null,
};

interface LoginCredentials {
  email: string;
  password: string;
  username: string;
}

const generateDynamicToken = () => `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`;


export const login = createAsyncThunk(
  'userAuth/login',
  async ({ email, password, username }: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://66117b7e95fdb62f24ed4269.mockapi.io/BlendIn/userAuth');
      const user = response.data.find((user : User) => (user.email === email || user.username === username) && user.password === password);

      if (user) {
        const dynamicToken = generateDynamicToken();
        console.log(`A new token ${dynamicToken} is generated`);
        await Keychain.setGenericPassword(email, dynamicToken);
        return { isLoggedIn: true, token: dynamicToken };
      } else {
        return rejectWithValue('Incorrect email/password');
      }
    } catch (error) {
      return rejectWithValue('An error occurred during login');
    }
  }
);

export const validateToken = createAsyncThunk(
  'userAuth/validateToken',
  async (_, { rejectWithValue }) => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        return true;
      } else {
        return false; 
      }
    } catch (error) {
      console.error('Token validation error:', error);
      return rejectWithValue('An error occurred while validating the token');
    }
  }
);

export const createUser = createAsyncThunk(
  'userAuth/createUser',
  async ({ email, username, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://66117b7e95fdb62f24ed4269.mockapi.io/BlendIn/userAuth', {
        email,
        username,
        password,
      });
      return response.data; 
      console.log('A new user has been created')
    } catch (error) {
      console.error("Failed to create user:", error);
      return rejectWithValue('An error occurred while creating a user');
    }
  }
);



const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.error = null;
      Keychain.resetGenericPassword();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, _) => {
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload as string;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      })

  },
});

export const { logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
