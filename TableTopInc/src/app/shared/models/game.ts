export class Game {

    constructor(
         public id: string,
         public title: string,
         public description: string,
         public coverUrl: string,
         public playersFrom: number,
         public playersTo: number,
         public sessionMinutesFrom: number,
         public sessionMinutesTo: number,
         public ageFrom: number,
         public yearReleased: number,
    ) {}
}
