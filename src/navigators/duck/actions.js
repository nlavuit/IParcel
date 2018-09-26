import { NavigationActions, StackActions } from 'react-navigation'

const navigate = (screenNavigator, routeName, params = {}) => {
  screenNavigator.navigate(routeName, params)
}

const resetTo = (screenNavigator, route) => {
  const actionToDispatch = StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName: route })]
  })
  screenNavigator.dispatch(actionToDispatch)
}

const backTo = (screenNavigator, route) => {
  const routes = screenNavigator.state.routes

  for (var i = 0; i < routes.length - 1; i++) {
    if (routes[i].routeName == route) {
      if (i === 0) {
        resetTo(screenNavigator, route)
      } else {
        screenNavigator.dispatch(
          NavigationActions.back({ key: routes[i + 1].key })
        )
      }
      break
    }
  }
}

export const goBack = () => (dispatch, { screenNavigator }) => {
  screenNavigator.dispatch(NavigationActions.back())
}

export const popTo = level => (dispatch, { screenNavigator }) => {
  screenNavigator.pop(level)
}

export const gotoScreen = (screenName, params) => (
  dispatch,
  { screenNavigator }
) => {
  navigate(screenNavigator, screenName, params)
}

export const backToScreen = screenName => (dispatch, { screenNavigator }) => {
  backTo(screenNavigator, screenName)
}
