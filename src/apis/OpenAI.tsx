
import {Configuration, OpenAIApi} from "openai";
class OpenAI
{
    private readonly client: OpenAIApi;
    private readonly maxTokens: number = 10;
    private readonly targetModel:string = "text-davinci-003";

    private constructor()
    {
        this.client = new OpenAIApi(new Configuration({
            apiKey: process.env.REACT_APP_OPENAI_KEY
        }));
    }

    private static _singleton: OpenAI;
    public static get Singleton()
    {
        if(this._singleton === undefined)
            this._singleton = new OpenAI();

        return this._singleton;
    }

    public getResponse = (conversation: string) => this.client.createCompletion({
        model: this.targetModel, 
        prompt: conversation, 
        max_tokens: this.maxTokens, 
        stop: ["Human:\n", "AI:\n"]
    }); 
}

export default OpenAI;