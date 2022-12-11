import React from "react";
import OpenAI from "../apis/OpenAIAPI";
import { ChatMessageProps } from "../components/elements/groups/openai/chat/ChatMessage";
import ChatNoKeyForm from "../components/elements/groups/openai/chat/ChatNoKeyForm";
import ChatUI from "../components/elements/groups/openai/chat/ChatUI";
import ContentBox from "../components/elements/ContentBox";

type ChatProps = {}
type ChatState = {
    initialized?:boolean;
    messages: ChatMessageProps[];

    openaiUserKey?:string;
    openaiUserLimit?:number;
    error?:string;
    page?:string;

    openai?:OpenAI;
}

export default class OpenAIPage extends React.Component<ChatProps, ChatState>
{
    state:ChatState = {messages:[], page: "no_key"}
    //#region subPageMapping
    private readonly notUserAccesible = ["no_key", "main", "page_not_found"];
    private readonly elementMapping = Object.fromEntries([
        [
            "no_key", () => <ContentBox content={<ChatNoKeyForm 
                apiKey={localStorage.getItem("openai_key")}
                limit={localStorage.getItem("openai_limit")}
                onSubmit={(apiKey, creditLimit) => 
                    this.setState({...this.state, 
                        openaiUserKey: apiKey, 
                        openaiUserLimit: creditLimit, 

                        openai: new OpenAI(apiKey, creditLimit)
                    }, () => {
                        localStorage.setItem("openai_key", apiKey);
                        localStorage.setItem("openai_limit", `${creditLimit}`);
                    })
                } 
            />} />
        ],
        [
            "page_not_found", () => <ContentBox content={<div className="d-flex justify-content-center align-items-center">
                Er loopt een fout op om de pagina te laden, <u style={{cursor: "pointer"}} onClick={() => this.setState({...this.state, page: "main"})}>klik</u> hier om terug naar het hoofdmenu te gaan.
            </div>} />
        ],
        [
            "chat", () => <ContentBox content={<ChatUI messages={ this.state.messages } onSend={(text) => {
                const messagesUpdates: ChatMessageProps[] = [...this.state.messages, {from: "Human", message:text}]
                this.setState({...this.state, messages: messagesUpdates}, this.onMessageSend)
            }}  />} />
        ]
    ])
    //#endregion

    //#region Events
    /**
     * Updates the chat history and sends a message to the OpenAI API
     *
     * This method retrieves the last message in the chat history and
     * checks if it was sent by the human user. If so, it calls the
     * `fetchAPIChatResponse` method to retrieve a response from the
     * OpenAI API and update the chat history.
     */
    private onMessageSend = async() => {
        const last = this.state.messages.at(-1);
        if(!this.state.openai)
            return this.setState({...this.state, error: "Failed getting connection to OpenAI"})
        else if(!last)
            return this.setState({...this.state, error: "Failed reading last message"})

        if(last.from.toLowerCase() == "human")
            return await this.fetchAPIChatResponse();
    }


    /**
     * Retrieves a response from the OpenAI API and updates the chat history
     *
     * This method sends the current chat history to the OpenAI API and
     * retrieves a response. It then updates the chat history with the
     * response from the API. If there is an error, it sets the `error`
     * property in the component's state with an error message.
     */
    private fetchAPIChatResponse = async() => {
        try
        {
            if(this.state.openai)
            {
                const response = await this.state.openai.getResponse(this.state.messages.map(msg => `${msg.from}:\n${msg.message}`).join("\n"));
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
        if(process.env.REACT_APP_OPENAI_KEY === undefined && [this.state.openaiUserKey, this.state.openaiUserLimit].every(v => v === undefined))
        {
            return(<ChatNoKeyForm 
                onSubmit={(apiKey, creditLimit) => {
                    this.setState({...this.state, 
                        openaiUserKey: apiKey, 
                        openaiUserLimit: creditLimit, 
                        openai: new OpenAI(apiKey, creditLimit)
                    })

                    localStorage.setItem("openai_key", apiKey);
                    localStorage.setItem("openai_limit", `${creditLimit}`);
                }} 
                apiKey={localStorage.getItem("openai_key")}
                limit={localStorage.getItem("openai_limit")}
            />)
        } else if(this.state.page === "no_key") 
            this.setState({...this.state, page: "main"});

        return this.renderSubPage();
    }

   /**
     * Renders the sub-page of the OpenAI chat UI based on the value of
     * the `page` property in the component's state
     *
     * @returns {React.ReactNode} The React element to render
     */
    private renderSubPage = ():React.ReactNode => {
        const Header = () => <>
            <ContentBox content={<p className="h1 text-center mb-2">OpenAI {this.state.page}</p>} />

            {this.state.openaiUserKey && this.state.openaiUserLimit ? (<div className="border bg-success text-white text-center py-2">
                Ingelogd met een persoonlijke token - <u style={{cursor:"pointer"}} onClick={() => {
                    localStorage.setItem("openai_key", "");
                    localStorage.setItem("openai_limit", "");
                    this.setState({...this.state, openaiUserKey: undefined, openaiUserLimit: undefined})
                }}>Uitloggen</u>
            </div>) : (<></>)}
            
            {this.state.error ?  (<div className="border bg-danger text-white text-center py-2">
                {this.state.error}
            </div>) : (<></>)}
        </>;

        let Body = () => <></>;
        let Footer = () => (
            <>
            {this.notUserAccesible.includes(this.state.page as string) ?  <></> :<ContentBox className="d-flex justify-content-end" content={<>
                <input type="button" className="btn btn-success d-block ml-auto" onClick={() => this.setState({...this.state, page: "main"})} value="Hoofdmenu" />
            </>} />}
            </>
        )
        

        switch(this.state.page)
        {
            case "main":
                // Should be defined here, otherwise you don't have access to elementmapping for dynamic loading.
                Body = () => <ContentBox content={
                    <div className="d-flex flex-column">
                        {Object.keys(this.elementMapping).filter(s => !this.notUserAccesible.includes(s)).map(s => 
                            <input type="button" className="btn btn-success" value={s} onClick={(ev) => this.setState({...this.state, page:s})} />
                        )}
                    </div>
                } />;
                break;

            default: 
                if(this.state.page && Object.keys(this.elementMapping).includes(this.state.page))
                    Body = this.elementMapping[this.state.page as string];
                else Body = this.elementMapping["page_not_found"];   
        }

        return (<>
            <Header />
            <Body />
            <Footer />
        </>)
    }
}