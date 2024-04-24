'use client'
import React, { Children } from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from "redux-persist/integration/react";
const StoreProvider = ({ children }: Readonly<{children: React.ReactNode;}>) => {

  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </div>
  )
}

export default StoreProvider
