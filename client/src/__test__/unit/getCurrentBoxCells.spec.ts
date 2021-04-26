import { getCurrentBoxCells } from '../../helpers/getCurrentBoxCells'

const testBoard = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

const testBox = ['00', '02', '22', '11']

const result = [
  {value: 1, row: 0, col: 0},
  {value: 3, row: 0, col: 2},
  {value: 9, row: 2, col: 2},
  {value: 5, row: 1, col: 1},
]

test('getCurrentBoxCells works', () => {
  expect(getCurrentBoxCells(testBox, testBoard)).toMatchObject(result)
})