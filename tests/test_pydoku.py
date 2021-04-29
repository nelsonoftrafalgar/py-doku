import pytest
import numpy as np
from py_doku.src import Pydoku


@pytest.fixture
def pydoku():
    pydoku = Pydoku()
    pydoku.raw_board = np.array([[2, 6, 3, 1, 2, 4, 5, 6, 8],
                                 [4, 9, 1, 5, 8, 9, 3, 4, 7],
                                 [5, 8, 7, 7, 6, 3, 1, 2, 9],
                                 [8, 5, 6, 5, 1, 3, 4, 1, 6],
                                 [7, 3, 4, 6, 4, 9, 9, 2, 3],
                                 [1, 9, 2, 2, 7, 8, 5, 7, 8],
                                 [4, 8, 1, 9, 1, 6, 2, 6, 4],
                                 [9, 6, 5, 3, 8, 4, 7, 8, 5],
                                 [3, 7, 2, 2, 7, 5, 3, 1, 9]])
    return pydoku


def test_get_unavailable_for_col(pydoku):
    assert pydoku.get_unavailable_for_col(3, 4) == 1
    assert pydoku.get_unavailable_for_col(3, 5) == 1
    assert pydoku.get_unavailable_for_col(6, 7) == 1
    assert pydoku.get_unavailable_for_col(6, 8) == 1
    assert pydoku.get_unavailable_for_col(4, 5) == 2
    assert pydoku.get_unavailable_for_col(7, 8) == 2
    assert pydoku.get_unavailable_for_col(0, 0) == 0
    assert pydoku.get_unavailable_for_col(2, 1) == 0


def test_get_unavailable_for_row(pydoku):
    assert pydoku.get_unavailable_for_row(4, 4) == 1
    assert pydoku.get_unavailable_for_row(5, 4) == 1
    assert pydoku.get_unavailable_for_row(7, 7) == 1
    assert pydoku.get_unavailable_for_row(8, 7) == 1
    assert pydoku.get_unavailable_for_row(0, 0) == 0
    assert pydoku.get_unavailable_for_row(1, 3) == 0


def test_get_col_available_numbers(pydoku):
    assert np.array_equal(pydoku.get_col_available_numbers(
        (4, 3), 5), np.array([[1, 3], [4, 9], [7, 8]]))
    assert np.array_equal(pydoku.get_col_available_numbers(
        (5, 3), 2), np.array([[1, 3], [4, 9], [7, 8]]))
    assert np.array_equal(pydoku.get_col_available_numbers(
        (4, 4), 4), np.array([[3], [9], [8]]))


def test_get_row_available_numbers(pydoku):
    assert np.array_equal(pydoku.get_row_available_numbers(
        (5, 0), 4), np.array([[5, 8, 9], [7, 6, 3]]))
    assert np.array_equal(pydoku.get_row_available_numbers(
        (3, 3), 5), np.array([[6, 4, 9], [2, 7, 8]]))
    assert np.array_equal(pydoku.get_row_available_numbers(
        (6, 6), 2), np.array([[7, 8, 5], [3, 1, 9]]))


def test_get_previous_in_col(pydoku):
    assert np.array_equal(pydoku.get_previous_in_col(
        (0, 5)), np.array([2, 4, 5, 8, 7]))
    assert np.array_equal(pydoku.get_previous_in_col(
        (5, 3)), np.array([4, 9, 3]))
    assert np.array_equal(pydoku.get_previous_in_col((4, 6)),
                          np.array([2, 8, 6, 1, 4, 7]))


def test_get_previous_in_row(pydoku):
    assert np.array_equal(pydoku.get_previous_in_row((1, 5)), np.array([1]))
    assert np.array_equal(pydoku.get_previous_in_row((6, 2)),
                          np.array([5, 8, 7, 7, 6, 3]))
    assert np.array_equal(pydoku.get_previous_in_row(
        (4, 7)), np.array([9, 6, 5, 3]))


def test_find_sector(pydoku):
    assert np.array_equal(pydoku.find_sector((5, 3)), np.array(
        [[5, 1, 3], [6, 4, 9], [2, 7, 8]]))
    assert np.array_equal(pydoku.find_sector((5, 3)), np.array(
        [[5, 1, 3], [6, 4, 9], [2, 7, 8]]))
    assert np.array_equal(pydoku.find_sector((1, 5)), np.array(
        [[8, 5, 6], [7, 3, 4], [1, 9, 2]]))
    assert np.array_equal(pydoku.find_sector((4, 7)), np.array(
        [[9, 1, 6], [3, 8, 4], [2, 7, 5]]))


def test_find_sector_border(pydoku):
    assert pydoku.find_sector_borders((0, 5)) == (3, 6, 0, 3)
    assert pydoku.find_sector_borders((4, 6)) == (6, 9, 3, 6)
    assert pydoku.find_sector_borders((6, 2)) == (0, 3, 6, 9)


def test_populate_board(pydoku):
    populated_board = pydoku.populate_board()
    assert populated_board.shape == (9, 9)
    assert (populated_board > 0).all()
    assert (populated_board < 10).all()


def test_get_shuffled_list(pydoku):
    shuffled_list1 = pydoku.get_shuffled_list()
    shuffled_list2 = pydoku.get_shuffled_list()
    assert shuffled_list1.shape == (3, 3)
    assert (shuffled_list1 > 0).all()
    assert (shuffled_list1 < 10).all()
    assert shuffled_list2.shape == (3, 3)
    assert (shuffled_list2 > 0).all()
    assert (shuffled_list2 < 10).all()
    assert not np.array_equal(shuffled_list1, shuffled_list2)
