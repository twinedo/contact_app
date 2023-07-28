import { createSlice } from "@reduxjs/toolkit";

import { getContactList } from './actions';
import { RootState } from "store";
import { getRandomBoolean } from "utils/fun";
type RequestState = 'pending' | 'fulfilled' | 'rejected'

export interface IData {
    age: number;
    firstName: string;
    lastName: string;
    id: string;
    photo: string;
    isOnline?: boolean;
}
interface InitState {
    data: IData[];
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: any;
}

const initialState: InitState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getContactList.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getContactList.fulfilled, (state, action) => {
            let newArr: any[] = [];
            action.payload.data.map(o => {
                let item = {
                    ...o,
                    isOnline: getRandomBoolean()
                };
                newArr.push(item);
            })
            state.isLoading = false;
            state.isSuccess = true;

            state.data = newArr;
        })
        builder.addCase(getContactList.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload;
        })
    },
});

  export default contactSlice.reducer;