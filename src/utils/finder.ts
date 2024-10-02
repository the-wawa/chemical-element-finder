import elements from "../elements.json"

let sortedElements = elements.sort((a, b) => b.length - a.length)
interface MatchStatus
{
    isComplete: boolean,
    elementNames: Array<string>
}

export default class Finder
{
    constructor(source: string)
    {
        this.src = source.replace(/[\s\!\?\.\,]+/g, "");
    }
    
    private src: string;
    private index: number = 0;

    private findNextElement(): string | undefined
    {
        for (let elementName of sortedElements)
        {
            if (this.src.substring(this.index, this.index + elementName.length).toLowerCase() === elementName.toLowerCase())
                return elementName;
        }

        return undefined;
    }

    public getMatchingElements(): MatchStatus
    {
        let status: MatchStatus = { isComplete: false, elementNames: [] };
        while (this.src.length > this.index)
        {
            let elementName = this.findNextElement();
            if (elementName == undefined)
                break;

            this.index += elementName.length;
            status.elementNames.push(elementName);
        }

        status.isComplete = this.index >= this.src.length;
        return status;
    }
}