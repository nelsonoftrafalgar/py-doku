import { getAvailableCellsForRow } from '../../services/generator/getAvailableCellsForRow'

interface ICell {
  value: number
  row: number
  col: number
}

const testBoard = [
  [6,3,9, 1,8,4, 2,1,3],
  [1,2,7, 2,5,6, 4,7,8],
  [8,4,5, 9,3,7, 6,9,5]
]

let rowCache: string[] = []
const testResults: ICell[][] = []
const compare = [
  [
    { value: 7, row: 1, col: 7 },
    { value: 5, row: 2, col: 8 }
  ],
  [
    { value: 7, row: 1, col: 7 },
    { value: 5, row: 2, col: 8 }
  ],
  [
    { value: 9, row: 2, col: 3 },
    { value: 3, row: 2, col: 4 }
  ],
  [
    { value: 9, row: 2, col: 7 }
  ],
  [],
  []
]

test('getAvailableCellsForRow works', () => {
  for (let i = 0; i < 3; i++) {
    rowCache = []
    for(let y = 0; y < 9; y++) {
      const cell = testBoard[i][y].toString()
      if (rowCache.includes(cell)) {
        const availableCells = getAvailableCellsForRow(i, y, rowCache, testBoard) as ICell[]
        testResults.push(availableCells)
      }
      rowCache.push(cell)
    }
  }
  expect(testResults).toMatchObject(compare)
})