import { connect as reactReduxConnect } from 'react-redux'
import { bindActionCreators as reduxBindActionCreators } from 'redux'
import { navigatorActions } from '@navigators/duck'

export const bindActionCreators = reduxBindActionCreators

export const connect = (
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
) => WrappedComponent => {
  mapStateToProps =
    mapStateToProps ||
    function () {
      return {}
    }

  mapDispatchToProps =
    mapDispatchToProps ||
    function () {
      return {}
    }

  const wrappedMapStateToProps = (state, ownProps) => {
    //const { locale } = state.settings
    return Object.assign(
      {
        __locale__: null
      },
      mapStateToProps(state, ownProps)
    )
  }

  const wrappedMapDispatchToProps = (dispatch, ownProps) => {
    return Object.assign(
      {
        navigatorActions: reduxBindActionCreators(navigatorActions, dispatch)
      },
      mapDispatchToProps(dispatch, ownProps)
    )
  }

  return reactReduxConnect(
    wrappedMapStateToProps,
    wrappedMapDispatchToProps,
    mergeProps
  )(WrappedComponent)
}
