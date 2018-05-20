import { Mediator } from "./mediator";

export abstract class Component {
    constructor(protected elem: HTMLElement, protected mediator: Mediator) {}

    protected abstract init(): void;

    protected notify(event: string, data: any): void {
        this.mediator.publish(event, data);
    } 
}