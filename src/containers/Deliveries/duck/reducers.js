import * as types from './types'

const INITIAL_STATE = {
  isLoading: false,
  deliveries: [],
  currentLocation: null,
  listPoint: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RESET_LIST:
      return {
        ...state,
        isLoading: false,
        deliveries: [],
        currentLocation: null,
        listPoint: []
      }
    case types.GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case types.GET_LIST_SUCCESS:
      const points = []
      for (var i = 0; i < action.deliveries.length; i++) {
        const delivery = action.deliveries[i]
        if (delivery.status === 0) {
          points.push({ ...delivery.pickup, deliveryId: delivery.id, deliveryIndex: i, isPickup: true })
          points.push({ ...delivery.dropoff, deliveryId: delivery.id, deliveryIndex: i, isPickup: false })
        }
        else {
          points.push({ ...delivery.dropoff, deliveryId: delivery.id, deliveryIndex: i, isPickup: false })
        }
      }
      return {
        ...state,
        isLoading: false,
        deliveries: [...state.deliveries, ...action.deliveries],
        listPoint: points
      }
    case types.GET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        deliveries: []
      }
    case types.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.currentLocation
      }
    case types.UPDATE_DELIVERY_STATUS:
      let deliveries = [...state.deliveries]
      var indexDelete = -1
      for (var i = 0; i < deliveries.length; i++) {
        if (deliveries[i].id === action.id) {
          if (action.status === 1)
            deliveries[i].status = action.status
          else
            indexDelete = i
          break
        }
      }
      if (indexDelete !== -1) {
        deliveries.splice(indexDelete, 1)
      }

      const arrpoints = []
      for (var i = 0; i < deliveries.length; i++) {
        const delivery = deliveries[i]
        if (delivery.status === 0) {
          arrpoints.push({ ...delivery.pickup, deliveryId: delivery.id, deliveryIndex: i, isPickup: true })
          arrpoints.push({ ...delivery.dropoff, deliveryId: delivery.id, deliveryIndex: i, isPickup: false })
        }
        else {
          arrpoints.push({ ...delivery.dropoff, deliveryId: delivery.id, deliveryIndex: i, isPickup: false })
        }
      }

      return {
        ...state,
        deliveries: action.status === 1 ? deliveries : [...state.deliveries].filter((x, index) => x.id !== action.id),
        listPoint: arrpoints
      }
    case types.ADD_DELIVERY:
      const delivery = action.delivery
      const listPoint = [...state.listPoint]
      listPoint.push({ ...delivery.pickup, deliveryId: delivery.id, deliveryIndex: i, isPickup: true })
      listPoint.push({ ...delivery.dropoff, deliveryId: delivery.id, deliveryIndex: i, isPickup: false })

      return {
        ...state,
        isLoading: false,
        deliveries: [...state.deliveries].push(delivery),
        listPoint
      }
    default:
      return state
  }
}
