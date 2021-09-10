import * as cls from "./collision";

export class Scene extends cls.CollidableObject{
    dimensions: number[];

    constructor(){
        super({object_type: "scene"}, [
            new cls.RectangleCollider(() => this.dimensions.map((x)=> x/2), () => this.dimensions, cls.RectType.Exterior),
            new cls.RectangleCollider(() => [392.398, 182.968], ()=> [57.877335, 60.396374], cls.RectType.Interior)
        ]);

        this.dimensions = [508, 285.75];
        let block_0  = [363.45953, 152.77066];
        let dim_0 = [57.877335, 60.396374];

    }
    compute_collision(collision_data, displacement: number[]) {
        
    }
}