import { Injectable } from "@angular/core";

import { Vec2, Vec2_T } from "./vec2";

export interface PointerState {
    left: boolean;
    right: boolean;
    wheel: number;
    position: Vec2;
    delta: Vec2;
};

const InitialPointerState: PointerState = {
    left: false,
    right: false,
    wheel: 0,
    position: new Vec2(),
    delta: new Vec2()
};

@Injectable()
export class InputManager {

    get aspect() {
        return this.current_aspect_ratio_ || 1.5;
    };

    set aspect(value: number) {
        this.current_aspect_ratio_ = value;
    };

    get delta() {
        return this.current_pointer_state_.delta;
    };

    get position() {
        return this.current_pointer_state_.position;
    };

    get wheel() {
        return this.current_pointer_state_.wheel;
    };

    private previous_pointer_state_: PointerState;
    private current_pointer_state_: PointerState;

    private current_aspect_ratio_: number;

    constructor() {
        // Initialise state
        this.previous_pointer_state_ = Object.assign({}, InitialPointerState);
        this.current_pointer_state_ = Object.assign({}, InitialPointerState);
    };

    setMousePosition(position: Vec2_T) {
        let current_delta = Vec2.subtract(position, this.previous_pointer_state_.position);
        this.current_pointer_state_.position.copy(position);
        this.current_pointer_state_.delta.copy(current_delta);
    };

    setWheelDirection(value: 1 | -1) {
        this.current_pointer_state_.wheel = value;
    };
    
    setMouseButton(button: "left" | "right", state: boolean) {
        this.current_pointer_state_[button] = state;
    };

    isButtonDown(button: "left" | "right") {
        return this.current_pointer_state_[button];
    };

    wasButtonDown(button: "left" | "right") {
        return this.previous_pointer_state_[button];
    };

    isButtonPressed(button: "left" | "right") {
        if (this.isButtonDown(button) === true && this.wasButtonDown(button) === false) {
            return true;
        }
        return false;
    };

    wasButtonReleased(button: "left" | "right") {
        if (!this.isButtonDown(button) && this.wasButtonDown(button)) {
            return true;
        }
        return false;
    };

    update() {
        // Reset inputs
        this.previous_pointer_state_["left"] = this.current_pointer_state_["left"];
        this.previous_pointer_state_["right"] = this.current_pointer_state_["right"];
        this.previous_pointer_state_["wheel"] = this.current_pointer_state_["wheel"];
        this.previous_pointer_state_["position"].copy(this.current_pointer_state_["position"]);
        this.previous_pointer_state_["delta"].copy(this.current_pointer_state_["delta"]);

        this.current_pointer_state_["delta"].setZero();
        this.current_pointer_state_.wheel = 0;
    };
}