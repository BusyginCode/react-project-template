import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AppLayout extends Component {

  render() {
    return (
      <div>
        AppRoot
        {this.props.children}
      </div>
    );
  }

}

AppLayout.propTypes = {
  children: PropTypes.any,
}
