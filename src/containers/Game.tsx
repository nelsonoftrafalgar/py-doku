import Hints from './Hints'
import Instructions from './Instructions'
import Reset from './Reset'
import { Row } from '../grid'
import Sector from './Sector'
import { SectorValues } from '../model'
import SelectLevel from './SelectLevel'
import { sectors } from '../services/Sectors'
import styled from 'styled-components'

interface IProps {
	data: SectorValues[]
}

const Container = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	flex-direction: column;
	background: #dbf4fc;
`

const Game: React.FC<IProps> = ({ data }) => {
	const renderSectors = data.map((sector, i) => {
		return <Sector key={i} values={sector} keys={sectors[i]} />
	})

	return (
		<Container>
			{data.length === 0 ? (
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
