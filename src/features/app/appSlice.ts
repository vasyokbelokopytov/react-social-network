import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from '../auth/authSlice';

interface AppState {
  isInited: boolean;
  isIniting: boolean;
  error: string | null;
}

const initialState: AppState = {
  isInited: false,
  isIniting: false,
  error: null,
};

export const init = createAsyncThunk<
  void,
  void,
  {
    rejectValue: string;
  }
>('init', async (_, { dispatch, rejectWithValue }) => {
  try {
    await Promise.all([dispatch(auth()).unwrap()]);
  } catch (e) {
    const error = e as Error;
    rejectWithValue(error.message);
  }
});

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    errorChanged: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(init.pending, (state) => {
        state.isIniting = true;
        state.isInited = false;
      })
      .addCase(init.fulfilled, (state) => {
        state.isIniting = false;
        state.isInited = true;
      })
      .addCase(init.rejected, (state, action) => {
        state.isIniting = false;
        state.error = action.payload ?? 'Some error occured';
      }),
});

export const { errorChanged } = appSlice.actions;

export default appSlice.reducer;
