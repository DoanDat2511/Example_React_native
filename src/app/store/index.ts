import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from '../reducer'

import { createStore, applyMiddleware, compose } from 'redux'

const middleware = compose(applyMiddleware(thunk, logger))
// const middleware = compose(applyMiddleware(thunk))

export default function configureStore() {
  return createStore(reducer, {}, middleware)
}
