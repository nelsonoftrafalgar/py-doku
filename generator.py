import numpy as np
from pydoku import Pydoku
from validator import Validator


class Generator:
    def __init__(self):
        self.pydoku = Pydoku()
        self.validator = Validator()
        self.iterator(0)
        is_valid = self.validator.validate_board(self.pydoku.raw_board)
        print(self.pydoku.raw_board)
        print('is_valid', is_valid)

    def iterate_rows(self, y):
        for x in range(9):
            current_number = self.pydoku.raw_board[y][x]
            previous_in_row = self.pydoku.get_previous_in_row((x, y))

            if current_number in previous_in_row:
                if y > x:
                    next_in_col = self.pydoku.raw_board[y:, x:x+1]
                    available_numbers = next_in_col[~np.in1d(
                        next_in_col, previous_in_row)]
                    if len(available_numbers) > 0:
                        swap_position = np.argwhere(
                            next_in_col == available_numbers[0])[0][0]
                        next_in_col[swap_position][0], next_in_col[0] = next_in_col[0], next_in_col[swap_position][0]
                    else:
                        self.handle_row_swap(y, x, current_number)
                else:
                    available_numbers = self.pydoku.get_row_available_numbers(
                        (x, y), current_number)
                    unavailable = self.pydoku.get_unavailable_for_row(x, y)
                    numbers = available_numbers[:, unavailable:]
                    row, col = np.where(
                        np.isin(numbers, previous_in_row, invert=True))

                    if len(row) == 0 or len(col) == 0:
                        self.handle_row_swap(y, x, current_number)
                    else:
                        swap_number = numbers[row[0]][col[0]]
                        self.pydoku.raw_board[y][x] = swap_number
                        numbers[row[0]][col[0]] = current_number

    def iterate_cols(self, x):
        for y in range(9):
            current_number = self.pydoku.raw_board[y][x]
            previous_in_col = self.pydoku.get_previous_in_col((x, y))

            if current_number in previous_in_col:
                if x >= y:
                    next_in_row = self.pydoku.raw_board[y:y+1, x:][0]
                    available_numbers = next_in_row[~np.in1d(
                        next_in_row, previous_in_col)]
                    if len(available_numbers) > 0:
                        swap_position = np.argwhere(
                            next_in_row == available_numbers[0])
                        next_in_row[swap_position], next_in_row[0] = next_in_row[0], next_in_row[swap_position]
                    else:
                        self.handle_col_swap(y, x, current_number)
                else:
                    available_numbers = self.pydoku.get_col_available_numbers(
                        (x, y), current_number)
                    unavailable = self.pydoku.get_unavailable_for_col(x, y)
                    numbers = available_numbers[unavailable:]
                    row, col = np.where(
                        np.isin(numbers, previous_in_col, invert=True))
                    if len(row) == 0 or len(col) == 0:
                        self.handle_col_swap(y, x, current_number)
                    else:
                        swap_number = numbers[row[0]][col[0]]
                        self.pydoku.raw_board[y][x] = swap_number
                        numbers[row[0]][col[0]] = current_number

    def iterator(self, start):
        if start > 8:
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

    def handle_col_swap(self, y, x, current_number):
        swap_matrix = self.pydoku.raw_board[:y, x:x+2]
        swap_row = np.where(swap_matrix[:y, 0] == current_number)[0][0]

        def flip_row(row):
            swap_matrix[row] = np.flip(swap_matrix[row])

        flip_row(swap_row)

        def swap_cols(row):
            conflict_list = np.where(
                swap_matrix[:y, 0] == swap_matrix[:y, 0][row])[0]
            if len(conflict_list) == 1:
                return

            row = np.delete(conflict_list, np.argwhere(
                conflict_list == row))[0]
            flip_row(row)
            swap_cols(row)

        swap_cols(swap_row)
        self.pydoku.raw_board[:y, x:x+2] = swap_matrix


Generator()
