export type Matrix = (string | number)[][]
export type GameBoard = (string | null)[][]
export type SectorValues = (number | null)[]
export type Break = () => void

export interface ISectorProps {
	values: SectorValues
	keys: string[]
}

export interface ICellProps {
	value: number | null
	id: string
}

export interface IGameProps {
	sectorsWithoutDuplicates: SectorValues[]
}

export interface IGlobalStateProps {
	render: (data: SectorValues[]) => JSX.Element
}

export interface IGameContext {
	showHints: boolean
	hints: number[]
	dispatch: React.Dispatch<any>
}

export interface IState {
	level: string | null
	board: GameBoard
	showHints: boolean
	hints: number[]
}

type ActionType =
	| 'TOGGLE_HINTS'
	| 'UPDATE_BOARD'
	| 'ANALYZE_BOARD'
	| 'CLEAR_HINTS'
	| 'SET_LEVEL'
	| 'SET_BOARD'
	| 'RESET_GAME'

export interface IPayload {
	id: string
	value?: number
}

export interface IAction {
	type: ActionType
	payload?: IPayload
}
