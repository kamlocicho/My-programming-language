import { Program } from "../../src/ast.ts";
import Environment from '../environment.ts'
import { evaluate } from "../interpreter.ts";
import { NullVal, RuntimeVal } from "../values.ts";


export function eval_program(program: Program, env: Environment): RuntimeVal {
    let lastEvaluated: RuntimeVal = {type: "null", value: null} as NullVal;

    for (const statement of program.body) {
        lastEvaluated = evaluate(statement, env)
    }

    return lastEvaluated;
}
