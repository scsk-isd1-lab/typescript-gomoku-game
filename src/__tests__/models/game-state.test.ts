import { GameState, GameStatus } from '../../models/game-state';
import { CellState } from '../../models/board';

describe('GameState', () => {
  let gameState: GameState;
  
  beforeEach(() => {
    gameState = new GameState();
  });
  
  test('should start with black player', () => {
    expect(gameState.getCurrentPlayer()).toBe(CellState.BLACK);
  });
  
  test('should start with IN_PROGRESS status', () => {
    expect(gameState.getStatus()).toBe(GameStatus.IN_PROGRESS);
    expect(gameState.isInProgress()).toBe(true);
  });
  
  test('should start with empty move history', () => {
    expect(gameState.getMoveHistory().length).toBe(0);
  });
  
  test('switchPlayer should alternate between black and white', () => {
    expect(gameState.getCurrentPlayer()).toBe(CellState.BLACK);
    
    gameState.switchPlayer();
    expect(gameState.getCurrentPlayer()).toBe(CellState.WHITE);
    
    gameState.switchPlayer();
    expect(gameState.getCurrentPlayer()).toBe(CellState.BLACK);
  });
  
  test('recordMove should add move to history', () => {
    gameState.recordMove(3, 3, CellState.BLACK);
    
    const history = gameState.getMoveHistory();
    expect(history.length).toBe(1);
    expect(history[0]).toEqual({ x: 3, y: 3, player: CellState.BLACK });
    
    gameState.recordMove(3, 4, CellState.WHITE);
    const updatedHistory = gameState.getMoveHistory();
    expect(updatedHistory.length).toBe(2);
    expect(updatedHistory[1]).toEqual({ x: 3, y: 4, player: CellState.WHITE });
  });
  
  test('setStatus should update game status', () => {
    expect(gameState.getStatus()).toBe(GameStatus.IN_PROGRESS);
    
    gameState.setStatus(GameStatus.BLACK_WIN);
    expect(gameState.getStatus()).toBe(GameStatus.BLACK_WIN);
    expect(gameState.isInProgress()).toBe(false);
    expect(gameState.isWin()).toBe(true);
    
    gameState.setStatus(GameStatus.WHITE_WIN);
    expect(gameState.getStatus()).toBe(GameStatus.WHITE_WIN);
    expect(gameState.isInProgress()).toBe(false);
    expect(gameState.isWin()).toBe(true);
    
    gameState.setStatus(GameStatus.DRAW);
    expect(gameState.getStatus()).toBe(GameStatus.DRAW);
    expect(gameState.isInProgress()).toBe(false);
    expect(gameState.isWin()).toBe(false);
  });
  
  test('reset should restore initial state', () => {
    gameState.switchPlayer();
    gameState.recordMove(3, 3, CellState.BLACK);
    gameState.setStatus(GameStatus.BLACK_WIN);
    
    gameState.reset();
    
    expect(gameState.getCurrentPlayer()).toBe(CellState.BLACK);
    expect(gameState.getStatus()).toBe(GameStatus.IN_PROGRESS);
    expect(gameState.getMoveHistory().length).toBe(0);
  });
});
