
enum CollType {
    Line,
    Circle
}


class Collider {
    type: CollType;

    constructor(coll_type: CollType){
        this.type = coll_type;
    }
}

export class CircleCollider extends Collider {
    center: () => number[];
    radius: () => number;
    velocity: () => number[];
    collision_function: (displacement: number[]) => void;

    constructor(center: () => number[],
                radius: () => number,
                velocity: () => number[],
                collision_function: (displacement: number[]) => void){

        super(CollType.Circle);
        this.center = center;
        this.radius = radius;
        this.velocity = velocity;
        this.collision_function = collision_function;

    }
}
export class LineCollider extends Collider {
    x_0: () => number[];
    delta_x: () => number[];
    velocity: () => number[];
    collision_function: (displacement: number[]) => void;

    constructor(x_0: () => number[],
                delta_x: () => number[],
                velocity: () => number[],
                collision_function: (displacement: number[]) => void){

        super(CollType.Line);
        this.x_0 = x_0;
        this.delta_x = delta_x;
        this.velocity = velocity;
        this.collision_function = collision_function;
    }
}

export function compute_collision(element1: Collider, element2: Collider){

    if (element1.type===CollType.Circle && element2.type===CollType.Circle){
            compute_circle_2_circle_collision(element1 as CircleCollider, element2 as CircleCollider);
    }
    else if (element1.type===CollType.Circle && element2.type===CollType.Line){
        compute_line_2_circle_collision(element2 as LineCollider, element1 as CircleCollider);
    }    
    else if (element1.type===CollType.Line && element2.type===CollType.Circle) {
        compute_line_2_circle_collision(element1 as LineCollider, element2 as CircleCollider);
    }
}

function compute_circle_2_circle_collision(element1: CircleCollider, element2: CircleCollider){
    let distance = get_distance(element1.center(), element2.center());

    let displacement = element1.radius() + element2.radius() - distance;

    if (displacement <= 0){ return };

    let [relative_normal_speed, normal_vector] = compute_point_to_point_collision(element1.center(), element1.velocity(),
                                                                                  element2.center(), element2.velocity(), distance);

    if (relative_normal_speed >= 0) { return };
    
    

    element1.collision_function(normal_vector.map((x) => x*displacement))
    element2.collision_function(normal_vector.map((x) => -x*displacement))


}


function compute_line_2_circle_collision(line: LineCollider, circle: CircleCollider){


    let t = ((circle.center()[0] - line.x_0()[0])*line.delta_x()[0] + (circle.center()[1] - line.x_0()[1])*line.delta_x()[1])/
            (line.delta_x().map((x)=> Math.pow(x,2)).reduce((acc,x) => acc+x));
    
    t = Math.max(0, Math.min(t, 1));    

    let collision_point = line.x_0().map((x,i) => {return x+line.delta_x()[i]*t});

    let distance = get_distance(circle.center(), collision_point);

    let displacement = circle.radius() - distance;

    if (displacement <= 0) {return};

    let [relative_normal_speed, normal_vector] = compute_point_to_point_collision(collision_point, line.velocity(), 
                                                                                  circle.center(), circle.velocity(), distance);

    if (relative_normal_speed >= 0) { return };

    line.collision_function(normal_vector.map((x) => x*displacement))
    circle.collision_function(normal_vector.map((x) => -x*displacement))

}

function get_distance(x_0: number[], x_1: number[]){
    return Math.pow(x_0.map((x,i) => {
        return Math.pow(x-x_1[i],2)
    }).reduce((acc,x)=> acc+x),0.5);
}

function compute_point_to_point_collision(x_0: number[], v_0: number[], x_1: number[], v_1: number[], distance: number): [number, number[]] {
    
    let relative_velocity = [0,1].map((i) => {return v_1[i] - v_0[i]});
    let normal_vector = [0,1].map((i) => {return (x_1[i]-x_0[i])/distance});
    let relative_normal_speed = [0,1].reduce((acc, i) => {return acc + relative_velocity[i]*normal_vector[i]}, 0);

    return [relative_normal_speed, normal_vector]
}