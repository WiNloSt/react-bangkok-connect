import React from 'react'

import './style.css'

export const AtomSpinner = () => (
  <div className="atom-spinner">
    <div className="spinner-inner">
      <div className="spinner-line" />
      <div className="spinner-line" />
      <div className="spinner-line" />
      <div className="spinner-circle">&#9679;</div>
    </div>
  </div>
)
