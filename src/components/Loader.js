import React from 'react'
import styled from 'styled-components'
import { AtomSpinner } from './AtomSpinner'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Loader = () => (
  <Container>
    <AtomSpinner />
  </Container>
)
