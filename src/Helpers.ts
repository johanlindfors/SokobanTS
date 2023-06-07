namespace Sokoban {
    export namespace Helpers {
        const EMPTY = 0;
        const WALL = 1;
        const SPOT = 2;
        const CRATE = 3;
        const PLAYER = 4;
        const TILESIZE = 40;
    
        export function parse(input: string) : number[][] {
            let result : number[][] = [];
            let row: number = 0;
            result[row] = [];
            for (let i = 0, col = 0; i <= input.length - 1; i++, col++) {
                switch(input[i]){
                    case '|':
                        result[++row] = [];
                        col = -1;
                        break;
                    case '#':
                        result[row][col] = 1;
                        break;
                    case '$':
                        result[row][col] = 3;
                        break;
                    case '@':
                        result[row][col] = 4;
                        break;
                    case '.':
                        result[row][col] = 2;
                        break;
                    default:
                        result[row][col] = 0;
                        break;
                }
            }
            return result;
        }
    }
}