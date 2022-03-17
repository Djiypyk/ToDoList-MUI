export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export const SET_STATUS = 'APP/SET-STATUS'
export const SET_ERROR = 'APP/SET-ERROR'
export type SetStatusAT = ReturnType<typeof setAppStateAC>
export type SetErrorAT = ReturnType<typeof setAppErrorAC>


export type NullableType<T> = null | T

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as NullableType<string>
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStateAC = (status: RequestStatusType) => ({type: SET_STATUS, status} as const)
export const setAppErrorAC = (error: NullableType<string>) => ({type: SET_ERROR, error} as const)

type ActionsType = SetStatusAT | SetErrorAT