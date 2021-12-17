import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        items: [],
    },
    reducers: {
        addNote: (state, action) => {
            state.items.push(action.payload)
        },
        filterNotes: (state, action) => {
            const filtered = state.items.filter((item) => item.text.includes(action.payload))
            state.items = filtered
            console.log(filtered)
        }
    }
})

export const { addNote, filterNotes } = notesSlice.actions
export default notesSlice.reducer