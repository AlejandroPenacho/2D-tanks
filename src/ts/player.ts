
export class Player {
    position: number[];
    speed: [number, number];
    max_speed: number;
    keys: Array<string>;

    constructor(keys: Array<string>){
        this.position = [0, 0];
        this.speed = [0, 0];
        this.max_speed = 70;
        this.keys = keys;
    }

    update_speed(key_pressed){
        if (key_pressed[this.keys[0]] && !key_pressed[this.keys[2]]) {
            this.speed[1] = -this.max_speed;
        } else if (!key_pressed[this.keys[0]] && key_pressed[this.keys[2]]) {
            this.speed[1] = this.max_speed;
        } else {
            this.speed[1] = 0;
        }
        if (key_pressed[this.keys[1]] && !key_pressed[this.keys[3]]) {
            this.speed[0] = this.max_speed;
        } else if (!key_pressed[this.keys[1]] && key_pressed[this.keys[3]]) {
            this.speed[0] = -this.max_speed;
        } else {
            this.speed[0] = 0;
        }
    }

    update_frame(time_step) {
        this.position = this.position.map((x,i) => {return x + this.speed[i]*time_step/1000})
    }
}