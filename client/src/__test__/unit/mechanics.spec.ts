import { analyzeBoard, updateBoard } from '../../services/Mechanics'

const board = [
	['3', '2', null, null, '1', null, null, '6', '9'],
	['6', '5', null, '2', '7', null, '3', null, '4'],
	['1', '8', null, '9', '3', null, '2', '5', '7'],
	[null, '3', null, '8', null, '7', null, '4', '6'],
	['9', '4', null, null, null, '2', '1', '7', '8'],
	['7', '6', '8', '1', null, '9', null, '3', null],
	['4', null, null, '5', null, null, '7', '8', '3'],
	['8', '1', '3', null, '9', null, null, null, '5'],
	['5', null, '2', null, null, '3', '4', '9', '1'],
]

const board1 = [
	['6', '2', '1'],
	['3', '4', null],
	['8', '5', '7'],
]

const result1 = [
	['6', '2', '1'],
	['3', '4', '9'],
	['8', '5', '7'],
]

test('analyzeBoard should return available numbers', () => {
	expect(analyzeBoard({ id: '15' }, board)).toMatchObject([8])
	expect(analyzeBoard({ id: '32' }, board)).toMatchObject([1, 5])
	expect(analyzeBoard({ id: '61' }, board)).toMatchObject([9])
	expect(analyzeBoard({ id: '56' }, board)).toMatchObject([5])
	expect(analyzeBoard({ id: '84' }, board)).toMatchObject([6, 8])
})

test('updateBoard updates cell of given id with value', () => {
	expect(updateBoard({ id: '12', value: 9 }, board1)).toMatchObject(result1)
})
