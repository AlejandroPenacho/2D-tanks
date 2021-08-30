
export class Player {
    position: number[];
    speed: number[];
    acceleration: number[];
    max_speed: number;
    max_acceleration: number;
    brake_acceleration: number;
    keys: Array<string>;
    scene_dimensions: number[];

    constructor(keys: Array<string>, scene_dimensions: number[]){

        let side_time = 6000;
        let acceleration_time = 20;

        this.position = [0, 0];
        this.speed = [0, 0];
        this.acceleration = [0, 0];
        this.max_speed = scene_dimensions[0]/side_time;
        this.max_acceleration = this.max_speed / acceleration_time;
        this.brake_acceleration = this.max_speed / acceleration_time;
        this.keys = keys;
        this.scene_dimensions = scene_dimensions;
    }

    update_speed(key_pressed){
        if (key_pressed[this.keys[0]] && !key_pressed[this.keys[2]]) {
            this.acceleration[1] = -this.max_acceleration;
        } else if (!key_pressed[this.keys[0]] && key_pressed[this.keys[2]]) {
            this.acceleration[1] = this.max_acceleration;
        } else {
            this.acceleration[1] = 0;
        }
        if (key_pressed[this.keys[1]] && !key_pressed[this.keys[3]]) {
            this.acceleration[0] = this.max_acceleration;
        } else if (!key_pressed[this.keys[1]] && key_pressed[this.keys[3]]) {
            this.acceleration[0] = -this.max_acceleration;
        } else {
            this.acceleration[0] = 0;
        }
    }

    update_frame(time_step) {
        this.speed = this.speed.map((v,i) => {
            if (this.acceleration[i] !== 0) {
                return Math.max(Math.min(v + this.acceleration[i]*time_step, this.max_speed), -this.max_speed)
            } else {
                if (v > 0) {
                    return Math.max(v - this.brake_acceleration, 0)
                } else {
                    return Math.min(v + this.brake_acceleration, 0)   
                }
            }
        })
        this.position = this.position.map((x,i) => {return (x + this.speed[i]*time_step)})
    }
}