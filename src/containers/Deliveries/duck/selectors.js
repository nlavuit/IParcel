import { createStructuredSelector, createSelector } from 'reselect'
import geolib from 'geolib'

const isLoading = state => state.delivery.isLoading
const deliveries = state => state.delivery.deliveries
const listPoint = state => state.delivery.listPoint
const currentLocation = state => state.delivery.currentLocation

const nextPoint = createSelector(
  listPoint,
  currentLocation,
  deliveries,
  (listPoint, currentLocation, deliveries) => {
    const nextPoint = null
    if (!currentLocation || listPoint.length === 0)
      return nextPoint
    const arrCalculated = []
    for (var i = 0; i < listPoint.length; i++) {
      const point = listPoint[i]
      if (deliveries[point.deliveryIndex]) {
        if ((point.isPickup && deliveries[point.deliveryIndex].status === 0) || (!point.isPickup && deliveries[point.deliveryIndex].status === 1)) {
          const distance = geolib.getDistance(
            point.latlng,
            currentLocation.latlng
          )
          arrCalculated.push({ point, distance })
        }
      }
    }
    arrCalculated.sort(
      function (a, b) {
        return (a.distance > b.distance ? 1 : (a.distance < b.distance) ? -1 : 0);
      }
    )
    return arrCalculated.length > 0 ? arrCalculated[0] : null
  }
)

export default createStructuredSelector({
  isLoading,
  deliveries,
  listPoint,
  nextPoint,
  currentLocation
})
