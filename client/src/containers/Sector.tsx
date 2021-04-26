import { Col, Row } from '../grid'

import Cell from '../components/Cell'
import { ISectorProps } from '../model'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 150px;
  border: 2px solid gray;
`

const Sector: React.FC<ISectorProps> = ({values, keys}) => {
  const renderCells = values.map((value, i) => {
    return (
      <Col key={keys[i]} size={4}>
        <Cell id={keys[i]} value={value}/>
      </Col>
    )
  })

  return (
    <Container>
      <Row>
        {renderCells.slice(0, 3)}
      </Row>
      <Row>
        {renderCells.slice(3, 6)}
      </Row>
      <Row>
        {renderCells.slice(6)}
      </Row>
    </Container>
  )
}

export default Sector
