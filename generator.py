import numpy as np
from pydoku import Pydoku


class Generator:
    def __init__(self):
        self.pydoku = Pydoku()
        self.iterate_rows(0)

    def iterate_rows(self, y):
        for x in range(y, 9):
            current_number = self.pydoku.raw_board[y][x]
            previous_in_col = self.pydoku.get_previous_in_row((x, y))

            if current_number in previous_in_col:
                print(current_number, 'coords: ', (y, x))

    def iterate_cols(self, x):
        pass

    # def iterator(self, start):
    #     if start > 7:
    #         return


Generator()
