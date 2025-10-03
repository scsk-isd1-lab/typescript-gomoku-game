import { GameController } from '../controllers/game-controller';
import { CellState, Position } from '../models/board';

/**
 * ゲームボード表示用クラス
 * HTML5 Canvasを使用してゲームボードを描画する
 */
export class GameBoard {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private controller: GameController;
  private cellSize: number;
  private boardMargin: number;
  private focusPosition: Position | null;

  /**
   * コンストラクタ
   * @param canvas キャンバス要素
   * @param controller ゲームコントローラー
   */
  constructor(canvas: HTMLCanvasElement, controller: GameController) {
    this.canvas = canvas;
    this.controller = controller;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas 2D context could not be created.');
    }
    this.context = ctx;
    
    const boardSize = this.controller.getBoard().getSize();
    this.boardMargin = 20; // ボード周囲のマージン
    this.cellSize = (Math.min(canvas.width, canvas.height) - this.boardMargin * 2) / (boardSize - 1);
    this.focusPosition = null;
  }

  /**
   * ゲームボードの初期化
   */
  public initialize(): void {
    this.controller.addStateChangeListener(() => this.render());
    this.setupEventListeners();
    this.resizeBoard();
    this.render();
  }

  /**
   * キャンバスサイズを調整し再描画
   */
  public resizeBoard(): void {
    const parentWidth = this.canvas.parentElement?.clientWidth || window.innerWidth;
    const maxSize = Math.min(parentWidth - 40, window.innerHeight - 200);
    
    // キャンバスサイズ調整（最大570px、最小300px）
    const size = Math.max(Math.min(maxSize, 570), 300);
    
    this.canvas.width = size;
    this.canvas.height = size;
    
    const boardSize = this.controller.getBoard().getSize();
    this.cellSize = (size - this.boardMargin * 2) / (boardSize - 1);
    
    this.render();
  }

  /**
   * イベントリスナーの設定
   */
  private setupEventListeners(): void {
    // マウスクリックイベント
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const boardPos = this.pixelToBoardPosition(x, y);
      if (boardPos) {
        this.controller.placeStone(boardPos.x, boardPos.y);
      }
    });

    // マウス移動イベント（ホバー効果用）
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const boardPos = this.pixelToBoardPosition(x, y);
      if (boardPos && this.controller.getGameState().isInProgress()) {
        this.focusPosition = boardPos;
        this.render();
      }
    });

    // マウスが離れた時の処理
    this.canvas.addEventListener('mouseleave', () => {
      this.focusPosition = null;
      this.render();
    });
  }

  /**
   * キーボードによるナビゲーション処理
   * @param key 押されたキー
   */
  public handleKeyboardNavigation(key: string): void {
    if (!this.controller.getGameState().isInProgress()) {
      return;
    }

    const boardSize = this.controller.getBoard().getSize();
    
    if (!this.focusPosition) {
      // フォーカスがない場合は中央にフォーカス
      this.focusPosition = { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) };
      this.render();
      return;
    }

    const { x, y } = this.focusPosition;
    
    switch (key) {
      case 'ArrowUp':
        if (y > 0) this.focusPosition = { x, y: y - 1 };
        break;
      case 'ArrowDown':
        if (y < boardSize - 1) this.focusPosition = { x, y: y + 1 };
        break;
      case 'ArrowLeft':
        if (x > 0) this.focusPosition = { x: x - 1, y };
        break;
      case 'ArrowRight':
        if (x < boardSize - 1) this.focusPosition = { x: x + 1, y };
        break;
      case 'Enter':
        if (this.controller.getBoard().isEmpty(x, y)) {
          this.controller.placeStone(x, y);
        }
        break;
    }

    this.render();
  }

  /**
   * ピクセル座標をボード上の座標に変換
   * @param pixelX ピクセルX座標
   * @param pixelY ピクセルY座標
   * @returns ボード上の座標、または範囲外ならnull
   */
  private pixelToBoardPosition(pixelX: number, pixelY: number): Position | null {
    const boardSize = this.controller.getBoard().getSize();
    
    // ボード上の座標に変換
    const boardX = Math.round((pixelX - this.boardMargin) / this.cellSize);
    const boardY = Math.round((pixelY - this.boardMargin) / this.cellSize);
    
    // 範囲内かチェック
    if (boardX >= 0 && boardX < boardSize && boardY >= 0 && boardY < boardSize) {
      return { x: boardX, y: boardY };
    }
    
    return null;
  }

  /**
   * ボードの描画
   */
  private render(): void {
    const ctx = this.context;
    const board = this.controller.getBoard();
    const boardSize = board.getSize();
    
    // キャンバスをクリア
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // ボードの背景
    ctx.fillStyle = '#e9bc62'; // 碁盤の色
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 格子線を描画
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < boardSize; i++) {
      const pos = this.boardMargin + i * this.cellSize;
      
      // 横線
      ctx.beginPath();
      ctx.moveTo(this.boardMargin, pos);
      ctx.lineTo(this.canvas.width - this.boardMargin, pos);
      ctx.stroke();
      
      // 縦線
      ctx.beginPath();
      ctx.moveTo(pos, this.boardMargin);
      ctx.lineTo(pos, this.canvas.height - this.boardMargin);
      ctx.stroke();
    }
    
    // 星の描画（定位置に点を打つ）
    const starPoints = this.getStarPoints(boardSize);
    ctx.fillStyle = '#000';
    
    for (const point of starPoints) {
      const x = this.boardMargin + point.x * this.cellSize;
      const y = this.boardMargin + point.y * this.cellSize;
      
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // 石の描画
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        const cell = board.getCell(x, y);
        
        if (cell !== CellState.EMPTY) {
          this.drawStone(x, y, cell);
        }
      }
    }
    
    // フォーカス位置のハイライト表示
    if (
      this.focusPosition &&
      board.isEmpty(this.focusPosition.x, this.focusPosition.y) &&
      this.controller.getGameState().isInProgress()
    ) {
      const currentPlayer = this.controller.getGameState().getCurrentPlayer();
      this.drawStoneHighlight(this.focusPosition.x, this.focusPosition.y, currentPlayer);
    }
  }

  /**
   * 石を描画
   * @param boardX ボードX座標
   * @param boardY ボードY座標
   * @param cellState 石の種類
   */
  private drawStone(boardX: number, boardY: number, cellState: CellState): void {
    const x = this.boardMargin + boardX * this.cellSize;
    const y = this.boardMargin + boardY * this.cellSize;
    const radius = this.cellSize * 0.45; // 石のサイズ
    
    const ctx = this.context;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    
    if (cellState === CellState.BLACK) {
      // 黒石
      ctx.fillStyle = '#000';
      ctx.fill();
    } else {
      // 白石
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  /**
   * 石のハイライト表示（半透明）
   * @param boardX ボードX座標
   * @param boardY ボードY座標
   * @param cellState 石の種類
   */
  private drawStoneHighlight(boardX: number, boardY: number, cellState: CellState): void {
    const x = this.boardMargin + boardX * this.cellSize;
    const y = this.boardMargin + boardY * this.cellSize;
    const radius = this.cellSize * 0.45; // 石のサイズ
    
    const ctx = this.context;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    
    if (cellState === CellState.BLACK) {
      // 黒石（半透明）
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fill();
    } else {
      // 白石（半透明）
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  /**
   * 星の位置（定位置）を取得
   * @param boardSize ボードサイズ
   * @returns 星の位置一覧
   */
  private getStarPoints(boardSize: number): Position[] {
    if (boardSize !== 19) {
      return [];
    }
    
    // 19路盤の星の位置（定位置）
    return [
      { x: 3, y: 3 },
      { x: 3, y: 9 },
      { x: 3, y: 15 },
      { x: 9, y: 3 },
      { x: 9, y: 9 },
      { x: 9, y: 15 },
      { x: 15, y: 3 },
      { x: 15, y: 9 },
      { x: 15, y: 15 },
    ];
  }
}
