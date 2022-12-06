import styled from 'styled-components'

const Title = styled.h1`
	font-family: sans-serif;
	color: #9e9e9e;
	margin-bottom: 15px;
`

const Text = styled.p`
	font-family: sans-serif;
	color: #9e9e9e;
	margin-bottom: 10px;
`

const Instructions = () => {
	return (
		<>
			<Title>Instructions</Title>
			<Text>Hover over cell and scroll to change number</Text>
			<Text>Click button and hover over cell to view hints</Text>
		</>
	)
}

export default Instructions
