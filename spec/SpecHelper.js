function InitBoard(state) {
    var board = [];
    for(i = 0; i < Hiptactoe.board_size; i++) {
        board.push([]);
        for(j = 0; j < Hiptactoe.board_size; j++) {
            board[i][j] = state;
        }
    }
    return board;
}
