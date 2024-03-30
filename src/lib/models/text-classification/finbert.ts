import {TextClassificationBaseModel} from "@/lib/models/base";


export class FinBert extends TextClassificationBaseModel {
    public static readonly endpoint = 'https://api.deepinfra.com/v1/inference/ProsusAI/finbert';
    constructor(authToken: string) {
        super(FinBert.endpoint, authToken);
    }
}
