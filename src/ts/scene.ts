import * as cls from "./collision";

interface Vibration {
    displacement: [number, number],
    amplitude: number,
    duration: number,
    current_animation_time: number,
    is_on: boolean,
    angle: number
}

export class Scene extends cls.CollidableObject{
    dimensions: number[];
    split_screen: boolean;
    window_size: number[];
    spawn_points: [number, number][];
    vibration: Vibration;

    constructor(dimensions: [number, number], blocks: Array<[[number, number],[number, number]]>, spawn_points: Array<[number, number]>){


        super({object_type: "scene"}, [
            cls.rectangle_from_svg([0, 0], dimensions, cls.RectType.Exterior),
            ...(blocks.map((x) => cls.rectangle_from_svg(x[0], x[1], cls.RectType.Interior)))
        ]
        )
//        [
//            cls.rectangle_from_svg([0, 0], dimensions, cls.RectType.Exterior),
//            cls.rectangle_from_svg(block_0, dim_0, cls.RectType.Interior)
//        ]);

        this.dimensions = dimensions;
        this.spawn_points = spawn_points;
        this.vibration = {
            displacement: [0, 0],
            amplitude: 8,
            duration: 0.4,
            current_animation_time: 0,
            is_on: false,
            angle: 0
        }

    }

    start_vibration(){
        this.vibration.is_on = true;
        this.vibration.angle = Math.random()*2*Math.PI;
        this.vibration.current_animation_time = 0;
    }

    update_frame(time_step: number){
        if (this.vibration.is_on){
            this.vibration.current_animation_time += time_step;

            if (this.vibration.current_animation_time >= this.vibration.duration){
                this.vibration.is_on = false;
                this.vibration.displacement = [0, 0];
                return
            }

            let current_angle = 8*Math.PI*this.vibration.current_animation_time;
            let current_amplitude = this.vibration.amplitude
                                    *Math.sin(current_angle)
                                    *Math.exp(-this.vibration.current_animation_time);
            this.vibration.displacement = [ current_amplitude*Math.cos(this.vibration.angle),
                                            current_amplitude*Math.sin(this.vibration.angle)]
        }
    }

    compute_collision(collision_data, displacement: number[]) {
        
    }

}