export class PramAction {
    type?: string;
    content?: Map<string, string>;
    constructor(type: string , content: Map<string, string>) {
        this.type = type;
        this.content = content;
    }
}
