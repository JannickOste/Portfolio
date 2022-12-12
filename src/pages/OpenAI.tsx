import React from "react";
import OpenAI, { GPT3Model } from "../apis/OpenAIAPI";
import { ChatMessageProps } from "../components/elements/groups/openai/chat/ChatMessage";
import OpenAINoKey from "../components/elements/groups/openai/OpenAINoKey";
import ChatUI from "../components/elements/groups/openai/chat/ChatUI";
import ContentBox from "../components/elements/ContentBox";
import VerticalMenu from "../components/elements/VerticalMenu";
import ImageGeneratorUI, { ImageGeneratorResult } from "../components/elements/groups/openai/image/ImageGeneratorUI";
import Message, { MessageLevel } from "../components/elements/Message";
import { RouteObjectExtended } from "../RoutedObjectExtended";
import { RouteObject } from "react-router-dom";

type ChatProps = {}
type ChatState = {
    messages: ChatMessageProps[];
    generated:ImageGeneratorResult[];

    openaiUserKey?:string;
    openaiUserLimit?:number;
    
    page:string;
    disabled?:boolean;
    message?:string
    error?:string;
}

type OpenAIMainMenuEntry = {
    path:string;
    text:string;
    element:() => JSX.Element
}

export default class OpenAIPage extends React.Component<ChatProps, ChatState>
{
    state:ChatState = {messages:[], page: "no_key", generated:[]}
    //#region Sub-page mapping
    private readonly routeFilters = ["main", "page_not_found", "no_key"];
    private readonly customRouterObjects: OpenAIMainMenuEntry[] = [];

    constructor(props: ChatProps)
    {
        super(props);
        this.customRouterObjects = [
            {
                path: "page_not_found",
                text: "Pagina niet gevonden",
                element: () => <ContentBox content={<div className="d-flex justify-content-center align-items-center">
                    Er loopt een fout op om de pagina te laden, <u style={{cursor: "pointer"}} onClick={() => this.setState({...this.state, page: "main"})}>klik</u> hier om terug naar het hoofdmenu te gaan.
                </div>} />
            },
            {
                path: "no_key", 
                text: "login",
                element: () => <ContentBox content={(
                    <OpenAINoKey 
                    onSubmit={(apiKey, creditLimit) => {
                        this.setState({...this.state, 
                            openaiUserKey: apiKey, 
                            openaiUserLimit: creditLimit
                        })
    
                        localStorage.setItem("openai_key", apiKey);
                        localStorage.setItem("openai_limit", `${creditLimit}`);
                    }}
                    apiKey={localStorage.getItem("openai_key")}
                    limit={localStorage.getItem("openai_limit")}
                    />
                )} />
            }, 
            {
                path: "main",
                text: "hoofdmenu", 
                element: () => <VerticalMenu entries={
                    this.customRouterObjects.filter(route => !this.routeFilters.includes(route.path)).map(route => {
                        return {
                            text:route.text[0].toUpperCase() + route.text.slice(1, route.text.length), 
                            onclick: () => this.setState({...this.state, page:route.path})
                        }
                    }
                )} />
            },
            {
                path: "chat",
                text: "chat",
                element: () => <ContentBox content={<ChatUI messages={ this.state.messages } onSend={(text) => {
                    const messagesUpdates: ChatMessageProps[] = [...this.state.messages, {from: "Human", message:text}]
                    this.setState({...this.state, messages: messagesUpdates}, this.onChatMessageSend)
                }}  />} />
            },
            {
                path: "generate_image", 
                text: "afbeelding genereren",
                element: () => <ImageGeneratorUI images={this.state.generated} onImageGenerate={this.onImageGenerate} /> 
            }

        ]
    }
    //#endregion

    private getOpenAIInstance = () => {
        if(process.env.REACT_APP_OPENAI_KEY)
            return OpenAI.Singleton;
        else if(this.state.openaiUserKey && this.state.openaiUserLimit)
            return new OpenAI({props:{apiKey: this.state.openaiUserKey, creditLimit:this.state.openaiUserLimit, model: GPT3Model.TEXT_DAVINCI_V3}});
    }


    //#region ChatUI
    /**
     * Updates the chat history and sends a message to the OpenAI API
     *
     * This method retrieves the last message in the chat history and
     * checks if it was sent by the human user. If so, it calls the
     * `fetchAPIChatResponse` method to retrieve a response from the
     * OpenAI API and update the chat history.
     */
    private onChatMessageSend = async() => {
        const last = this.state.messages.at(-1);


        if(!last)
            return this.setState({...this.state, error: "Failed reading last message"})

        if(last.from.toLowerCase() == "human")
        {
            try
            {
                const openai = this.getOpenAIInstance();
                if(openai)
                {
                    const response = await openai.getResponse(this.state.messages.map(msg => `${msg.from}:\n${msg.message}`).join("\n"));
                    this.setState({...this.state, messages: [...this.state.messages,
                        {from: "AI", message: response.data.choices[0].text as string}
                    ], error: ""});
                    
                }
            } catch(e) 
            {
                const errorCodeRaw = (e as Error).message.split(" ").at(-1);
                let message = "";
                switch(errorCodeRaw? parseInt(errorCodeRaw) : -1)
                {
                    case 401:
                        message = "Verkeerde openai API code";
                        break;
                    case -1:
                    default:
                        message =  "Er is een ongekende fout opgetreden...";
                        break;
                }
                
                this.setState({...this.state, error:message});
            }
        }
    }

    //#endregion

    //#region Image Generate 
    private onImageGenerate = async(text:string) => {
        this.setState({...this.state, message:"Afbeelding word gegenereerd...."})
        try
        {

            const response = await this.getOpenAIInstance()?.getImage(text);

            const uriOut = response?.data.data[0].url;
            if(uriOut)
                this.setState({...this.state, generated: [{text:text, uri: uriOut}, ...this.state.generated], message: "Afbeelding met success aangemaakt!"})
            else this.setState({...this.state, error:"Er ging iets mis tijdens het genereren van de afbeelding", message: ""})
        } catch(e)
        {
            this.setState({...this.state, error: "Verkeerde OpenAI API code", message: ""});
        }
    }
    //#endregion
    
    /**
     * Renders the current page of the OpenAI chat UI
     *
     * If the user has not provided an OpenAI API key and credit limit,
     * the `ChatNoKeyForm` component is rendered. Otherwise, the
     * `renderSubPage` method is called to render the appropriate
     * sub-page of the chat UI.
     *
     * @returns {React.ReactNode} The React element to render
     */
    public render = (): React.ReactNode => {
        if(this.getOpenAIInstance() && this.state.page === "no_key") 
        {
            this.setState({...this.state, page: "main"});
        }

        return this.renderSubPage();
    }

   /**
     * Renders the sub-page of the OpenAI chat UI based on the value of
     * the `page` property in the component's state
     *
     * @returns {React.ReactNode} The React element to render
     */
    private renderSubPage = ():React.ReactNode => {
        
        let route = this.customRouterObjects.find(route => route.path === this.state.page);
        if(!route) 
            route = this.customRouterObjects.find(route => route.path === "page_not_found");

        
        const Header = () => <>
            <ContentBox content={<p className="h1 text-center mb-2">OpenAI {route?.path ? route?.text : "error"}</p>} />

            {this.state.openaiUserKey && this.state.openaiUserLimit ? (<div className="border bg-success text-white text-center py-2">
                Ingelogd met een persoonlijke token - <u style={{cursor:"pointer"}} onClick={() => {
                    localStorage.setItem("openai_key", "");
                    localStorage.setItem("openai_limit", "");
                    this.setState({...this.state, openaiUserKey: undefined, openaiUserLimit: undefined, page:"no_key", error:""})
                }}>Uitloggen</u>
            </div>) : (<></>)}
            
            {this.state.error ? <Message level={MessageLevel.ERROR} text={this.state.error} /> : <></>}
            {this.state.message ? <Message level={MessageLevel.SUCCES} text={this.state.message} /> : <></>}
        </>;
    
        let Body = route ? route.element : () => <></>;

        let Footer = () => (
            <>
            {this.routeFilters.includes(this.state.page as string) ?  <></> :<ContentBox className="d-flex justify-content-end" content={<>
                <input type="button" className="btn btn-success d-block ml-auto" onClick={() => this.setState({...this.state, error:"", page: "main"})} value="Hoofdmenu" />
            </>} />}
            </>
        )

                
    

        return (<>
            <Header />
            <div className="my-3">
                <Body />
            </div>
            <Footer />
        </>)
    }
}