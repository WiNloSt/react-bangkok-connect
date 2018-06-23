import React from 'react'
import UnstyledModal from 'react-modal'
import styled from 'styled-components'

import { Toggle } from 'react-powerplug'

const Modal = styled(UnstyledModal)`
  max-height: 600px;
  width: 100%;
  max-width: 500px;

  color: #333;
  background: white;
  border-radius: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
`

const Header = styled.h1`
  margin-left: auto;
  margin-right: auto;
`

export const Instruction = () => {
  const isModalShowedBefore = localStorage.modalShown
  if (isModalShowedBefore) return null

  // localStorage.modalShown = true
  return (
    <Toggle initial={true}>
      {({ on, setOn }) => (
        <Modal
          isOpen={on}
          contentLabel="Application usage instruction"
          overlayClassName="ReactModal__Overlay"
        >
          <Header>
            Instruction
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <button className="btn btn-primary" onClick={() => setOn(false)}>
              Exit
            </button>
          </Header>
        </Modal>
      )}
    </Toggle>
  )
}
