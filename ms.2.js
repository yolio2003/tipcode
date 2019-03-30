MetaScript(1,0,0);
//...
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
//.
  write('\n');
__='  ';
simpleIncludeExample("./test/ms.js")
