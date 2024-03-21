import React from 'react'
import "../EmployeDashboardStyles/ConfirmationAccountModel.css"
export const ConfirmationModel = ({message,onConfirm,onCancel}) => {
  return (
    <div className="confirmation-modal">
    <p>{message}</p>
    <button onClick={onConfirm}>Confirm</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
  )
}


