import { Directive, ElementRef, OnInit } from "@angular/core";

import { Canvas2D } from "./canvas-2d.component";
import { CanvasSettings } from "./canvas-settings";

@Directive({
    selector: "[context-2d]"
})
export class Context2D implements OnInit {
    
    position_x = 200;
    position_y = 200;
    rectangle_width: number;
    rectangle_height: number;

    get canvas_width() {
        return (<HTMLCanvasElement>this.canvas_ref_.nativeElement).width;
    };

    get canvas_height() {
        return (<HTMLCanvasElement>this.canvas_ref_.nativeElement).height;
    };

    get client_width() {
        return (<HTMLCanvasElement>this.canvas_ref_.nativeElement).clientWidth;
    };

    get client_height() {
        return (<HTMLCanvasElement>this.canvas_ref_.nativeElement).clientHeight;
    };

    private context_2d_: CanvasRenderingContext2D;

    constructor(private canvas_ref_: ElementRef, private canvas_settings_: CanvasSettings) { };

    ngOnInit() {
        this.canvas_settings_.rectangle_size.subscribe(size => {
            this.rectangle_width = size.width;
            this.rectangle_height = size.height;
        });
    };

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

        let w = Math.round(this.canvas_width * (this.rectangle_width / this.client_width));
        let h = Math.round(this.canvas_height * (this.rectangle_height / this.client_height));
        let x = Math.round(this.canvas_width * (this.position_x / this.client_width));
        let y = Math.round(this.canvas_height * (this.position_y / this.client_height));

        this.context_2d_.fillRect(x, y, w, h);
    };

    clearCanvas() {
        this.context_2d_.fillStyle = "rgb(125, 125, 125)";
        this.context_2d_.fillRect(0, 0, this.canvas_width, this.canvas_height);
    };
};