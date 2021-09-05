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

        this.update_objects(time_step, pressed_keys);
        this.compute_all_collision();


        this.projectiles = this.projectiles.filter((x) => {
            return x.state !== ply.ProjState.Dead;
        })
        
        this.tanks = this.tanks.map((tank) => {
            if (tank.state.health <= 0){
                return new ply.Tank([100,100], tank.keys, this.scenery.dimensions)
            } else {
                return tank
            }
        })


    }


    compute_all_collision(){

        // Collisions of projectiles with others
        this.projectiles.forEach((projectile) => {
            cls.compute_collision(projectile, this.scenery);
            this.tanks.forEach((tank) => {
                cls.compute_collision(projectile, tank);
            })
        })

        // Collisions of tanks with scenenery
        this.tanks.forEach((tank) => {
            cls.compute_collision(tank, this.scenery);
        });

        // Collisions between tanks
        for (let i=0; i< (this.tanks.length-1); i++){
            for (let j=i+1; j < this.tanks.length; j++){
                cls.compute_collision(this.tanks[i], this.tanks[j]);
            }
        }
    }

    update_objects(time_step, pressed_keys){
        this.tanks.forEach((x) => {x.update_frame(time_step, pressed_keys)});
        this.projectiles.forEach((x) => {x.get_gravity_influence(this.gravity_wells, time_step); x.update_frame(time_step)});
    }

}