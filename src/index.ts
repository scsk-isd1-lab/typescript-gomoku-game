import { GameController } from './controllers/game-controller';
import { GameBoard } from './components/game-board';
import { GameStatus } from './components/game-status';
import { ResetButton } from './components/reset-button';

/**
 * ゲームの初期化とコンポーネント接続を行う
 */
document.addEventListener('DOMContentLoaded', () => {
  const canvasElement = document.getElementById('gameBoard') as HTMLCanvasElement;
  const statusElement = document.getElementById('gameStatus') as HTMLDivElement;
  const resetButtonElement = document.getElementById('resetButton') as HTMLButtonElement;
  
  if (!canvasElement || !statusElement || !resetButtonElement) {
    console.error('必要なDOM要素が見つかりません');
    return;
  }
  
  // コンポーネント初期化
  const gameController = new GameController();
  const gameBoard = new GameBoard(canvasElement, gameController);
  const gameStatus = new GameStatus(statusElement, gameController);
  const resetButton = new ResetButton(resetButtonElement, gameController);
  
  // コンポーネント接続
  gameController.initialize();
  gameBoard.initialize();
  gameStatus.initialize();
  resetButton.initialize();
  
  // キーボード操作の設定
  document.addEventListener('keydown', (event) => {
    // キーボード操作の実装（アクセシビリティ対応）
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Enter':
        gameBoard.handleKeyboardNavigation(event.key);
        break;
    }
  });

  // ウィンドウリサイズ時にキャンバスを再描画
  window.addEventListener('resize', () => {
    gameBoard.resizeBoard();
  });

  console.info('ゲームが初期化されました');
});
