import {
  Deliveries,
  Detail
} from '@containers'

const Routers = {
  Deliveries: {
    screen: Deliveries
  },
  Detail: {
    screen: Detail
  }
}

const CARD_STYLE = {
  backgroundColor: 'transparent'
}

const routerConfig = {
  initialRouteName: 'Deliveries',
  cardStyle: CARD_STYLE,
  headerMode: 'none'
}

export { Routers, routerConfig }
