import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

// Components
import { Canvas2D } from "./canvas-2d.component";
import { CanvasDimensions } from "./canvas-dimensions.component";

// Directives
import { Context2D } from "./context-2d.directive";
import { CanvasController } from "./canvas-controller.directive";
// Providers
import { InputManager } from "./input-manager";
import { RenderLoop } from "./render-loop";
import { CanvasSettings } from "./canvas-settings";

@NgModule({
    imports: [ CommonModule, ReactiveFormsModule ],
    declarations: [ Canvas2D, CanvasController, Context2D, CanvasDimensions ],
    providers: [ RenderLoop, InputManager, CanvasSettings ],
    exports: [ Canvas2D ]
})
export class CanvasModule { };