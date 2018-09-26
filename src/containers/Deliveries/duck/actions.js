//import { actions as navigationActions } from '@duck/navigator'
import * as types from './types'
var deliveries = require('./deliveries.json')
var addDeliveries = require('./addDeliveries.json')

export const resetList = () => dispatch => {
  dispatch({ type: types.RESET_LIST })
}

export const getDeliveries = () => dispatch => {
  dispatch({ type: types.GET_LIST_REQUEST })

  // fetch('https://s3.amazonaws.com/impress-static/assets/deliveries.json')
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     dispatch({ type: types.GET_DESIGNS_SUCCESS, listDesign: responseJson })
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //     dispatch({ type: types.GET_DESIGNS_FAILURE, listDesign: designs })
  //   });
  dispatch({ type: types.GET_LIST_SUCCESS, deliveries })
}

export const getCurrentLocation = () => dispatch => {
  const currentLocation = {
    "latlng": {
      "latitude": 10.760578,
      "longitude": 106.699078
    }
  }
  dispatch({ type: types.SET_CURRENT_LOCATION, currentLocation })
}

export const setCurrentLocation = currentLocation => dispatch => {
  dispatch({ type: types.SET_CURRENT_LOCATION, currentLocation })
}

export const updateDeliveryStatus = (id, status) => dispatch => {
  dispatch({ type: types.UPDATE_DELIVERY_STATUS, id, status })
}

export const addDelivery = () => dispatch => {
  var randomnumber = Math.floor(Math.random() * 2)
  const delivery = addDeliveries[randomnumber]
  debugger
  dispatch({ type: types.ADD_DELIVERY, delivery })
}
