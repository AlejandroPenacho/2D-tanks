import { DirectorTalker } from "./object_commons";


export class Effect {
    duration: number;
    current_time: number;
    position: [number, number];
    opacity: number;
    director_talker: DirectorTalker;

    constructor(position: [number, number], duration: number){
        this.current_time = 0;
        this.duration = duration;
        this.position = position;

        this.opacity = 1;

        this.director_talker = new DirectorTalker();
    }

    update_frame(time_step: number){
        this.current_time += time_step;
        this.opacity = (this.duration - this.current_time)/this.duration;
        if (this.current_time >= this.duration){
            this.director_talker.ask_removal();
        }
    }
}