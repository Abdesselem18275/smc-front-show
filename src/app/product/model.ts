
export class FilterCategory {
    category: string;
    choices: {key: string , value: string}[] = [];

    constructor(options: {
        category?: string
        choices?: {key: string , value: string}[]
    } = {}) {
        this.category = options.category || '';
        this.choices = options.choices || [];
    }



}
