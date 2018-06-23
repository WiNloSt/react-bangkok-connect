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
  return (
    <Toggle initial={true}>
      {({ on, setOn }) => (
        <Modal
          isOpen={on}
          contentLabel="Application usage instruction"
          overlayClassName="ReactModal__Overlay"
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => setOn(false)}
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
            wow
          </Header>
        </Modal>
      )}
    </Toggle>
  )
}
