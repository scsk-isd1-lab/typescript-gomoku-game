import { GameController } from '../../controllers/game-controller';
import { CellState } from '../../models/board';
import { GameStatus } from '../../models/game-state';

describe('GameController', () => {
  let controller: GameController;
  
  beforeEach(() => {
    controller = new GameController();
  });
  
  test('should initialize with empty board and black player', () => {
    const board = controller.getBoard();
    const gameState = controller.getGameState();
    
    expect(board.getSize()).toBe(19);
    expect(gameState.getCurrentPlayer()).toBe(CellState.BLACK);
    expect(gameState.getStatus()).toBe(GameStatus.IN_PROGRESS);
    expect(gameState.getMoveHistory().length).toBe(0);
  });
  
  test('placeStone should place stone and switch player', () => {
    expect(controller.placeStone(3, 3)).toBe(true);
    
    const board = controller.getBoard();
    const gameState = controller.getGameState();
    
    expect(board.getCell(3, 3)).toBe(CellState.BLACK);
    expect(gameState.getCurrentPlayer()).toBe(CellState.WHITE); // switched to white
    expect(gameState.getMoveHistory().length).toBe(1);
  });
  
  test('placeStone should reject invalid moves', () => {
    // Place on valid position
    controller.placeStone(3, 3);
    
    // Try to place on occupied position
    expect(controller.placeStone(3, 3)).toBe(false);
    
    // Try to place outside board
    expect(controller.placeStone(-1, 0)).toBe(false);
  });
  
  test('resetGame should reset board and game state', () => {
    controller.placeStone(3, 3);
    controller.placeStone(3, 4);
    
    controller.resetGame();
    
    const board = controller.getBoard();
    const gameState = controller.getGameState();
    
    expect(board.getCell(3, 3)).toBe(CellState.EMPTY);
    expect(board.getCell(3, 4)).toBe(CellState.EMPTY);
    expect(gameState.getCurrentPlayer()).toBe(CellState.BLACK);
    expect(gameState.getStatus()).toBe(GameStatus.IN_PROGRESS);
    expect(gameState.getMoveHistory().length).toBe(0);
  });
  
  test('notifyListeners should call registered listeners', () => {
    const mockListener1 = jest.fn();
    const mockListener2 = jest.fn();
    
    controller.addStateChangeListener(mockListener1);
    controller.addStateChangeListener(mockListener2);
    
    controller.placeStone(3, 3);
    
    expect(mockListener1).toHaveBeenCalledTimes(1);
    expect(mockListener2).toHaveBeenCalledTimes(1);
    
    controller.resetGame();
    
    expect(mockListener1).toHaveBeenCalledTimes(2);
    expect(mockListener2).toHaveBeenCalledTimes(2);
  });
  
  // The following tests simulate game scenarios
  
  test('should detect horizontal win condition', () => {
    // Black places 5 stones in a row horizontally
    controller.placeStone(0, 0); // Black
    controller.placeStone(0, 1); // White
    controller.placeStone(1, 0); // Black
    controller.placeStone(0, 2); // White
    controller.placeStone(2, 0); // Black
    controller.placeStone(0, 3); // White
    controller.placeStone(3, 0); // Black
    controller.placeStone(0, 4); // White
    controller.placeStone(4, 0); // Black - this makes 5 in a row
    
    expect(controller.getGameState().getStatus()).toBe(GameStatus.BLACK_WIN);
    
    // Check that we can't place more stones after game over
    expect(controller.placeStone(5, 0)).toBe(false);
  });
  
  test('should detect vertical win condition', () => {
    // White places 5 stones in a row vertically
    controller.placeStone(0, 0); // Black
    controller.placeStone(1, 0); // White
    controller.placeStone(0, 1); // Black
    controller.placeStone(1, 1); // White
    controller.placeStone(0, 2); // Black
    controller.placeStone(1, 2); // White
    controller.placeStone(0, 3); // Black
    controller.placeStone(1, 3); // White
    controller.placeStone(2, 0); // Black
    controller.placeStone(1, 4); // White - this makes 5 in a row
    
    expect(controller.getGameState().getStatus()).toBe(GameStatus.WHITE_WIN);
  });
  
  test('should detect draw condition', () => {
    // Create a small board for easier testing
    const smallController = new GameController();
    
    // Mock the board to be full without a winner
    jest.spyOn(smallController.getBoard(), 'isFull').mockReturnValue(true);
    
    // Place a stone to trigger win/draw check
    smallController.placeStone(0, 0);
    
    expect(smallController.getGameState().getStatus()).toBe(GameStatus.DRAW);
  });
});
