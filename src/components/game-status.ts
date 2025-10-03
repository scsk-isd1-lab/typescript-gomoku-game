import { GameController } from '../controllers/game-controller';
import { CellState } from '../models/board';
import { GameStatus } from '../models/game-state';

/**
 * ゲームステータス表示用クラス
 */
export class GameStatus {
  private element: HTMLElement;
  private controller: GameController;

  /**
   * コンストラクタ
   * @param element ステータス表示用HTML要素
   * @param controller ゲームコントローラー
   */
  constructor(element: HTMLElement, controller: GameController) {
    this.element = element;
    this.controller = controller;
  }

  /**
   * ステータス表示の初期化
   */
  public initialize(): void {
    this.controller.addStateChangeListener(() => this.updateStatus());
    this.updateStatus();
  }

  /**
   * ステータス表示を更新
   */
  private updateStatus(): void {
    const gameState = this.controller.getGameState();
    const status = gameState.getStatus();
    
    let statusText = '';
    
    switch (status) {
      case GameStatus.IN_PROGRESS:
        const currentPlayer = gameState.getCurrentPlayer() === CellState.BLACK ? '黒' : '白';
        statusText = `${currentPlayer}の番です`;
        break;
      case GameStatus.BLACK_WIN:
        statusText = '黒の勝ちです！';
        break;
      case GameStatus.WHITE_WIN:
        statusText = '白の勝ちです！';
        break;
      case GameStatus.DRAW:
        statusText = '引き分けです';
        break;
    }
    
    this.element.textContent = statusText;
    
    // ARIA属性を更新してスクリーンリーダーに状態変化を伝える
    this.element.setAttribute('aria-live', 'assertive');
  }
}
