import numpy as np
from pydoku import Pydoku


class Generator:
    def __init__(self):
        self.pydoku = Pydoku()
        self.iterator(0)
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

                if len(available_row) == 0 | len(available_col) == 0:
                    self.handle_row_swap(y, x, current_number)
                else:
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

                if len(available_row) == 0 | len(available_col) == 0:
                    print('col swap')
                else:
                    swap_number = available_numbers[available_row[0]
                                                    ][available_col[0]]
                    self.pydoku.raw_board[y][x] = swap_number
                    available_numbers[available_row[0]
                                      ][available_col[0]] = current_number

    def iterator(self, start):
        if start > 1:
            return

        self.iterate_rows(start)
        self.iterate_cols(start)

        self.iterator(start + 1)

    def handle_row_swap(self, y, x, current_number):
        swap_matrix = self.pydoku.raw_board[y:y+2, :x]
        swap_col = np.where(swap_matrix[0] == current_number)[0][0]

        def flip_col(col):
            swap_matrix[:, col] = np.flip(swap_matrix[:, col])

        flip_col(swap_col)

        def swap_rows(col):
            conflict_list = np.where(
                swap_matrix[0] == swap_matrix[0][col])[0]
            if len(conflict_list) == 1:
                return

            col = np.delete(conflict_list, np.argwhere(
                conflict_list == col))[0]
            flip_col(col)
            swap_rows(col)

        swap_rows(swap_col)
        self.pydoku.raw_board[y:y+2, :x] = swap_matrix


Generator()
