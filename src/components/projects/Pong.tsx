import React, { RefObject } from "react";
import SubpageLoader, { SubPageLayoutComponentProps } from "../elements/SubpageLoader";

type PongPlayer = {yCenter:number;directionOffset:-1|0|1;}
type PongKeybindings = {up:string;down:string;}

type PongCanvasState = {
    initialized?:boolean;
    player:PongPlayer;
    keybindings:PongKeybindings;
    
    bot:PongPlayer;
    ball:{position:[number, number], direction: [-2|2, -1|0|1]}

}   

type PongCanvasProps = {
    keybindings:PongKeybindings
}

class PongCanvas extends React.Component<PongCanvasProps, PongCanvasState>
{
    private updateThreadHandle: NodeJS.Timer | undefined;

    private readonly ticksRequired:number = 2;
    private readonly msPerTick:number = 1000/120;
    private currentTick:number = 0;
    
    private readonly playerHeight:number = 100;
    private readonly playerWallOffset:number = 2;
    private readonly playerWidth:number = 8;

    private readonly playerVelocity:number = 8;

    private readonly ballVelocity:number = 8;
    private readonly ballArea:number = 15;
    private readonly canvas: RefObject<HTMLCanvasElement>;
    private points: [number, number] = [0, 0]

    constructor(props: PongCanvasProps)
    {
        super(props);

        this.canvas = React.createRef();
    }

    componentDidMount = (): void => {
        if(this.canvas.current)
        {
            
            this.canvas.current.width =  this.canvas.current.getBoundingClientRect().width;
            this.canvas.current.height = this.canvas.current.getBoundingClientRect().height;
            
            this.setState({
                player: {
                    yCenter: Math.floor(this.canvas.current.height/2), 
                    directionOffset: 0
                }, 
                bot:{
                    yCenter: Math.floor(this.canvas.current.height/2), 
                    directionOffset:0
                }, 
                ball: {
                    position: [Math.floor(this.canvas.current.width/2), Math.floor(this.canvas.current.height/2)], 
                    direction: [2, -1]
                }
            })

            document.addEventListener("keydown", (ev) => this.onUserInput(ev, true));
            document.addEventListener("keyup", (ev) => this.onUserInput(ev, false));
        }


        this.updateThreadHandle = setInterval(() => {
            if(++this.currentTick > this.ticksRequired)
            {
                this.tick();
                this.currentTick -= this.ticksRequired;
            }

            this.onCanvasRender();
        }, this.msPerTick);
    }   

    componentWillUnmount = (): void =>  
    {
        clearInterval(this.updateThreadHandle);

        document.removeEventListener("keydown", this.onUserInput);
        document.removeEventListener("keyup", this.onUserInput);
    }

    onUserInput = (keyPress: KeyboardEvent, down?:boolean):void =>  {
        if(down && this.canvas.current)
        {
            if(keyPress.key == this.props.keybindings.up)
            {
                this.setState({...this.state, player: {
                    ...this.state.player, 
                    directionOffset: this.state.player.yCenter-(this.playerHeight/2) > 0 ? -1 : 0
                }})
            }
            else if(keyPress.key == this.props.keybindings.down)
            {
                this.setState({...this.state, player: {
                    ...this.state.player,
                    directionOffset: this.state.player.yCenter+(this.playerHeight/2) < this.canvas.current?.height ? 1 : 0
                }})
            }
        } else this.setState({...this.state, player: {...this.state.player, directionOffset: 0}})
    }

    tick = (): void => {
        const targetCanvas = this.canvas.current;
        if(targetCanvas)
        {
            const ball = this.getNewBallPosition();
            
            const ballToBotOffset = this.state.bot.yCenter-ball.position[1];

            this.setState({
                ...this.state, 
                ball: ball,
                player: {...this.state.player, yCenter: this.state.player.yCenter+(this.state.player.directionOffset*this.playerVelocity)},
                bot: {
                    ...this.state.bot,       
                    yCenter: this.state.bot.yCenter+(ball.direction[0] > 0 || ball.position[0] < targetCanvas.width*.93 ? 0 : (ballToBotOffset > 0 ? -1 : (ballToBotOffset < 0 ? 1 : 0))*this.playerVelocity)
                
                },
            })
        }
    }

    private getNewBallPosition = () => {
        let current = this.state.ball;

        const [ballDirectionX, ballDirectionY] = current.direction;

        // Change direction on wall hit.
        if(current.position[1] < 0 && current.direction[1] == 1)
            current.direction = [ballDirectionX, -1]
        else if(this.canvas.current && current.position[1] > this.canvas.current.height && ballDirectionY == -1)
            current.direction = [ballDirectionX, 1];

        // Player colission
        if(current.direction[0] == 2)
        {
            if(current.position[1] >= this.state.player.yCenter-(this.playerHeight/2)
                && current.position[1] <= this.state.player.yCenter+(this.playerHeight/2)
                && current.position[0] < this.playerWidth+this.playerWallOffset+(this.ballArea/2))
            {
                current.direction = [-2, 
                    current.position[1] > this.state.player.yCenter 
                        ? -1
                        : current.position[1] < this.state.player.yCenter ? 1 : 0
                ];

            }
        } 
        else 
        { // Bot colission
            if(this.canvas.current && current.position[1] >= this.state.bot.yCenter-(this.playerHeight/2)
                && current.position[1] <= this.state.bot.yCenter+(this.playerHeight/2)
                && current.position[0] > (this.canvas.current?.width-this.playerWidth-this.playerWallOffset-(this.ballArea/2)))
            {
                current.direction = [2, 
                    current.position[1] > this.state.bot.yCenter 
                        ? -1
                        : current.position[1] < this.state.bot.yCenter ? 1 : 0
                ];
            }
        }

        let reset = false;
        if((reset = current.position[0] < 0))
            this.points = [this.points[0], this.points[1]+1];
        else if((reset = (this.canvas.current !== null && current.position[0] > this.canvas.current?.width)))
            this.points = [this.points[0]+1, this.points[1]];

        if(reset && this.canvas.current)
        {
            current.position = [this.canvas.current.width/2, this.canvas.current.height/2];
            current.direction = [current.direction[0], 0];
        }
        else current.position = [
            current.position[0]-(ballDirectionX*this.ballVelocity), 
            current.position[1]-(ballDirectionY*this.ballVelocity)
        ]

        return current;
    }


    private onCanvasRender = (): void => {

        const targetCanvas = this.canvas.current;
        if(targetCanvas)
        {
            targetCanvas.width = targetCanvas.getBoundingClientRect().width;
            targetCanvas.height = targetCanvas.getBoundingClientRect().height;
            
            const drawingContext = targetCanvas.getContext("2d");
            if(drawingContext && this.state.player && this.state.bot)
            {
                
                // Draw background
                drawingContext.fillStyle = "black";
                drawingContext.fillRect(0, 0, targetCanvas.width, targetCanvas.height);
    
                drawingContext.fillStyle = "white";

                drawingContext.font = "bold 30px arial"
                drawingContext.fillText(this.points[0].toString(), 20, 40);
                drawingContext.fillText(this.points[1].toString(), targetCanvas.width-40, 40);

                // Draw players
                drawingContext.fillRect(this.playerWallOffset, this.state.player.yCenter-(this.playerHeight/2), this.playerWidth, this.playerHeight);
                drawingContext.fillRect(targetCanvas.width-(this.playerWallOffset+this.playerWidth), this.state.bot.yCenter-(this.playerHeight/2), this.playerWidth, this.playerHeight);
                
                // Draw ball.
                drawingContext.fillRect(this.state.ball.position[0]-(this.ballArea/2), this.state.ball.position[1]-(this.ballArea/2), this.ballArea, this.ballArea)
            }
        }
    }

    public render = () => (<canvas ref={this.canvas} className="w-100" style={{height: "50rem"}} />)
}

type PongState = {
    keybindings:PongKeybindings;
    newKeybindings:PongKeybindings;
}

export default class Pong extends React.Component<{}, PongState>
{
    state = {
        keybindings:  {
            up: "z",
            down: "s"
        },
        newKeybindings:  {
            up: "z",
            down: "s"
        },
    }
    
    private keybindingsUI = () => {
        const assignValue = (key:"up"|"down", value:string) => {
            let newValue = this.state.newKeybindings;
            newValue[key] = value;

            this.setState({...this.state, newKeybindings: newValue})
        }

        return (<div className="w-100">
            {[["up", this.state.newKeybindings.up], ["down", this.state.newKeybindings.down]].map((v, i) => {
                const [key, value] = v;
                return (<div className="row d-flex justify-content-center mt-2">
                    <div className="col-3"><label htmlFor={key}>{key.toUpperCase()}</label></div>
                    <div className="col-8"><input type="text" className="w-100" name={key} id={key} value={value} onChange={(ev) => assignValue(key as "up"|"down", ev.target.value.at(-1) as string)}/></div>
                </div>)
            })}
        </div>)
    }


    public render = ():React.ReactNode => 
    {
        const isMobile =() => {
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
            return check;   
          };
        
        const [PongKeybindingsUI] = [this.keybindingsUI];
        return (<>
            {isMobile() ? <>Helaas dit wordt niet ondersteunt op mobile</> : <SubpageLoader 
            pages={[
                {
                    path: "start_game",
                    text: "Start game",
                    element: () => <PongCanvas keybindings={this.state.keybindings} />
                },
                {
                    path: "keybindings",
                    text: "Change keybindings",
                    element: () => <PongKeybindingsUI  />
                }
            ]} 
            // Probably better solution for this
            footer={({path, text, triggerMainMenu}:SubPageLayoutComponentProps) => {
                if(path === "keybindings")
                {
                    return (<>
                    
                    <div className="d-flex justify-content-end row">
                        <div className="col-2">
                            <input type="button" value="Save" className="btn btn-success d-block ml-auto w-100 mt-5 mr-5" onClick={() => {
                                this.setState({...this.state, keybindings: this.state.newKeybindings})
                                return triggerMainMenu();
                        }} />
                        </div>
                    </div>
                    </>)
                } else return (<></>)
            }}
        />}
        </>)
    }
}