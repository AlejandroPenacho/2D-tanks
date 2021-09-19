
export enum PetitionType {
    AddCreateTank,
    CreateProjectile,
    CreateEffect,
    CreateDeadTank,
    GenerateVibration
}

type DirectorPetition = [PetitionType, any];


export class DirectorTalker {
    petition_available: boolean;
    removal_petiton: boolean;
    petition_list: DirectorPetition[];
    removal_asked: boolean;

    constructor(){
        this.petition_available = false;
        this.petition_list = [];
        this.removal_petiton = false;

    }

    ask_director(petition: DirectorPetition){
        this.petition_available = true;
        this.petition_list.push(petition);
    }

    ask_removal(){
        this.removal_asked = true;
    }
}