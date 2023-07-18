import { Component } from 'react';
import css from './button.module.css';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    return (
      <div className={css.btn}>
        <button className={css.button} onClick={this.props.getMoreImages}>Load more</button>
      </div>
    );
  }
}

Button.propTypes = {
  getMoreImages: PropTypes.func.isRequired,
};