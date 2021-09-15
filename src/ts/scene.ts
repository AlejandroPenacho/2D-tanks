import * as cls from "./collision";

export class Scene extends cls.CollidableObject{
    dimensions: number[];
    split_screen: boolean;
    window_size: number[];
    spawn_points: [number, number][];

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

    }

    compute_collision(collision_data, displacement: number[]) {
        
    }

}