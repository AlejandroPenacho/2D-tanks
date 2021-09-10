import * as cls from "./collision";
import {Projectile} from "./projectile";

interface TankState {
    position: number[];
    speed: number;
    angle: number;
    angular_speed: number;
    health: number;
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
    right: string,
    shoot: string
}


export class Tank extends cls.CollidableObject {
    state: TankState;
    stats: TankStats;
    ammo: number;
    keys: TankKeys;
    scene_dimensions: number[];

    constructor(position: number[], keys: TankKeys, scene_dimensions: number[]){
        
        super({object_type: "tank"}, [
            new cls.CircleCollider(
            () => {return this.state.position},
            () => {return 4},
            () => {return [this.state.speed*Math.cos(this.state.angle*Math.PI/180),
                            this.state.speed*Math.sin(this.state.angle*Math.PI/180)]}
        )]);

        let side_time = 6000;
        let acceleration_time = 200;

        this.ammo = 8;

        this.state = {
            position : position,
            speed : 0,
            angle: 0,
            angular_speed: 0,
            health: 100
        };
        this.stats = {
            max_speed: scene_dimensions[0]/side_time,
            acceleration: scene_dimensions[0]/side_time / acceleration_time,
            angular_acceleration: 0.5,
            max_angular_speed: 0.2
        }

        this.keys = keys;
        this.scene_dimensions = scene_dimensions;

    }

    shoot(): [boolean, Projectile] {
        if (this.ammo !== 0){
            this.ammo = this.ammo - 1;
            return [true, new Projectile(   this.state.position, 
                                            this.state.angle,
                                            this.scene_dimensions)
            ]
        } else {
            return [false, new Projectile(  this.state.position, 
                                            this.state.angle,
                                            this.scene_dimensions)
            ]
        }
    }

    compute_collision (collided_data, displacement: number[]) {
        if (collided_data.object_type === "projectile"){
            this.state.health -= 20;
            return 
        }

        if (collided_data.object_type === "bouncing_projectile"){
            this.ammo = this.ammo + 1;
            this.state.health -= 5;
            return
        }

        if (collided_data.object_type === "pickable_projectile"){
            this.ammo = this.ammo + 1;
            return
        }

        this.state.speed = 0;
        this.state.position = this.state.position.map((x, i) => {
            return (x - displacement[i])
        });
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



export class GravityWell {
    position: number[];
    strength: number;
    constructor(position, strength) {
        this.position = position;
        this.strength = strength;
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