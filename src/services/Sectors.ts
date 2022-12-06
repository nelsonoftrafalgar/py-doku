class Sectors {
  sectors = [
    ['00','01','02', '10','11','12', '20','21','22'],
    ['03','04','05', '13','14','15', '23','24','25'],
    ['06','07','08', '16','17','18', '26','27','28'],

    ['30','31','32', '40','41','42', '50','51','52'],
    ['33','34','35', '43','44','45', '53','54','55'],
    ['36','37','38', '46','47','48', '56','57','58'],

    ['60','61','62', '70','71','72', '80','81','82'],
    ['63','64','65', '73','74','75', '83','84','85'],
    ['66','67','68', '76','77','78', '86','87','88']
  ]

  getSectorItemCoords = (y: number, x: number): number[] => {
    return this.sectors[y][x].split('').map((el) => +el)
  }

  getSectorById = (id: string) => {
    return this.sectors.find((sector) => sector.includes(id))!
  }

  getSectorIndex = (id: string) => {
    return this.sectors.indexOf(this.getSectorById(id))
  }
}

export const {
  sectors,
  getSectorById,
  getSectorIndex,
  getSectorItemCoords
} = new Sectors()