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

        const isMobile =() => {
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
          };
        
        if(!isMobile())
            this.setState({
                currentPanel: this.mainUI,
                keybindings: this.props.keybindings
            })
        else this.setState({...this.state, currentPanel: () => <>Helaas dit werkt niet op een mobile platform.</>})
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
