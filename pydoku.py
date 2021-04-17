import numpy as np
from random import sample


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
        self.raw_board = self.populate_board()
        # x = 4
        # y = 2
        print(self.raw_board)
        # print(self.raw_board[y][x])
        # sector = self.find_sector((x, y))
        # print(sector)
        # print(self.get_previous_in_row((x, y)))

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

    def get_col_available_numbers(self, coords, current_number):
        sector = self.find_sector(coords)
        position_in_sector = np.where(sector == current_number)
        col_in_sector = position_in_sector[0][0]
        return sector[col_in_sector + 1:]
