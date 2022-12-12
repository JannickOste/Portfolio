
import {Configuration, OpenAIApi} from "openai";

/**
 * OpenAI GPT-3 Model.
 * 
 * For more information: https://beta.openai.com/docs/models/gpt-3
 */
export enum GPT3Model {
    /**
     * Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, 
     * longer output and better instruction-following. Also supports inserting completions within text.
     */
    TEXT_DAVINCI_V3 = "text-davinci-003",
    /**
     * 	Very capable, but faster and lower cost than Davinci.
     */
    TEXT_CURIE_V1 = "text-curie-001",

    /**
     * Capable of straightforward tasks, very fast, and lower cost.
     */
    TEXT_BABBAGE_V1 = "text-babbage-001",

    /**
     * Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.
     */
    TEXT_ADA_V1 = "text-ada-001"
}

type OpenAIProps = {
    model:GPT3Model;
    apiKey:string;
    creditLimit:number;
}

class OpenAI
{
    
    private readonly client: OpenAIApi;
    private readonly apiProperties: OpenAIProps;
    
    constructor({props :{model, apiKey, creditLimit}}:{props:OpenAIProps})//apiKey:string|undefined, creditLimit:number)
    {  
        this.client = new OpenAIApi(new Configuration({
            apiKey: apiKey
        }));
        
        this.apiProperties = {
            model: model,
            creditLimit: creditLimit,
            apiKey: apiKey
        }
    }

    private static _singleton: OpenAI;
    public static get Singleton()
    {
        if(this._singleton === undefined)
            this._singleton = new OpenAI({props: {
                apiKey: process.env.REACT_APP_OPENAI_KEY as string, 
                creditLimit: 10,
                model: GPT3Model.TEXT_DAVINCI_V3
            }
        });

        return this._singleton;
    }


    public getResponse = (conversation: string) => this.client.createCompletion({
        model: this.apiProperties.model, 
        prompt: conversation, 
        max_tokens: this.apiProperties.creditLimit, 
        stop: ["Human:\n", "AI:\n"]
    }); 

    public getImage = (query: string) => this.client.createImage({
        prompt: query,
        n: 1,
        size: "256x256",
        response_format: "url"
    }); 
}

export default OpenAI;