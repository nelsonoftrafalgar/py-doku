import React, { useContext, useEffect, useRef, useState } from 'react'

import { ActionType } from '../model'
import { GameContext } from '../state/context'
import styled from 'styled-components'

interface IProps {
	value: number | null
	id: string
}

const CELL_COLORS: Record<number, string> = {
	1: '#65b96e',
	2: '#599dbc',
	3: '#e69448',
	4: '#c1806c',
	5: '#43ae9e',
	6: '#866373',
	7: '#a2934c',
	8: '#8ca5a2',
	9: '#e7b714',
}

const Container = styled.div<{ color: string; background: string }>`
	border: 1px solid gray;
	height: 50px;
	width: 100%;
	font-size: 36px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: sans-serif;
	${({ color }) => `color: ${color}`};
	${({ background }) => `background: ${background}`};
`

const Cell: React.FC<IProps> = ({ value, id }) => {
	const { dispatch } = useContext(GameContext)
	const [number, setNumber] = useState(0)
	const initialRender = useRef(true)
	const color = value ? '#e7e0e0' : 'black'

	useEffect(() => {
		if (!initialRender.current) {
			dispatch({ type: ActionType.UPDATE_BOARD, payload: { id, value: number } })
		}
		initialRender.current = false
	}, [number, dispatch, id])

	const handleWheel = (e: WheelEvent) => {
		if (e.deltaY < 0 && number < 9) {
			setNumber(number + 1)
		}

		if (e.deltaY > 0 && number > 0) {
			setNumber(number - 1)
		}
	}

	const handleAnalyzeBoard = () => {
		if (!value && !number) {
			dispatch({ type: ActionType.ANALYZE_BOARD, payload: { id } })
		}
	}

	const handleClearHints = () => {
		if (!value) {
			dispatch({ type: ActionType.CLEAR_HINTS })
		}
	}

	return (
		<Container
			data-testid='CELL_CONTAINER'
			color={color}
			background={CELL_COLORS[value || number]}
			onWheel={handleWheel as any}
			onMouseEnter={handleAnalyzeBoard}
			onMouseLeave={handleClearHints}
		>
			{value ? value : number !== 0 ? number : null}
		</Container>
	)
}

export default Cell
