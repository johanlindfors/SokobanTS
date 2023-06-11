namespace Sokoban {
    export namespace Helpers {    
        export function parse(input: string) : [number[], number, number] {
            let result : number[] = [];
            let width = 0;
            let height = 0;
            for (let index = 0, newIndex = 0; index < input.length; index++) {
                switch(input[index]) {
                    case '|':
                        if(width == 0)
                            width = index;
                        height++;
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
            return [result, width, height];
        }
    }
}
