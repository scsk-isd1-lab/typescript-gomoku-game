import { Board, CellState } from '../../models/board';

describe('Board', () => {
  let board: Board;
  
  beforeEach(() => {
    board = new Board();
  });
  
  test('should create a board with the specified size', () => {
    expect(board.getSize()).toBe(19);
    
    const smallBoard = new Board(9);
    expect(smallBoard.getSize()).toBe(9);
  });
  
  test('should have all cells empty when initialized', () => {
    const size = board.getSize();
    
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        expect(board.getCell(x, y)).toBe(CellState.EMPTY);
        expect(board.isEmpty(x, y)).toBe(true);
      }
    }
  });
  
  test('should place a stone on valid position', () => {
    expect(board.placeStone(3, 3, CellState.BLACK)).toBe(true);
    expect(board.getCell(3, 3)).toBe(CellState.BLACK);
    expect(board.isEmpty(3, 3)).toBe(false);
  });
  
  test('should not place a stone on occupied position', () => {
    board.placeStone(3, 3, CellState.BLACK);
    
    expect(board.placeStone(3, 3, CellState.WHITE)).toBe(false);
    expect(board.getCell(3, 3)).toBe(CellState.BLACK); // still black
  });
  
  test('should not place a stone outside the board', () => {
    const size = board.getSize();
    
    expect(board.placeStone(-1, 0, CellState.BLACK)).toBe(false);
    expect(board.placeStone(0, -1, CellState.BLACK)).toBe(false);
    expect(board.placeStone(size, 0, CellState.BLACK)).toBe(false);
    expect(board.placeStone(0, size, CellState.BLACK)).toBe(false);
  });
  
  test('isValidPosition should check if position is within board boundaries', () => {
    const size = board.getSize();
    
    expect(board.isValidPosition(0, 0)).toBe(true);
    expect(board.isValidPosition(size - 1, size - 1)).toBe(true);
    expect(board.isValidPosition(Math.floor(size / 2), Math.floor(size / 2))).toBe(true);
    
    expect(board.isValidPosition(-1, 0)).toBe(false);
    expect(board.isValidPosition(0, -1)).toBe(false);
    expect(board.isValidPosition(size, 0)).toBe(false);
    expect(board.isValidPosition(0, size)).toBe(false);
  });
  
  test('reset should clear the board', () => {
    board.placeStone(3, 3, CellState.BLACK);
    board.placeStone(3, 4, CellState.WHITE);
    board.placeStone(4, 3, CellState.BLACK);
    
    board.reset();
    
    const size = board.getSize();
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        expect(board.getCell(x, y)).toBe(CellState.EMPTY);
      }
    }
  });
  
  test('isFull should check if board is completely filled', () => {
    expect(board.isFull()).toBe(false);
    
    // Small board for easier testing
    const smallBoard = new Board(3);
    expect(smallBoard.isFull()).toBe(false);
    
    // Fill the board
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        smallBoard.placeStone(x, y, CellState.BLACK);
      }
    }
    
    expect(smallBoard.isFull()).toBe(true);
    
    // Reset one cell
    smallBoard.reset();
    smallBoard.placeStone(0, 0, CellState.BLACK);
    expect(smallBoard.isFull()).toBe(false);
  });
});
