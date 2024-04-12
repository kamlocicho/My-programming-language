import { tokenize } from "./src/lexer.ts";

const source = await Deno.readTextFile("./code/main.ml");
for (const token of tokenize(source)) {
    console.log(token);
}