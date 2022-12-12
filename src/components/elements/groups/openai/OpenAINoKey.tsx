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

export default class OpenAINoKey extends React.Component<ChatNoKeyFormProps, ChatNoKeyFormState>
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
                Geen OpenAI code gevonden. Maak een code aan en geef deze op of een huidige OpenAI API code.
            </div>

            <p className="mt-5 h5">Geen code? Geen probleem!</p>
            <pre className="border rounded p-2" style={{whiteSpace: "pre-wrap"}}>
                <div>
                    <strong>Stap 1:</strong> Ga naar de website van <a href="https://beta.openai.com/signup" title="Registratie link">OpenAI</a> en klik op de optie om een account aan te maken. Je kunt kiezen om in te loggen via email, google of microsoft. Volg de stappen op het scherm om je account aan te maken.
                </div>
                <div>
                    <strong>Stap 2:</strong> Nadat je een account hebt aangemaakt, ga je naar de pagina met <a href="https://beta.openai.com/account/api-keys" title="API sleutels verkrijgen">API-sleutels</a> op de website van OpenAI. Klik op de knop om een nieuwe sleutel te genereren en volg de instructies op het scherm om dit te doen.
                </div>
                <div>
                    <strong>Stap 3:</strong> Nadat je een API-sleutel hebt gegenereerd, kun je deze gebruiken om toegang te krijgen tot de diensten van OpenAI. Voer de sleutel in op het webplatform waar je de diensten van OpenAI wilt gebruiken en volg de instructies op het scherm om de integratie te voltooien.
                </div>
            </pre>

            <p className="h5 mt-5">API code instellen</p>
            <form className="d-flex flex-column border rounded p-2" onSubmit={this.onSubmit}>
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
