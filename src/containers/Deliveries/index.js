import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view'
import { connect, bindActionCreators } from '@store/redux'
import { deliverySelectors, deliveryActions } from './duck'
import Map from './Map'
import List from './List'

const FirstRoute = () => (
  <List />
)

const SecondRoute = () => (
  <Map />
)

class Deliveries extends PureComponent {
  state = {
    index: 0,
    routes: [{ key: '1', title: 'List' }, { key: '2', title: 'Map' }],
  };

  componentDidMount() {
    this.props.deliveryActions.resetList()
    this.props.deliveryActions.getDeliveries()
    this.props.deliveryActions.getCurrentLocation()
  }

  _handleIndexChange = index => {
    this.setState({ index })
  };

  _renderHeader = props => <TabBar {...props} />

  _renderScene = SceneMap({
    '1': FirstRoute,
    '2': SecondRoute,
  });

  render() {
    return (
      <View style={styles.container}>
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
        />
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})

const mapStateToProps = state => {
  return deliverySelectors(state)
}

const mapDispatchToProps = dispatch => ({
  deliveryActions: bindActionCreators(deliveryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Deliveries)
