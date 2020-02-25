import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

import { closeModal } from "../../actions/actions";

import "./ModalComponent.css";

Modal.setAppElement("#root");

const ModalComponent = props => {
  // console.log("Should modal be open? " + props.isOpened);
  return (
    <Modal isOpened={props.isOpened} className="modal_body">
      This is the Modal
      <button onClick={props.close}>Close Modal</button>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    isOpened: state.modalReducer.isOpened
  };
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
