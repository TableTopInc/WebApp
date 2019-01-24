export class Game{
   
     constructor(
         public Id: string,
         public Title: string,
         public Description: string,
         public CoverUrl: string,
         public PlayersFrom: number,
         public PlayersTo: number,
         public SessionMinutesFrom: number,
         public SessionMinutesTo: number,
         public AgeFrom: number,
         public YearReleased: number,
         ) 
        
         { }
}