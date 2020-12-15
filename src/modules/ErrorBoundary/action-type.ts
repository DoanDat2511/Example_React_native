import { createAction } from 'redux-actions'


export const RESET_ALL = "errors/RESET_ALL"
export const MESSAGE_ERROR = "errors/MESSAGE_ERROR"

export const resetAll = createAction(RESET_ALL)
export const setMessageError = createAction(MESSAGE_ERROR)