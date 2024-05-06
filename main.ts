import Parser from './src/parser.ts'
import { evaluate } from './runtime/interpreter.ts'
import {MK_NUMBER, MK_NULL, MK_BOOL} from './runtime/values.ts'
import Environment from "./runtime/environment.ts";

repl();

function repl() {
    const parser = new Parser();
    const env = new Environment();

    env.declareVar("x", MK_NUMBER(100));
    env.declareVar("true", MK_BOOL(true));
    env.declareVar("false", MK_BOOL(false));
    env.declareVar("null", MK_NULL());
    
    console.log("Repl v0.1");
    
    while(true) {
        const input = prompt("> ");
        // Check for not user input or exit keyword.
        if (!input || input.includes("exit")) {
            Deno.exit()
        }

        const program = parser.produceAST(input);

        const result = evaluate(program, env);
        console.log(result);
    }
}