import {
    Component,
    ViewChild,
    ContentChild,
    AfterViewInit,
    AfterViewChecked,
    AfterContentChecked,
    HostListener
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
        (mouseover)="setFocus($event, true)"
        (mouseout)="setFocus($event, false)"
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

    @HostListener("document:mouseover", ["$event"])
    onDocumentMouseover(event: MouseEvent) {
        console.log(`Document mouse over event. Target id: ${(<HTMLDivElement>event.target).id}; currentTarget: ${event.currentTarget}, event phase: ${event.eventPhase}.`);
        console.log(`default prevented: ${event.defaultPrevented}.`);
    };

    is_focused = false;

    constructor() { };

    setFocus(event: MouseEvent, should_focus: boolean) {
        event.stopPropagation();

        this.is_focused = should_focus;
        
        return false;
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