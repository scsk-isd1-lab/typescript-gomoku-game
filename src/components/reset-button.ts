import { GameController } from '../controllers/game-controller';

/**
 * リセットボタンクラス
 */
export class ResetButton {
  private element: HTMLButtonElement;
  private controller: GameController;

  /**
   * コンストラクタ
   * @param element ボタン要素
   * @param controller ゲームコントローラー
   */
  constructor(element: HTMLButtonElement, controller: GameController) {
    this.element = element;
    this.controller = controller;
  }

  /**
   * リセットボタンの初期化
   */
  public initialize(): void {
    this.element.addEventListener('click', () => {
      this.controller.resetGame();
    });
  }
}
