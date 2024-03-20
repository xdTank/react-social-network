import { Action, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit"
import profileReducer from "./reducers/profileReducer"
import dialogsReducer from "./reducers/dialogsReducer"
import sidebarReducer from "./reducers/sidebarReducer"
import usersReducer from "./reducers/usersReducer";
import appReducer from "./reducers/appReducer";
import { ThunkAction } from "redux-thunk";
import chatReducer from "./reducers/chatReducer";
import { usersAPI } from "../api/users-api copy";
import { authSlice } from "./reducers/auth-slice";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sidebarReducer,
    usersPage: usersReducer,
    app: appReducer,
    chat: chatReducer,
    authSlice: authSlice.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            usersAPI.middleware,
        ),

    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

type ReducerType = typeof rootReducer
export type AppStateType = ReturnType<ReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>



const store = setupStore()
export default store
// @ts-ignore
window.store = store