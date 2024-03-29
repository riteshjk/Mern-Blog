import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading = true,
            state.error = null
        },
        loginSuccess:(state,action)=>{
            state.loading = false,
            state.currentUser = action.payload,
            state.error = null
        },
        loginFailure:(state,action)=>{
            state.loading = false,
            state.error  = null
        },
        updateStart:(state)=>{
            state.loading = true,
            state.error = null
        },
        updateSuccess:(state,action)=>{
            state.loading = false,
            state.currentUser = action.payload,
            state.error = null
        },
        updateFailure:(state,action)=>{
            state.loading = false,
            state.error  = action.payload
        }
    }
})

export const {loginStart,loginSuccess,loginFailure,updateStart,updateSuccess,updateFailure} = userSlice.actions;
export default userSlice.reducer;

