import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Subscription } from "rxjs/Subscription";
import { combineLatest as rxCombineLatest } from "rxjs/observable/combineLatest";
import { filter, map, distinctUntilChanged, sample, tap } from "rxjs/operators";
import { CanvasSettings } from "./canvas-settings";

@Component({
    selector: "canvas-dimensions",
    template: `   
    <form id="resolution-form" [formGroup]="canvas_resolution" novalidate>
        <p>Resolution</p>
        <label>W: <input formControlName="width" type="number" step="10" min="300" max="1920"></label>
        <label>H: <input formControlName="height" type="number" step="10" min="150" max="1080"></label>
        <input formControlName="use_settings" type="checkbox">
    </form>    
    <form id="dimensions-form" [formGroup]="rectangle_size" novalidate>
        <p>Dimensions</p>
        <label>W: <input formControlName="width" type="number" step="10" min="100" max="400"></label>
        <label>H: <input formControlName="height" type="number" step="10" min="100" max="400"></label>
    </form>
    `,
    styles: [`
    :host {
        position: absolute;
        z-index: 1;
        display: flex;
        flex-direction: column;
        margin: 16px;
        background-color: #fbf1e494;
    }
    form {
        display: flex;
        margin: 4px;
    }
    p {
        line-height: 32px;
        height: 32px;
        width: 100px;
    }
    input {
        padding-left: 2px;
        height: 32px;
        width: 80px;
    }
    input.ng-invalid {
        color: red;
    }
    input[type="checkbox"] {
        height: 28px;
        width: 28px;
        margin: 2px;
    }
    `]
})
export class CanvasDimensions implements OnInit, AfterViewInit, OnDestroy {
    
    canvas_resolution = new FormGroup({
        width: new FormControl(1280, [Validators.required, Validators.min(300), Validators.max(1920)]),
        height: new FormControl(720, [Validators.required, Validators.min(150), Validators.max(1080)]),
        use_settings: new FormControl(false)
    });

    rectangle_size = new FormGroup({
        width: new FormControl(100, [Validators.required, Validators.min(100), Validators.max(400)]),
        height: new FormControl(150, [Validators.required, Validators.min(100), Validators.max(400)])
    });

    private resolution_sub_: Subscription;
    private size_sub_: Subscription;

    constructor(private canvas_settings_: CanvasSettings) { };

    ngOnInit() {
        this.resolution_sub_ =
            this.canvas_resolution.valueChanges.pipe(
                sample(
                    this.canvas_resolution.statusChanges
                        .pipe(filter(status => status === "VALID"))
                ),
                distinctUntilChanged((x, y) => {
                    return (x.width === y.width && x.height === y.height) &&
                        (x.use_settings === y.use_settings === true);
                }),
                filter(value => value.use_settings),
                map(value => {
                    return { width: value.width, height: value.height };
                })
            )        
            .subscribe(this.canvas_settings_.canvas_resolution);

        this.size_sub_ =
            this.rectangle_size.valueChanges.pipe(
                sample(
                    this.rectangle_size.statusChanges
                        .pipe(filter(status => status === "VALID"))
                ),
                distinctUntilChanged((x, y) => x.width === y.width && x.height === y.height)
            )
            .subscribe(this.canvas_settings_.rectangle_size);

    };

    ngAfterViewInit() {
        setTimeout(() => {
            this.canvas_resolution.patchValue({
                use_settings: true
            });
            this.rectangle_size.updateValueAndValidity();
        }, 0);
    };

    ngOnDestroy() {
        this.resolution_sub_.unsubscribe();
        this.size_sub_.unsubscribe();
        this.canvas_settings_.unsubscribe();
    };
}