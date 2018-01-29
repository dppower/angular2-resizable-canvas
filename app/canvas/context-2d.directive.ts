import { Directive, ElementRef, HostBinding, Input, Host, Inject, forwardRef } from "@angular/core";

import { Canvas2D } from "./canvas-2d.component";

@Directive({
    selector: "[context-2d]"
})
export class Context2D {

    @HostBinding("width") @Input("canvas-width") canvas_width: number;
    @HostBinding("height") @Input("canvas-height") canvas_height: number;

    @HostBinding("style.width.px") @Input("client-width") client_width: number;
    @HostBinding("style.height.px") @Input("client-height") client_height: number;

    position_x = 0;
    position_y = 200;
    rect_w = 100;
    rect_h = 150;

    private c2d: CanvasRenderingContext2D;

    constructor(private canvas_ref: ElementRef) { };

    createContext() {
        this.c2d = (<HTMLCanvasElement>this.canvas_ref.nativeElement).getContext("2d");
        if (this.c2d) return true;
        return false;
    };

    updateRectangle(dt: number) {
        this.position_x += (0.05 * dt);
    };

    drawRectangle() {
        this.clearCanvas();
        this.c2d.fillStyle = "orange";

        let w = Math.trunc(this.rect_w * this.canvas_width / this.client_width);
        let h = Math.trunc(this.rect_h * this.canvas_height / this.client_height);
        let x = Math.trunc(this.position_x * this.canvas_width / this.client_width);
        let y = Math.trunc(this.position_y * this.canvas_height / this.client_height);

        this.c2d.fillRect(x, y, w, h);
    };

    clearCanvas() {
        this.c2d.clearRect(0, 0, this.canvas_width, this.canvas_height);
    };
};