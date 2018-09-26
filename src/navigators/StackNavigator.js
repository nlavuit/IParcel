import { createStackNavigator } from 'react-navigation'
import { Routers, routerConfig } from './configs'

const StackNavigator = createStackNavigator(Routers, routerConfig)

export default StackNavigator
