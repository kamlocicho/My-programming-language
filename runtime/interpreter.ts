import {RuntimeVal, NumberVal} from './values.ts'
import {Stmt, NumericLiteral, BinaryExpr, Program, Identifier, VarDeclaration} from '../src/ast.ts'
import Environment from "./environment.ts";
import { eval_program } from "./eval/statements.ts";
import { eval_identifier, eval_binary_expr } from "./eval/expressions.ts";


export function evaluate(astNode: Stmt, env: Environment): RuntimeVal {
    switch(astNode.kind) {
        case "NumericLiteral":
            return { value: ((astNode as NumericLiteral).value), type: "number"} as NumberVal;
        case "Program":
            return eval_program(astNode as Program, env);
        case "Identifier":
            return eval_identifier(astNode as Identifier, env);
        case "BinaryExpr":
            return eval_binary_expr(astNode as BinaryExpr, env);
        case "VarDeclaration":
            return eval_var_declaration(astNode as VarDeclaration, env)
        default:
            console.error("This AST Node has not yet been setup for interpretation.", astNode);
            Deno.exit(1);
    }
}

function eval_var_declaration(arg0: VarDeclaration, env: Environment): RuntimeVal {
  throw new Error("Function not implemented.");
}
