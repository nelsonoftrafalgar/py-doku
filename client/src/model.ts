export type GameBoard = (string | null)[][]
export type SectorValues = (number | null)[]

export interface IGameContext {
	showHints: boolean
	hints: number[]
	dispatch: React.Dispatch<Action>
	isFetchingBoard: boolean
	error: string | null
}

export interface IState {
	level: string | null
	board: GameBoard
	showHints: boolean
	hints: number[]
	isFetchingBoard: boolean
	error: string | null
}

export enum ActionType {
	TOGGLE_HINTS = 'TOGGLE_HINTS',
	UPDATE_BOARD = 'UPDATE_BOARD',
	ANALYZE_BOARD = 'ANALYZE_BOARD',
	CLEAR_HINTS = 'CLEAR_HINTS',
	SET_LEVEL = 'SET_LEVEL',
	SET_BOARD = 'SET_BOARD',
	RESET_GAME = 'RESET_GAME',
	SET_ERROR = 'SET_ERROR',
}

export type Action =
	| {
			type: ActionType.UPDATE_BOARD
			payload: { id: string; value: number }
	  }
	| {
			type: ActionType.TOGGLE_HINTS
	  }
	| {
			type: ActionType.ANALYZE_BOARD
			payload: { id: string }
	  }
	| {
			type: ActionType.CLEAR_HINTS
	  }
	| {
			type: ActionType.SET_LEVEL
			payload: { level: string }
	  }
	| {
			type: ActionType.SET_BOARD
			payload: { data: GameBoard }
	  }
	| {
			type: ActionType.RESET_GAME
	  }
	| {
			type: ActionType.SET_ERROR
			payload: { error: string }
	  }
