interface TankState {
    position: number[];
    speed: number;
    angle: number;
    angular_speed: number;
}

interface TankStats {
    max_speed: number;
    max_angular_speed: number;
    acceleration: number;
    angular_acceleration: number;
}

interface TankKeys {
    up: string,
    down: string,
    left: string,
    right: string
}


export class Tank {
    state: TankState;
    stats: TankStats;
    keys: TankKeys;
    scene_dimensions: number[];

    constructor(keys: TankKeys, scene_dimensions: number[]){

        let side_time = 6000;
        let acceleration_time = 20;

        this.state = {
            position : [0, 0],
            speed : 0,
            angle: 0,
            angular_speed: 0
        };
        this.stats = {
            max_speed: scene_dimensions[0]/side_time,
            acceleration: scene_dimensions[0]/side_time / acceleration_time,
            angular_acceleration: 5,
            max_angular_speed: 0.2
        }

        this.keys = keys;
        this.scene_dimensions = scene_dimensions;
    }

    shoot() {
        return new Bullet(  this.state.position, 
                            this.state.angle,
                            this.scene_dimensions)
    }

    update_frame(time_step, pressed: Map<string, boolean>) {
        if (pressed[this.keys.up] && !pressed[this.keys.down]){
            this.state.speed = clamped_change(this.state.speed, this.stats.acceleration*time_step, 
                                                [-this.stats.max_speed, this.stats.max_speed]);
        } else if (!pressed[this.keys.up] && pressed[this.keys.down]) {
            this.state.speed = clamped_change(this.state.speed, -this.stats.acceleration*time_step, 
                [-this.stats.max_speed, this.stats.max_speed]);
        } else {
            this.state.speed = drift_to(this.state.speed, this.stats.acceleration*time_step, 0);
        }

        if (pressed[this.keys.right] && !pressed[this.keys.left]){
            this.state.angular_speed = clamped_change(this.state.angular_speed, this.stats.angular_acceleration*time_step, 
                                                    [-this.stats.max_angular_speed, this.stats.max_angular_speed]);
        } else if (!pressed[this.keys.right] && pressed[this.keys.left]) {
            this.state.angular_speed = clamped_change(this.state.angular_speed, -this.stats.angular_acceleration*time_step, 
                                                    [-this.stats.max_angular_speed, this.stats.max_angular_speed]);
        } else {
            this.state.angular_speed = drift_to(this.state.angular_speed, this.stats.angular_acceleration*time_step, 0);
        }

        this.state.angle += this.state.angular_speed * time_step;
        this.state.position = [
            this.state.position[0] + this.state.speed * time_step * Math.cos(this.state.angle*Math.PI/180),
            this.state.position[1] + this.state.speed * time_step * Math.sin(this.state.angle*Math.PI/180),
        ]
    }
}

export class Bullet {
    position: number[];
    velocity: number[];
    angle: number[];

    constructor(position, angle, scene_dimensions){
        let side_time = 1000;
        this.position = position;
        this.angle = angle;
        this.velocity = [Math.cos, Math.sin].map((trig) => trig(angle*Math.PI/180)*scene_dimensions[0]/side_time)
    }

    update_frame(time_step){
        this.position = this.position.map((x,i) => {return (x + this.velocity[i]*time_step)})
    }
}

function clamped_change(x0: number, delta: number, limits: [number, number]){
    return Math.max(Math.min(x0 + delta, limits[1]), limits[0])
}
function drift_to(x0: number, delta_x: number, obj: number){
    if (x0>obj){
        return Math.max(x0 - delta_x, obj)
    } else {
        return Math.min(x0 + delta_x, obj)
    }
}