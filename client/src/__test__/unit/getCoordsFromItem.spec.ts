import { getCoordsFromItem } from '../../helpers/getCoordsFromItem'

test('getCoordsFromItem should convert string to array of numbers', () => {
	expect(getCoordsFromItem('00')).toEqual([0, 0])
	expect(getCoordsFromItem('20')).toEqual([2, 0])
	expect(getCoordsFromItem('35')).toEqual([3, 5])
})
