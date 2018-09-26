import thunk from './thunk'
import navMiddleware from './navMiddleware'

const options = {}

export default [thunk(options), navMiddleware]

export const Injector = {
  inject: opts => {
    Object.assign(options, opts || {})
  }
}
