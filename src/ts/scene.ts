import * as cls from "./collision";

export class Scene extends cls.CollidableObject{
    dimensions: number[];
    split_screen: boolean;
    window_size: number[];
    spawn_points: [number, number][];

    constructor(){

        let dimensions = [200, 150];
        let block_0  = [130, 83];
        let dim_0 = [31.09, 32.5];

        super({object_type: "scene"}, [
            cls.rectangle_from_svg([0, 0], dimensions, cls.RectType.Exterior),
            cls.rectangle_from_svg(block_0, dim_0, cls.RectType.Interior)
        ]);

        this.dimensions = dimensions;
        this.spawn_points = [[30, 30], [180, 130]];

    }

    compute_collision(collision_data, displacement: number[]) {
        
    }

}