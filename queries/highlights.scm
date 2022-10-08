(subroutine_name) @function

(string_constant) @string

(integer_constant) @number

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
]  @punctuation.bracket

[
 "true"
 "false"
 "null"
] @constant.builtin

(identifier) @variable

"this" @variable.builtin

[
 "class"
 "constructor"
 "function"
 "method"
 "field"
 "static"
 "var"
 "int"
 "char"
 "boolean"
 "void"
 "let"
 "do"
 "if"
 "else"
 "while"
 "return"
] @keyword
