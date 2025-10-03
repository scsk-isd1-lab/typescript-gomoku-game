import { WinDetection } from '../../utils/win-detection';
import { Board, CellState } from '../../models/board';

describe('WinDetection', () => {
  let board: Board;
  
  beforeEach(() => {
    board = new Board();
  });
  
  test('should detect horizontal win', () => {
    // Place 5 black stones in a row horizontally
    board.placeStone(3, 3, CellState.BLACK);
    board.placeStone(4, 3, CellState.BLACK);
    board.placeStone(5, 3, CellState.BLACK);
    board.placeStone(6, 3, CellState.BLACK);
    board.placeStone(7, 3, CellState.BLACK);
    
    expect(WinDetection.checkWin(board, 5, 3, CellState.BLACK)).toBe(true);
    expect(WinDetection.checkWin(board, 3, 3, CellState.BLACK)).toBe(true);
    expect(WinDetection.checkWin(board, 7, 3, CellState.BLACK)).toBe(true);
    
    // Check non-winning position
    expect(WinDetection.checkWin(board, 8, 3, CellState.BLACK)).toBe(false);
  });
  
  test('should detect vertical win', () => {
    // Place 5 black stones in a row vertically
    board.placeStone(3, 3, CellState.BLACK);
    board.placeStone(3, 4, CellState.BLACK);
    board.placeStone(3, 5, CellState.BLACK);
    board.placeStone(3, 6, CellState.BLACK);
    board.placeStone(3, 7, CellState.BLACK);
    
    expect(WinDetection.checkWin(board, 3, 5, CellState.BLACK)).toBe(true);
    expect(WinDetection.checkWin(board, 3, 3, CellState.BLACK)).toBe(true);
    expect(WinDetection.checkWin(board, 3, 7, CellState.BLACK)).toBe(true);
    
    // Check non-winning position
    expect(WinDetection.checkWin(board, 3, 8, CellState.BLACK)).toBe(false);
  });
  
  test('should detect diagonal win (top-left to bottom-right)', () => {
    // Place 5 black stones in a diagonal
    board.placeStone(3, 3, CellState.BLACK);
    board.placeStone(4, 4, CellState.BLACK);
    board.placeStone(5, 5, CellState.BLACK);
    board.placeStone(6, 6, CellState.BLACK);
    board.placeStone(7, 7, CellState.BLACK);
    
    expect(WinDetection.checkWin(board, 5, 5, CellState.BLACK)).toBe(true);
    expect(WinDetection.checkWin(board, 3, 3, CellState.BLACK)).toBe(true);
    expect(WinDetection.checkWin(board, 7, 7, CellState.BLACK)).toBe(true);
    
    // Check non-winning position
    expect(WinDetection.checkWin(board, 8, 8, CellState.BLACK)).toBe(false);
  });
  
  test('should detect diagonal win (top-right to bottom-left)', () => {
    // Place 5 black stones in a diagonal
    board.placeStone(7, 3, CellState.BLACK);
    board.placeStone(6, 4, CellState.BLACK);
    board.placeStone(5, 5, CellState.BLACK);
    board.placeStone(4, 6, CellState.BLACK);
    board.placeStone(3, 7, CellState.BLACK);
    
    expect(WinDetection.checkWin(board, 5, 5, CellState.BLACK)).toBe(true);
    expect(WinDetection.checkWin(board, 7, 3, CellState.BLACK)).toBe(true);
    expect(WinDetection.checkWin(board, 3, 7, CellState.BLACK)).toBe(true);
    
    // Check non-winning position
    expect(WinDetection.checkWin(board, 2, 8, CellState.BLACK)).toBe(false);
  });
  
  test('should not detect win for wrong player', () => {
    // Place 5 black stones in a row
    board.placeStone(3, 3, CellState.BLACK);
    board.placeStone(4, 3, CellState.BLACK);
    board.placeStone(5, 3, CellState.BLACK);
    board.placeStone(6, 3, CellState.BLACK);
    board.placeStone(7, 3, CellState.BLACK);
    
    expect(WinDetection.checkWin(board, 5, 3, CellState.WHITE)).toBe(false);
  });
  
  test('should not detect win for less than 5 stones', () => {
    // Place 4 black stones in a row
    board.placeStone(3, 3, CellState.BLACK);
    board.placeStone(4, 3, CellState.BLACK);
    board.placeStone(5, 3, CellState.BLACK);
    board.placeStone(6, 3, CellState.BLACK);
    
    expect(WinDetection.checkWin(board, 5, 3, CellState.BLACK)).toBe(false);
  });
  
  test('should not detect win when stones are not continuous', () => {
    // Place 5 black stones with a gap
    board.placeStone(3, 3, CellState.BLACK);
    board.placeStone(4, 3, CellState.BLACK);
    board.placeStone(5, 3, CellState.EMPTY); // Gap
    board.placeStone(6, 3, CellState.BLACK);
    board.placeStone(7, 3, CellState.BLACK);
    board.placeStone(8, 3, CellState.BLACK);
    
    expect(WinDetection.checkWin(board, 4, 3, CellState.BLACK)).toBe(false);
    expect(WinDetection.checkWin(board, 7, 3, CellState.BLACK)).toBe(false);
  });
});
