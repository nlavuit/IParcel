import StackNavigator from '../StackNavigator'
import { createNavigationReducer } from 'react-navigation-redux-helpers'

const navReducer = createNavigationReducer(StackNavigator)

export default navReducer

