import numpy as np
from pydoku import Pydoku


class Generator:
    def __init__(self):
        self.pydoku = Pydoku()
        # self.iterate_rows(0)
        self.iterate_cols(0)
        print(self.pydoku.raw_board)

    def iterate_rows(self, y):
        for x in range(y, 9):
            current_number = self.pydoku.raw_board[y][x]
            previous_in_row = self.pydoku.get_previous_in_row((x, y))

            if current_number in previous_in_row:
                available_numbers = self.pydoku.get_row_available_numbers(
                    (x, y), current_number)

                available_row, available_col = np.where(np.isin(available_numbers,
                                                                previous_in_row, invert=True))
                print('available', available_row[0], available_col[0])
                swap_number = available_numbers[available_row[0]
                                                ][available_col[0]]
                self.pydoku.raw_board[y][x] = swap_number
                available_numbers[available_row[0]
                                  ][available_col[0]] = current_number

    def iterate_cols(self, x):
        for y in range(x, 9):
            current_number = self.pydoku.raw_board[y][x]
            previous_in_col = self.pydoku.get_previous_in_col((x, y))

            if current_number in previous_in_col:
                available_numbers = self.pydoku.get_col_available_numbers(
                    (x, y), current_number)

                available_row, available_col = np.where(np.isin(available_numbers,
                                                                previous_in_col, invert=True))
                print('available', available_row[0], available_col[0])
                swap_number = available_numbers[available_row[0]
                                                ][available_col[0]]
                self.pydoku.raw_board[y][x] = swap_number
                available_numbers[available_row[0]
                                  ][available_col[0]] = current_number

    # def iterator(self, start):
    #     if start > 7:
    #         return


Generator()
