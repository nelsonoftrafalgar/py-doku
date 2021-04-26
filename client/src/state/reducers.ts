import {
	ANALYZE_BOARD,
	CLEAR_HINTS,
	RESET_GAME,
	SET_BOARD,
	SET_LEVEL,
	TOGGLE_HINTS,
	UPDATE_BOARD,
} from './actions'
import { IAction, IPayload, IState } from '../model'
import { analyzeBoard, updateBoard } from '../services/Mechanics'

import { initialState } from '../containers/GlobalState'

export const reducer = (state: IState, action: IAction): IState => {
	switch (action.type) {
		case UPDATE_BOARD:
			return {
				...state,
				board: updateBoard(action.payload as IPayload, state.board),
			}
		case TOGGLE_HINTS:
			return {
				...state,
				showHints: !state.showHints,
			}
		case ANALYZE_BOARD:
			return {
				...state,
				hints: state.showHints ? analyzeBoard(action.payload as IPayload, state.board) : [],
			}
		case CLEAR_HINTS:
			return {
				...state,
				hints: [],
			}
		case SET_LEVEL:
			return {
				...state,
				level: action.payload as any,
			}
		case SET_BOARD:
			return {
				...state,
				board: action.payload as any,
			}
		case RESET_GAME:
			return initialState
		default:
			return state
	}
}
