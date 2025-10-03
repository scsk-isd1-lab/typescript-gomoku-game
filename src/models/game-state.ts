import { CellState, Position } from './board';

/**
 * ゲームの状態を表す列挙型
 */
export enum GameStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  BLACK_WIN = 'BLACK_WIN',
  WHITE_WIN = 'WHITE_WIN',
  DRAW = 'DRAW',
}

/**
 * 着手の記録を表すインターフェース
 */
export interface Move {
  x: number;
  y: number;
  player: CellState;
}

/**
 * ゲームの状態を管理するクラス
 */
export class GameState {
  private currentPlayer: CellState;
  private status: GameStatus;
  private moveHistory: Move[];

  /**
   * コンストラクタ
   */
  constructor() {
    this.currentPlayer = CellState.BLACK; // 黒が先手
    this.status = GameStatus.IN_PROGRESS;
    this.moveHistory = [];
  }

  /**
   * 現在のプレイヤーを取得
   * @returns 現在のプレイヤー
   */
  public getCurrentPlayer(): CellState {
    return this.currentPlayer;
  }

  /**
   * 現在のゲーム状態を取得
   * @returns 現在のゲーム状態
   */
  public getStatus(): GameStatus {
    return this.status;
  }

  /**
   * 着手履歴を取得
   * @returns 着手履歴
   */
  public getMoveHistory(): Move[] {
    return [...this.moveHistory];
  }

  /**
   * プレイヤーのターンを交代する
   */
  public switchPlayer(): void {
    this.currentPlayer =
      this.currentPlayer === CellState.BLACK ? CellState.WHITE : CellState.BLACK;
  }

  /**
   * 着手を記録する
   * @param x X座標
   * @param y Y座標
   * @param player プレイヤー
   */
  public recordMove(x: number, y: number, player: CellState): void {
    this.moveHistory.push({ x, y, player });
  }

  /**
   * ゲームの状態を更新する
   * @param status 新しい状態
   */
  public setStatus(status: GameStatus): void {
    this.status = status;
  }

  /**
   * ゲームがまだ進行中かどうか
   * @returns 進行中かどうか
   */
  public isInProgress(): boolean {
    return this.status === GameStatus.IN_PROGRESS;
  }

  /**
   * ゲームがプレイヤーの勝利で終了したかどうか
   * @returns 勝利で終了したかどうか
   */
  public isWin(): boolean {
    return this.status === GameStatus.BLACK_WIN || this.status === GameStatus.WHITE_WIN;
  }

  /**
   * ゲームを初期状態にリセット
   */
  public reset(): void {
    this.currentPlayer = CellState.BLACK;
    this.status = GameStatus.IN_PROGRESS;
    this.moveHistory = [];
  }
}
