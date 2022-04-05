import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import store from "./redux/store"
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';


let persistor = persistStore(store);


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>

        <MantineProvider>
          <NotificationsProvider position="top-right" >
            <App />
          </NotificationsProvider>
        </MantineProvider>

      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


