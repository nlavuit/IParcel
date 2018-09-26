import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { connect, bindActionCreators } from '@store/redux'
import { deliverySelectors, deliveryActions } from './duck'
const GOOGLE_MAPS_APIKEY = 'AIzaSyBixo2CGqR3cBipgL1ugSNWMnAzpNUlaP0'

class Map extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.currentLocation === nextProps.currentLocation) {
      return false
    }
  }

  componentDidMount() {
    this.refs.map.fitToElements(true);
  }

  _renderMarker = () => {
    const { listPoint, nextPoint } = this.props
    const markerViews = listPoint.length > 0 ? listPoint.map(point => (
      <Marker
        key={point.latlng.latitude}
        coordinate={point.latlng}
        title={point.address}
        pinColor={point.address === nextPoint.point.address ? 'red' : 'orange'}
      />
    )) : null
    return markerViews
  }

  _renderCurrentLocationMaker = () => {
    const { currentLocation } = this.props
    return (
      <Marker
        coordinate={currentLocation.latlng}
        title={"I'm here!"}
        pinColor='green'
      />
    )
  }

  _renderRoute = () => {
    const { currentLocation, nextPoint } = this.props
    return currentLocation && nextPoint ? (
      <MapViewDirections
        origin={currentLocation.latlng}
        destination={nextPoint.point.latlng}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="hotpink"
      />
    ) : null
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          style={styles.map}
          zoomEnabled={true}
        >
          {this._renderMarker()}
          {this._renderCurrentLocationMaker()}
          {this._renderRoute()}
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const mapStateToProps = state => {
  return deliverySelectors(state)
}

const mapDispatchToProps = dispatch => ({
  deliveryActions: bindActionCreators(deliveryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)
