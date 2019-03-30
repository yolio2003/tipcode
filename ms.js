//?...
function simpleIncludeExample(file) {
  writeln(
    indent(
      require("fs")
        .readFileSync(file)
        .toString("utf8"),
      __
    )
  );
  writeln(indent("indent", __));
}
//?.

  //? simpleIncludeExample("./ms.js")
