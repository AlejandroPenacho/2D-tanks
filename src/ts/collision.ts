import { xlink_attr } from "svelte/internal";

enum CollType {
    Line,
    Circle,
    Rectangle
}

export enum RectType {
    Interior,
    Exterior
}


export class Collider {
    type: CollType;

    constructor(coll_type: CollType){
        this.type = coll_type;
    }
}

export class CircleCollider extends Collider {
    center: () => number[];
    radius: () => number;
    velocity: () => number[];

    constructor(center: () => number[],
                radius: () => number,
                velocity: () => number[]){

        super(CollType.Circle);
        this.center = center;
        this.radius = radius;
        this.velocity = velocity;

    }
}
export class LineCollider extends Collider {
    x_0: () => number[];
    delta_x: () => number[];
    velocity: () => number[];

    constructor(x_0: () => number[],
                delta_x: () => number[],
                velocity: () => number[]){

        super(CollType.Line);
        this.x_0 = x_0;
        this.delta_x = delta_x;
        this.velocity = velocity;
    }
}

export class RectangleCollider extends Collider {
    rect_type: RectType;
    x_c: () => number[];
    dimensions: () => number[];
    
    constructor(x_c: () => number[], dimensions: () => number[], rectangle_type: RectType) {
        super(CollType.Rectangle)
        this.rect_type = rectangle_type;
        this.x_c = x_c;
        this.dimensions = dimensions;
    }
}

export function compute_collision(x1, x2){
    x1.collision_elements.forEach((x) => {
        x2.collision_elements.forEach((y) => {
            let [collision, displacement] = compute_element_collision(x, y);
            if (collision){
                x1.compute_collision(x2.object_type, displacement);
                x2.compute_collision(x1.object_type, [-displacement[0], -displacement[1]]);
            }
        })
    })
}

function compute_element_collision(element1: Collider, element2: Collider){

    if (element1.type===CollType.Circle && element2.type===CollType.Circle){
        return compute_circle_2_circle_collision(element1 as CircleCollider, element2 as CircleCollider);
    }
    else if (element1.type===CollType.Circle && element2.type===CollType.Line){
        let [collision, displacement] = compute_line_2_circle_collision(element2 as LineCollider, element1 as CircleCollider);
        return [collision, [-displacement[0], -displacement[1]]]
    }
    else if (element1.type===CollType.Line && element2.type===CollType.Circle) {
        return compute_line_2_circle_collision(element1 as LineCollider, element2 as CircleCollider);
    } 
    else if (element1.type===CollType.Rectangle && element2.type===CollType.Circle){
        let [collision, displacement] = compute_rectangle_2_circle_collision(element1 as RectangleCollider, element2 as CircleCollider)
        return [collision, [-displacement[0], -displacement[1]]]
    }
    else if (element1.type===CollType.Circle && element2.type===CollType.Rectangle){
        return compute_rectangle_2_circle_collision(element2 as RectangleCollider, element1 as CircleCollider)
    }
    else {
        return [false, 0]
    }

    


}

function compute_circle_2_circle_collision(element1: CircleCollider, element2: CircleCollider){
    let distance = get_distance(element1.center(), element2.center());

    let displacement = element1.radius() + element2.radius() - distance;

    if (displacement <= 0){ return [false, 0] };

    let [relative_normal_speed, normal_vector] = compute_point_to_point_collision(element1.center(), element1.velocity(),
                                                                                  element2.center(), element2.velocity(), distance);

    if (relative_normal_speed >= 0) { return [false, 0]};
    
    return [true, normal_vector.map((x) => x*displacement)];

}


function compute_line_2_circle_collision(line: LineCollider, circle: CircleCollider){


    let t = ((circle.center()[0] - line.x_0()[0])*line.delta_x()[0] + (circle.center()[1] - line.x_0()[1])*line.delta_x()[1])/
            (line.delta_x().map((x)=> Math.pow(x,2)).reduce((acc,x) => acc+x));
    
    t = Math.max(0, Math.min(t, 1));    

    let collision_point = line.x_0().map((x,i) => {return x+line.delta_x()[i]*t});

    let distance = get_distance(circle.center(), collision_point);

    let displacement = circle.radius() - distance;

    if (displacement <= 0) {return [false, 0]};

    let [relative_normal_speed, normal_vector] = compute_point_to_point_collision(collision_point, line.velocity(), 
                                                                                  circle.center(), circle.velocity(), distance);

    if (relative_normal_speed >= 0) { return [false, 0] };

    return [true, normal_vector.map((x) => x*displacement)];

}

function compute_rectangle_2_circle_collision(rectangle: RectangleCollider, circle: CircleCollider): [boolean, number[]]{
    
    if (rectangle.rect_type === RectType.Interior){
        return (compute_interior_rectangle_2_circle_collision(rectangle, circle));
    } else {
        return (compute_exterior_rectangle_2_circle_collision(rectangle, circle));
    }
}

function compute_exterior_rectangle_2_circle_collision(rectangle: RectangleCollider, circle: CircleCollider): [boolean, number[]]{

    let [d_x, d_y] = [circle.center()[0] - rectangle.x_c()[0], circle.center()[1] - rectangle.x_c()[1]];
    let [horizontal_sign, vertical_sign] = [d_x, d_y].map(Math.sign);
    
    let distance_to_border: number[] = [0, 0];

    distance_to_border[0] = d_x - horizontal_sign * (rectangle.dimensions()[0]/2 - circle.radius());
    distance_to_border[1] = d_y - vertical_sign * (rectangle.dimensions()[1]/2 - circle.radius());

    let displacement = [0, 0];


    if (Math.sign(distance_to_border[0]) === Math.sign(horizontal_sign)){
        displacement[0] = distance_to_border[0];
    }
    if (Math.sign(distance_to_border[1]) === Math.sign(vertical_sign)){
        displacement[1] = distance_to_border[1];
    }

    if ((displacement[0] !== 0) || (displacement[1] !== 0)){
        return [true, displacement]
    } else {
        return [false, [0,0]]
    }

}

function compute_interior_rectangle_2_circle_collision(rectangle: RectangleCollider, circle: CircleCollider): [boolean, number[]]{

    let [d_x, d_y] = [circle.center()[0] - rectangle.x_c()[0], circle.center()[1] - rectangle.x_c()[1]];
    let [horizontal_sign, vertical_sign] = [d_x, d_y].map(Math.sign);

    let distance_to_border: number[] = [0, 0];
    distance_to_border[0] = d_x - horizontal_sign * (rectangle.dimensions()[0]/2 + circle.radius());
    distance_to_border[1] = d_y - vertical_sign * (rectangle.dimensions()[1]/2 + circle.radius());

    let displacement = [0, 0];

    if (Math.sign(distance_to_border[0]) !== Math.sign(horizontal_sign)){
        displacement[0] = distance_to_border[0];
    } else {
        return [false, [0,0]]
    }
    if (Math.sign(distance_to_border[1]) !== Math.sign(vertical_sign)){
        displacement[1] = distance_to_border[1];
    } else {
        return [false, [0,0]]
    }

    if ((Math.abs(displacement[0]) < circle.radius()) && (Math.abs(displacement[1]) < circle.radius())){
        if ((Math.pow(circle.radius()-Math.abs(displacement[0]),2) + Math.pow(circle.radius()-Math.abs(displacement[1]),2)) >= Math.pow(circle.radius(),2)){
            return [false, [0, 0]]
        } else {
            let delta_x = [circle.radius()-Math.abs(displacement[0]), circle.radius()-Math.abs(displacement[1])];
            let distance_to_corner = Math.pow(Math.pow(delta_x[0],2)+Math.pow(delta_x[1],2),0.5);
            let expansion = circle.radius() - distance_to_corner;

            return [true, [-horizontal_sign*expansion*delta_x[0]/distance_to_corner, -vertical_sign*expansion*delta_x[1]/distance_to_corner]]

        }
    }

    if (Math.abs(displacement[0]) < Math.abs(displacement[1])){
        return [true, [displacement[0], 0]]
    } else {
        return [true, [0, displacement[1]]]
    }
    


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