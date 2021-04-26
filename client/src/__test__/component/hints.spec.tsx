import {cleanup, fireEvent, render} from '@testing-library/react'

import { GameContext } from '../../state/context'
import Hints from '../../containers/Hints'
import React from 'react'

const mockDispatch = jest.fn()

afterEach(cleanup)

test('click event dispatches action', () => {
  const {getByTestId} = render(
    <GameContext.Provider value={{dispatch: mockDispatch, showHints: false, hints: []}}>
      <Hints/>
    </GameContext.Provider>
  )

  const hints = getByTestId('HINTS_SWITCH')

  fireEvent.click(hints)

  expect(mockDispatch).toHaveBeenCalledTimes(1)
  expect(mockDispatch).toHaveBeenCalledWith({type: 'TOGGLE_HINTS'})
  mockDispatch.mockClear()
})