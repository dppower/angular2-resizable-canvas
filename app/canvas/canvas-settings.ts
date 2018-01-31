import { Subject } from "rxjs/Subject";

export interface Dimensions {
    width: number;
    height: number;
}

export class CanvasSettings {
    
    readonly canvas_resolution = new Subject<Dimensions>();
    readonly rectangle_size = new Subject<Dimensions>();

    constructor() { };

    unsubscribe() {
        this.canvas_resolution.unsubscribe();
        this.rectangle_size.unsubscribe();
    };
}