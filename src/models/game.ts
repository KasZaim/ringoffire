export class Game {
    public players: string[] = [];
    public currentPlayerImgs: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public playersImg: string[] = [];

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        for (let i = 1; i < 7; i++) {
            this.playersImg.push('profil ' + i)
        }
        // this.newPlayerImg = this.game.playersImg.pop()|| '';
        shuffleArray(this.stack);
    }
}


function shuffleArray(arr: (string | number)[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
