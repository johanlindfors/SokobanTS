namespace Sokoban {
    export class ApiClient {
        async getLevel(id: number) : Promise<string> {
            let words = await window.fetch("/bin/000.txt")
                .then(response => response.text());

            let level: string = "";
            const wordList = words.split('\n');
            for (let index = 0; index < wordList.length;) {
                let levelNumber = parseInt(wordList[index].split(' ')[1]);
                if(id == levelNumber) {
                    for(let row = 1; row <= 10; row++){
                        level += wordList[index + row] + "|"; 
                    }
                    break;
                } else {
                    index += 12;
                }
            }
            return level;
        }
    }
}