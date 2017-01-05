import { Component, ViewChild, Input} from "@angular/core";

import { CanvasFrame } from "./canvas-frame.directive";
import { CanvasController } from "./canvas-controller.component";
import { Context2D } from "./context-2d.directive";

@Component({
    selector: 'canvas-2d',
    template: `
    <canvas id="canvas" context-2d
        [canvas-width]="canvasWidth" 
        [canvas-height]="canvasHeight"
        [style.width.px]="styleWidth" 
        [style.height.px]="styleHeight" 
        [style.top.px]="styleTop" 
        [style.left.px]="styleLeft"            
    ><p>{{fallbackText}}</p></canvas>
    `,
    styles: [`
    #canvas {
        position: absolute;
        z-index: 1;
        border: 0.1em solid red;
    }
    `]
})
export class Canvas2D {

    @ViewChild(Context2D) c2d: Context2D;

    fallbackText = "Loading Canvas...";

    styleWidth: number;
    styleHeight: number;
    styleTop: number;
    styleLeft: number;

    canvasWidth: number;
    canvasHeight: number;

    constructor() { };

    initialise() {
        return new Promise<boolean>((resolve, reject) => {
            if (this.c2d.createContext()) {
                resolve(true);
            }
            else {
                this.fallbackText = "Unable to initialise canvas-2d context."
                reject();
            }
        });
    }

    draw() {
        this.c2d.drawRectangle();
    };
}