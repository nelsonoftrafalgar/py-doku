import { ActionType, SectorValues } from '../model'
import { useEffect, useMemo, useReducer } from 'react'

import { GameContext } from '../state/context'
import { http } from '../helpers/http'
import { mapBoradToSectors } from '../services/Generator'
import { reducer } from '../state/reducers'

interface IProps {
	render: (data: SectorValues[]) => JSX.Element
}

export const initialState = {
	level: null,
	board: [],
	showHints: false,
	hints: [],
	isFetchingBoard: false,
	error: null,
}

const GlobalState: React.FC<IProps> = ({ render }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		state.level &&
			http
				.get('/api', { params: { level: state.level } })
				.then((res) => {
					dispatch({ type: ActionType.SET_BOARD, payload: { data: res.data } })
				})
				.catch(() => {
					dispatch({
						type: ActionType.SET_ERROR,
						payload: { error: 'Sorry, but an api error happend. Try again or refresh page.' },
					})
				})
	}, [state.level])

	const contextValue = {
		showHints: state.showHints,
		hints: state.hints,
		dispatch,
		isFetchingBoard: state.isFetchingBoard,
		error: state.error,
	}

	const initilalBoard = useMemo(() => mapBoradToSectors(state.board), [state.board.length])

	return (
		<GameContext.Provider value={contextValue}>
			{render(initilalBoard as SectorValues[])}
		</GameContext.Provider>
	)
}

export default GlobalState
