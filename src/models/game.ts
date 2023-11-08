export class Game {
    public players: string[] = [];
    public currentPlayerImgs: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public playersImg: { name: string, path: string }[];
    public pickCardAnimation = false;
    public currentCard: string = '';

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        this.playersImg = [
            { name: 'Dirty Harry', path: 'profil 1.png' },
            { name: 'Stinky Pete', path: 'profil 2.png' },
            { name: 'Boozy Betty the Bluffer', path: 'profil 7.png' },
            { name: 'Black Jack Tully', path: 'profil 3.png' },
            { name: 'Whiskey Walt the Weasel', path: 'profil 4.png' },
            { name: 'Sly Sarah the Scoundrel', path: 'profil 5.png' },
            { name: 'Tipsy Tom the Swindler', path: 'profil 6.png' }

        ];
        shuffleArray(this.stack);
    }

    public toJson() {
        return {
            players: this.players,
            currentPlayerImgs: this.currentPlayerImgs,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            playersImg: this.playersImg,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard
        };
    }
}

function shuffleArray(arr: (string | number)[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
