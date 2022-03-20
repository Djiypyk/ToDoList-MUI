import {setAppErrorAC, setAppStateAC, SetErrorAT, SetStatusAT} from "../App/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStateAC('failed'))
}

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
        dispatch(setAppStateAC('failed'))
    } else {
        dispatch(setAppErrorAC('Some error occured'))
        dispatch(setAppStateAC('failed'))
    }
}

type ErrorUtilsDispatchType = SetStatusAT | SetErrorAT