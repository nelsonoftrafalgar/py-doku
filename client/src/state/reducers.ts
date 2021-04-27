import { Action, ActionType, IState } from '../model'
import { analyzeBoard, updateBoard } from '../services/Mechanics'

import { initialState } from '../containers/GlobalState'

export const reducer = (state: IState, action: Action): IState => {
	switch (action.type) {
		case ActionType.UPDATE_BOARD:
			return {
				...state,
				board: updateBoard(action.payload, state.board),
			}
		case ActionType.TOGGLE_HINTS:
			return {
				...state,
				showHints: !state.showHints,
			}
		case ActionType.ANALYZE_BOARD:
			return {
				...state,
				hints: state.showHints ? analyzeBoard(action.payload, state.board) : [],
			}
		case ActionType.CLEAR_HINTS:
			return {
				...state,
				hints: [],
			}
		case ActionType.SET_LEVEL:
			return {
				...state,
				level: action.payload.level,
				isFetchingBoard: true,
				error: null,
			}
		case ActionType.SET_BOARD:
			return {
				...state,
				board: action.payload.data,
				isFetchingBoard: false,
			}
		case ActionType.RESET_GAME:
			return initialState
		case ActionType.SET_ERROR:
			return {
				...state,
				error: action.payload.error,
				isFetchingBoard: false,
			}
		default:
			return state
	}
}
