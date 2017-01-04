import { Component, ViewChild, AfterViewInit, OnDestroy, NgZone } from "@angular/core";

import { CanvasController } from "./canvas/canvas-controller.component";
import { Canvas2D } from "./canvas/canvas-2d.component";
import { CanvasBackground } from "./canvas/canvas-background.component";

@Component({
    selector: "app-component",
    template: `
        <canvas-background [background-color]="'rgb(125, 125, 125)'"></canvas-background>
        <canvas-2d></canvas-2d>
        <canvas-controller></canvas-controller>
    `
})
export class AppComponent implements AfterViewInit, OnDestroy {

    @ViewChild(CanvasController) controller: CanvasController;
    @ViewChild(Canvas2D) canvas: Canvas2D;

    private cancel_token: number;
    private previous_time = 0;
    private time_step = 1000 / 60.0;
    private accumulated_time = 0;

    constructor(private ng_zone: NgZone) { };

    ngAfterViewInit() {
        this.canvas.initialise().then(init => {
            if (init) {
                //this.ng_zone.runOutsideAngular(() => {
                    this.cancel_token = requestAnimationFrame(() => {
                        this.update();
                    });
                //});
            }
            else {
            }
        });
    };

    update() {
        this.cancel_token = requestAnimationFrame(() => {
            this.update();
        });

        this.controller.updateCanvasDimensions(this.canvas);

        let time_now = window.performance.now();
        let delta_time = time_now - this.previous_time;
        this.accumulated_time += delta_time;
        while (this.accumulated_time > this.time_step) {
            // Update
            this.accumulated_time -= this.time_step;
        }

        // Draw scene
        this.canvas.draw();
        //if (!this.canvas_controller.isCanvasResizing()) {
        //this.c2d.drawRectangle();
        //}

        this.previous_time = time_now;
    };

    ngOnDestroy() {
        cancelAnimationFrame(this.cancel_token);
    };
}