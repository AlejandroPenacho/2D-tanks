import * as tnk from "./tank";
import * as pjl from "./projectile";
import * as scn from "./scene";
import * as cls from "./collision";


export class Game {
    tanks: tnk.Tank[];
    scenery: scn.Scene;
    projectiles: pjl.Projectile[];
    gravity_wells: tnk.GravityWell[];

    constructor(scenery: scn.Scene, tanks: tnk.Tank[]){
        this.tanks = tanks;
        this.scenery = scenery;
        this.projectiles = [];
        this.gravity_wells = [];
    }

    get_frame(time_step: number, pressed_keys: Map<string, boolean>){

        this.update_objects(time_step, pressed_keys);
        this.compute_all_collision();


        this.projectiles = this.projectiles.filter((x) => {
            return x.state !== pjl.ProjState.Dead;
        })
        
        this.tanks = this.tanks.map((tank) => {
            if (tank.state.health <= 0){
                return new tnk.Tank(this.get_best_spawn(), tank.keys, this.scenery.dimensions)
            } else {
                return tank
            }
        })
    }

    get_best_spawn(): [number, number]{
        let min_distance = this.scenery.spawn_points.map((point) => {
            let all_distances: number[] = this.tanks.map((tank) => {
                return get_distance(point, tank.state.position);
            })
            return Math.min(...all_distances)
        });
        console.log(min_distance)
        return this.scenery.spawn_points[min_distance.indexOf(Math.max(...min_distance))];
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


function get_distance(x_0: number[], x_1: number[]): number{
    return Math.pow(Math.pow(x_0[0]-x_1[0], 2) + Math.pow(x_0[1]-x_1[1], 2),0.5)
}