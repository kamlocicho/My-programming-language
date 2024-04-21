import {RuntimeVal, NumberVal, NullVal} from './values.ts'
import {Stmt, NumericLiteral, BinaryExpr, Program} from '../src/ast.ts'


function eval_program(program: Program): RuntimeVal {
    let lastEvaluated: RuntimeVal = {type: "null", value: "null"} as NullVal;

    for (const statement of program.body) {
        lastEvaluated = evaluate(statement)
    }

    return lastEvaluated;
}

function eval_numeric_binary_expr(lhs: NumberVal, rhs: NumberVal, operator: string): NumberVal {
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

function eval_binary_expr(binop: BinaryExpr): RuntimeVal {
    const lhs = evaluate(binop.left);
    const rhs = evaluate(binop.right);
    

    if (lhs.type == "number" && rhs.type == "number") {
        return eval_numeric_binary_expr(lhs as NumberVal, rhs as NumberVal, binop.operator);
    }

    return {type: 'null', value: "null"} as NullVal;
}

export function evaluate(astNode: Stmt): RuntimeVal {
    switch(astNode.kind) {
        case "NumericLiteral":
            return { value: ((astNode as NumericLiteral).value), type: "number"} as NumberVal;
        case "Program":
            return eval_program(astNode as Program);
        // case "Identifier":
        case "BinaryExpr":
            return eval_binary_expr(astNode as BinaryExpr);
        case "NullLiteral":
            return {value: "null", type: "null"} as NullVal;
        default:
            console.error("This AST Node has not yet been setup for interpretation.", astNode);
            Deno.exit(1);
    }
}