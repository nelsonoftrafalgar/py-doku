import React from 'react'
import styled from 'styled-components'

interface IRowStyle {
  direction: string
  mt: string
  pb: string
  expand: boolean
}

interface IRow {
  direction?: string
  mt?: string
  pb?: string
  expand?: boolean
}

const Style = styled('div')<IRowStyle>`
  max-width: 100%;
  display: flex;
  ${({direction}) => `flex-direction: ${direction};`}
  ${({mt}) => `margin-top: ${mt}px;`}
  ${({pb}) => `padding-bottom: ${pb}px;`}
  ${({expand}) => `flex-grow: ${expand ? 1 : 0};`}
`

const Row: React.FC<IRow> = ({
  children,
  mt = '0',
  pb = '0',
  direction = 'row',
  expand = false
}) => {
  return (
    <Style
      direction={direction}
      mt={mt}
      expand={expand}
      pb={pb}
    >
      {children}
    </Style>
  )
}

export {Row}
