import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {setIsLoggedInAC} from "../Features/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export const SET_STATUS = 'APP/SET-STATUS'
export const SET_ERROR = 'APP/SET-ERROR'
export type SetStatusAT = ReturnType<typeof setAppStateAC>
export type SetErrorAT = ReturnType<typeof setAppErrorAC>


export type NullableType<T> = null | T

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as NullableType<string>,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_ERROR:
            return {...state, error: action.error}
        case "APP/SET_IS_INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

//Action

export const setAppStateAC = (status: RequestStatusType) => ({type: SET_STATUS, status} as const)
export const setAppErrorAC = (error: NullableType<string>) => ({type: SET_ERROR, error} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET_IS_INITIALIZED', value} as const)

// Thunk

export const initializedAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            }
        })
    dispatch(setAppInitializedAC(true))
}

// Types
type ActionsType = SetStatusAT | SetErrorAT | ReturnType<typeof setAppInitializedAC>