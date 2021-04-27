import { GameBoard } from '../model'
import { deepCopy } from '../helpers/deepCopy'
import { getSectorItemCoords } from './Sectors'

class Generator {
	mapBoradToSectors = (board: GameBoard) => {
		const copy = deepCopy(board)

		copy.forEach((row, y) =>
			row.forEach((_: any, x: number) => {
				const [ver, hor] = getSectorItemCoords(y, x)
				copy[ver][hor] = board[y][x]
			})
		)

		return copy
	}
}

export const { mapBoradToSectors } = new Generator()
