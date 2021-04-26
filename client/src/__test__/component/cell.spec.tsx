import {cleanup, fireEvent, render} from '@testing-library/react'

import Cell from '../../components/Cell'
import { GameContext } from '../../state/context'
import React from 'react'

const mockDispatch = jest.fn()

const setup = (value: null | number) => {
  return render(
    <GameContext.Provider value={{dispatch: mockDispatch} as any}>
      <Cell value={value} id={'12'}/>
    </GameContext.Provider>
  )
}

afterEach(cleanup)

test('wheel event increments and decrements state', () => {
  const {getByTestId} = setup(null)
  const cell = getByTestId('CELL_CONTAINER')

  expect(cell.innerHTML).toEqual('')

  fireEvent.wheel(cell, {deltaY: -3})
  expect(cell.innerHTML).toEqual('1')

  fireEvent.wheel(cell, {deltaY: -3})
  expect(cell.innerHTML).toEqual('2')

  fireEvent.wheel(cell, {deltaY: 3})
  expect(cell.innerHTML).toEqual('1')

  fireEvent.wheel(cell, {deltaY: 3})
  expect(cell.innerHTML).toEqual('')

  mockDispatch.mockClear()
})

test('wheel event only works for empty cells', () => {
  const {getByTestId} = setup(5)
  const cell = getByTestId('CELL_CONTAINER')

  expect(cell.innerHTML).toEqual('5')

  fireEvent.wheel(cell, {deltaY: -3})
  expect(cell.innerHTML).toEqual('5')

  fireEvent.wheel(cell, {deltaY: 3})
  expect(cell.innerHTML).toEqual('5')

  mockDispatch.mockClear()
})

test('wheel event dipatches actions', () => {
  const {getByTestId} = setup(null)
  const cell = getByTestId('CELL_CONTAINER')

  const incrementAction = {payload: {id: '12', value: 1}, type: 'UPDATE_BOARD'}
  const decrementAction = {payload: {id: '12', value: 0}, type: 'UPDATE_BOARD'}

  fireEvent.wheel(cell, {deltaY: -3})
  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockDispatch).toHaveBeenCalledWith(incrementAction)
  mockDispatch.mockClear()

  fireEvent.wheel(cell, {deltaY: 3})
  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockDispatch).toHaveBeenCalledWith(decrementAction)
  mockDispatch.mockClear()
})

test('mouse event dispatches acion', () => {
  const {getByTestId} = setup(null)
  const cell = getByTestId('CELL_CONTAINER')

  const mouseEnterAction = {payload: {id: '12'}, type: 'ANALYZE_BOARD'}
  const mouseLeaveAction = {type: 'CLEAR_HINTS'}

  fireEvent.mouseEnter(cell)
  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockDispatch).toHaveBeenCalledWith(mouseEnterAction)
  mockDispatch.mockClear()

  fireEvent.mouseLeave(cell)
  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockDispatch).toHaveBeenCalledWith(mouseLeaveAction)
  mockDispatch.mockClear()
})