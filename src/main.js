import React, { PureComponent } from 'react'
import { AppRegistry } from 'react-native'
import Store from '@store'
import { Screen as ScreenNavigator } from '@navigators'

class IParcel extends PureComponent {
  render() {
    return (
      <Store>
        <ScreenNavigator />
      </Store>
    )
  }
}

AppRegistry.registerComponent('IParcel', () => IParcel)
