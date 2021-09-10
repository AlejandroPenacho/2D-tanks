import * as cls from "./collision";

export class Scene extends cls.CollidableObject{
    dimensions: number[];

    constructor(){

        let dimensions = [508, 285.75];
        let block_0  = [363.45953, 152.77066];
        let dim_0 = [57.877335, 60.396374];

        super({object_type: "scene"}, [
            cls.rectangle_from_svg([0, 0], dimensions, cls.RectType.Exterior),
            cls.rectangle_from_svg(block_0, dim_0, cls.RectType.Interior)
        ]);

        this.dimensions = dimensions;


    }
    compute_collision(collision_data, displacement: number[]) {
        
    }
}