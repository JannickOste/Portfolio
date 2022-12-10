
import {Configuration, OpenAIApi} from "openai";
class OpenAI
{
    private readonly client: OpenAIApi;
    private readonly maxTokens: number = 10;
    private readonly targetModel:string = "text-davinci-003";
    

    constructor(apiKey:string|undefined, creditLimit:number)
    {
        this.client = new OpenAIApi(new Configuration({
            apiKey: apiKey
        }));
        
        this.maxTokens = creditLimit;
    }

    private static _singleton: OpenAI;
    public static get Singleton()
    {
        if(this._singleton === undefined)
            this._singleton = new OpenAI(process.env.REACT_APP_OPENAI_KEY, 10);

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