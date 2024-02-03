import { createSlice } from "@reduxjs/toolkit"

const InitialState = {
    address: null,
    isLogin: false,
    availableBalance: 0
}
export const userSlice = createSlice({
    name: "user",
    initialState: InitialState,
    reducers: {
        setUser: (state, action) => {
            state.address = action.payload.address,
            state.availableBalance = action.payload.availableBalance
            state.isLogin = true
        },
        removeUser: (state, action) => {
            state.address = null
            state.isLogin = false
            state.availableBalance = 0
        },
        updateBalance: (state, action) => {
            state.availableBalance = action.payload
        }
    }
})

export const {setUser, removeUser, updateBalance} = userSlice.actions;
export default userSlice.reducer