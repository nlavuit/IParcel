import React, { PureComponent } from 'react'
import { NavigationActions } from 'react-navigation'
import { connect, bindActionCreators } from '@store/redux'
import { Injector } from '@store/middlewares'

import { navigatorSelectors } from './duck'
import {
  verifyNavigationState,
  verifyLatestRouter
} from './logics'
import StackNavigator from './StackNavigator'

class ScreenComponent extends PureComponent {
  state = {
    navigation: StackNavigator.router.getStateForAction({
      type: NavigationActions.INIT
    })
  }

  componentDidMount() {
    Injector.inject({
      screenNavigator: {
        ...this.refs.navigator._navigation,
        dispatch: this._dispatch
      }
    })
  }

  componentDidUpdate() {
    Injector.inject({
      screenNavigator: {
        ...this.refs.navigator._navigation,
        dispatch: this._dispatch
      }
    })
  }

  render() {
    // CARD_STYLE.backgroundColor = theme.color.palette.background
    return (
      <StackNavigator
        ref="navigator"
        //screenProps={{ language: this.strings.language.tabbar }}
        onNavigationStateChange={this._updateState}
      />
    )
  }

  _dispatch = action => {
    const { navigation } = this.state
    const { dispatch } = this.refs.navigator._navigation

    const nextNavigation = verifyLatestRouter(
      action,
      navigation,
      StackNavigator
    )
    const nextAction = verifyNavigationState(
      action,
      nextNavigation ? nextNavigation : this.state.navigation,
      this.props.isAuthenticated
    )

    dispatch(nextAction)
  }

  _updateState = (prevState, nextState, action) => {
    console.log('action: ', action.type, {
      prevState: prevState,
      action: action,
      nextState: nextState
    })
    this.setState({ navigation: nextState })
  }
}

const mapStateToProps = state => {
  const selectors = navigatorSelectors(state)

  return {
    ...selectors
  }
}

// const mapDispatchToProps = dispatch => ({
//   lanchActions: bindActionCreators(
//     {
//       //toggleNetworkStatus: lanchActions.toggleNetworkStatus
//     },
//     dispatch
//   )
// })

export default connect(
  mapStateToProps,
  null
)(ScreenComponent)
