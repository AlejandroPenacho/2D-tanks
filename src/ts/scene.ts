import * as cls from "./collision";

export class Scene {
    collision_elements: cls.Collider[];
    dimensions: number[];

    constructor(){
        this.dimensions = [508, 285.75];
        let block_0  = [363.45953, 152.77066];
        let dim_0 = [57.877335, 60.396374];
        this.collision_elements = [
            new cls.LineCollider(() => [0,0],       () => [508,0],      () => [0,0]),
            new cls.LineCollider(() => [0,0],       () => [0,285.75],   () => [0,0]),
            new cls.LineCollider(() => [508,0],     () => [0,285.75],   () => [0,0]),
            new cls.LineCollider(() => [0,285.75],  () => [508, 0],     () => [0,0]),

            new cls.LineCollider(() => block_0,                             () => [dim_0[0],0],     () => [0,0]),
            new cls.LineCollider(() => block_0,                             () => [0,dim_0[1]],     () => [0,0]),
            new cls.LineCollider(() => [block_0[0]+dim_0[0], block_0[1]],   () => [0,dim_0[1]],     () => [0,0]),
            new cls.LineCollider(() => [block_0[0], block_0[1]+dim_0[1]],   () => [dim_0[0],0],     () => [0,0]),
        ]
    }
    compute_collision(displacement: number[]) {
        
    }
}