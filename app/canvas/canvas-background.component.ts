import { Component, Input } from "@angular/core";

@Component({
    selector: "canvas-background",
    template: `
        <div id="background" [style.backgroundColor]="backgroundColor"></div>
    `,
    styles: [`
        #background {
            height: 100%;
            width: 100%;
            position: absolute;
            z-index: 0;
        }
    `]
})
export class CanvasBackground {
    @Input("background-color") backgroundColor: string;
};