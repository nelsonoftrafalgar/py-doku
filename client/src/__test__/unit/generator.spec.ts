import { getPrepareBoard, mapBoradToSectors } from '../../services/Generator'

const board1 = [
  ['6','2','1','5','7','3','9','8','4'],
  ['3','4','9','1','8','2','5','6','7'],
  ['8','5','7','4','6','9','2','3','1'],
]

const result1 = [
  ['6','2','1','3','4','9','8','5','7'],
  ['5','7','3','1','8','2','4','6','9'],
  ['9','8','4','5','6','7','2','3','1']
]

test('mapBoardToSectors works', () => {
  expect(mapBoradToSectors(board1)).toMatchObject(result1)
})

test('getPrepareBoard works', () => {
  const preparedBoard = getPrepareBoard(board1)
  const result = preparedBoard.map((item) => item.some((el: string | null) => el === null))
  expect(result.includes(true)).toBeTruthy()
})