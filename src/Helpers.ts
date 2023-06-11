namespace Sokoban {
    export namespace Helpers {    
        export function parse(input: string, width: number, height: number) : number[] {
            let result : number[] = [];
            for (let index = 0, newIndex = 0; index < input.length; index++) {
                switch(input[index]) {
                    case '|':
                        break;
                    case '#':
                        result[newIndex++] = 1;
                        break;
                    case '$':
                        result[newIndex++] = 3;
                        break;
                    case '@':
                        result[newIndex++] = 4;
                        break;
                    case '.':
                        result[newIndex++] = 2;
                        break;
                    default:
                        result[newIndex++] = 0;
                        break;
                }
            }
            return result;
        }
    }
}
