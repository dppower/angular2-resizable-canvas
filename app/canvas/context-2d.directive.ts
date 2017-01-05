import { Directive, ElementRef, HostBinding, Input, Host, Inject, forwardRef } from "@angular/core";

import { Canvas2D } from "./canvas-2d.component";

@Directive({
    selector: "[context-2d]"
})
export class Context2D {

    //@Input("canvas-width") canvas_width: number;
    //@Input("canvas-height") canvas_height: number;

    @HostBinding("width") @Input("canvas-width") canvas_width: number;
    @HostBinding("height") @Input("canvas-height") canvas_height: number;

    position_x = 0;
    position_y = 200;

    private c2d: CanvasRenderingContext2D;

    constructor(private canvas_ref: ElementRef/*, @Inject(forwardRef(() => Canvas2D)) private canvas: Canvas2D*/) { };

    createContext() {
        this.c2d = (<HTMLCanvasElement>this.canvas_ref.nativeElement).getContext("2d");
        if (this.c2d) return true;
        return false;
    };

    drawRectangle() {
        this.clearCanvas();
        this.c2d.fillStyle = "orange";
        this.position_x += 1;
        this.c2d.fillRect(this.position_x, this.position_y, 100, 100);
    };

    clearCanvas() {
        this.c2d.clearRect(0, 0, this.canvas_width, this.canvas_height);
        //this.c2d.clearRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
    };
};