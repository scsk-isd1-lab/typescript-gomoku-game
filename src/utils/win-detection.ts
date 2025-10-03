import { Board, CellState } from '../models/board';

/**
 * 勝利判定を行うユーティリティクラス
 */
export class WinDetection {
  private static readonly WIN_COUNT = 5; // 勝利条件の連続数

  /**
   * 指定された位置に石を置いた後、勝利条件を満たすか判定する
   * @param board ゲームボード
   * @param x X座標
   * @param y Y座標
   * @param playerState プレイヤーの石の状態
   * @returns 勝利判定結果
   */
  public static checkWin(board: Board, x: number, y: number, playerState: CellState): boolean {
    // 石が置かれていない場合は勝利条件を満たさない
    if (board.getCell(x, y) !== playerState) {
      return false;
    }

    // 水平方向の判定
    if (this.checkDirection(board, x, y, playerState, 1, 0)) {
      return true;
    }

    // 垂直方向の判定
    if (this.checkDirection(board, x, y, playerState, 0, 1)) {
      return true;
    }

    // 右上がり斜め方向の判定
    if (this.checkDirection(board, x, y, playerState, 1, 1)) {
      return true;
    }

    // 右下がり斜め方向の判定
    if (this.checkDirection(board, x, y, playerState, 1, -1)) {
      return true;
    }

    return false;
  }

  /**
   * 特定の方向に石が連続しているかを判定
   * @param board ゲームボード
   * @param x 開始X座標
   * @param y 開始Y座標
   * @param playerState プレイヤーの石の状態
   * @param dx X方向の増分
   * @param dy Y方向の増分
   * @returns 勝利条件を満たすかどうか
   */
  private static checkDirection(
    board: Board,
    x: number,
    y: number,
    playerState: CellState,
    dx: number,
    dy: number
  ): boolean {
    // 左方向と右方向の石の数をカウント
    const count =
      1 +
      this.countStones(board, x, y, playerState, dx, dy) +
      this.countStones(board, x, y, playerState, -dx, -dy);

    return count >= this.WIN_COUNT;
  }

  /**
   * 特定の方向に同じ石が何個連続しているかを数える
   * @param board ゲームボード
   * @param x 開始X座標
   * @param y 開始Y座標
   * @param playerState プレイヤーの石の状態
   * @param dx X方向の増分
   * @param dy Y方向の増分
   * @returns 連続する石の数
   */
  private static countStones(
    board: Board,
    x: number,
    y: number,
    playerState: CellState,
    dx: number,
    dy: number
  ): number {
    let count = 0;
    let currentX = x + dx;
    let currentY = y + dy;

    while (
      board.isValidPosition(currentX, currentY) &&
      board.getCell(currentX, currentY) === playerState
    ) {
      count++;
      currentX += dx;
      currentY += dy;
    }

    return count;
  }
}
