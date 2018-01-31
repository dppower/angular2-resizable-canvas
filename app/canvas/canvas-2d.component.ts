import { Component, ViewChild, AfterViewInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs/Subscription";
import { Context2D } from "./context-2d.directive";
import { RenderLoop } from "./render-loop";

@Component({
    selector: "canvas-2d",
    template: `
    <canvas id="canvas" context-2d canvas-controller>
        <p>{{fallback_text}}</p>
    </canvas>
    <canvas-dimensions></canvas-dimensions>
    `,
    styles: [`
    canvas {
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 0;
    }
    `]
})
export class Canvas2D implements AfterViewInit, OnDestroy {

    @ViewChild(Context2D) context_2d: Context2D;

    fallback_text = "Loading Canvas...";
    
    private update_sub_: Subscription;
    private render_sub_: Subscription;

    constructor(private render_loop_: RenderLoop) { };

    ngAfterViewInit() {
        if (!this.context_2d.createContext()) {
            this.fallback_text = "Unable to initialise canvas-2d context."
            return;
        }

        this.render_sub_ = this.render_loop_.render_events
            .subscribe(alpha => {
                this.draw();
            });

        this.update_sub_ = this.render_loop_.update_events
            .subscribe(dt => {
                this.update(dt);
            });

        this.render_loop_.begin();
    }

    update(dt: number) {
        this.context_2d.updateRectangle(dt);
    };

    draw() {
        this.context_2d.drawRectangle();
    };

    ngOnDestroy() {
        this.render_loop_.stop();
        this.update_sub_ && this.update_sub_.unsubscribe();
        this.render_sub_ && this.render_sub_.unsubscribe();
    };
}