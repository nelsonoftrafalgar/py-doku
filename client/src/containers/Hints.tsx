import { GameContext } from '../state/context'
import { TOGGLE_HINTS } from '../state/actions'
import styled from 'styled-components'
import { useContext } from 'react'

const Container = styled.div`
	width: 200px;
	height: 100px;
`

const SwitchWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
`

const Switch = styled.button`
	cursor: pointer;
	background-color: transparent;
	border: 1px solid #9e9e9e;
	font-family: sans-serif;
	padding: 15px;
	color: #9e9e9e;
`

const Text = styled.span`
	font-family: sans-serif;
	color: #9e9e9e;
`

const Display = styled(Text)`
	display: block;
	margin-top: 10px;
	text-align: center;
`

const HintsStatus = styled.span<{ color: string }>`
	font-weight: 600;
	${({ color }) => `color: ${color}`}
`

const Hints = () => {
	const { dispatch, showHints, hints } = useContext(GameContext)
	const handleSwitch = () => {
		dispatch({ type: TOGGLE_HINTS })
	}

	return (
		<Container>
			<SwitchWrapper>
				<Switch data-testid='HINTS_SWITCH' onClick={handleSwitch}>
					Show hints:{' '}
					<HintsStatus color={showHints ? 'green' : 'red'}>{showHints ? 'on' : 'off'}</HintsStatus>
				</Switch>
			</SwitchWrapper>
			<Display>{hints.join(' ')}</Display>
		</Container>
	)
}

export default Hints
