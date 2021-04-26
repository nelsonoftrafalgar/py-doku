import { useContext, useState } from 'react'

import { GameContext } from '../state/context'
import { SET_LEVEL } from '../state/actions'
import styled from 'styled-components'

const Text = styled.span`
	font-family: sans-serif;
	color: #9e9e9e;
	margin-right: 10px;
`

const SelectWrapper = styled.div`
	display: flex;
	margin: 20px 0;
	align-items: center;
`

const Button = styled.button`
	padding: 5px;
	background-color: transparent;
	font-family: sans-serif;
	color: #9e9e9e;
	border: 1px solid #9e9e9e;
	cursor: pointer;
`

const Select = styled.select`
	background-color: transparent;
	border: 1px solid #9e9e9e;
	color: #9e9e9e;
	padding: 5px;
`

const SelectLevel = () => {
	const { dispatch } = useContext(GameContext)
	const [level, setLevel] = useState('0.6')
	return (
		<>
			<SelectWrapper>
				<Text>Select level</Text>
				<Select onChange={(e) => setLevel(e.currentTarget.value)}>
					<option value='0.6'>very easy</option>
					<option value='0.5'>easy</option>
					<option value='0.4'>medium</option>
					<option value='0.3'>hard</option>
					<option value='0.2'>very hard</option>
					<option value='0.1'>killer</option>
				</Select>
			</SelectWrapper>
			<Button onClick={() => dispatch({ type: SET_LEVEL, payload: level })}>Start game</Button>
		</>
	)
}

export default SelectLevel
