import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetContactHandler } from "services/handler/contact";

export const getContactList = createAsyncThunk<any, string>('contact/getContactList', async (_, { rejectWithValue }) => {
    try {
        const data = await GetContactHandler();
        return data;
    } catch (e) {
        return rejectWithValue(e?.message!);
    }
});

