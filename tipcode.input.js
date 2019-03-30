//>imlinecode
function simpleIncludeExample(/*>file*/) {
  writeln(
    indent(
      require("/*>=file*/")
        .readFileSync(file)
        .toString("/*>==file*/"),
      __
    )
  );
  writeln(indent("indent", __));
}
//>=line
12323
/*>123123*/
223123
  //>== simpleIncludeExample("./ms.js")
