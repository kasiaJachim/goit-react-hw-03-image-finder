import { Component } from 'react';
import css from './modal.module.css';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  render() {
    return (
      <div id="modal" onClick={this.props.onClickClose} className={css.overlay}>
        <div className={css.modal}>
          <img src={this.props.largeImageUrl} alt="" />
        </div>
      </div>
    );
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress = e => {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func,
  largeImageUrl:PropTypes.string.isRequired,
}
