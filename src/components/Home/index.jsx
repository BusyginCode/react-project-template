import React, { Component } from 'react';
import './home.scss';
// import {Route} from 'react-router-dom';
// import List from '../List';

const back = require('./img/image.jpg')

export default class Home extends Component {

    render() {
        return (
            <h1 className="Home">
              Home
              <img src={back} />
              {/* <Route path="/privet/1" component={List} /> */}
            </h1>
        );
    }

}
