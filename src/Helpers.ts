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
            let y = 0;
            result[y] = [];
            for (let i = 0, x = 0; i <= input.length - 1; i++, x++) {
                switch(input[i]){
                    case '|':
                        result[++y] = [];
                        x = -1;
                        break;
                    case '#':
                        result[y][x] = 1;
                        break;
                    case '$':
                        result[y][x] = 3;
                        break;
                    case '@':
                        result[y][x] = 4;
                        break;
                    case '.':
                        result[y][x] = 2;
                        break;
                    default:
                        result[y][x] = 0;
                        break;
                }
            }
            return result;
        }
    }
}