import {BinaryExpr, Identifier} from '../../src/ast.ts'
import { evaluate } from "../interpreter.ts";
import Environment from '../environment.ts'
import { RuntimeVal, MK_NULL, NumberVal } from "../values.ts";


export function eval_numeric_binary_expr(lhs: NumberVal, rhs: NumberVal, operator: string): NumberVal {
    let result = 0;
    
    if (operator == '+') {
        result = lhs.value + rhs.value;
    } else if (operator == '-') {
        result = lhs.value - rhs.value;
    } else if (operator == '*') {
        result = lhs.value * rhs.value;
    } else if (operator == '/') {
        // TODO: Division by zero check.
        result = lhs.value / rhs.value;
    } else if (operator == '%') {
        result = lhs.value % rhs.value;
    } else {
        console.error("Unknown operation: ", operator)
        Deno.exit(1)
    }

    return {value: result, type: "number"};
}

export function eval_binary_expr(binop: BinaryExpr, env: Environment): RuntimeVal {
    const lhs = evaluate(binop.left, env);
    const rhs = evaluate(binop.right, env);
    
    if (lhs.type == "number" && rhs.type == "number") {
        return eval_numeric_binary_expr(lhs as NumberVal, rhs as NumberVal, binop.operator);
    }

    return MK_NULL();
}

export function eval_identifier(ident: Identifier, env: Environment): RuntimeVal {
    const val = env.lookupVar(ident.symbol);
    return val;
}
