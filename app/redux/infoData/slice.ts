"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  firstName: string;
  lastName: string;
  dob: string | number | null;
  email: string;
  phone: string;
  addressline1: string;
  addressline2: string;
  city: string;
  state: string;
  postcode: string;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  dob: null,
  email: '',
  phone: '',
  addressline1: '',
  addressline2: '',
  city: '',
  state: '',
  postcode: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    // Add other reducers as needed
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;