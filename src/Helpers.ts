namespace Sokoban {
    export namespace Helpers {
        const EMPTY = 0;
        const WALL = 1;
        const SPOT = 2;
        const CRATE = 3;
        const PLAYER = 4;
        const TILESIZE = 40;
    
        
        // need a recursive function to copy arrays, no need to reinvent the wheel so I got it here
        // http://stackoverflow.com/questions/10941695/copy-an-arbitrary-n-dimensional-array-in-javascript 
        export function copyArray(a){
            let newArray = a.slice(0);
                for(let i = newArray.length; i>0; i--){
                if(newArray[i] instanceof Array){
                    newArray[i] = copyArray(newArray[i]);	
                }
            }
            return newArray;
        }
    
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