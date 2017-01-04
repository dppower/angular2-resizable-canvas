import {
    Component,
    ViewChild,
    ContentChild,
    AfterViewInit,
    AfterViewChecked,
    AfterContentChecked,
}
from "@angular/core";

import { CanvasFrame } from "./canvas-frame.directive";
import { Canvas2D } from "./canvas-2d.component";


@Component({
    selector: "canvas-controller",
    template: `
    <div #frame id="frame" canvas-frame
        [frameHeight]="frame.offsetHeight"
        [frameWidth]="frame.offsetWidth"
        [frameTop]="frame.offsetTop"
        [frameLeft]="frame.offsetLeft"
        (mouseover)="setFocus($event)" 
        (contextmenu)="false"  
    ></div>
    `,
    styles: [`
    #frame {
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 5;
        border: 0.25em dashed white;
    }
    `]
})
export class CanvasController {
    @ViewChild(CanvasFrame) canvas_frame: CanvasFrame;

    constructor() { };

    setFocus(event: MouseEvent) {
        (<HTMLElement>event.target).focus();
    };

    isCanvasResizing() {
        return this.canvas_frame.isCanvasResizing();
    };

    updateCanvasDimensions(canvas: Canvas2D) {
        canvas.canvasHeight = this.canvas_frame.frameHeight;
        canvas.canvasWidth = this.canvas_frame.frameWidth;

        canvas.styleHeight = this.canvas_frame.frameHeight;
        canvas.styleWidth = this.canvas_frame.frameWidth;
        canvas.styleTop = this.canvas_frame.frameTop;
        canvas.styleLeft = this.canvas_frame.frameLeft;
    };
}