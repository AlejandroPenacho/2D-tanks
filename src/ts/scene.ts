import * as cls from "./collision";

export class Scene {
    object_type: string;
    collision_elements: cls.Collider[];
    dimensions: number[];

    constructor(){
        this.object_type = "scene";
        this.dimensions = [508, 285.75];
        let block_0  = [363.45953, 152.77066];
        let dim_0 = [57.877335, 60.396374];
        this.collision_elements = [
            new cls.RectangleCollider(() => this.dimensions.map((x)=> x/2), () => this.dimensions, cls.RectType.Exterior),
            new cls.RectangleCollider(() => [392.398, 182.968], ()=> [57.877335, 60.396374], cls.RectType.Interior)
//             new cls.LineCollider(() => block_0,                             () => [dim_0[0],0],     () => [0,0]),
//             new cls.LineCollider(() => block_0,                             () => [0,dim_0[1]],     () => [0,0]),
//             new cls.LineCollider(() => [block_0[0]+dim_0[0], block_0[1]],   () => [0,dim_0[1]],     () => [0,0]),
//             new cls.LineCollider(() => [block_0[0], block_0[1]+dim_0[1]],   () => [dim_0[0],0],     () => [0,0]),
        ]
    }
    compute_collision(displacement: number[]) {
        
    }
}