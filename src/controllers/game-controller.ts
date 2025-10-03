import { Board, CellState } from '../models/board';
import { GameState, GameStatus } from '../models/game-state';
import { WinDetection } from '../utils/win-detection';

/**
 * ゲームコントローラークラス
 * ゲームの進行やルール適用を管理する
 */
export class GameController {
  private board: Board;
  private gameState: GameState;
  private listeners: (() => void)[];

  /**
   * コンストラクタ
   */
  constructor() {
    this.board = new Board();
    this.gameState = new GameState();
    this.listeners = [];
  }

  /**
   * ゲームを初期化する
   */
  public initialize(): void {
    this.board.reset();
    this.gameState.reset();
    this.notifyListeners();
  }

  /**
   * 指定された位置に石を置く
   * @param x X座標
   * @param y Y座標
   * @returns 石を置くことができたかどうか
   */
  public placeStone(x: number, y: number): boolean {
    // ゲームが終了している場合は何もしない
    if (!this.gameState.isInProgress()) {
      return false;
    }

    const currentPlayer = this.gameState.getCurrentPlayer();

    // 石を置く
    if (!this.board.placeStone(x, y, currentPlayer)) {
      return false;
    }

    // 着手を記録
    this.gameState.recordMove(x, y, currentPlayer);

    // 勝敗を判定
    if (WinDetection.checkWin(this.board, x, y, currentPlayer)) {
      this.gameState.setStatus(
        currentPlayer === CellState.BLACK ? GameStatus.BLACK_WIN : GameStatus.WHITE_WIN
      );
    } else if (this.board.isFull()) {
      // 引き分け判定
      this.gameState.setStatus(GameStatus.DRAW);
    } else {
      // 次のプレイヤーに交代
      this.gameState.switchPlayer();
    }

    this.notifyListeners();
    return true;
  }

  /**
   * ゲームをリセットする
   */
  public resetGame(): void {
    this.initialize();
  }

  /**
   * ゲーム状態の変更リスナーを登録する
   * @param listener 状態変更時に呼び出されるコールバック関数
   */
  public addStateChangeListener(listener: () => void): void {
    this.listeners.push(listener);
  }

  /**
   * 全てのリスナーに状態変更を通知する
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  /**
   * 現在のボードを取得する
   * @returns ゲームボード
   */
  public getBoard(): Board {
    return this.board;
  }

  /**
   * 現在のゲーム状態を取得する
   * @returns ゲーム状態
   */
  public getGameState(): GameState {
    return this.gameState;
  }
}
