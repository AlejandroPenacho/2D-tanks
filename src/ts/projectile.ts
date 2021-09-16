import * as cls from "./collision";
import { GravityWell } from "./tank";
import { DirectorTalker, PetitionType} from "./object_commons";
import { Effect } from "./effect";

export enum ProjState {
    Alive,
    Dead,
    Bounce,
    Laying
}

export class Projectile extends cls.CollidableObject {
    state: ProjState;
    position: number[];
    velocity: number[];
    angle: number;
    angular_speed: number;
    director_talker: DirectorTalker;

    constructor(position, angle){

        super({object_type: "projectile"}, [
            new cls.CircleCollider(()=> this.position, ()=> 3, ()=> this.velocity)
        ]);

        let adimensional_speed = 20;
        this.state = ProjState.Alive
        this.position = position;
        this.angle = angle;
        this.velocity = [Math.cos, Math.sin].map((trig) => trig(angle*Math.PI/180)*adimensional_speed*10);

        this.director_talker = new DirectorTalker();
    }

    update_frame(time_step){
        if (this.state === ProjState.Alive){
            this.position = this.position.map((x,i) => {return (x + this.velocity[i]*time_step)})
        } else if (this.state === ProjState.Bounce){
            this.velocity = this.velocity.map((x) => x*0.8)
            this.position = this.position.map((x,i) => {return (x + this.velocity[i]*time_step)})
            this.angular_speed *= 0.8;
            this.angle += this.angular_speed*time_step;
            if (Math.abs(this.velocity[0]) < 0.01 && Math.abs(this.velocity[1]) < 0.01){
                this.collision_data.object_type = "pickable_projectile"
                this.state = ProjState.Laying
            }
        }
    }

    get_gravity_influence(gravity_well_list: GravityWell[], time_step: number){
        gravity_well_list.forEach((x) => {
            let denominator = Math.pow(Math.pow(this.position[0] - x.position[0], 2) + Math.pow(this.position[1] - x.position[1], 2),3/2);
            this.velocity[0] += time_step * x.strength * (x.position[0] - this.position[0])/denominator;
            this.velocity[1] += time_step * x.strength * (x.position[1] - this.position[1])/denominator;
            this.angle = Math.atan2(this.velocity[1], this.velocity[0])*180/Math.PI;
            this.update_angle();
        })
    }

    update_angle(){
        this.angle = Math.atan2(this.velocity[1], this.velocity[0])*180/Math.PI;
    }

    compute_collision(collided_data: any, displacement: number[]) {

        if (this.state === ProjState.Alive){
            if (collided_data.object_type === "tank"){
                this.state = ProjState.Dead;
                this.director_talker.ask_removal();

            } else if (collided_data.object_type === "scene") {
                this.state = ProjState.Bounce
                this.collision_data.object_type = "bouncing_projectile"

                this.position = this.position.map((x,i) => x - displacement[i])

                this.director_talker.ask_director([PetitionType.CreateEffect, new Effect(this.position as [number, number], 0.4)]);

                
                let total_displacement = Math.pow(Math.pow(displacement[0],2)+Math.pow(displacement[1],2),0.5);
                let collision_vector = displacement.map((x) => Math.abs(x)/total_displacement);

                let velocity_projection = this.velocity.map((x,i) => x*collision_vector[i]);

                this.velocity = this.velocity.map((x,i) => (x - 2*velocity_projection[i])*0.6);
                this.angular_speed = Math.random()*4000 - 2000;
            }
        }

        if (this.state !== ProjState.Alive) {
            if (collided_data.object_type === "tank"){
                this.state = ProjState.Dead
                this.director_talker.ask_removal();
            }
        }



    }
}