import { deepCopy } from '../../helpers/deepCopy'

test('deepCopy works', () => {
  const test1 = [[1,2,3], [3,4,5], [4,5,6]]
  const test2 = [['1', '2', '3'], ['3', '4', '5'], ['4', '5', '6']]
  const test3 = [[1,2,3], ['1', '2', '3'], [null, null]]

  expect(deepCopy(test1)).toMatchObject(test1)
  expect(deepCopy(test2)).toMatchObject(test2)
  expect(deepCopy(test3)).toMatchObject(test3)
})