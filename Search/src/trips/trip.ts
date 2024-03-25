export class Trip {
    origin: string; 
    destiny: string;

    constructor( origin : string | any, destiny : string | any ) {
        this.origin = origin;
        this.destiny = destiny;
    }
}