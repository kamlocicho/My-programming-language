import Parser from './src/parser.ts'

repl();

function repl() {
    const parser = new Parser();
    console.log("Repl v0.1");
    
    while(true) {
        const input = prompt("> ");
        // Check for not user input or exit keyword.
        if (!input || input.includes("exit")) {
            Deno.exit()
        }

        const program = parser.produceAST(input);
        console.log(program);
    }
}