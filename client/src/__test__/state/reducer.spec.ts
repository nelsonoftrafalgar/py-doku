import { Action, ActionType } from '../../model'

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

const initialState = {
	level: null,
	board: initialBoard,
	showHints: false,
	hints: [],
	isFetchingBoard: false,
	error: null,
}

const updateAction: Action = {
	type: ActionType.UPDATE_BOARD,
	payload: { id: '61', value: 9 },
}

const toggleHintsAction: Action = {
	type: ActionType.TOGGLE_HINTS,
}

const analyzeAction: Action = {
	type: ActionType.ANALYZE_BOARD,
	payload: { id: '32' },
}

const clearHintsAction: Action = {
	type: ActionType.CLEAR_HINTS,
}

const setBoardAction: Action = {
	type: ActionType.SET_BOARD,
	payload: { data: initialBoard },
}

const setLevelAction: Action = {
	type: ActionType.SET_LEVEL,
	payload: { level: '0.8' },
}

const resetGameAction: Action = {
	type: ActionType.RESET_GAME,
}

const setErrorAction: Action = {
	type: ActionType.SET_ERROR,
	payload: { error: 'Test error' },
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

test('reducer sets board and changes fetching state', () => {
	const { board, isFetchingBoard } = reducer(
		{
			level: null,
			board: [],
			showHints: false,
			hints: [],
			isFetchingBoard: false,
			error: null,
		},
		setBoardAction
	)
	expect(board).toHaveLength(9)
	expect(isFetchingBoard).toBeFalsy()
})

test('reducer sets level, clears error and changes fetching state', () => {
	const { level, isFetchingBoard, error } = reducer(initialState, setLevelAction)
	expect(level).toEqual('0.8')
	expect(isFetchingBoard).toBeTruthy()
	expect(error).toBeNull()
})

test('reducer clears state', () => {
	const state = reducer(initialState, resetGameAction)
	expect(state).toMatchObject({
		level: null,
		board: [],
		showHints: false,
		hints: [],
		isFetchingBoard: false,
		error: null,
	})
})

test('reducer sets error and changes fetching state', () => {
	const { error, isFetchingBoard } = reducer(initialState, setErrorAction)
	expect(isFetchingBoard).toBeFalsy()
	expect(error).toEqual('Test error')
})
