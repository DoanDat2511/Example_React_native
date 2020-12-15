import { handleActions } from 'redux-actions'
import Model from './model'

import {resetAll,setMessageError, MESSAGE_ERROR,RESET_ALL} from "./action-type"
const initialState = Model(null)

export const resetError = () => async dispatch => {
    dispatch(resetAll(null));
  };
const actions = {
    [MESSAGE_ERROR]:(state, action) => state.setMessage(action.payload),
    [RESET_ALL]: (state, action) => {return Object.assign({}, state, {
        message: null
      })}
}

export default handleActions(actions, initialState)
