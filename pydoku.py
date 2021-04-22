import numpy as np
from random import sample

test_board = np.array([[8, 4, 2, 4, 2, 3, 9, 8, 3],
                       [5, 1, 6, 7, 5, 1, 1, 6, 7],
                       [9, 3, 7, 6, 9, 8, 4, 2, 5],
                       [5, 2, 4, 2, 9, 1, 1, 8, 9],
                       [8, 7, 6, 3, 4, 8, 2, 7, 3],
                       [3, 9, 1, 7, 5, 6, 5, 4, 6],
                       [4, 5, 8, 3, 2, 7, 8, 7, 2],
                       [1, 7, 2, 5, 6, 8, 6, 1, 5],
                       [3, 9, 6, 9, 1, 4, 3, 4, 9]])


class Pydoku:
    def __init__(self):
        self.sector_borders = [
            (0, 3, 0, 3),
            (0, 3, 3, 6),
            (0, 3, 6, 9),
            (3, 6, 0, 3),
            (3, 6, 3, 6),
            (3, 6, 6, 9),
            (6, 9, 0, 3),
            (6, 9, 3, 6),
            (6, 9, 6, 9)
        ]
        # self.raw_board = self.populate_board()
        self.raw_board = test_board
        print(self.raw_board)

    def get_shuffled_list(self):
        numbers = list(range(1, 10))
        return np.array(sample(numbers, 9)).reshape([3, 3])

    def populate_board(self):
        board = np.zeros([9, 9], dtype=int)
        for a, b, c, d in self.sector_borders:
            board[a:b, c:d] = self.get_shuffled_list()
        return board

    def find_sector_borders(self, coords):
        x, y = coords
        return next((a, b, c, d) for a, b, c, d in self.sector_borders if (a <= y < b) & (c <= x < d))

    def find_sector(self, coords):
        a, b, c, d = self.find_sector_borders(coords)
        return self.raw_board[a:b, c:d]

    def get_previous_in_row(self, coords):
        x, y = coords
        return self.raw_board[y, :x]

    def get_previous_in_col(self, coords):
        x, y = coords
        return self.raw_board[:y, x]

    def get_row_available_numbers(self, coords, current_number):
        sector = self.find_sector(coords)
        position_in_sector = np.where(sector == current_number)
        row_in_sector = position_in_sector[0][0]
        return sector[row_in_sector + 1:]

    def get_col_available_numbers(self, coords, current_number):
        sector = self.find_sector(coords)
        position_in_sector = np.where(sector == current_number)
        col_in_sector = position_in_sector[1][0]
        return sector[:, col_in_sector + 1:]

    def get_unavailable_for_row(self, x, y):
        if (y == 4 and (x == 4 or x == 5)) or (y == 7 and (x == 7 or x == 8)):
            return 1
        else:
            return 0

    def get_unavailable_for_col(self, x, y):
        if (x == 3 and (y == 4 or y == 5)) or (x == 6 and (y == 7 or y == 8)):
            return 1
        elif (x == 4 and (y == 5)) or (x == 7 and (y == 8)):
            return 2
        else:
            return 0
