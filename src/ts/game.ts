import * as ply from "./player";
import * as scn from "./scene";
import * as cls from "./collision";


export class Game {
    tanks: ply.Tank[];
    scenery: scn.Scene;
    projectiles: ply.Projectile[];
    gravity_wells: ply.GravityWell[];

    constructor(scenery: scn.Scene, tanks: ply.Tank[]){
        this.tanks = tanks;
        this.scenery = scenery;
        this.projectiles = [];
        this.gravity_wells = [];
    }

    get_frame(time_step: number, pressed_keys: Map<string, boolean>){
        this.tanks.forEach((x) => {x.update_frame(time_step, pressed_keys)});
        this.projectiles.forEach((x) => {x.get_gravity_influence(this.gravity_wells, time_step); x.update_frame(time_step)});

        this.projectiles = this.projectiles.filter((x) => {
            return !((x.position[0] < 0) || (x.position[0] > this.scenery.dimensions[0]) || (x.position[1] < 0) || (x.position[1] > this.scenery.dimensions[1]))
        })
        this.scenery.obstacles.forEach((x) => {
            cls.compute_collision(x, this.tanks[0].collision_blocks[0]),
            cls.compute_collision(x, this.tanks[1].collision_blocks[0])
        });
        cls.compute_collision(this.tanks[0].collision_blocks[0], this.tanks[1].collision_blocks[0]);
    }
}