/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, createRef } from 'react';
// import style from './style.module.css';
import PropTypes from 'prop-types';
import style from './style.module.css';

class Modal extends Component {
  state = {
    isOpen: true,
  };

  ModalRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.EscClick);
  }

  componentDidUpdate() {
    window.removeEventListener('keydown', this.EscClick);
  }

  EscClick = e => {
    if (e.code !== 'Escape') return;
    this.props.ButtonMethod();
  };

  OverlayClick = e => {
    const { current } = this.ModalRef;

    if (current === e.target) {
      this.props.ButtonMethod();
    }
  };

  render() {
    const { bigImg, tags, ButtonMethod } = this.props;
    const { isOpen } = this.state;

    return (
      isOpen === true && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          onClick={this.OverlayClick}
          className={style.overlay}
          ref={this.ModalRef}
        >
          <button
            className={style.buttonchik}
            onClick={ButtonMethod}
            type="button"
          />
          <div className="modal">
            <img src={bigImg} alt={tags} width={1000} />
          </div>
        </div>
      )
    );
  }
}
Modal.propTypes = {
  bigImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  ButtonMethod: PropTypes.func.isRequired,
};
export default Modal;
