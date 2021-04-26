import {
	ANALYZE_BOARD,
	CLEAR_HINTS,
	RESET_GAME,
	SET_BOARD,
	SET_LEVEL,
	TOGGLE_HINTS,
	UPDATE_BOARD,
} from '../../state/actions'

import { IAction } from '../../model'
import { reducer } from '../../state/reducers'

const initialBoard = [
	['3', '2', null, null, '1', null, null, '6', '9'],
	['6', '5', null, '2', '7', null, '3', null, '4'],
	['1', '8', null, '9', '3', null, '2', '5', '7'],
	[null, '3', null, '8', null, '7', null, '4', '6'],
	['9', '4', null, null, null, '2', '1', '7', '8'],
	['7', '6', '8', '1', null, '9', null, '3', null],
	['4', null, null, '5', null, null, '7', '8', '3'],
	['8', '1', '3', null, '9', null, null, null, '5'],
	['5', null, '2', null, null, '3', '4', '9', '1'],
]

const updateAction: IAction = {
	type: UPDATE_BOARD,
	payload: { id: '61', value: 9 },
}

const toggleHintsAction: IAction = {
	type: TOGGLE_HINTS,
}

const analyzeAction: IAction = {
	type: ANALYZE_BOARD,
	payload: { id: '32' },
}

const clearHintsAction: IAction = {
	type: CLEAR_HINTS,
}

const setBoardAction: IAction = {
	type: SET_BOARD,
	payload: initialBoard,
}

const setLevelAction: IAction = {
	type: SET_LEVEL,
	payload: '0.8',
}

const resetGameAction: IAction = {
	type: RESET_GAME,
}

const initialState = {
	level: null,
	board: initialBoard,
	showHints: false,
	hints: [],
}

test('reducer updates state', () => {
	const { board, showHints, hints } = reducer(initialState, updateAction)

	expect(showHints).toBeFalsy()
	expect(board[6][1]).toEqual('9')
	expect(hints.length).toEqual(0)
})

test('reducer handles hints', () => {
	const newState = reducer(initialState, toggleHintsAction)
	expect(newState.showHints).toBeTruthy()

	const nextState = reducer(newState, analyzeAction)
	expect(nextState.hints).toMatchObject([1, 5])

	const finalState = reducer(nextState, clearHintsAction)
	expect(finalState.hints.length).toEqual(0)
})

test('reducer sets board', () => {
	const { board } = reducer(
		{
			level: null,
			board: [],
			showHints: false,
			hints: [],
		},
		setBoardAction
	)
	expect(board).toHaveLength(9)
})

test('reducer sets level', () => {
	const { level } = reducer(initialState, setLevelAction)
	expect(level).toEqual('0.8')
})

test('reducer clears state', () => {
	const state = reducer(initialState, resetGameAction)
	expect(state).toMatchObject({
		level: null,
		board: [],
		showHints: false,
		hints: [],
	})
})
