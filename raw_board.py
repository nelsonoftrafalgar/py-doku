import numpy as np
from random import sample


class RawBoard:
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

    def get_shuffled_list(self):
        numbers = list(range(1, 10))

        return np.array(sample(numbers, 9)).reshape([3, 3])

    def populate_board(self):
        board = np.zeros([9, 9], dtype=int)

        for a, b, c, d in self.sector_borders:
            board[a:b, c:d] = self.get_shuffled_list()

        return board
