import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userInfo'))   :  null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    refucers: {
        setCredentials: (state, action) => {
            state.userInfo=action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        }
    }
})