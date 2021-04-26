import Hints from './Hints'
import { IGameProps } from '../model'
import Instructions from './Instructions'
import React from 'react'
import Reset from './Reset'
import { Row } from '../grid'
import Sector from './Sector'
import SelectLevel from './SelectLevel'
import { sectors } from '../services/Sectors'
import styled from 'styled-components'

const Container = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	flex-direction: column;
	background: #dbf4fc;
`

const Game: React.FC<IGameProps> = ({ sectorsWithoutDuplicates }) => {
	const renderSectors = sectorsWithoutDuplicates.map((sector, i) => {
		return <Sector key={i} values={sector} keys={sectors[i]} />
	})

	return (
		<Container>
			{sectorsWithoutDuplicates.length === 0 ? (
				<>
					<Instructions />
					<SelectLevel />
				</>
			) : (
				<>
					<Hints />
					<div>
						<Row>{renderSectors.slice(0, 3)}</Row>
						<Row>{renderSectors.slice(3, 6)}</Row>
						<Row>{renderSectors.slice(6)}</Row>
					</div>
					<Reset />
				</>
			)}
		</Container>
	)
}

export default Game
