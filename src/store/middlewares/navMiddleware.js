import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navReducer
)

export default navMiddleware
