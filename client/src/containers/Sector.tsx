import { Col, Row } from '../grid'

import Cell from '../components/Cell'
import { SectorValues } from '../model'
import styled from 'styled-components'

const Container = styled.div`
	width: 150px;
	border: 2px solid gray;
`

interface IProps {
	values: SectorValues
	keys: string[]
}

const Sector: React.FC<IProps> = ({ values, keys }) => {
	const renderCells = values.map((value, i) => {
		return (
			<Col key={keys[i]} size={4}>
				<Cell id={keys[i]} value={value} />
			</Col>
		)
	})

	return (
		<Container>
			<Row>{renderCells.slice(0, 3)}</Row>
			<Row>{renderCells.slice(3, 6)}</Row>
			<Row>{renderCells.slice(6)}</Row>
		</Container>
	)
}

export default Sector
