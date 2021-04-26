import { getSectorById, getSectorIndex, getSectorItemCoords } from '../../services/Sectors'

test('getSectorItemCoords works', () => {
  expect(getSectorItemCoords(2, 4)).toMatchObject([1, 7])
  expect(getSectorItemCoords(1, 5)).toMatchObject([1, 5])
  expect(getSectorItemCoords(6, 5)).toMatchObject([7, 2])
  expect(getSectorItemCoords(6, 7)).toMatchObject([8, 1])
  expect(getSectorItemCoords(4, 7)).toMatchObject([5, 4])
})

test('getSectorById works', () => {
  expect(getSectorById('24')).toMatchObject(['03','04','05','13','14','15','23','24','25'])
  expect(getSectorById('37')).toMatchObject(['36','37','38','46','47','48','56','57','58'])
  expect(getSectorById('65')).toMatchObject(['63','64','65','73','74','75','83','84','85'])
  expect(getSectorById('67')).toMatchObject(['66','67','68','76','77','78','86','87','88'])
  expect(getSectorById('47')).toMatchObject(['36','37','38','46','47','48','56','57','58'])
})

test('getSectorIndex, works', () => {
  expect(getSectorIndex('24')).toEqual(1)
  expect(getSectorIndex('37')).toEqual(5)
  expect(getSectorIndex('65')).toEqual(7)
  expect(getSectorIndex('67')).toEqual(8)
  expect(getSectorIndex('47')).toEqual(5)
})