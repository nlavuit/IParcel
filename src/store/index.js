import React, { PureComponent } from 'react'
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools-sp'
import { createLogger } from 'redux-logger'
import { persistStore, autoRehydrate } from 'redux-persist'
import createMigration from 'redux-persist-migrate'
import immutableTransform from 'redux-persist-transform-immutable'
//import FilesystemStorage from 'redux-persist-filesystem-storage'

import middlewares, { Injector } from './middlewares'
import migration from './migration'
import reducers from './duck'

const STORE = createStore(
  reducers,
  undefined,
  composeWithDevTools(
    createMigration(migration, 'settings'),
    applyMiddleware(
      ...middlewares,
      createLogger({
        predicate: () =>
          __DEV__,
        collapsed: true,
        duration: true
      })
    ),
    autoRehydrate(),
    next => (reducers, initialState, enhancer) => {
      const nextStore = next(reducers, initialState, enhancer)
      const { getState } = nextStore
      Injector.inject({
        getState
      })
      return nextStore
    }
  )
)
persistStore(STORE, {
  storage: AsyncStorage,
  transforms: [immutableTransform()]
})

export default class Store extends PureComponent {
  render() {
    return <Provider store={STORE}>{this.props.children}</Provider>
  }
}
