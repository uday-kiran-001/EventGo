import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: []
}

const eventSlice = createSlice({
    name : 'eventList',
    initialState,
    reducers:{
        setEventList: (state, action) => {
            state.events = action.payload
        }
    }
});

export const { setEventList } = eventSlice.actions;
export default eventSlice.reducer;