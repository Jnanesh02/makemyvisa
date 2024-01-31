import React from 'react'
import "../AdminDashboardStyles/ConfirmationAccountModel.css"
const ConfirmationAccountModel = ({message,onConfirm,onCancel}) => {
  return (
    <div className="confirmation-modal">
    <p>{message}</p>
    <button onClick={onConfirm}>Confirm</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
  )
}

export default ConfirmationAccountModel