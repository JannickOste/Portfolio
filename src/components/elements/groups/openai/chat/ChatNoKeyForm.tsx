import React from "react";
import { useEffect, useState } from "react";


type ChatNoKeyFormState = {
    apiKey?:string;
    creditLimit:number;
}

type ChatNoKeyFormProps = {
    onSubmit:(apiKey:string, maxCredits:number) => void
    apiKey:string|null;
    limit:string|null;
}

export default class ChatNoKeyForm extends React.Component<ChatNoKeyFormProps, ChatNoKeyFormState>
{
    state:ChatNoKeyFormState = {creditLimit: 150}

    constructor(props: ChatNoKeyFormProps) { super(props); }

    private onApiKeyChange = (text: string) => this.setState({...this.state, apiKey: text});
    private onSubmit = (ev: any): void => {
        ev.preventDefault();
        if(this.state.apiKey)
            this.props.onSubmit(this.state.apiKey, this.state.creditLimit)

    }
    public render = (): React.ReactNode => {

        return (<>
            <div className="bg-danger p-2 text-white text-center mb-2">
                No OpenAI key found, disabled for live preview, optionaly provide your own key below with a max credit limit 
            </div>

            <form className="d-flex flex-column mt-5" onSubmit={this.onSubmit}>
                <div className="d-sm-flex">
                    <label htmlFor="key" style={{flex: 1}}>API Key:</label>
                    <input 
                        type="password" 
                        className="w-100"
                        name="key"
                        id="key"
                        value={this.state.apiKey} 
                        placeholder="OpenAI API Key..." 
                        onChange={(ev) => this.onApiKeyChange(ev.target.value)} 
                        style={{flex: 3}} 
                    />
                </div>
                
                <div className="d-flex mt-5"> 
                    <label htmlFor="credits" style={{flex: 1}}>Max credit limit: </label>
                    <input type="number" name="credits" className="w-100" id="credits" value={this.state.creditLimit} onChange={(ev) => this.setState({...this.state, creditLimit: parseInt(ev.target.value)})} style={{flex: 3}} />
                </div>
                <input type="submit" value="login" className="mt-5 btn btn-danger" disabled={this.state.apiKey === undefined || !this.state.apiKey.length} />
            </form>
        </>)
    }

}
