// Modal.js
import React from "react";
import ReactDOM from "react-dom";

const MODAL_STYLES = {
  width:"50%",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "20px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  
};

const CLOSE_BUTTON_STYLES = {
 
};

export default function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div  style={OVERLAY_STYLES} />
      <div class="create-account-dsh" style={MODAL_STYLES}>
        <button class="close-buttonss" style={CLOSE_BUTTON_STYLES} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}
