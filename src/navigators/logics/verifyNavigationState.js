import { NavigationActions } from 'react-navigation'
import { Routers, routerConfig } from '../configs'

const verifyLatestRouter = (action, navigation, StackNavigator) => {
  const latestRoute = navigation.routes[navigation.index]
  if (action.type === NavigationActions.NAVIGATE) {
    if (action.routeName === latestRoute.routeName) {
      // if (!Utils.deepEqual(action.params, latestRoute.params)) {
      //   navigation.index -= 1
      //   navigation.routes.splice(-1)
      // } else {
      //   return
      // }
    }
  }

  return StackNavigator.router.getStateForAction(action, navigation)
}

const verifyNavigationState = (action, navigation, isAuthenticated) => {
  let latestRouteName = navigation.routes[navigation.index].routeName
  //setupStatusBar(latestRouteName)
  if (
    !isAuthenticated &&
    Routers[latestRouteName].requireAuthentication !== false
  ) {
    // return {
    //   type: NavigationActions.NAVIGATE,
    //   routeName: routerConfig.initialRouteName
    // }
    return action
  } else {
    return action
  }
}

export { verifyLatestRouter, verifyNavigationState }
