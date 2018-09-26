import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect, bindActionCreators } from '@store/redux'
import { deliverySelectors, deliveryActions } from './duck'

class List extends Component {

  _renderItem = item => {
    const delivery = item.item
    return delivery ? (
      <TouchableOpacity onPress={() => this.props.navigatorActions.gotoScreen('Detail', { delivery, allowUpdate: item.index === 0 })}>
        <View style={{ padding: 10, backgroundColor: item.index === 0 ? 'white' : 'gray' }}>
          <Text>Order ID: {delivery.id}</Text>
          <Text>Name: {delivery.name}</Text>
          <Text>Phone: {delivery.phone}</Text>
          <Text style={{ color: delivery.status === 0 ? 'orange' : 'black' }}>Pickup: {delivery.pickup.address}</Text>
          <Text style={{ color: delivery.status === 1 ? 'orange' : 'black' }}>Dropoff: {delivery.dropoff.address}</Text>
          <Text>Status: {delivery.status == 0 ? 'New' : 'Picked up'}</Text>
        </View>
      </TouchableOpacity>
    ) : null
  }

  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  }

  _addDelivery = () => {
    this.props.deliveryActions.addDelivery()
  }

  render() {
    const { nextPoint } = this.props
    const deliveries = [...this.props.deliveries]
    if (nextPoint) {
      deliveries.sort(function (x, y) { return x.id == nextPoint.point.deliveryId ? -1 : y.id == nextPoint.point.deliveryId ? 1 : 0; });
    }
    console.log(deliveries)
    return (
      <View style={styles.container}>
        <FlatList
          data={deliveries}
          renderItem={this._renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={this._renderSeparator}
        />
        {/* <TouchableOpacity onPress={this._addDelivery}>
          <Text style={styles.button}>Add Random Delivery</Text>
        </TouchableOpacity> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});

const mapStateToProps = state => {
  return deliverySelectors(state)
}

const mapDispatchToProps = dispatch => ({
  deliveryActions: bindActionCreators(deliveryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)