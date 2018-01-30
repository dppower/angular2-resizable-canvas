import { Directive, ElementRef, HostBinding, Input, Host, Inject, forwardRef } from "@angular/core";

import { Canvas2D } from "./canvas-2d.component";

@Directive({
    selector: "[context-2d]"
})
export class Context2D {

    //@HostBinding("width") @Input("canvas-width") canvas_width: number;
    //@HostBinding("height") @Input("canvas-height") canvas_height: number;

    //@HostBinding("style.width.px") @Input("client-width") client_width: number;
    //@HostBinding("style.height.px") @Input("client-height") client_height: number;

    position_x = 0;
    position_y = 200;
    rect_w = 100;
    rect_h = 150;

    get canvas_width() {
        let width = (<HTMLCanvasElement>this.canvas_ref_.nativeElement).width;
        return width > 1920 ? 1920 : width;
    };

    get canvas_height() {
        let height = (<HTMLCanvasElement>this.canvas_ref_.nativeElement).height;
        return height > 1080 ? 1080 : height;
    };

    private context_2d_: CanvasRenderingContext2D;

    constructor(private canvas_ref_: ElementRef) { };

    createContext() {
        this.context_2d_ = (<HTMLCanvasElement>this.canvas_ref_.nativeElement).getContext("2d");
        return !!this.context_2d_;
    };

    updateRectangle(dt: number) {
        //this.position_x += (0.05 * dt);
    };

    drawRectangle() {
        this.clearCanvas();
        this.context_2d_.fillStyle = "orange";

        let w = Math.trunc(this.rect_w);
        let h = Math.trunc(this.rect_h);
        let x = Math.trunc(this.position_x);
        let y = Math.trunc(this.position_y);

        this.context_2d_.fillRect(x, y, w, h);
    };

    clearCanvas() {
        this.context_2d_.fillStyle = "rgb(125, 125, 125)";
        this.context_2d_.fillRect(0, 0, this.canvas_width, this.canvas_height);
    };
};