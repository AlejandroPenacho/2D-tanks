import * as cls from "./collision";
import { Effect } from "./effect";
import { DirectorTalker, PetitionType } from "./object_commons";
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
    damaged_points: Array<[number, number]>;
    director_talker: DirectorTalker;

    constructor(position: number[], keys: TankKeys){
        
        super({object_type: "tank"}, [
            new cls.CircleCollider(
            () => {return this.state.position},
            () => {return 4},
            () => {return [this.state.speed*Math.cos(this.state.angle*Math.PI/180),
                            this.state.speed*Math.sin(this.state.angle*Math.PI/180)]}
        )]);

        this.director_talker = new DirectorTalker();
        this.damaged_points = [];

        let adimensional_max_speed = 4;
        let acceleration_time = 0.4;

        this.ammo = 8;

        this.state = {
            position : position,
            speed : 0,
            angle: 0,
            angular_speed: 0,
            health: 100
        };
        this.stats = {
            max_speed: adimensional_max_speed*10,
            acceleration: adimensional_max_speed*10 / acceleration_time,
            angular_acceleration: 2000,
            max_angular_speed: 200
        }

        this.keys = keys;

    }

    shoot(): [boolean, Projectile] {
        if (this.ammo !== 0){
            this.ammo = this.ammo - 1;
            this.state.speed -= 20;
            this.state.angular_speed += (Math.random()-0.5) * 800;

            let initial_position = [
                this.state.position[0] + 4*Math.cos(this.state.angle*Math.PI/180),
                this.state.position[1] + 4*Math.sin(this.state.angle*Math.PI/180)
            ]

            this.director_talker.ask_director([PetitionType.CreateEffect, new Effect(initial_position as [number, number], 0.8)]);

            return [true, new Projectile(   initial_position, 
                                            this.state.angle)
            ]
            
        } else {
            return [false, new Projectile(  this.state.position, 
                                            this.state.angle)
            ]
        }
    }

    compute_collision (collided_data, displacement: number[]) {
        if (collided_data.object_type === "projectile"){
            this.state.health -= 40;
            let distance = Math.pow(Math.pow(displacement[0],2)+Math.pow(displacement[1],2),0.5);
            let collision_position = [
                this.state.position[0] + displacement[0],
                this.state.position[1] + displacement[1]
            ];

            this.director_talker.ask_director([PetitionType.CreateEffect, new Effect(collision_position as [number, number], 0.9)]);
            this.damaged_points.push([Math.random()*10 - 5, Math.random()*5.7-4.4])
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
                        [-this.stats.max_angular_speed*Math.abs(this.state.speed)/this.stats.max_speed, 
                          this.stats.max_angular_speed*Math.abs(this.state.speed)/this.stats.max_speed]);

        } else if (!pressed[this.keys.right] && pressed[this.keys.left]) {
            this.state.angular_speed = clamped_change(this.state.angular_speed, -this.stats.angular_acceleration*time_step, 
                        [-this.stats.max_angular_speed*Math.abs(this.state.speed)/this.stats.max_speed, 
                          this.stats.max_angular_speed*Math.abs(this.state.speed)/this.stats.max_speed]);

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

export class DeadTank {
    duration: [number, number];
    exploding: boolean;
    current_time: number;
    trajectory_angle: number;
    position: [number, number]
    speed: number;
    angle: number;
    angular_speed: number;
    director_talker: DirectorTalker;
    flame_positions: Array<[number, number]>;
    flame_speeds: Array<[number, number]>;
    size: number;
    max_size: number;

    constructor(position: [number, number], angle: number, trajectory_angle: number){
        this.duration = [2, 1.5];
        this.current_time = 0;
        this.size = 1;
        this.max_size = 10;
        this.exploding = false;
        this.position = position;
        this.trajectory_angle = trajectory_angle;
        this.speed = 60;
        this.angle = angle;
        this.angular_speed = 200;
        this.flame_positions = [[Math.random()*8+1, Math.random()*8+1],[Math.random()*8+1, Math.random()*8+1], [Math.random()*8+1, Math.random()*8+1]];
        this.flame_speeds = [[Math.random()*6-3, Math.random()*6-3],[Math.random()*6-3, Math.random()*6-3], [Math.random()*6-3, Math.random()*6-3]];

        this.director_talker = new DirectorTalker();
    }

    update_frame(time_step){

        this.current_time += time_step;

        if (!this.exploding){
            this.position = [
                this.position[0] + this.speed * Math.cos(this.trajectory_angle) * time_step,
                this.position[1] + this.speed * Math.sin(this.trajectory_angle) * time_step,
            ];
            this.angle += this.angular_speed * time_step;
            this.angular_speed *= 0.9;
            this.speed *= 0.9;
            
            if (this.current_time >= this.duration[0]){
                this.current_time = 0;
                this.exploding = true;
                this.director_talker.ask_director([PetitionType.GenerateVibration, 0]);
            }
            this.flame_positions = this.flame_positions.map((x, i) => [x[0] + this.flame_speeds[i][0]*time_step, x[1] + this.flame_speeds[i][1]*time_step]);
            this.flame_speeds = this.flame_speeds.map((x, i) => [x[0] + (Math.random()-0.5)*time_step, x[1] + (Math.random()-0.5)*time_step]);
        }
        else {
            this.size = 1 + this.max_size * this.current_time/this.duration[1];

            if (this.current_time >= this.duration[1]){
                this.director_talker.ask_removal();
            }           
        }
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