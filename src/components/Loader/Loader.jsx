import css from './loader.module.css';
import React, { Component } from 'react';




  export default class Loader extends Component {
  render() {
    return (
      <div className={css.containerStyle}>
        <div className={css.spinnerStyle} />
        <span style={{ marginLeft: '8px' }}>Loading...</span>
      </div>
    );
  }
}

