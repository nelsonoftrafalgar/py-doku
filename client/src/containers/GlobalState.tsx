import { IGlobalStateProps, SectorValues } from '../model'
import React, { useEffect, useMemo, useReducer } from 'react'

import { GameContext } from '../state/context'
import { SET_BOARD } from '../state/actions'
import axios from 'axios'
import { mapBoradToSectors } from '../services/Generator'
import { reducer } from '../state/reducers'

export const initialState = {
	level: null,
	board: [],
	showHints: false,
	hints: [],
}

const GlobalState: React.FC<IGlobalStateProps> = ({ render }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		state.level &&
			axios.get('/api', { params: { level: state.level } }).then((res) => {
				dispatch({ type: SET_BOARD, payload: res.data })
			})
	}, [state.level])

	const contextValue = {
		showHints: state.showHints,
		hints: state.hints,
		dispatch,
	}

	const initilalBoard = useMemo(() => mapBoradToSectors(state.board), [state.board.length])

	return (
		<GameContext.Provider value={contextValue}>
			{render(initilalBoard as SectorValues[])}
		</GameContext.Provider>
	)
}

export default GlobalState
