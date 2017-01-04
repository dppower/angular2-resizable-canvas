import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Canvas2D } from "./canvas-2d.component";
import { CanvasFrame } from "./canvas-frame.directive";
import { CanvasController } from "./canvas-controller.component";
import { Context2D } from "./context-2d.directive";
import { CanvasBackground } from "./canvas-background.component";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ Canvas2D, CanvasFrame, CanvasController, Context2D, CanvasBackground ],
    exports: [ Canvas2D, CanvasController, CanvasBackground ]
})
export class CanvasModule { };