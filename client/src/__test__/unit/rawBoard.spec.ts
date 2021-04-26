import { RawBoard } from '../../services/RawBoard'
import { mapBoradToSectors } from '../../services/Generator'

test('generating rawBoard works', () => {
  const {rawBoard} = new RawBoard(9, 9)
  const stringBoard = rawBoard.map((row, y) => row.map((_, i) => rawBoard[y][i].toString()))
  const mapedBoard = mapBoradToSectors(stringBoard)
  const sumedBoard = mapedBoard.map((el) => el.reduce((a: number, v: string) => a + +v , 0))

  expect(sumedBoard.every((item) => item === 45)).toBeTruthy()
})