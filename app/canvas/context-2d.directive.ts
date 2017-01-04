import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: "[context-2d]"
})
export class Context2D {

    private c2d: CanvasRenderingContext2D;

    constructor(private canvas_ref: ElementRef) { };

    createContext() {
        this.c2d = (<HTMLCanvasElement>this.canvas_ref.nativeElement).getContext("2d");
        if (this.c2d) return true;
        return false;
    };

    drawRectangle() {
        this.c2d.fillStyle = "orange";
        this.c2d.fillRect(200, 200, 100, 100);
    };
};