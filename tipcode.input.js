//> let a = "a"
/*>function simpleIncludeExample(a) {
  return a
}
let b = "b"
*/
  writeln(
    indent(
      require("/*>=b*/")
        .readFileSync(file)
        .toString("/*>==a*/"),
      __
    )
  );
  writeln(indent("indent", __));
//>=a
12323
/*>123123*/
223123
  //>==simpleIncludeExample("./ms.js")
