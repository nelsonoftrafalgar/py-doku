import { GameBoard } from '../model'
import { deepCopy } from '../helpers/deepCopy'
import { getCoordsFromItem } from '../helpers/getCoordsFromItem'
import { getSectorIndex } from './Sectors'
import { mapBoradToSectors } from './Generator'

class Mechanics {
	analyzeBoard = ({ id }: { id: string }, board: GameBoard) => {
		const cache: (string | null)[] = []
		const mapedBoard = mapBoradToSectors(board)
		const currentSectorIndex = getSectorIndex(id)
		const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8]
		const [row, col] = getCoordsFromItem(id)

		indices.forEach((i) => {
			const rowValue = board[row][i]
			const colValue = board[i][col]
			cache.push(rowValue, colValue)
		})

		const test = [...cache, ...mapedBoard[currentSectorIndex]]

		return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((el) => !test.includes(el.toString()))
	}

	updateBoard = ({ id, value }: { id: string; value: number }, board: GameBoard) => {
		const updatedBoard = deepCopy(board)
		const [y, x] = getCoordsFromItem(id)
		updatedBoard[y][x] = value!.toString()
		return updatedBoard
	}
}

export const { analyzeBoard, updateBoard } = new Mechanics()
