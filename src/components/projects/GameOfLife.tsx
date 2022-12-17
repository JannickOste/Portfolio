    import React, { RefObject } from "react";

    enum GameOfLifeCellType {
        None = 0,
        Alive = 1
    }

    type GameOfLifeProps = {

    }
    type GameOfLifeState = {
        cells:GameOfLifeCellType[][]
    }

    export default class GameOfLife extends React.Component<GameOfLifeProps, GameOfLifeState>
    {
        private cellSize = 10;
        state: GameOfLifeState = {
            cells:[...Array(Math.ceil(window.innerHeight/this.cellSize))].map(
                (row, rowIndex) => [...Array(Math.ceil(window.innerWidth/this.cellSize))].map((column, columnIndex) => {
                    return Math.random()*10 < 2 ? GameOfLifeCellType.Alive : GameOfLifeCellType.None
                })
            )
        }

        private readonly msPerTick = 1000/120;
        private readonly ticksRequired = 15;
        private currentTick = 0;

        private readonly canvas:RefObject<HTMLCanvasElement>;
        private updateThreadHandle: NodeJS.Timer|undefined;

        constructor(props: GameOfLifeProps)
        {
            super(props);

            this.canvas = React.createRef();
        }

        componentDidMount = (): void => {
            this.updateThreadHandle = setInterval(this.update, this.msPerTick);
        }

        componentWillUnmount = (): void => clearInterval(this.updateThreadHandle)

        private update = ():void => 
        {
            this.onCanvasUpdate();
            if(++this.currentTick >= this.ticksRequired)
            {
                this.tick();
                this.currentTick -= this.ticksRequired;
            }
        }

        private onCanvasUpdate = ():void => {
            let canvas;
            if((canvas = this.canvas.current)) 
            {
                
                const {width, height} = canvas.getBoundingClientRect();
                canvas.width = width;
                canvas.height = height;
                let drawingContext: CanvasRenderingContext2D | null;
                if((drawingContext = canvas.getContext("2d"))) 
                {
                    this.state.cells.forEach((row, rowIndex) => {
                        row.forEach((column, columnIndex) => {
                            if(drawingContext)
                            {

                                switch(column)
                                {
                                    case GameOfLifeCellType.None:
                                        drawingContext.fillStyle = "white";
                                        break;

                                    case GameOfLifeCellType.Alive:
                                        drawingContext.fillStyle = "black";
                                        break;
                                }

                                drawingContext.fillRect(columnIndex*this.cellSize, rowIndex*this.cellSize, this.cellSize, this.cellSize);
                            }
                        })
                    })
                }
            }
        }

        private tick = () => {
            const numRows = this.state.cells.length;
            const numCols = this.state.cells[0].length;
        
            const newCells: GameOfLifeCellType[][] = [];
            for (let row = 0; row < numRows; row++) {
            newCells[row] = [];
            for (let col = 0; col < numCols; col++) {
                let numNeighbors = 0;
                for (let dRow = -1; dRow <= 1; dRow++) {
                for (let dCol = -1; dCol <= 1; dCol++) {
                    if (dRow === 0 && dCol === 0) {
                    continue;
                    }
                    const neighborRow = row + dRow;
                    const neighborCol = col + dCol;
                    if (neighborRow >= 0 && neighborRow < numRows && neighborCol >= 0 && neighborCol < numCols) {
                    if (this.state.cells[neighborRow][neighborCol] === GameOfLifeCellType.Alive) {
                        numNeighbors++;
                    }
                    }
                }
                }
                if (this.state.cells[row][col] === GameOfLifeCellType.Alive) {
                if (numNeighbors === 2 || numNeighbors === 3) {
                    newCells[row][col] = GameOfLifeCellType.Alive;
                } else {
                    newCells[row][col] = GameOfLifeCellType.None;
                }
                } else {
                if (numNeighbors === 3) {
                    newCells[row][col] = GameOfLifeCellType.Alive;
                } else {
                    newCells[row][col] = GameOfLifeCellType.None;
                }
                }
            }
            }
        
            this.setState({ ...this.state, cells: newCells });
        }

        
        public render = ():React.ReactNode =>   (<canvas ref={this.canvas} className="w-100" />)
    }