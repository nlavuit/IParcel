function createThunkMiddleware(options = {}) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      options.args = options
      options.getState = getState
      return action(dispatch, options)
    }
    return next(action)
  }
}

export default createThunkMiddleware
