export class Game {
    public players: string[] = ['Hans', 'Peter','Freddy'];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor(){
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_'+ i);
            this.stack.push('clubs_'+ i);
            this.stack.push('diamonds_'+ i);
            this.stack.push('hearts_'+ i);
        }
        shuffleArray(this.stack);
    }
    
}

function shuffleArray(arr: (string | number)[]){
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
}
  
  
  
  