import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import store from "./redux/store"
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>

      <MantineProvider>
        <NotificationsProvider  position="top-right" >
          <App />
        </NotificationsProvider>
      </MantineProvider>

    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


