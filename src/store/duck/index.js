import { combineReducers } from 'redux'
import { REHYDRATE } from 'redux-persist/constants'
import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'
import delivery from '@containers/Deliveries/duck'

import navReducer from '@navigators/duck'

const entities = (state = {}, { payload }) => {
  if (payload && payload.entities) {
    const newState = mergeWith(
      {},
      state,
      payload.entities,
      (srcValue, objValue) => {
        if (isArray(srcValue)) {
          return objValue
        }
      }
    )
    return newState
  }
  return state
}

const rehydrate = (state = {}, { type, payload }) => {
  if (type === REHYDRATE) {
    return { ...state, rehydrationComplete: true }
  }
  return state
}

const reducers = combineReducers({
  delivery,
  navReducer,
  entities,
  rehydrate
})

const rootReducer = (state, action) => {
  return reducers(state, action)
}

export default rootReducer
