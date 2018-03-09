import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config'
// import {Route} from 'react-router-dom';
import routes from '../../client/routes';
import AppLayout from '../AppLayout';
// import Home from '../Home'

export default class Router extends Component {

  render() {
    return (
      <AppLayout>
        {renderRoutes(routes)}
        {/* <Route path="/privet" component={Home} /> */}
      </AppLayout>
    );
  }

}
