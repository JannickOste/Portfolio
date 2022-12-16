import React, { RefObject } from "react";

type SnakeGameKeybindings = {
    up:string;
    down:string;
    left:string;
    right:string;
}

type SnakeGameFood = {
    position:[number, number];
    ticksLeft:number;
}

//#region Main Menu
type SnakeGameMainUIProps = {
    setKeybinds: (keybindings:SnakeGameKeybindings) => void;
    startGame:   () => void;
    message?:string;
    keybindings:SnakeGameKeybindings;
}

type SnakeGameMainUIState = {
    currentPanel:()=>JSX.Element;
    keybindings:SnakeGameKeybindings;
}


class SnakeGameMainUI extends React.Component<SnakeGameMainUIProps, SnakeGameMainUIState>
{
    state={currentPanel: () => <></>, keybindings: {up:"",down:"", left:"", right:""}}
    
    componentDidMount(): void {
        this.setState({
            currentPanel: this.mainUI,
            keybindings: this.props.keybindings
        })
    }

    private mainUI = () => {
        return (<div className="d-flex justify-content-between flex-column">
            {this.props.message ? <div className="bg-success bg-gradiant p-2 text-white text-center">{this.props.message}</div> : <></>}

            <input type="button" value="Start Game" className="btn btn-success mt-2" onClick={this.props.startGame} />
            <input type="button" value="Change keybindings" className="btn btn-success mt-2" onClick={() => this.setState({...this.state, currentPanel: this.changeKeybindsUI})} />
        </div>)
    }

    private changeKeybindsUI = () => {
        const changeBinding = (direction:"up"|"down"|"left"|"right", value:string) => {
            let current = this.state.keybindings;
            current[direction] = value;

            this.setState({...this.state, keybindings: current})
        }

        return (
            <div className="d-flex flex-column justify-content-center   ">
                <form method="POST" onSubmit={(ev) => {
                    ev.preventDefault();
                    this.props.setKeybinds(this.state.keybindings);
                    this.setState({...this.state, currentPanel: this.mainUI})
                }}>
                    {([
                        ["up", this.state.keybindings.up],
                        ["down", this.state.keybindings.down],
                        ["left", this.state.keybindings.left],
                        ["right", this.state.keybindings.right],
                    ] as ["up"|"down"|"left"|"right", string][]).map((v, i) => {
                        const [direction, currentValue] = v;
                        return (
                            <div className="row d-flex justify-content-center" key={i}>
                                <div className="col-3"><label htmlFor={direction}>{direction}: </label></div>
                                <div className="col-3">
                                    <input type="text" pattern="[a-zA-Z]+" name={direction} id={direction} onChange={(ev) => changeBinding(direction, ev.target.value.at(-1) as string)} value={currentValue} />
                                </div>
                            </div>
                        )
                    })}

                    <div className="row d-flex justify-content-end mt-2">
                        <div className="col-5">
                            <input type="submit" className="btn btn-success" value="Save" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    public render = (): React.ReactNode => (<>{this.state.currentPanel()}</>)
}
//#endregion

//#region Game canvas
type SnakeGameCanvasProps = {
    endGame: (msg:SnakeGameExitGameInfo) => void;
    walls:[number, number][];
    size:number;
    keybindings:SnakeGameKeybindings;
}
type SnakeGameCanvasState = {
    gameCanvasReference?:RefObject<HTMLCanvasElement>;
    snakePositions:[number, number][];
    currentDirection:string;
    foodSpawn?:SnakeGameFood;
    score:number;
}

type SnakeGameExitGameInfo = {
    message:string;
}

class SnakeGameCanvas extends React.Component<SnakeGameCanvasProps, SnakeGameCanvasState>
{
    private msPerTick: number = 500;
    private updateThread: NodeJS.Timer | undefined;
    componentDidMount = (): void  => 
    {
         
        this.setState({
            ...this.state, 
            gameCanvasReference: React.createRef<HTMLCanvasElement>(),
            currentDirection: "up",
            snakePositions: [[Math.floor(this.props.size/2), Math.floor(this.props.size/2)]],
            score: 0
        })

        this.updateThread = setInterval(() => {
            this.tick();
            this.onCanvasUpdate();
         }, this.msPerTick);

         document.addEventListener("keypress", this.onKeyDown)
    }

    componentWillUnmount(): void {
        clearTimeout(this.updateThread);

        document.removeEventListener("keypress", this.onKeyDown);
    }
    

    private tick = (): void => {
        if(this.state.snakePositions)
        {
            // Get the current position of the snake's head
            const currentPosition = this.state.snakePositions[0];
            
            // Calculate the new position of the snake's head based on the current direction
            let newPosition: [number, number];
            switch (this.state.currentDirection) {
                case "up":
                newPosition = [currentPosition[0], currentPosition[1] - 1];
                break;

                case "down":
                newPosition = [currentPosition[0], currentPosition[1] + 1];
                break;

                case "left":
                newPosition = [currentPosition[0] - 1, currentPosition[1]];
                break;

                case "right":
                newPosition = [currentPosition[0] + 1, currentPosition[1]];
                break;
                
                default:
                    return this.props.endGame({
                        message: "Er is een fout opgetreden bij het wijzigen van de positie."
                    });
            }
            
            if(this.props.walls?.find(v => v[0] == newPosition[0] && v[1] == newPosition[1])
               || this.state.snakePositions.find(v => v[0] == newPosition[0] && v[1] == newPosition[1]))
                    return this.props.endGame({
                        message: `Einde spel met een score van: ${this.state.score}`
                    });
            else
            {
                let score = this.state.score + 1;
                let snakePositions = this.state.snakePositions;
                let food: SnakeGameFood | undefined  = this.state.foodSpawn;
                if(!food)
                {
                    const rnd = (min:number = 0, max:number) => Math.floor(Math.random()*(max-min)+min);
                    food = rnd(0, 100)  < 20 ? {position: [rnd(2, this.props.size-2), rnd(2, this.props.size-2)], ticksLeft: rnd(10, 55)} : undefined;    
                } 
                else if(food && food.position[0] === newPosition[0] && food.position[1] === food.position[1])
                {
                    const lastPosition = snakePositions.at(-1);
                    if(lastPosition)
                    {
                        const [lastX, lastY] = lastPosition;
                        switch(this.state.currentDirection)
                        {
                            case "up":  snakePositions.push([lastX, lastY-1]); break;
                            case "down":  snakePositions.push([lastX, lastY+1]); break;
                            case "left":  snakePositions.push([lastX-1, lastY]); break;
                            case "right":  snakePositions.push([lastX+1, lastY]); break;
                        }
                    }
                    food = undefined;
                    score += 20;
                } else if(food && food.ticksLeft < 0) food = undefined; 
                else food.ticksLeft--;

                this.setState({...this.state,
                    snakePositions: [newPosition, ...snakePositions.slice(0, -1)],
                    foodSpawn: food,
                    score: score
                });
            }
        }
    }



    private onCanvasUpdate = () => {
        const canvas: HTMLCanvasElement | null | undefined = this.state.gameCanvasReference?.current;
        if(canvas)
        {
            const context = canvas.getContext("2d");
            if(context && this.props.walls && this.props.size)
            {
                canvas.width = canvas.getBoundingClientRect().width;
                canvas.height = canvas.getBoundingClientRect().height;
                const [rows, columns] = [canvas.height/this.props.size, canvas.width/this.props.size]
                const [height, width] = [canvas.height/rows, canvas.width/columns];

                const drawRect = (pos: [number,number], color:string) => {
                    const [x, y] = pos;
                    context.fillStyle = color;
                    context.fillRect(x*width, y*height, width, height);
                }
                context.clearRect(0, 0, canvas.width, canvas.height);

                this.props.walls.forEach((position) => drawRect(position, "black"));

                this.state.snakePositions?.forEach((position) => drawRect(position, "gray"))
                
                const foodSpawn = this.state.foodSpawn;
                if(foodSpawn)
                    drawRect(foodSpawn.position, "red");
                
                context.fillStyle = "white";
                context.fillText(`Current Score: ${this.state.score}`, height/2, width/2)
            }
        }
    }

    private onKeyDown = (keyEvent: any) => {
        const match = Object.entries(this.props.keybindings).find(v => v[1].toLowerCase() === keyEvent.key.toLowerCase());
        if(match)   
        {
            this.setState({...this.state, currentDirection: match[0]});
        }
    }


    public render = (): React.ReactNode => (
        <div className="d-flex justify-content-center">
            <canvas style={{height: "40rem", width: "40rem"}} ref={this.state?.gameCanvasReference} />
        </div>
    )
}
//#endregion

//#region Example component
type SnameGameProps = {};
type SnakeGameState = {
    started?:boolean;
    keybindings:SnakeGameKeybindings;
    mapSize:number;
    message?:string;
};

export default class SnakeGame extends React.Component<SnameGameProps, SnakeGameState>
{
    state: SnakeGameState = {
        started: false,
        keybindings: {
            up: "z",
            down: "s", 
            left: "q",
            right:"d"
        },
        mapSize:25
    }

    private onSetKeybindingsEvent = (keybindings: SnakeGameKeybindings): void => this.setState({...this.state, keybindings: keybindings});
    private onStartGameEvent = (): void => this.setState({...this.state, started: true});
    private onExitGameEvent =  (info: SnakeGameExitGameInfo): void => this.setState({...this.state, message: info.message, started: false});

    public render = () => {
        return(<>
        {!this.state.started 
        ? <SnakeGameMainUI
            setKeybinds={this.onSetKeybindingsEvent}
            startGame={this.onStartGameEvent}
            message={this.state.message}
            keybindings={this.state.keybindings}
        /> 
        : <SnakeGameCanvas 
            endGame={this.onExitGameEvent} 
            walls={[... Array(this.state.mapSize).keys()].map((rowIndex) => 
                        [...Array(this.state.mapSize).keys()].map((columnIndex) =>
                            rowIndex == 0 || columnIndex == 0 || columnIndex == (this.state.mapSize as number)-1 || rowIndex == (this.state.mapSize as number)-1 ? ([rowIndex, columnIndex] as [number, number]) : ([-1, -1] as [number, number])
                        )
                    ).reduce((stack, cur) => stack.concat(cur), [])
                    .filter(v => v[0] >= 0 && v[1] >= 0)
            } 
            size={this.state.mapSize}
            keybindings={this.state.keybindings}
            />}

        </>)

    }
}
//#endregion
