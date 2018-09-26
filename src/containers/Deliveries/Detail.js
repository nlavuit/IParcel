import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect, bindActionCreators } from '@store/redux'
import { deliverySelectors, deliveryActions } from './duck'

class Detail extends Component {

  _updateDelivery = status => {
    const { delivery } = this.props.navigation.state.params
    this.props.deliveryActions.updateDeliveryStatus(delivery.id, status)
    const currentLocation = status === 1 ? delivery.pickup : delivery.dropoff
    this.props.deliveryActions.setCurrentLocation(currentLocation)
    this.props.navigatorActions.goBack()
  }

  render() {
    const { delivery, allowUpdate } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigatorActions.goBack()}>
            <Text>Back</Text>
          </TouchableOpacity>
          <Text style={{ flex: 1, textAlign: 'center' }}>Delivery Detail</Text>
        </View>
        <View>
          <Text>Order ID: {delivery.id}</Text>
          <Text>Name: {delivery.name}</Text>
          <Text>Phone: {delivery.phone}</Text>
          <Text>Pickup: {delivery.pickup.address}</Text>
          <Text>Dropoff: {delivery.dropoff.address}</Text>
          <Text>Status: {delivery.status == 0 ? 'New' : 'Picked up'}</Text>
        </View>
        <View>
          {allowUpdate ? delivery.status === 0 ? (
            <TouchableOpacity onPress={() => this._updateDelivery(1)}>
              <Text style={styles.button}>Pickup</Text>
            </TouchableOpacity>
          ) : (
              <TouchableOpacity onPress={() => this._updateDelivery(2)}>
                <Text style={styles.button}>Dropoff</Text>
              </TouchableOpacity>
            ) : null}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 150,
    textAlign: 'center'
  }
});

const mapStateToProps = state => {
  return deliverySelectors(state)
}

const mapDispatchToProps = dispatch => ({
  deliveryActions: bindActionCreators(deliveryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)