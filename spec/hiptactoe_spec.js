describe("Hiptactoe", function() {
  it("Hiptactoe should be defined", function() {
    expect(Hiptactoe).toBeDefined();
  });

  var h = Hiptactoe;

  describe("#clear", function() {
      var board = InitBoard(h.BOARD_STATE.X);

      it("should clear a board", function() {
          h.clear(board);
          for(i = 0; i < h.board_size; i++) {
              for(j = 0; j < h.board_size; j++) {
                  expect(board[i][j]).toEqual(h.BOARD_STATE.CLEAR);
              }
          }
      });
  });

  describe("#is_clear", function() {
      var clear_board = InitBoard(h.BOARD_STATE.CLEAR),
      unclear_board = InitBoard(h.BOARD_STATE.X);

      it("should report that a clear board is clear", function() {
          expect(h.is_clear(clear_board)).toEqual(true);
      });

      it("should report that an unclear board is not clear", function() {
          expect(h.is_clear(unclear_board)).toEqual(false);
      });
  });

  describe("#choose", function() {
      it("should be undefined for an empty array", function() {
          expect(h.choose([])).toBeUndefined();
      });

      it("should choose a random array element", function() {
          expect(h.choose([42])).toEqual(42);
          var choice = h.choose([1,2,3]);
          expect(choice === 1 || choice === 2 || choice === 3).toEqual(true);
      });
  });

  describe("#is_full", function() {
      var clear_board = InitBoard(h.BOARD_STATE.CLEAR),
      full_board = InitBoard(h.BOARD_STATE.X);

      it("should report that a clear board is not full", function() {
          expect(h.is_full(clear_board)).toEqual(false);
      });

      it("should report that a full board is full", function() {
          expect(h.is_full(full_board)).toEqual(true);
      });
  });

  describe("#get_possible_moves", function() {
      var board = InitBoard(h.BOARD_STATE.CLEAR),
      expected_possible_moves = [[0, 2], [1, 2], [2, 2]];

      for(i = 0; i < h.board_size; i++) {
          for(j = 0; j < h.board_size - 1; j++) {
              board[i][j] = h.BOARD_STATE.X;
          }
      }

      it("should yield correct possible moves", function() {
          expect(h.get_possible_moves(board)).toEqual(expected_possible_moves);
      });
  });

  describe("#occupied", function() {
      var board = [[]];
      board[0][0] = h.BOARD_STATE.CLEAR;
      board[0][1] = h.BOARD_STATE.X;
      board[0][2] = h.BOARD_STATE.O;

      it("should be false for a clear cell", function() {
          expect(h.occupied(0, 0, board)).toEqual(false);
      });

      it("should be true for an 'X' cell", function() {
          expect(h.occupied(0, 1, board)).toEqual(true);
      });

      it("should be true for an 'O' cell", function() {
          expect(h.occupied(0, 2, board)).toEqual(true);
      });
  });

  describe("#board_with_move", function() {
      var old_board = InitBoard(h.BOARD_STATE.CLEAR),
      new_board,
      i,
      j;

      it("should return a board with the supplied move", function() {
          for(i = 0; i < h.board_size; i++) {
              for(j = 0; j < h.board_size; j++) {
                  new_board = h.board_with_move(old_board, [i, j], h.BOARD_STATE.O);
                  expect(new_board).not.toEqual(old_board);
                  expect(new_board[i][j]).toEqual(h.BOARD_STATE.O);

                  new_board[i][j] = h.BOARD_STATE.CLEAR;
                  expect(new_board).toEqual(old_board);
              }
          }
      });
  });

  describe("#find_win", function() {
      var board = InitBoard(h.BOARD_STATE.CLEAR),
      i,
      x_win = [h.BOARD_STATE.X, h.BOARD_STATE.X, h.BOARD_STATE.X];

      it("should return false for a clear board", function() {
          h.clear(board);
          expect(h.find_win(board)).toEqual(false);
      });

      it("should return a win object for a board with a column win", function() {
          for(i = 0; i < 1; i++) {
              board = InitBoard(h.BOARD_STATE.CLEAR),
              board[i] = x_win;
              expect(h.find_win(board)).toEqual({
                  start: [i, 0],
                  end: [i, 2],
                  winner: h.BOARD_STATE.X
              });
          }
      });

      it("should return a win object for a board with a row win", function() {
          for(i = 0; i < 1; i++) {
              board = InitBoard(h.BOARD_STATE.CLEAR),
              board[0][i] = h.BOARD_STATE.X;
              board[1][i] = h.BOARD_STATE.X;
              board[2][i] = h.BOARD_STATE.X;
              expect(h.find_win(board)).toEqual({
                  start: [0, i],
                  end: [2, i],
                  winner: h.BOARD_STATE.X
              });
          }
      });

      it("should return a win object for a board with a diagonal win", function() {
          board = InitBoard(h.BOARD_STATE.CLEAR),
          board[0][0] = h.BOARD_STATE.X;
          board[1][1] = h.BOARD_STATE.X;
          board[2][2] = h.BOARD_STATE.X;
          expect(h.find_win(board)).toEqual({
              start: [0, 0],
              end: [2, 2],
              winner: h.BOARD_STATE.X
          });

          board = InitBoard(h.BOARD_STATE.CLEAR),
          board[2][0] = h.BOARD_STATE.X;
          board[1][1] = h.BOARD_STATE.X;
          board[0][2] = h.BOARD_STATE.X;
          expect(h.find_win(board)).toEqual({
              start: [0, 2],
              end: [2, 0],
              winner: h.BOARD_STATE.X
          });
      });
  });

  describe("#terminal_state", function() {
      var board = InitBoard(h.BOARD_STATE.CLEAR);
      drawn_board = [
          [h.BOARD_STATE.X, h.BOARD_STATE.O, h.BOARD_STATE.O],
          [h.BOARD_STATE.O, h.BOARD_STATE.X, h.BOARD_STATE.X],
          [h.BOARD_STATE.O, h.BOARD_STATE.X, h.BOARD_STATE.O]
      ],
      human_won_board = [
          [h.BOARD_STATE.X, h.BOARD_STATE.X, h.BOARD_STATE.X],
          [h.BOARD_STATE.O, h.BOARD_STATE.X, h.BOARD_STATE.X],
          [h.BOARD_STATE.O, h.BOARD_STATE.X, h.BOARD_STATE.O]
      ],
      computer_won_board = [
          [h.BOARD_STATE.O, h.BOARD_STATE.O, h.BOARD_STATE.O],
          [h.BOARD_STATE.CLEAR, h.BOARD_STATE.X, h.BOARD_STATE.X],
          [h.BOARD_STATE.O, h.BOARD_STATE.X, h.BOARD_STATE.O]
      ];

      it("should return the false for a clear board", function() {
          expect(h.terminal_state(board)).toEqual(false);
      });

      it("should return the correct state for a drawn board", function() {
          expect(h.terminal_state(drawn_board)).toEqual(h.GAME_STATE.DRAW);
      });

      it("should return the correct state for a human won board", function() {
          expect(h.terminal_state(human_won_board)).toEqual(h.GAME_STATE.HUMAN_WINS);
      });

      it("should return the correct state for a computer won board", function() {
          expect(h.terminal_state(computer_won_board)).toEqual(h.GAME_STATE.COMPUTER_WINS);
      });
  });
});
