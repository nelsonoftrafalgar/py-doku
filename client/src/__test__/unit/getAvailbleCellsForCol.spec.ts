import { getAvailableCellsForCol } from '../../services/generator/getAvailableCellsForCol'

interface ICell {
  value: number
  row: number
  col: number
}

const testBoard = [
  [6,3,9],
  [1,7,8],
  [4,2,5],

  [3,2,5],
  [6,7,9],
  [1,4,8],

  [3,5,8],
  [1,2,6],
  [7,4,9]
]

let colCache: string[] = []
const testResults: ICell[][] = []
const compare = [
  [
    { value: 2, row: 3, col: 1 },
    { value: 5, row: 3, col: 2 },
    { value: 7, row: 4, col: 1 },
    { value: 9, row: 4, col: 2 },
    { value: 8, row: 5, col: 2 }
  ],
  [
    { value: 2, row: 3, col: 1 },
    { value: 5, row: 3, col: 2 },
    { value: 7, row: 4, col: 1 },
    { value: 9, row: 4, col: 2 },
    { value: 8, row: 5, col: 2 }
  ],
  [
    { value: 5, row: 6, col: 1 },
    { value: 8, row: 6, col: 2 },
    { value: 2, row: 7, col: 1 },
    { value: 9, row: 8, col: 2 }
  ],
  [
    { value: 5, row: 6, col: 1 },
    { value: 8, row: 6, col: 2 },
    { value: 2, row: 7, col: 1 },
    { value: 9, row: 8, col: 2 }
  ],
  [
    { value: 5, row: 3, col: 2 },
    { value: 9, row: 4, col: 2 },
    { value: 8, row: 5, col: 2 }
  ],
  [
    { value: 5, row: 3, col: 2 },
    { value: 9, row: 4, col: 2 },
    { value: 8, row: 5, col: 2 }
  ],
  [
    { value: 8, row: 6, col: 2 },
    { value: 6, row: 7, col: 2 },
    { value: 9, row: 8, col: 2 }
  ],
  [
    { value: 8, row: 6, col: 2 },
    { value: 6, row: 7, col: 2 },
    { value: 9, row: 8, col: 2 }
  ],
  [],
  [],
  [],
  [],
  []
]

test('getAvailableCellsForCol works', () => {
  for (let i = 0; i < 3; i++) {
    colCache = []
    for(let y = 0; y < 9; y++) {
      const cell = testBoard[y][i].toString()
      if (colCache.includes(cell)) {
        const availableCells = getAvailableCellsForCol(i, y, colCache, testBoard) as ICell[]
        testResults.push(availableCells)
      }
      colCache.push(cell)
    }
  }
  expect(testResults).toMatchObject(compare)
})