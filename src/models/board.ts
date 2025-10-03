/**
 * 盤面上の石の状態を表す列挙型
 */
export enum CellState {
  EMPTY = 0,
  BLACK = 1,
  WHITE = 2,
}

/**
 * 盤面の座標を表すインターフェース
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * 盤面を表すクラス
 */
export class Board {
  private readonly grid: CellState[][];
  private readonly size: number;

  /**
   * コンストラクタ
   * @param size 盤面のサイズ（デフォルトは19x19）
   */
  constructor(size = 19) {
    this.size = size;
    this.grid = Array(size)
      .fill(null)
      .map(() => Array(size).fill(CellState.EMPTY));
  }

  /**
   * 盤面のサイズを取得
   * @returns 盤面のサイズ
   */
  public getSize(): number {
    return this.size;
  }

  /**
   * 指定された位置に石を置く
   * @param x X座標
   * @param y Y座標
   * @param state 置く石の種類
   * @returns 置くことができたかどうか
   */
  public placeStone(x: number, y: number, state: CellState): boolean {
    if (!this.isValidPosition(x, y) || !this.isEmpty(x, y)) {
      return false;
    }

    this.grid[y][x] = state;
    return true;
  }

  /**
   * 指定された位置のセル状態を取得
   * @param x X座標
   * @param y Y座標
   * @returns セル状態
   */
  public getCell(x: number, y: number): CellState {
    if (!this.isValidPosition(x, y)) {
      return CellState.EMPTY;
    }
    return this.grid[y][x];
  }

  /**
   * 指定された位置が空いているかどうか
   * @param x X座標
   * @param y Y座標
   * @returns 空いているかどうか
   */
  public isEmpty(x: number, y: number): boolean {
    return this.getCell(x, y) === CellState.EMPTY;
  }

  /**
   * 指定された位置が有効な範囲内かどうか
   * @param x X座標
   * @param y Y座標
   * @returns 有効な位置かどうか
   */
  public isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
  }

  /**
   * 盤面をリセットして全てのセルを空にする
   */
  public reset(): void {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        this.grid[y][x] = CellState.EMPTY;
      }
    }
  }

  /**
   * 盤面が全て埋まっているかどうかを確認
   * @returns 全て埋まっているかどうか
   */
  public isFull(): boolean {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.isEmpty(x, y)) {
          return false;
        }
      }
    }
    return true;
  }
}
