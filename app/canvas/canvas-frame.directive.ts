import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
    selector: "[canvas-frame]"
})
export class CanvasFrame implements OnChanges {
    @Input() frameWidth: number;
    @Input() frameHeight: number;
    @Input() frameTop: number;
    @Input() frameLeft: number;

    canvas_resizing = false;

    ngOnChanges(changes: SimpleChanges) {
        if (changes["frameWidth"] || changes["frameHeight"]) {
            this.canvas_resizing = true;
        }
    };

    isCanvasResizing() {
        if (this.canvas_resizing) {
            this.canvas_resizing = false;
            return true;
        }
        return false;
    };
}