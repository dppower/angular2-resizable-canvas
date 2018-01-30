import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Components
import { Canvas2D } from "./canvas-2d.component";
// Directives
import { Context2D } from "./context-2d.directive";
import { CanvasController } from "./canvas-controller.directive";
// Providers
import { InputManager } from "./input-manager";
import { RenderLoop } from "./render-loop";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ Canvas2D, CanvasController, Context2D ],
    providers: [ RenderLoop, InputManager ],
    exports: [ Canvas2D ]
})
export class CanvasModule { };