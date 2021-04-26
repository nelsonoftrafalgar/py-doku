import React from 'react'
import styled from 'styled-components'

type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

interface IColStyle {
  size: number
}

interface ICol {
  size: ColSize
}

const Style = styled('div')<IColStyle>`
  ${({size}) => `width: calc(${size} / 12 * 100%);`}
`

const Col: React.FC<ICol> = ({
  children,
  size
}) => {
  return (
    <Style size={size}>
      {children}
    </Style>
  )
}

export {Col}
