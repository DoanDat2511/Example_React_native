import {combineReducers} from 'redux'
import AuthenReducer from "../../modules/Authen/reducer"
import ErrorReducer from "../../modules/ErrorBoundary/reducer"
const reducer = combineReducers({
    authen: AuthenReducer,
    error: ErrorReducer

  })

  export default reducer