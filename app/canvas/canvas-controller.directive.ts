import { Directive, HostListener, HostBinding, ElementRef } from "@angular/core";

import { distinctUntilChanged, debounceTime } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";

@Directive({
    selector: "[canvas-controller]",
})
export class CanvasController {

    @HostBinding("width") canvas_width: number;
    @HostBinding("height") canvas_height: number;

    get client_width() {
        let width = (<HTMLCanvasElement>this.canvas_ref_.nativeElement).clientWidth;
        return width > 1920 ? 1920 : width;
    };

    get client_height() {
        let height = (<HTMLCanvasElement>this.canvas_ref_.nativeElement).clientHeight;
        return height > 1080 ? 1080 : height;
    };

    readonly resize_events = new Subject<{ width: number, height: number }>();
    private resize_sub_: Subscription;

    is_focused = false;

    constructor(private canvas_ref_: ElementRef) { };

    ngOnInit() {
        this.resize_sub_ = this.resize_events
            .pipe(
                distinctUntilChanged((x, y) => x.width === y.width && x.height === y.height),
                debounceTime(100)
            )
            .subscribe((changes) => {
                //this.input_manager_.aspect = changes.width / changes.height;
                this.canvas_width = changes.width;
                this.canvas_height = changes.height;
                console.log(`changes width: ${changes.width}, height: ${changes.height}.`);
            });
    };

    ngDoCheck() {
        this.resize_events.next({ width: this.client_width, height: this.client_height });
    };

    @HostListener("mouseover", ["$event", "true"])
    @HostListener("mouseout", ["$event", "false"])
    setFocus(event: MouseEvent, should_focus: boolean) {
        this.is_focused = should_focus;       
        return false;
    };

    @HostListener("contextmenu")
    preventContextMenu() {
        return false;
    };

    ngOnDestroy() {
        this.resize_sub_.unsubscribe();
    };
}