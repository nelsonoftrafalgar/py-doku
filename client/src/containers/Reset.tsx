import { GameContext } from '../state/context'
import { RESET_GAME } from '../state/actions'
import styled from 'styled-components'
import { useContext } from 'react'

const Switch = styled.button`
	cursor: pointer;
	background-color: transparent;
	border: 1px solid #9e9e9e;
	font-family: sans-serif;
	padding: 15px;
	color: #9e9e9e;
	margin-top: 40px;
`

const Reset = () => {
	const { dispatch } = useContext(GameContext)
	return <Switch onClick={() => dispatch({ type: RESET_GAME })}>Reset game</Switch>
}

export default Reset
